<template>
  <div id="container-list">
    <div class="container-card">
      <div class="table-row">
        <!--学号姓名标题-->
        <div class="table-col">
          <div class="table-head">学号姓名</div>
          <div class="table-reord-head">
            <p>学号</p>
          </div>
          <div class="table-reord-head">
            <p>姓名</p>
          </div>
        </div>
        <!--表格内容标题-->
        <div v-for="table in recordFilter.show" class="table-col">
          <div class="table-head">{{table.name}}</div>
          <div v-for="record in table.records" v-if="record.id!='sid'&&record.id!='name'" class="table-reord-head">
            <p>{{record.name}}</p>
          </div>
        </div>
      </div>
      <!--学号姓名数据-->
      <div class="table-col">
        <div v-for="student in students" class="table-row">
          <div class="table-cell">
            <p>{{student[recordFilter['show'][0]['id']]['sid']}}</p>
          </div>
          <div class="table-cell">
            <p>{{student[recordFilter['show'][0]['id']]['name']}}</p>
          </div>
        </div>
      </div>
      <!--表格内容数据-->
      <div v-for="table in recordFilter.show" class="table-col">
        <div v-for="student in students" class="table-row">
          <div class="table-cell" v-for="record in table.records" v-if="record.id!='sid'&&record.id!='name'">
            <p>{{student[table.id][record.id]}}</p>
          </div>
        </div>
      </div>
      <hr>
      <button id="button-download" @click="downloadClick">导出Excel</button>
    </div>
  </div>
</template>
<script>
import tableData from './javascripts/tableData.js'

