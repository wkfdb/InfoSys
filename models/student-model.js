

const {queryDB} = require('../utils/dbConn');





//批量插入
/*
* 查询格式 {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}
*
*
*/
exports.batchInsert = (table,field,oneRecord) => {
  var tmp = true;
  //var field = data['field'];
  let query =
  "insert into " + table +
  "  ( ";
  for(let x in field){
    if(tmp) {
        query +=field[x];
        tmp =false;
    }
    else {
      query+=',' + field[x];
    }
  }
  query+=' ) values ?';
  console.log(query)
  let values = oneRecord;
  return queryDB(query, [values]);
}

//只负责插入，由控制层负责检查是否已经在数据库里面，然后选择更新或者插入
//oneRecord表示 插入信息数组的每一个子数组
//测试数据在testBatchInsert.js
exports.insertOne = (table,field, oneRecord) =>{
  var tmp = true;
  //var field = data['field']
  let query =
  "insert into " + table +
  " ( ";
  for(let x in field){
    if(tmp){
      query+=field[x]
      tmp =false
    }
    else {
      query+=',' + field[x]
    }
  }
  query+=' ) values (';
  tmp = true;
  for(let x in field){
    if(tmp){
      query+='?'
      tmp =false
    }
    else {
      query+=',?'
    }
  }
  query+=') ;'
  console.log(query)
  let values = oneRecord

  return queryDB(query,values);
}

//现在的更新是只针对sid一个键连接，还没有考虑到一个表有多个键的情况
//用于批量导入时，更新一条数据
//对于更新的想法是，把一条数组，先合成json，这样查找起来方便，
//然后主键和要更新的数据就可以很好的分开
/**
 * @updateOne 更新一条记录
 * @param table string 表名
 * @param filed array 要插入的表字段数组
 * @param oneRecord array 对应field 的具体值
 * @return 返回更新的数据库执行语句结果
**/
exports.updateOne = async (table,field, oneRecord) => {
  let json = {};
  for(let i in field){
    json[field[i]] = oneRecord[i]
  }
  let primary = await this.getTablePriKey(table);  //得到表的主键
  var tmp = true;
  let values = []
  let query =
  "update " + table +
  " set  ";
  for(let x in json){
    if(primary.indexOf(x) == -1){  //在primary里面找不到，不是主键
      if(tmp){
        query+=x + ' =? '
        tmp =false
      }
      else {
        query+=',' + x + '=? '
      }
      values.push(json[x])
    }
  }
  query+=" where "//' where sid = ? ;'
  tmp = true
  for(let x in json){
    if(primary.indexOf(x) != -1){  //在primary里面找不到，不是主键
      if(tmp){
        query+=x + ' =? '
        tmp =false
      }
      else {
        query+=' and ' + x + '=? '
      }
      values.push(json[x])
    }
  }
  console.log('import_updateOne:');
  console.log(query)
  console.log(values);
  return queryDB(query,values);
}


exports.addBasicInfo = (data) =>{
  let query =
  "insert into basicInfo \n" +
  "(sid, name, gender, birthPlace, ethnic, \n" +
   "poliFace, idNum, birthDate, tel, mail, \n" +
   "wechat, qq, degree, stuGroup, grade, major, \n" +
   "class, dorm, dormRoom, speciality, highSchool, dormNumber) \n" +
   "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
   let values = [data.sid, data.name, data.gender, data.birthPlace,  data.ethnic,
      data.poliFace,  data.idNum,  data.birthDate,  data.tel,  data.mail,
     data.wechat,  data.qq,  data.degree,  data.stuGroup,  data.grade,  data.major,
   data.class,  data.dorm,  data.dormRoom,  data.speciality,  data.highSchool, data.dormNumber];
   return queryDB(query,values);
}

exports.addFamily = (data) => {
  let query =
  "insert into family \n" +
  "(sid, name, homeAddress, fatherName, fatherTel,\n " +
  "fatherJob, motherName, motherTel, motherJob \n" +
  ") values (?, ?, ?, ?, ?, ?, ?, ?, ?);"
  let values = [data.sid, data.name, data.homeAddress, data.fatherName,
    data.fatherTel, data.fatherJob, data.motherName, data.motherTel, data.motherJob]
  return queryDB(query,values);
}


