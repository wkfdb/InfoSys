<template>
  <div>
    <!--顶部菜单-->
    <div class="container-header">
      <p class="header-text">发表论文情况管理</p>
      <div class="header-button">
        <span @click="insertClick">插入数据</span>
        <span @click="downloadClick">导出</span>
        <span @click="importClick">导入<input id="button-import" v-on:change="importUpload" type="file"></span>
        <span @click="mubanDownload">下载模板</span>
        <span>转毕业生</span>
        <span @click="diycolClick">自定义列</span>
        <span @click="sendEmailClick">邮件通知</span>
      </div>
    </div>
    <!--查询输入-->
    <div class="container-card-list">
      <div class="container-record" v-for="record in table.records">
        <span>{{record.name}}:</span>
        <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'paper-'+record.id">
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'paper-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'paper-'+record.id">
          <span class="text-range">最小值 </span><input type="text" class="min"><span class="text-range">最大值 </span><input type="text" class="max">
        </span>
      </div>
      <button class="manager-button" @click="queryClick">查询</button>
    </div>
    <!--显示数据-->
    <div class="container-card-list">
      <table border="1">
        <tr class="table-head">
          <th>#</th>
          <th v-for="record in table.records" v-if="record['display']==true">{{record.name}}</th>
        </tr>
        <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['paper']['sid']">
          <td>{{index+1}}</td>
          <td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
            <span v-if="student['paper'][record.id]!=undefined">{{student['paper'][record.id]}}</span>
            <span v-else>---</span>
          </td>
        </tr>
      </table>
    </div>
    <!--统计-->
    <div class="container-card-list">
      <div class="stat-record" v-for="record in table.records">
        <button class="stat-checkbox" v-bind:record-id="record.id" @click="statButtonToggle">{{record.name}}</button>
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'paper-stat-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <input class="hide-container" type="text" v-else v-bind:id="'paper-stat-'+record.id">
      </div>
      <button class="manager-button" @click="statClick">统计</button>
      <span id="stat-chart-bar"></span>
      <span id="stat-chart-pie"></span>
    </div>
    <!-- 弹窗 -->
    <div id="popup" class="popup-background">
      <!-- 弹窗内容 -->
      <div class="popup-content">
        <span id="popup-close" @click="modalCloseClick">&times;</span>
        <div class="popup-cell" v-for="record in table.records">
          {{record.name}}
          <input type="checkbox" v-model:checked="record.display">
        </div>
      </div>
    </div>
    <!-- 发邮件 -->
    <div id="popup-email" class="popup-background">
      <email :emailSid="emailSid"></email>
    </div>
  </div>
</template>
<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'
import downloadModule from '../javascripts/downloadModule.js'
import importModule from '../javascripts/importModule.js'
import statModule from '../javascripts/statisticModule.js'
var empty = JSON.stringify({ equal: {}, range: {}, fuzzy: {} })
var emptyCell = JSON.stringify({})

