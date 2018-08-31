const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');
var asynchronous = require('async');
const mailer = require('../utils/mailer.js')
var formidable = require('formidable')

//根据学生的id 进行查询
exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo(req.body);
  console.log(JSON.stringify(data));
  resBody.success(res, data);
}

//范式， 用于学生插入基本信息
async function template(req,res,next,concrete, table){
  let preCheck1 = await checkConflict(req.body, table);
  let preCheck2 = checkIDValid(req.body);

  if(preCheck1 && preCheck2)
  {
    //StudentsModel.addFamily(req.body)
    concrete(req.body).then(() => {
      resBody.success(res);
    })
    .catch((err) => {
      resBody.error(res,err);
    });
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

//写一个导入的函数
//批量插入
/*
* 查询格式 {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}

*/
exports.batchInsertInfo = async (req,res,next) => {
  let body = req.body;
  console.log(body)
  let batchInfo = body['batchInfo']
  let errInfo = []
  let primary = StudentsModel.getTablePriKey(body['table'])
  var hasError = false
  for(let one in batchInfo){
    //将每条记录的学生转 为json 对象格式，用于checkConflict
    var json ={}
    for(let i in body['field']){
      json[body['field'][i]] = batchInfo[one][i]
    }
    //查找在数据库里是否存在相同键的记录，有就更新，没有就插入
    let preCheck = await checkConflict(json,body['table'])
    try{
      if(preCheck){
        await  StudentsModel.insertOne(body['table'],body['field'],batchInfo[one])
      }
      else {
        console.log('update')
        await  StudentsModel.updateOne(body['table'],body['field'],batchInfo[one])
      }
    }
    catch(err){
      hasError=true;
      console.log(err)
      let stuKey = {}
      for(let i in primary){
        stuKey[primary[i]] = json[primary[i]]
      }
      errInfo.push(stuKey)
    }
  }

  if(hasError) resBody.error(res,errInfo)
  else resBody.success(res)
}



//表示查询，传入json 格式见 testJson.js，用于多表连接
exports.query = async (req,res,next) => {
  console.log(req.body)
  StudentsModel.query(req.body).then((data)=>{
    console.log(data);
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err);
  })

}
//只查询一个表，用原来的方法就可以，可以增加一个检查，判断传过来的select 里面是不是只有一个表，
//如果不是，则报错
exports.queryOne = async (req,res,next) => {
  if(req.body['select'].length !=1) {
    resBody.fail(res,443,'only_support_one_table_query');
    return;
  }
  StudentsModel.query(req.body).then((data)=>{
    console.log(data);
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err);
  })
}

//点击学生学号，返回学生所有信息
exports.queryAll = async(req,res,next) => {
  StudentsModel.queryAll(req.body).then((data)=>{
    let content={}
    for(i in req.body['tables']){
      content[req.body['tables'][i]] = data[i]
    }
    console.log(content)
    resBody.success(res,content)
  }).catch((err)=> {
    resBody.error(res,err)
  })
}


//数据库插入学生基本信息
exports.addBasicInfo = async (req,res,next) =>{
  let preCheck1 = await checkConflict(req.body,'basicInfo')
  let preCheck2 = checkValidation(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addBasicInfo(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addFamily =  async (req,res,next) =>{
 template(req,res,next,StudentsModel.addFamily, "family")
}


exports.addCadre = async (req,res,next) => {
  template(req,res,next,StudentsModel.addCadre,"cadre");
}

exports.addAward = async (req,res,next) => {
  template(req, res, next, StudentsModel.addAward, "award");
}

exports.addPaper = async (req,res,next) =>{
  template(req,res,next,StudentsModel.addPaper,"paper");
}


exports.addPatent = async (req,res,next) =>
{
  template(req,res,next,StudentsModel.addPatent, "patent");
}


exports.addTechProject = async (req,res,next) => {
  template(req,res,next, StudentsModel.addTechProject,"techProject");
}

exports.statistic = async (req,res,next) => {
  StudentsModel.statistic(req.body).then((data)=>{
    console.log('statistic')
    console.log(data)
    resBody.success(res,data)
  }).catch((err)=>{
    resBody.error(res,err)
  })
}

exports.updateInfo = async (req,res,next)=>{
  StudentsModel.updateInfo(req.body).then((data)=>{
    console.log(data)
    resBody.success(res,data)
  })
  .catch((err)=>{
    console.log('error occurred')
    resBody.error(res,err)
  })
}

//发送邮件
exports.sendMail = (req,res,next) =>{
  try{
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
      console.log(files)
      console.log(fields)
    })
    //await mailer.sendMail(req.body)
    resBody.success(res)
  }
  catch(err){
    resBody.error(res,err)
  }

}

//检测数据库中是否已有记录
/**
* @checkConflict 检查某个学生在某个表中是否存在，需要主键
* @param data JSON 学生信息
* @param table string 要查询得表
  @return bool 是否存在这个学生记录， true表示没有矛盾
**/
async function checkConflict(body, table) {
  let check = await StudentsModel.checkStudent(body,table)
  return check.length === 0;
}


//检测格式是否正确
function checkValidation(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  let tel = new RegExp("^[0-9]{11}$")
  let telVali = tel.test(body.tel)
  return idVali && telVali;
}

function checkIDValid(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  return idVali;
}