exports.addCadre = (data) => {
  let query =
  "insert into cadre \n" +
  "(sid, name, year, cadreClass, cadreName, cadreJiBie) \n" +
  " values (?, ?, ?, ?, ?, ?)";
  let values = [data.sid, data.name, data.year, data.cadreClass, data.cadreName, data.cadreJiBie]
  console.log(query)
  return queryDB(query,values);
}
exports.addAward = (data) => {
  let query =
  "insert into award \n" +
  "(sid, name, stuClass, awardName, awardClass, employer, \n "+
  "awardJiBie, awardYearMonth, teacher)\n" +
  "values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [data.sid, data.name, data.stuClass, data.awardName, data.awardClass,
     data.employer,data.awardJiBie, data.awardYearMonth, data.teacher];
  return queryDB(query,values);
}

exports.addPaper = (data) => {
  let query =
  "insert into paper \n" +
  "(sid, name, title, authors, journal, serialNumber, pagesRange, paperGrade,\n"+
  "paperClass, time, insTeacher) values \n "+
  "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values= [data.sid, data.name, data.title, data.authors, data.journal, data.serialNumber, data.pagesRange, data.paperGrade,
  data.paperClass, data.time, data.insTeacher]
  return queryDB(query,values);
}

exports.addPatent = (data) => {
  console.log(data);
  let query =
  "insert into patent \n"+
  "(sid, name, patentName, class, submitTime, approvalTime, patentRange,\n"+
  "unit, patentNumber, creators) values \n"+
  "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values =[data.sid, data.name, data.patentName, data.class, data.submitTime, data.approvalTime, data.patentRange,
  data.unit, data.patentNumber, data.creators]
  return queryDB(query,values);
}

exports.addTechProject = (data) => {
  let query =
  "insert into techProject \n" +
  "(sid, name, proName, employer, money, proId, class, teacher, proTime)\n"+
  "values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values= [data.sid, data.name, data.proName, data.employer, data.money, data.proId, data.class, data.teacher, data.proTime]
  return queryDB(query,values);
}

exports.addHMT = (data) => {
  let query = 
  "insert into HMT \n" +
  "(sid, ancesHome, interest, religion, mail, wechat, homeAddress, ecoContact, ecoTel,"+
  "HMTIDNum, homePermitNum, name) \n" +
  "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [data.sid, data.ancesHome, data.interest, data.religion, data.mail, data.wechat, 
  data.homeAddress, data.ecoContact, data.ecoTel, data.HMTIDNum, data.homePermitNum, data.name]
  return queryDB(query,values)
}

exports.addInterStu = (data) => {
  let query =
  "insert into internationalStudent \n" +
  "(sid, passportName, studentClass, chineseName, gender, nationality, " +
  "passportNum, school, major, tutor, visaClass, residenceReason, "+
  "visaExpire, remark, religion, isEthnicChinese, clubJoiningDescription," +
  "activityTakingDescription, abnormalSituation, tel, homeAddress, homeInSchool,"+
  "same,  notCompleteReason) values "+
  "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [data.sid, data.passportName, data.studentClass, data.chineseName, data.gender, data.nationality,
   data.passportNum, data.school, data.major, data.tutor, data.visaClass, data.residenceReason,
  data.visaExpire, data.remark, data.religion, data.isEthnicChinese, data.clubJoiningDescription,
  data.activityTakingDescription, data.abnormalSituation, data.tel, data.homeAddress, data.homeInSchool,
  data.same, data.notCompleteReason]
  return queryDB(query,values)
}

exports.addDormRegistryCopy = (data) => {
  let query =
  "insert into dormRegistryCopy \n"+
  "(sid, filePath) values \n"+
  "(?, ?)";
  let values= [data.sid, data.filePath]
  return queryDB(query, values)
}

exports.addVisaCopy = (data)=>{
  let query =
  "insert into visaCopy \n"+
  "(sid, filePath) values \n"+
  "(?, ?)";
  let values= [data.sid, data.filePath]
  return queryDB(query, values)
}

exports.addPassportCopy = (data) =>{
  let query =
  "insert into passportCopy \n"+
  "(sid, filePath) values \n"+
  "(?, ?)";
  let values= [data.sid, data.filePath]
  return queryDB(query, values)
}