export default {
  data: function() {
    return {
      table: tableData['paper'],
      students: [],
      emailSid: []
    }
  },
  created: function() {
    //alert(window.innerWidth)
    //1536*728
  },
  methods: {
    insertClick: function() {
      this.$router.push({
        name: 'paperInsert'
      })
    },
    queryClick: function() {
      var paper = { equal: {}, range: {}, fuzzy: {} }
      var data = {
        select: ['paper'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
      if ($('#paper-sid').val()) {
        var sid = $('#paper-sid').val()
        if (!formatCheck['paper']['sid']['reg'].test(sid)) {
          alert(formatCheck['paper']['sid']['msg'])
          return
        } else {
          paper['equal']['sid'] = sid
        }
      } else {
        //验证格式
        var message = ''
        for (let item in formatCheck['paper']) {
          if (formatCheck['paper'][item]['reg'] != null) {
            let record = $('#paper-' + item).val()
            if (record != '' && !formatCheck['paper'][item]['reg'].test(record)) {
              message = message + formatCheck['paper'][item]['msg']
            }
          }
        }
        if (message != '') {
          alert(message)
          return
        }
        //格式正确，发送数据到后台
        if ($('#paper-name').val()) paper['equal']['name'] = $('#paper-name').val()
        if ($('#paper-title').val()) paper['equal']['title'] = $('#paper-title').val()
        if ($('#paper-authors').val()) paper['equal']['authors'] = $('#paper-authors').val()
        if ($('#paper-journal').val()) paper['equal']['journal'] = $('#paper-journal').val()
        if ($('#paper-serialNumber').val()) paper['equal']['serialNumber'] = $('#paper-serialNumber').val()
        //range value
        var rangeVal = { min: $('#paper-pagesRange .min').val(), max: $('#paper-pagesRange .max').val() }
        if (rangeVal['min'] != '' && rangeVal['max'] != '') {
          paper['range']['pagesRange'] = rangeVal
        }
        if ($('#paper-paperGrade').val()) paper['equal']['paperGrade'] = $('#paper-paperGrade').val()
        if ($('#paper-paperClass').val()) paper['equal']['paperClass'] = $('#paper-paperClass').val()
        //range value
        var rangeVal = { min: $('#paper-time .min').val(), max: $('#paper-time .max').val() }
        if (rangeVal['min'] != '' && rangeVal['max'] != '') {
          paper['range']['time'] = rangeVal
        }
        if ($('#paper-insTeacher').val()) paper['equal']['insTeacher'] = $('#paper-insTeacher').val()
      }
      if (JSON.stringify(paper['equal']) != emptyCell) data['where']['equal']['paper'] = paper['equal']
      if (JSON.stringify(paper['range']) != emptyCell) data['where']['range']['paper'] = paper['range']
      if (JSON.stringify(paper['fuzzy']) != emptyCell) data['where']['fuzzy']['paper'] = paper['fuzzy']
      var postData = JSON.stringify(data)
      console.log(postData)
      //post
      var _self = this
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //操作成功
              _self.students = result['content']
            } else if (key == 'err') {
              //操作错误
              alert('查询信息错误: ' + result[key]['sqlMessage'])
            }
          }
        },
        error: function(result, xhr) {
          //连接错误
          //console.log(result)
          alert('服务器连接错误: ' + xhr)
        }
      })
    },
    downloadClick: function() {
      downloadModule.downloadClick(this.students)
    },
    importClick: function() {
      $('#button-import').click()
    },
    mubanDownload: function() {
      downloadModule.mubanDownload("paper")
    },
    //onchange时调用这个函数实现文件选择后上传
    importUpload: function() {
      importModule.importClick($('#button-import').prop('files')[0], 'paper')
    },
    diycolClick: function() {
      $('#popup').show()
    },
    modalCloseClick: function() {
      $('#popup').hide()
    },
    //发送邮件函数
    sendEmailClick: function() {
      $('#popup-email').show()
      //加载收件人学号
      this.emailSid = []
      for (let i = 0; i < this.students.length; i++) {
        //解决重复添加问题
        if (this.emailSid.indexOf(this.students[i]['paper']['sid']) == -1)
          this.emailSid.push(this.students[i]['paper']['sid'])
      }
    },
    studentClick: function(event) {
      //alert('您点击的学生学号是：' +  event.currentTarget.getAttribute('sid'))
      //跳转,在跳转完成后再请求数据,使用query在url内传参，这样不会有刷新就丢失的问题
      var routeData = this.$router.resolve({
        name: 'detail',
        query: {
          sid: event.currentTarget.getAttribute('sid')
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 统计
    statButtonToggle: function(event) {
      if (event.currentTarget.className == 'stat-checkbox') {
        event.currentTarget.className = 'stat-checkbox-selected'
        $('#paper-stat-range-' + event.currentTarget.getAttribute('record-id')).show()
      } else if (event.currentTarget.className == 'stat-checkbox-selected') {
        event.currentTarget.className = 'stat-checkbox'
        $('#paper-stat-range-' + event.currentTarget.getAttribute('record-id')).hide()
      }
    },
    statClick: function() {
      var data = {
        table: 'paper',
        fields: [],
        condition: {}
      }
      $('.stat-checkbox-selected').each(function() {
        var recordId = $(this).attr('record-id')
        data['fields'].push(recordId)
        if ($('#paper-stat-' + recordId).val() != '') {
          data['condition'][recordId] = $('#paper-stat-' + recordId).val()
        }
      })
      if (data['fields'].length == 0) {
        alert('请选择想要统计的字段！')
        return
      }
      var postData = JSON.stringify(data)
      console.log(postData)
      $.ajax({
        type: 'POST',
        url: '/students/statistic',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //操作成功，配置图表
              /*let statData = [
						    {gender: '女', major: null, statistic: 2},
						    {gender: '女', major: 123, statistic: 1},
						    {gender: '男', major: 123, statistic: 3},
						    {gender: '男', major: '数学', statistic: 1}
					    ]*/
              console.log(result[key])
              statModule.createCharts('paper', result[key], 'stat-chart-bar', 'stat-chart-pie')
            } else if (key == 'err') {
              //操作错误
              alert('统计错误: ' + result[key]['sqlMessage'])
            }
          }
        },
        error: function(result, xhr) {
          //连接错误
          //console.log(result)
          alert('服务器连接错误: ' + xhr)
        }
      })
    }
  }
}
</script>
<style scoped>
.container-header {
  height: 70px;
  line-height: 70px;
  padding-left: 30px;
  text-align: left;
  background-color: white;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*设置文字不可被选中*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.header-text {
  float: left;
  font-size: 20px;
}

.header-button {
  float: right;
  margin-right: 20px;
}

.header-button span {
  padding-right: 10px;
  font-weight: bold;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.header-button span:hover {
  color: var(--blue);
  cursor: pointer;
}

.container-record {
  float: left;
  width: 360px;
  height: 35px;
  text-align: right;
}

.container-record .text-range {
  font-size: 12px;
}

.container-record .min,
.container-record .max {
  width: 50px;
}

.container-record .hide-container {
  height: 24px;
  width: 180px;
}

.manager-button {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-top: 20px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
  color: white;
  background-color: var(--blue);
  border: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.manager-button:hover {
  background-color: var(--blue-hover);
}

.container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('.container-card-list').width())不包含margin，但是会减去padding
  固定了width，才能在内部元素超出宽度时出现滚动条*/
  /*width: 1251.32px;*/
  width: calc(100vw - 275px);
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  overflow: auto;
}

.container-card-list table {
  /*不会自动换行*/
  word-break: keep-all;
  white-space: nowrap;
  min-width: 100%;
  font-size: 14px;
  border-color: var(--grey-shadow);
}

.container-card-list th,
td {
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.container-card-list tr {
  transition: background 0.3s;
  -moz-transition: background 0.3s;
  /* Firefox 4 */
  -webkit-transition: background 0.3s;
  /* Safari 和 Chrome */
  -o-transition: background 0.3s;
  /* Opera */
}

.container-card-list tr:not(.table-head):hover {
  background-color: var(--grey-hover);
}

#button-import {
  display: none;
}

/* 弹窗 (background) */

.popup-background {
  display: none;
  /* 默认隐藏 */
  position: fixed;
  /* 定位 */
  z-index: 10;
  /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-left: 225px;
  padding-top: 60px;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* 弹窗内容 */

.popup-content {
  background-color: white;
  margin-top: 100px;
  margin-left: calc(50% - 300px);
  padding: 30px;
  width: 600px;
  height: 400px;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

.popup-cell {
  float: left;
  width: 160px;
  height: 40px;
  text-align: left;
}

/* 关闭按钮 */

#popup-close {
  position: relative;
  float: right;
  width: 50px;
  height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#popup-close:hover,
#popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 统计 */

.stat-record {
  float: left;
  width: 300px;
  min-height: 35px;
  text-align: right;
  font-size: 13px;
}

.stat-record .hide-container {
  height: 23px;
  width: 140px;
}

/*
.stat-record input[type="checkbox"] {
  width: 13px;
  height: 13px;
}
*/

.stat-checkbox {
  width: 130px;
  height: 25px;
  border: none;
  background-color: var(--grey-hover);
  outline: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-checkbox:hover {
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
}

.stat-checkbox-selected {
  width: 130px;
  height: 25px;
  border: none;
  color: white;
  background-color: var(--blue);
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-input {
  width: 10px;
  height: 10px;
}

.stat-nonselect-range {
  display: none;
}

#stat-chart-bar {
  float: left;
  margin-top: 20px;
  width: 50%;
}

#stat-chart-pie {
  float: left;
  margin-top: 20px;
  width: 50%;
}
</style>