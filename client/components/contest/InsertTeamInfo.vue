<template>
  <div id="container-insert-basicInfo">
    <div class="text-header">队伍信息插入</div>
    <hr>
    <div class="container-input">
      <div class="container-record" v-for="record in table.records">
        <span>{{record.name}}:</span>
        <select v-if="record.valueType=='select'" v-bind:id="tableId+'-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <input type="text" v-else v-bind:id="tableId+'-'+record.id">
      </div>
    </div>
    <!-- 动态绑定学长数量 -->
    <div class="container-input">
      <div class="container-record">
        <span>研究生学长数量:</span>
        <input type="number" v-model.number="seniorNum">
      </div>
      <div v-for="iSenior in seniorNum">
        <div class="container-record">
          <span>学长{{iSenior}}学号:</span>
          <input type="text" :id="'sid-senior'+iSenior">
        </div>
        <div class="container-record">
          <span>学长{{iSenior}}姓名:</span>
          <input type="text" :id="'name-senior'+iSenior">
        </div>
      </div>
      <!-- 动态绑定队员数量 -->
      <div class="container-record">
        <span>队员数量:</span>
        <input type="number" v-model.number="teamMemberNum">
      </div>
      <div v-for="iTeam in teamMemberNum">
        <div class="container-record">
          <span>队员{{iTeam}}学号:</span>
          <input type="text" :id="'sid-team'+iTeam">
        </div>
        <div class="container-record">
          <span>队员{{iTeam}}姓名:</span>
          <input type="text" :id="'name-team'+iTeam">
        </div>
        <div class="container-record">
          <span>队员{{iTeam}}职责:</span>
          <input type="text" :id="'duty-team'+iTeam">
        </div>
      </div>
    </div>
    <pre id="warning"></pre>
    <button type="button" class="button-insert" @click="insertClick">提交</button>
  </div>
</template>
<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'

export default {
  data: function() {
    return {
      tableId: 'competition',
      table: tableData['competition'],
      seniorNum: 0,
      teamMemberNum: 0
    }
  },
  methods: {
    insertClick: function() {
      var formatTable = formatCheck[this.tableId]
      var message = ''
      // table competition
      for (let item in tableData[this.tableId]['records']) {
        let record = $('#' + this.tableId + '-' + item).val()
        if (!formatTable[item]['canNull'] && record == '') {
          //检查不能为空的字段是否为空
          message = message + tableData[this.tableId]['records'][item]['name'] + '不能为空\n'
        } else if (record != '' && formatTable[item]['reg'] != null && !formatTable[item]['reg'].test(record)) {
          //检查格式合法
          message = message + formatTable[item]['msg'] + '\n'
        }
      }
      // table seniorsGroup
      for (let i = 1; i <= this.seniorNum; i++) {
        for (let item in tableData['seniorsGroup']['records']) {
          if (item == 'comName' || item == 'leaderSid')
            continue
          var record = $('#' + item + '-senior' + i).val()
          if (!formatCheck['seniorsGroup'][item]['canNull'] && record == '') {
            message = message + tableData['seniorsGroup']['records'][item]['name'] + i + '不能为空\n'
          } else if (record != '' && formatCheck['seniorsGroup'][item]['reg'] != null && !formatCheck['seniorsGroup'][item]['reg'].test(record)) {
            message = message + formatCheck['seniorsGroup'][item]['msg'] + i + '\n'
          }
        }
      }
      // table teamMember
      for (let i = 1; i <= this.teamMemberNum; i++) {
        for (let item in tableData['teamMember']['records']) {
          if (item == 'comName' || item == 'leaderSid')
            continue
          var record = $('#' + item + '-team' + i).val()
          if (!formatCheck['teamMember'][item]['canNull'] && record == '') {
            message = message + tableData['teamMember']['records'][item]['name'] + i + '不能为空\n'
          } else if (record != '' && formatCheck['teamMember'][item]['reg'] != null && !formatCheck['teamMember'][item]['reg'].test(record)) {
            message = message + formatCheck['teamMember'][item]['msg'] + i + '\n'
          }
        }
      }
      if (message != '') {
        $('#warning').text(message)
        return
      } else {
        $('#warning').text('')
        var data = {
          table: this.tableId
        }
        for (let item in tableData[this.tableId]['records']) {
          if ($('#' + this.tableId + '-' + item).val() != '') {
            data[item] = $('#' + this.tableId + '-' + item).val()
          }
        }
        var temp1 = []
        for (var i = 1; i <= this.seniorNum; i++) {
          var temp = {
            comName: $('#' + this.tableId + '-' + 'comName').val(),
            leaderSid: $('#' + this.tableId + '-' + 'leaderSid').val(),
            sid: $('#sid-senior' + i).val(),
            name: $('#name-senior' + i).val()
          }
          temp1.push(temp)
        }
        data['seniorsGroup'] = temp1
        var temp2 = []
        for (var i = 1; i <= this.teamMemberNum; i++) {
          var temp = {
            comName: $('#' + this.tableId + '-' + 'comName').val(),
            leaderSid: $('#' + this.tableId + '-' + 'leaderSid').val(),
            sid: $('#sid-team' + i).val(),
            name: $('#name-team' + i).val(),
            duty: $('#duty-team' + i).val()
          }
          temp2.push(temp)
        }
        data['teamMember'] = temp2
        var postData = JSON.stringify(data)
        console.log(postData)
        var _self = this
        $.ajax({
          type: "POST",
          url: "/students/insert/" + _self.tableId,
          contentType: "application/json; charset=utf-8",
          data: postData,
          dataType: "json",
          //timeous 5s
          timeout: 5000,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == 'content') {
                //操作成功
                alert('插入成功！')
              } else if (key == 'err') {
                //操作错误
                alert('插入错误: ' + result[key]['sqlMessage'])
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
}
</script>
<style>
#container-insert-basicInfo {
  margin: 25px;
  text-align: left;
  padding: 30px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*让float的内部元素可以撑开容器*/
  overflow: hidden;
}

#container-insert-basicInfo .text-header {
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}

#container-insert-basicInfo .container-input {
  margin-left: 50px;
}

#container-insert-basicInfo .container-record {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

#container-insert-basicInfo .container-record span {
  display: inline-block;
  text-align: right;
  width: 200px;
  font-size: 16px;
}

#container-insert-basicInfo .container-record select,
#container-insert-basicInfo .container-record input {
  margin-left: 10px;
  width: 250px;
  height: 30px;
  padding: 5px;
}

#container-insert-basicInfo #warning {
  float: left;
  clear: both;
  text-align: left;
  margin-top: 10px;
  margin-left: calc(50% - 70px);
  width: 500px;
  background-color: white;
  border: none;
  font-size: 15px;
  color: #f00;
}

#container-insert-basicInfo .button-insert {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-top: 10px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
  color: white;
  background-color: var(--blue);
  border: none;
  border-radius: 3px;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#container-insert-basicInfo .button-insert:hover {
  background-color: var(--blue-hover);
}
</style>