//data 就是传过来的json数据
/*
var newQuery =  {
	"select": [],
	"where": {
		"equal": {
			"basicInfo": {
				"gender": "男"
			}
		},
		"range": {
			"schoolRoll": {
				"timeInSchool": {
					"min": "123",
					"max": "321"
				}
			}
		},
		"fuzzy": {
      'basicInfo':{
        'name':'zzt'
      }
    }
	}
}
*/
exports.query = (data) => {
  let query = "select ";

  var selectObj = data['select'];

  var whereObj = data['where'];
  var whereStr = '';
  var whereValues =[];

  var fromSet = new Set(); //对from 语句整合
  /*
  for(table in whereObj){
    fromSet.add(table)
  }
  */
  //迭代---> 支持等值，模糊，范围查询，所以要从三个子json里面拿表
  for(let devide in whereObj){
    for(let table in whereObj[devide]){
      fromSet.add(table)
    }
  }
  for(let table in selectObj){
    fromSet.add(selectObj[table]);
  }


  for(let table in selectObj){

    query+=selectObj[table] + '.*,';
  }
  query = query.substr(0,query.length -1 ); //选择了表，接下来要 from 哪些表

  query+= ' from ';

  var tmp = true; //用于连接字符串，看要不要加 ‘，’
  //将select  和where 的表集合连接
  fromSet.forEach((item, sameItem, s)=>{
    if(tmp){
      tmp = false;
      query+=item;
    }
    else{      
      query+= ',' + item
    }

  })
  var whereNull = true;
  for(let i in whereObj){
    if(JSON.stringify(whereObj[i]) != '{}') whereNull = false;
  }
  if(whereNull){
    return queryDB({sql:query,nestTables:true});
  }
  query+=' where ';

  var beforeTable = '';
  tmp =true; //表示 and 的第一次
  fromSet.forEach((item, sameItem, s) => {
    if(beforeTable == ''){
      beforeTable = item;
    }
    else{
      if(tmp){
          query+=beforeTable + '.sid = ' + item+ '.sid '
          tmp =false;
      }
      else {
          query+= ' and ' + beforeTable + '.sid = ' + item+ '.sid '
      }
      beforeTable = item;
    }
  })
if(!tmp) {
  query += ' and ';
}  //这个是针对多个sid,如果只有sid ，则不用加and

tmp = true;
//从前端传过来的输入的条件
//迭代---> 由于要支持模糊查询，范围查询等，因此数据会变化
for(let devide in whereObj){
  for (let table in whereObj[devide]) {
    for (let field in whereObj[devide][table]) {
      if(tmp){
        switch(devide){
          case "equal":
            whereStr+= table + '.' + field + ' = ?  ';
            break;
          case "range":
            whereStr += table+'.' + field + ' between ? and ? ' ;
            break;
          case "fuzzy":
            whereStr += table+'.'+field + ' like %?% ';
            break;
        }

        tmp =false;
      }
      else {
        switch(devide){
          case "equal":
            whereStr+= ' and ' + table + '.' + field + ' = ?  ';
            break;
          case "range":
            whereStr += ' and ' + table+'.' + field + ' between ? and ? ' ;
            break;
          case "fuzzy":
            whereStr += ' and ' + table+'.'+field + ' like %?% ';
            break;
        }
        //whereStr+=' and ' + table + '.' + field + '= ? ';
      }

      switch(devide){
        case 'equal':
        case 'fuzzy':
          whereValues.push(whereObj[devide][table][field]);
          break;
        case 'range':
          whereValues.push(whereObj[devide][table][field]['min'],whereObj[devide][table][field]['max'])

      }
      //whereValues.push(whereObj[devide][table][field])
    }
  }
}


query+=whereStr;
query+=' \n;'
console.log(query);
let values= whereValues;
console.log(values);

return queryDB({sql:query,nestTables:true},values);
}

/*
由于南海老师要求前端页面更改，所以原来的后端查询函数就不再适用了，
因此如果是查看一个人的所有信息就是单独的查询每个表，把结果放到一个数组里边
再返回给前端，在控制层循环执行每个表的查询，
先写一个对单个表查询的model函数，可以利用以前的query函数
{
'tables':['basicInfo','family'],
'id':'16340320'
}

*/
exports.queryAll = (data) => {
  let query = "" ;
  let values = []
  for(let table in data['tables']){
    query+="select * from " + data['tables'][table] + ' where sid = ?; \n'//+ data['id']
    values.push(data['id'])
  }
  console.log(query)
  return queryDB(query,values);
}

