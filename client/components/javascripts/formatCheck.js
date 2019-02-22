//canNull:在插入页面限制字段是否为空，reg：正则表达式，msg：格式错误的提示。（长度限制在页面检查）
//tableData中规定为select的字段不需要格式验证
export default {
  basicInfo: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    gender: { canNull: false, reg: null, msg: '' },
    birthPlace: { canNull: true, reg: null, msg: '' },
    ethnic: { canNull: true, reg: null, msg: '' },
    poliFace: { canNull: true, reg: null, msg: '' },
    idNum: { canNull: false, reg: /^[\d]{17}[0-9x]$/, msg: '身份证号填写有误' },
    birthDate: { canNull: true, reg: null, msg: '' },
    tel: { canNull: false, reg: /^[1-9][\d]{10}$/, msg: '电话号填写有误' },
    mail: { canNull: true, reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, msg: '邮箱格式有误' },
    wechat: { canNull: true, reg: null, msg: '' },
    qq: { canNull: true, reg: /^[\d]{5,11}$/, msg: 'qq格式错误' },
    degree: { canNull: true, reg: null, msg: '' },
    stuGroup: { canNull: true, reg: null, msg: '' },
    grade: { canNull: true, reg: null, msg: '' },
    major: { canNull: true, reg: null, msg: '' },
    'class': { canNull: true, reg: null, msg: '' },
    dorm: { canNull: true, reg: null, msg: '' },
    dormNumber: { canNull: true, reg: null, msg: '' },
    dormRoom: { canNull: true, reg: /^[\d]{3}$/, msg: '房间号该格式错误' },
    speciality: { canNull: true, reg: null, msg: '' },
    highSchool: { canNull: true, reg: null, msg: '' }
  },
  family: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    homeAddress: { canNull: true, reg: null, msg: '' },
    fatherName: { canNull: true, reg: null, msg: '' },
    fatherTel: { canNull: true, reg: null, msg: '' },
    fatherJob: { canNull: true, reg: null, msg: '' },
    motherName: { canNull: true, reg: null, msg: '' },
    motherTel: { canNull: true, reg: null, msg: '' },
    motherJob: { canNull: true, reg: null, msg: '' },
    familyAveIncome: { canNull: false, reg: /^[\d]{1,12}$/, msg: '收入格式错误' },
    isHard: { canNull: false, reg: null, msg: '' },
    hardDegree: { canNull: true, reg: null, msg: '' },
    hardFamDes: { canNull: true, reg: null, msg: '' }
  },
  schoolRoll: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    isAtRoll: { canNull: false, reg: null, msg: '' },
    'class': { canNull: false, reg: null, msg: '' },
    studyYears: { canNull: false, reg: null, msg: '' },
    timeInSchool: { canNull: false, reg: null, msg: '' },
    isFee: { canNull: false, reg: null, msg: '' },
    isArrive: { canNull: false, reg: null, msg: '' },
    isRollChanged: { canNull: false, reg: null, msg: '' },
    changeTime: { canNull: true, reg: null, msg: '' },
    changeClass: { canNull: true, reg: null, msg: '' },
    changeReason: { canNull: true, reg: null, msg: '' },
    changeSchoolPage: { canNull: true, reg: null, msg: '' }
  },
  course: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    year: { canNull: false, reg: null, msg: '' },
    semester: { canNull: false, reg: null, msg: '' },
    courseName: { canNull: false, reg: null, msg: '' },
    courseId: { canNull: false, reg: null, msg: '' },
    courseClass: { canNull: false, reg: null, msg: '' },
    courseProperty: { canNull: false, reg: null, msg: '' },
    courseHour: { canNull: false, reg: null, msg: '' },
    credit: { canNull: false, reg: null, msg: '' },
    courseGrade: { canNull: false, reg: null, msg: '' },
    GPA: { canNull: false, reg: null, msg: '' },
    isPass: { canNull: false, reg: null, msg: '' },
    rebuild: { canNull: false, reg: null, msg: '' },
    backup: { canNull: false, reg: null, msg: '' }
  },
  partyInfo: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    isLeaguer: { canNull: false, reg: null, msg: '' },
    joinGroupTime: { canNull: false, reg: null, msg: '' },
    submitTime: { canNull: false, reg: null, msg: '' },
    activerTime: { canNull: false, reg: null, msg: '' },
    contacter: { canNull: false, reg: null, msg: '' },
    isVerified: { canNull: false, reg: null, msg: '' },
    democracyTime: { canNull: false, reg: null, msg: '' },
    developerTime: { canNull: false, reg: null, msg: '' },
    partyTrainedTime: { canNull: false, reg: null, msg: '' },
    introducerTime: { canNull: false, reg: null, msg: '' },
    introducer: { canNull: false, reg: null, msg: '' },
    hasAutobigraphy: { canNull: false, reg: null, msg: '' },
    hasApplicatiionForm: { canNull: false, reg: null, msg: '' },
    partyBranchTime: { canNull: false, reg: null, msg: '' },
    partyTalkTime: { canNull: false, reg: null, msg: '' },
    partyTalker: { canNull: false, reg: null, msg: '' },
    probationaryTime: { canNull: false, reg: null, msg: '' },
    partyOathTime: { canNull: false, reg: null, msg: '' },
    fullSubTime: { canNull: false, reg: null, msg: '' },
    fullMeetingTime: { canNull: false, reg: null, msg: '' },
    fullMemberTime: { canNull: false, reg: null, msg: '' },
    archiveTime: { canNull: false, reg: null, msg: '' },
    temporaryTime: { canNull: false, reg: null, msg: '' },
    outTime: { canNull: false, reg: null, msg: '' },
    outUnit: { canNull: false, reg: null, msg: '' }
  },
  scholarship: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    year: { canNull: false, reg: null, msg: '' },
    shipClass: { canNull: false, reg: null, msg: '' },
    shipName: { canNull: false, reg: null, msg: '' },
    shipAmount: { canNull: false, reg: /^[\d]{1,12}$/, msg: '奖学金金额格式错误' }
  },
  aid: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    year: { canNull: false, reg: null, msg: '' },
    aidClass: { canNull: false, reg: null, msg: '' },
    aidProperty: { canNull: false, reg: null, msg: '' },
    aidName: { canNull: false, reg: null, msg: '' },
    aidAmount: { canNull: false, reg: null, msg: '' }
  },
  loan: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    submitYear: { canNull: false, reg: null, msg: '' },
    loanYears: { canNull: false, reg: null, msg: '' },
    moneyPerYear: { canNull: false, reg: /^[\d]{1,12}$/, msg: '每年放款金额格式错误' },
    loanTotal: { canNull: false, reg: /^[\d]{1,12}$/, msg: '贷款总额格式错误' }
  },
  cadre: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    year: { canNull: false, reg: null, msg: '' },
    cadreClass: { canNull: false, reg: null, msg: '' },
    cadreName: { canNull: false, reg: null, msg: '' },
    cadreJiBie: { canNull: false, reg: null, msg: '' }
  },
  award: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    stuClass: { canNull: false, reg: null, msg: '' },
    awardName: { canNull: false, reg: null, msg: '' },
    awardClass: { canNull: false, reg: null, msg: '' },
    employer: { canNull: false, reg: null, msg: '' },
    awardJiBie: { canNull: false, reg: null, msg: '' },
    awardYearMonth: { canNull: false, reg: null, msg: '' },
    teacher: { canNull: false, reg: null, msg: '' }
  },
  paper: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    title: { canNull: false, reg: null, msg: '' },
    authors: { canNull: false, reg: null, msg: '' },
    journal: { canNull: false, reg: null, msg: '' },
    serialNumber: { canNull: false, reg: null, msg: '' },
    pagesRange: { canNull: false, reg: null, msg: '' },
    paperGrade: { canNull: false, reg: null, msg: '' },
    paperClass: { canNull: false, reg: null, msg: '' },
    time: { canNull: false, reg: null, msg: '' },
    insTeacher: { canNull: false, reg: null, msg: '' }
  },
  patent: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    patentName: { canNull: false, reg: null, msg: '' },
    'class': { canNull: false, reg: null, msg: '' },
    submitTime: { canNull: false, reg: null, msg: '' },
    approvalTime: { canNull: false, reg: null, msg: '' },
    patentRange: { canNull: false, reg: null, msg: '' },
    unit: { canNull: false, reg: null, msg: '' },
    patentNumber: { canNull: false, reg: null, msg: '' },
    creators: { canNull: false, reg: null, msg: '' }
  },
  techProject: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    proName: { canNull: false, reg: null, msg: '' },
    employer: { canNull: false, reg: null, msg: '' },
    money: { canNull: false, reg: /^[\d]{1,12}$/, msg: '资助金额格式错误' },
    proId: { canNull: false, reg: null, msg: '' },
    'class': { canNull: false, reg: null, msg: '' },
    teacher: { canNull: false, reg: null, msg: '' },
    proTime: { canNull: false, reg: null, msg: '' }
  },
  HMT: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    name: { canNull: false, reg: null, msg: '' },
    ancesHome: { canNull: false, reg: null, msg: '' },
    interest: { canNull: true, reg: null, msg: '' },
    religion: { canNull: true, reg: null, msg: '' },
    mail: { canNull: true, reg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, msg: '邮箱格式有误' },
    wechat: { canNull: true, reg: null, msg: '' },
    homeAddress: { canNull: true, reg: null, msg: '' },
    ecoContact: { canNull: true, reg: null, msg: '' },
    ecoTel: { canNull: true, reg: null, msg: '' },
    HMTIDNum: { canNull: false, reg: /^[0-9A-Za-z]{8,10}$/, msg: '港澳台居民身份证号填写有误' },
    homePermitNum: { canNull: false, reg: null, msg: '' }
  },
  internationalStudent: {
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    passportName: { canNull: false, reg: null, msg: '' },
    studentClass: { canNull: true, reg: null, msg: '' },
    chineseName: { canNull: true, reg: null, msg: '' },
    gender: { canNull: true, reg: null, msg: '' },
    nationality: { canNull: false, reg: null, msg: '' },
    passportNum: { canNull: false, reg: null, msg: '' },
    school: {canNull: true, reg: null, msg: '' },
    major: {canNull: true, reg: null, msg: '' },
    tutor: {canNull: true, reg: null, msg: '' },
    visaClass: {canNull: true, reg: null, msg: ''},
    residenceReason: {canNull: true, reg: null, msg: ''},
    visaExpire: { canNull: true, reg: /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}/, msg: '日期格式应为YYYY/MM/DD'},
    remark: {canNull: true, reg: null, msg: ''},
    religion: { canNull: true, reg: null, msg: ''},
    isEthnicChinese: { canNull: true, reg: null, msg: ''},
    clubJoiningDescription: { canNull: true, reg: null, msg: ''},
    activityTakingDescription: { canNull: true, reg: null, msg: ''},
    abnormalSituation: { canNull: true, reg: null, msg: '' },
    tel: { canNull: true, reg: /^[1-9][\d]{10}$/, msg: '电话号填写有误' },
    homeAddress: { canNull: true, reg: null, msg: ''},
    homeInSchool: { canNull: true, reg: null, msg: ''},
    same: { canNull: true, reg: null, msg: ''},
    dormRegistryCopy: {canNull: true, reg: null, msg: ''},
    visaCopy: { canNull: true, reg: null, msg: ''},
    passportCopy: { canNull: true, reg: null, msg: ''},
    notCompleteReason: { canNull: true, reg: null, msg: '' }
  },
  competition: {
    comName: { canNull: false, reg: null, msg: ''},
    organizer: { canNull: false, reg: null, msg: ''},
    comClass: { canNull: false, reg: null, msg: ''},
    instructor: { canNull: true, reg: null, msg: ''},
    leaderName: { canNull: false, reg: null, msg: ''},
    leaderSid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '队长学号格式错误' },
    leaderTel: { canNull: false, reg: /^[1-9][\d]{10}$/, msg: '电话号填写有误' },
    comInfo: { canNull: false, reg: null, msg: ''}
  },
  seniorsGroup: {
    comName: { canNull: false, reg: null, msg: ''},
    leaderSid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '队长学号格式错误' },
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学长学号格式错误' },
    name: { canNull: false, reg: null, msg: ''}
  },
  teamMember: {
    comName: { canNull: false, reg: null, msg: ''},
    leaderSid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '队长学号格式错误' },
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '队员学号格式错误' },
    name: { canNull: false, reg: null, msg: ''},
    duty: { canNull: false, reg: null, msg: ''}
  },
  comMeeting: {
    id: { canNull: false, reg: null, msg: ''},
    comName: { canNull: false, reg: null, msg: ''},
    leaderSid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '队长学号格式错误' },
    time: { canNull: false, reg: /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}/, msg: '日期格式应为YYYY/MM/DD'},
    location: { canNull: false, reg: null, msg: ''},
    attenders: { canNull: false, reg: null, msg: ''},
    record: { canNull: false, reg: null, msg: ''}
  },
  winners: {
    id: {canNull: false, reg: null, msg: ''},
    name: { canNull: false, reg: null, msg: '' },
    sid: { canNull: false, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    organizer: { canNull: false, reg: null, msg: '' },
    comClass: { canNull: false, reg: null, msg: '' },
    rewardClass: { canNull: false, reg: null, msg: '' },
    rewardName: { canNull: false, reg: null, msg: '' },
    instructor: { canNull: true, reg: null, msg: ''},
    instructor: { canNull: true, reg: null, msg: '' },
    seniorSid: { canNull: true, reg: /^[1-9][\d]{7}$/, msg: '学号格式错误' },
    seniorName: { canNull: true, reg: null, msg: '' },
    principal: { canNull: true, reg: null, msg: '' },
    principalTel: { canNull: true, reg: /^[1-9][\d]{10}$/, msg: '电话号填写有误' }
  }
}