export default {
  data: function() {
    return {
      students: [],
      recordFilter: []
    }
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    //console.log(this.$route.params.postData)
    //console.log(JSON.stringify(this.$route.params.recordFilter))
    /*
    var recordFilter = {
      "select": ["basicInfo", "cadre", "paper"],
      "show": [{
        "name": "基本信息",
        "id": "basicInfo",
        "records": [{ "name": "学号", "id": "sid" }, { "name": "性别", "id": "gender" }, { "name": "籍贯", "id": "birthPlace" }, { "name": "身份证号码", "id": 'idNum'}]
      }, {
        "name": "学生干部任职情况",
        "id": "cadre",
        "records": [{ "name": "学年", "id": "year" }, { "name": "职务类别", "id": "cadreClass" }, { "name": "职务名称", "id": "cadreName" }]
        }
      ]}
    var testData = [
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234" }, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234" }, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏', idNum: "142701198812221234"}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}}
    ]
    this.students = testData
    this.recordFilter = recordFilter
    */
    this.fetchData(this.$route.params.postData, this.$route.params.recordFilter)
  },
  methods: {
    fetchData: function(dataJson, recordFilter) {
      //为了把this传进ajax
      var _self = this
      console.log('postdata: ' + dataJson)
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: dataJson,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //操作成功
              _self.students = result['content']
              _self.recordFilter = recordFilter
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
    //导出函数
    downloadClick: function() {
      //alert(this.getExplorer());
      if (this.getExplorer() == 'ie' || this.getExplorer() == undefined) {
        //ie不能用方法检测，返回的是undefined...
        //console.log($('.container-card-list')[0])
        //var curTbl = $('.container-card-list')[0]
        var curTbl = this.students
        var oXL;
        try {
          oXL = new ActiveXObject("Excel.Application") //创建AX对象excel
        } catch (e) {
          alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用")
          return
        }
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        /*
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select;
        sel.execCommand("Copy");
        xlsheet.Paste();
        */
        xlsheet = this.getJsonContentForIE(xlsheet, curTbl)
        oXL.Visible = true;
        try {
          //alert("ie");
          var fname = oXL.Application.GetSaveAsFilename("数据表.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
          print("Nested catch caught " + e);
        } finally {
          oWB.SaveAs(fname);
          //这里在excel生成后不保存关闭会报错，待处理
          oWB.Close(savechanges = false);
          oXL.Quit();
          oXL = null;
          idTmr = window.setInterval("Cleanup();", 1);
        }
      } else {
        //叫jsoncontent，实际上传入的是一个对象而不是json
        var str = this.getJsonContent(this.students);
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        var link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名，可以改成其他名字
        link.download = "数据表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    //给出保存json的全局变量然后导出，格式：[{},{},{}]
    getJsonContent: function(jsonData) {
      //console.log(tableData.length)
      var str = ''
      //表名部分
      for (let item in jsonData[0]) {
        //id转换name，先找到表
        let table = {}
        for (let ite in tableData) {
          if (item == ite) {
            table = tableData[ite]
            break;
          }
        }
        str += table['name']
        for (let record in jsonData[0][item]) {
          for (let ite in table['records']) {
            if (ite == record) {
              str += ','
            }
          }
        }
      }
      str += '\n'
      //字段名部分
      for (let item in jsonData[0]) {
        //id转换name，先找到表
        let table = {}
        for (let ite in tableData) {
          if (item == ite) {
            table = tableData[ite]
            break
          }
        }
        for (let record in jsonData[0][item]) {
          for (let ite in table['records']) {
            if (ite == record) {
              str += table['records'][ite].name
              str += ','
            }
          }
        }
      }
      str += '\n'
      //数据部分
      for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {
          for (let record in jsonData[i][item]) {
            //在头或尾加入制表符'\t'能让长数字的字符串不显示为科学记数法
            str = str + '\t' + jsonData[i][item][record]
            str += ','
          }
        }
        str += '\n'
      }
      return str
    },
    getJsonContentForIE: function(xlsheet, jsonData) {
      //console.log(Test.length)
      //表名部分
      let y = 0
      for (let item in jsonData[0]) {
        //id转换name，先找到表
        let table = {}
        for (let ite in tableData) {
          if (item == ite) {
            table = tableData[ite]
            break;
          }
        }
        console.log(table['name'])
        xlsheet.Cells(1, y + 1).value = table['name']
        y++
        console.log(y)
        for (let record in jsonData[0][item]) {
          for (let ite in table['records']) {
            if (ite == record) {
              y++
            }
          }
        }
      }
      //字段名部分
      y = 0
      for (let item in jsonData[0]) {
        //id转换name，先找到表
        var table = {}
        for (let ite in tableData) {
          if (item == ite) {
            table = tableData[ite]
            break;
          }
        }
        for (let record in jsonData[0][item]) {
          for (let ite in table['records']) {
            if (ite == record) {
              xlsheet.Cells(2, y + 1).value = table['records'][ite].name
              y++
            }
          }
        }
      }
      //数据部分
      for (let i = 0; i < jsonData.length; i++) {
        y = 0
        for (let item in jsonData[i]) {
          for (let record in jsonData[i][item]) {
            xlsheet.Cells(i + 3, y + 1).value = '\t' + jsonData[i][item][record]
            y++
          }
        }
      }
      return xlsheet
    },
    getExplorer: function() {
      var explorer = window.navigator.userAgent;
      //ie
      if (explorer.indexOf("MSIE") >= 0) {
        return 'ie'
      }
      //firefox
      else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox'
      }
      //Chrome
      else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome'
      }
      //Opera
      else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera'
      }
      //Safari
      else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari'
      }
    }
  }
}
</script>
<style>
#container-list .container-card {
  display: table;
  width: 2000px;
  margin: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2%;
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-list .table-row {
  display: table-row;
}

#container-list .table-cell {
  display: table-cell;
  width: 120px;
  height: 20px;
  text-align: center;
  padding-top: 5px;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#container-list .table-cell:hover {
  background-color: grey;
}

#container-list .table-head {
  text-align: center;
}

#container-list .table-reord-head {
  display: table-cell;
  width: 120px;
  height: 20px;
  overflow: hidden;
  text-align: center;
  padding-top: 5px;
}

#container-list .table-col {
  float: left;
}

#container-list hr,
#button-download {
  clear: both;
}
</style>