/*
学生信息统计
查询数据格式
/students/statistic
{
'table':'basicInfo',
'fields':['grade','major'],
'intervalFields':{
    'GPA':[0,0.5,1,1.5,2]
}
'condition':{
  'grade':'2016'
}
}

然后还有奖学金要球平均金额
*/
exports.statistic = (data) => {
  console.log(data)
  let query = "select ";
  let values = [];
  var tmp = true
  var secTmp = true  //handle intervalFields
  for(let i in data['fields']){
    console.log(data['fields'][i])
    if(tmp){
        query+=data['fields'][i]
        tmp =false
    }
    else {
      query+=',' + data['fields'][i]
    }
  }
  //handle intervalFields, i represents field in intervalFields
  for(let i in data['intervalFields']){
    console.log(i)
    var tmpQuery = 'elt(interval(' + i
    for(let j in data['intervalFields'][i]){
      if(j == data['intervalFields'][i].length - 1) continue
      var inter = data['intervalFields'][i][j]
      tmpQuery+= ',' + inter
    }
    tmpQuery+=') '
    for(let j in data['intervalFields'][i]){
      if(j == data['intervalFields'][i].length - 1) continue
      /*
      select elt(intervalGPA,0.5,1,1.5,2,2.5,3,3.5,4,4.5) as GPA,0-0.5,0.5-1,1-1.5,1.5-2,2-2.5,2.5-3,3-3.5,3.5-4,4-4.5,4.5-5,count(*) as statistic from course group by GPA;
      */
      console.log(parseInt(j)+1)
      tmpQuery+=',\'' + data['intervalFields'][i][j]+'-'+ data['intervalFields'][i][parseInt(j)+1] +'\''
    }
    tmpQuery+=') as ' + i + '_range' // modify the range query name, because this is the best solution i have ever thought about
    if(tmp) {
      query+=tmpQuery
      tmp = true;
    }
    else query+=',' + tmpQuery
  }

  query+=',count(*) as statistic from '+ data['table'] ;
  //if hasCondition is null then query doesn't have where
  var hasCondition = true;
  if(JSON.stringify(data['condition']) === '{}') hasCondition=false;
  if(hasCondition){
    query+= ' where ';
    tmp = true;
    for(let i in data['condition']){
      if(tmp){
        query+= i + ' = ?' // + data['condition'][i]
        tmp = false
      }
      else {
        query+=' and ' + i +' = ?'// + data['condition'][i]
      }
      values.push(data['condition'][i])
    }
  }

  query+=' group by ';
  tmp = true;
  for(let i in data['fields']){
    if(tmp){
        query+=data['fields'][i]
        tmp =false
    }
    else {
      query+=',' + data['fields'][i]
    }
  }
  for(let i in data['intervalFields']){
    var tmpQuery = i + '_range'
    if(tmp){
      query+=tmpQuery
      tmp= false
    }
    else query+=',' + tmpQuery
  }
  query+=';'
  console.log(query)
  return queryDB(query,values);
}

//对单人表所有信息修改
/*
数据格式
{
  'basicInfo':{
    'primary':{
      'sid':'16340320',
    },
    'new':{
      'sid':'12345678'
    }
  },
  'family':{

  }
}
*/
exports.updateInfo = (data)=>{

  let query = ""
  let values= []
  for(let i in data){
    if(JSON.stringify(data[i]) === '{}') continue; //如果为空，则跳过
     var tmp =  true;
     query += 'update ' + i + ' set ';
     for(let field in data[i]['new']){
       if(tmp){
         query+= field + "= ? " //+ data[i]['new'][field]
         tmp=false;
       }
       else {
         query+=',' +  field + '=? ' //+ data[i]['new'][field]
       }
       values.push(data[i]['new'][field])
     }
     tmp = true
     query+=' where '
     for(let field in data[i]['primary']){
       if(tmp){
         query+=field + '=?' //+ data[i]['primary'][field]
         tmp =false;
       }
       else {
          query+= ' and ' + field + '=?' //+ data[i]['primary'][field]
       }
       values.push(data[i]['primary'][field])
     }

     query+=';\n'
  }
  console.log('updateOneInfo:')
  console.log(query)
  console.log(values)
  return queryDB(query,values);
}
/**
* @param  data array[string] 学号数组

*/
exports.getMails = (data)=>{
  console.log("model mails ====")
  console.log(data)
  console.log("model mails ====")

  let query = ""

  query += "select mail from basicInfo where sid in (" + data.join()+ ");\n";

  return queryDB(query)
}

/**
* @checkStudent 检查某个学生在某个表中是否存在，需要主键
* @param data JSON 学生信息
* @param table string 要查询得表
  @return array 数据库得查询结果
**/
exports.checkStudent = async (data, table) =>{
  let query = "select * " ;
  let primary = await this.getTablePriKey(table);
  let values= []
  query+=  " from " + table +" where "//"sid = ? \n;"; //注意有空格
  let tmp = true;
  for(let i in primary){
    if(tmp) {
      query+=primary[i]+'=? '
      tmp = false
    }
    else {
      query+=' and '+primary[i]+'=?'
    }
    values.push(data[primary[i]])
  }

  return queryDB(query,values);
}

/*
  通过输入表名得到表的主键
  返回数组
*/
exports.getTablePriKey = async (table) =>{
  let query = "show columns from  " + table+"  where `Key` = \"PRI\" ;"
  //console.log(query);
  let out = await queryDB(query);
  let back = []
  for(let i in out){
    let json = JSON.stringify(out[i])
    let obj = JSON.parse(json)
    back.push(obj['Field'])
  }
  return back;
}
/*
//下面测试将返回的结果转为json格式
getStudentInfo().then(function(output){
  console.log(JSON.stringify(output));
})
*/


/* 
对一个学生id得到在特定时间段不及格的课程记录
*/
exports.getFailedCourse = async (data) => {
  let query = 
  "select * from course where sid=? and (course.year>? or (course.year=? and course.semester>=?) ) and (course.year<? or (course.year=? and course.semester<=?) ) and courseGrade<60";
  let values = [data.sid, data.minYear, data.minYear, data.minSemester, data.maxYear, data.maxYear, data.maxSemester]
  return queryDB(query,values)
}

/*
查询一段时间内不及格的学生以及每个学生不及格的课程数
*/
exports.getFailedStudents = async (data) => {
  let query = 
  "select sid, count(*) nums from (select * from course where year=? and courseGrade<60) tab1 group by sid order by nums DESC;";
  let value = [data.year]
  return queryDB(query,value)
}

exports.getWinners = async(data) => {
  let query = 
  "select * from winners where sid = ?;";
  let value = [data.sid]
  return queryDB(query,value)
}


exports.getFilePath = async (data,table) => {
  let query =
  "select * from " + table +" where sid=?"
  let values = data
  return queryDB(query, values)
}

exports.addCompetition = async(data) => {
  let query = 
  "insert into competition \n"+
  "(comName,organizer, comClass, instructor, leaderName,leaderSid, leaderTel, comInfo) \n" +
  "values (?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [data.comName, data.organizer, data.comClass,
  data.instructor, data.leaderName, data.leaderSid, data.leaderTel, data.comInfo]
  return queryDB(query,values)
}

exports.addComMeeting = async (data) => {
  //console.log(data)
  let query = 
  "insert into comMeeting \n" +
  "(comName, leaderSid, time, location, attenders, record) values" + 
  "(?,?,?,?,?,?)"
  let values = [data.comName, data.leaderSid, data.time, data.location, data.attenders, data.record]
  return queryDB(query,values)
}


exports.addSeniorsGroup = async (data) => {
  //console.log(data)
  let query = 
  "insert into seniorsGroup \n" +
  "(comName, leaderSid, sid, name) values" + 
  "(?,?,?,?)"
  let values = [data.comName, data.leaderSid, data.sid, data.name]
  return queryDB(query,values)
}


exports.addTeamMember = async (data) => {
  //console.log(data)
  let query = 
  "insert into teamMember \n" + 
  "(comName, leaderSid, name, sid, duty) \n"+ 
  "values (?, ?, ?, ?, ?)"
  let values = [data.comName, data.leaderSid, data.name, data.sid, data.duty]
  return queryDB(query,values)
}

exports.addWinners =  async(data) => {
  let query = 
  "insert into winners \n" +
  "(name, sid, organizer, comClass, rewardClass, rewardName, instructor, seniorSid, seniorName, principal, principalTel) \n"+
  "values (?,?,?,?,?,?,?,?,?,?,?)"
  let values = [data.name, data.sid, data.organizer, data.comClass, data.rewardClass,
  data.rewardName, data.instructor, data.seniorSid, data.seniorName, data.principal, data.principalTel]
  return queryDB(query,values)
}

exports.getCompetition = async(data) => {
  let query = 
  "select * from competition where leaderSid = ? and comName = ?;"
  let values = [data.leaderSid,data.comName]
  return queryDB(query,values)
}

exports.getCompetitionBySid = async(data) => {
  let query = 
  "select * from competition where leaderSid = ?;"
  let values = [data.leaderSid]
  return queryDB(query,values)
}

exports.getAllCompetition = async(data) => {
  let query = 
  "select * from competition;"
  return queryDB(query)
}

exports.getSeniorGroup = async(data) => {
  let query = 
  "select * from seniorsGroup where leaderSid = ? and comName = ?;"
  let values = [data.leaderSid,data.comName]
  return queryDB(query,values)
}

exports.getTeamMember = async(data) => {
  let query = 
  "select * from teamMember where leaderSid = ? and comName = ?;"
  let values = [data.leaderSid,data.comName]
  return queryDB(query,values)
}

exports.getComMeeting = async(data) => {
  let query = 
  "select * from comMeeting where leaderSid = ? and comName = ?;"
  let values = [data.leaderSid,data.comName]
  return queryDB(query,values)
}