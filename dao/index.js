'use strict';

/*
 * comment.js 评论表
 *
 * @author tianyi.jiangty@alibaba-inc.com
 *
 */
var mysql = require('../lib/common/mysql');
var thunkify = require('thunkify-wrap');
var assert = require('assert');
var multiline = require('multiline');

/**
 * 添加设备
 *
 * @param {Object} 设备对象
 * @return {Number} 设备id
 */
var DEVICE_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_device(id, create_time, update_time, user_id, deviceid,
      roadTopManager, roadTopManagerCode, roadname, roadbelongCode, roadmiles, roadfromto,roadcount,roadupsituation,
      roaddownsituation,roadleftsituationup,roadleftsituationdown,roadowncarCode,roadownareaCode,
      roadwidth,roadlineleft,roadlineright,roadcity,roadcountry,roadtraffic,roadtype,roadbelong,roadowncar,roadownarea,securityDayFirst,securityDaySecond,securityDayThird,securityDay,telephone1,
      telephone2,telephone3,telephone4,telephone5,worktext1,worktext2,worktext3,worktext4,changetext1,changetext2,changetext3,changetext4,changetext5,changetext6,changetext7,changetext8,changetext9,relaxtime1,relaxtime2,
      relaxtime3,relaxtime4,relaxtime5,relaxtime6,
      workman1,workman2,workman3,workman4,elworkman1,elworkman2,elworkman3,elworkman4,elman1,elman2,elman3,elman4,tlman1,tlman2,tlman3,tlman4,houseman1,houseman2,houseman3,houseman4,companyman1,
      companyman2,companyman3,companyman4)
  VALUES(NULL, now(), now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
*/});
exports.addDevice = function (device, callback) {
  assert(typeof device === 'object');
  var values = [device.user_id, device.deviceid,
      device.roadTopManager, device.roadTopManagerCode, device.roadname, device.roadbelongCode, device.roadmiles, device.roadfromto,device.roadcount,device.roadupsituation,
      device.roaddownsituation,device.roadleftsituationup,device.roadleftsituationdown,device.roadowncarCode,device.roadownareaCode,device.roadwidth,device.roadlineleft,
      device.roadlineright,device.roadcity,device.roadcountry,device.roadtraffic,device.roadtype,device.roadbelong,device.roadowncar,device.roadownarea,device.securityDayFirst,
      device.securityDaySecond,device.securityDayThird,device.securityDay,device.telephone1,device.telephone2,device.telephone3,device.telephone4,device.telephone5,
      device.worktext1,device.worktext2,device.worktext3,device.worktext4,device.changetext1,device.changetext2,device.changetext3,device.changetext4,
      device.changetext5,device.changetext6,device.changetext7,device.changetext8,device.changetext9,device.relaxtime1,device.relaxtime2,device.relaxtime3,device.relaxtime4,device.relaxtime5,device.relaxtime6,device.workman1,device.workman2,device.workman3,device.workman4,
      device.elworkman1,device.elworkman2,device.elworkman3,device.elworkman4,device.elman1,device.elman2,device.elman3,device.elman4,device.tlman1,
      device.tlman2,device.tlman3,device.tlman4,device.houseman1,device.houseman2,device.houseman3,device.houseman4,device.companyman1,device.companyman2,device.companyman3,device.companyman4];
  mysql.query(DEVICE_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 修改设备
 *
 * @param {Object} 设备对象
 * @return {Number} 设备id
 */
var DEVICE_MODIFY_SQL = multiline(function (){/*
  UPDATE
    monitor_device set update_time = now(), roadTopManager = ?, roadTopManagerCode=?, roadname=?, roadbelongCode=?, roadmiles=?, roadfromto=?,
    roadcount=?,roadupsituation=?,roaddownsituation=?,roadleftsituationup=?,roadleftsituationdown=?,roadowncarCode=?,roadownareaCode=?,
      roadwidth=?,roadlineleft=?,roadlineright=?,roadcity=?,roadcountry=?,roadtraffic=?,roadtype=?,roadbelong=?,roadowncar=?,roadownarea=?,
      securityDayFirst=?,securityDaySecond=?,securityDayThird=?,securityDay=?,telephone1=?,telephone2=?,telephone3=?,telephone4=?,telephone5=?,worktext1=?,worktext2=?,worktext3=?,worktext4=?,changetext1=?,changetext2=?,changetext3=?,changetext4=?,changetext5=?,changetext6=?,changetext7=?,changetext8=?,changetext9=?,relaxtime1=?,relaxtime2=?,relaxtime3=?,relaxtime4=?,relaxtime5=?,relaxtime6=?,
      workman1=?,workman2=?,workman3=?,workman4=?,elworkman1=?,elworkman2=?,elworkman3=?,elworkman4=?,elman1=?,elman2=?,elman3=?,elman4=?,tlman1=?,tlman2=?,tlman3=?,tlman4=?,houseman1=?,houseman2=?,houseman3=?,houseman4=?,companyman1=?,
      companyman2=?,companyman3=?,companyman4=? where deviceid = ?
*/});
exports.modifyDevice = function (device, callback) {
  assert(typeof device === 'object');
  var values = [
      device.roadTopManager, device.roadTopManagerCode, device.roadname, device.roadbelongCode, device.roadmiles, device.roadfromto,device.roadcount,device.roadupsituation,
      device.roaddownsituation,device.roadleftsituationup,device.roadleftsituationdown,device.roadowncarCode,device.roadownareaCode,device.roadwidth,device.roadlineleft,
      device.roadlineright,device.roadcity,device.roadcountry,device.roadtraffic,device.roadtype,device.roadbelong,device.roadowncar,device.roadownarea,device.securityDayFirst,device.securityDaySecond,device.securityDayThird,device.securityDay,device.telephone1,device.telephone2,device.telephone3,device.telephone4,device.telephone5,
      device.worktext1,device.worktext2,device.worktext3,device.worktext4,device.changetext1,device.changetext2,device.changetext3,device.changetext4,
      device.changetext5,device.changetext6,device.changetext7,device.changetext8,device.changetext9,device.relaxtime1,device.relaxtime2,device.relaxtime3,device.relaxtime4,device.relaxtime5,device.relaxtime6,device.workman1,device.workman2,device.workman3,device.workman4,
      device.elworkman1,device.elworkman2,device.elworkman3,device.elworkman4,device.elman1,device.elman2,device.elman3,device.elman4,device.tlman1,
      device.tlman2,device.tlman3,device.tlman4,device.houseman1,device.houseman2,device.houseman3,device.houseman4,device.companyman1,device.companyman2,device.companyman3,device.companyman4,device.deviceid];

  mysql.query(DEVICE_MODIFY_SQL, values, function(err, result) {
    console.log(device.deviceid, err, result, 999999)
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};





/**
 * 上传信息
 *
 * @param {Object} 信息对象
 * @return {Number} 信息id
 */
var DEVICE_INFO_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_info(id, create_time, update_time, user_name, content,
      status, parent_id, app_id, trace_id, avatar, buc_id)
  VALUES(NULL, now(), now(), ?, ?, 0, ?, ?, ?, ?, ?)
*/});
exports.addDeviceInfo = function (device, callback) {
  assert(typeof device === 'object');

  var values = [device.user_name, device.content,
    device.parent_id, device.app_id, device.trace_id,
    device.avatar, device.bud_id];
  mysql.query(DEVICE_INFO_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 添加账号
 *
 * @param {Object} 账号对象
 * @return {Number} 账号id
 */
var USER_INFO_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_user(create_time, update_time, username, user_id,
      type,password)
  VALUES(now(), now(), ?, ?, ?,?)
*/});
exports.addUser = function (user, callback) {
  assert(typeof user === 'object');

  var values = [user.username, user.user_id,
    user.type,user.password];
  mysql.query(USER_INFO_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};


/**
 * 关联设备
 *
 * @param {Object} 账号与设备
 * @return {Number} 
 */
var USER_DEVICE_RELATION_SQL = multiline(function (){/*
  INSERT INTO
    monitor_relation(id, create_time, update_time, username, deviceid,user_id)
  VALUES(NULL, now(), now(), ?, ?,?)
*/});
exports.addUserDeviceRelation = function (deviceid,username,user_id, callback) {

  var values = [username,deviceid,user_id];
  mysql.query(USER_DEVICE_RELATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 查找某账号下的所有设备
 *
 * @param {Object} 账号id
 * @return {Array} 
 */
var SELECT_USER_DEVICE_SQL = multiline(function (){/*
  Select deviceid from
    monitor_relation where user_id = ?
*/});
exports.selectUserDevice = function (user_id, callback) {

  var values = [user_id];
  mysql.query(SELECT_USER_DEVICE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};





/**
 * 添加一个识别代码
 *
 * @param {Object} 识别对象
 * @return {Array} 
 */
var ADD_ID_CODE_SQL = multiline(function (){/*
  INSERT INTO
    monitor_place_code(id, create_time, update_time, user_id, type,code,name,parent_code)
  VALUES(NULL, now(), now(), ?, ?,?,?,?)
*/});
exports.addAreaCode = function (obj, callback) {
  assert(typeof obj === 'object');

  var values = [obj.user_id,obj.type,obj.code,obj.name,obj.parent_code];
  mysql.query(ADD_ID_CODE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找一个识别代码
 *
 * @param {Object} 识别对象
 * @return {Array} 
 */
var FIND_ID_CODE_SQL = multiline(function (){/*
  select * from
    monitor_place_code where type = ? and code = ? and parent_code = ?
*/});
exports.findAreaCode = function (type,code,parent_code, callback) {

  var values = [type,code,parent_code];
  mysql.query(FIND_ID_CODE_SQL, values, function(err, result) {

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找某设备的资料
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_INFO_SQL = multiline(function (){/*
  Select * from
    monitor_device where deviceid = ?
*/});
exports.selectUserDeviceInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_INFO_SQL, values, function(err, result) {

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};



/**
 * 登录判断账号密码
 *
 * @param {Object} 用户对象
 * @return {Number} 账号id
 */
var USER_LOGIN_SQL = multiline(function (){/*
  select * from
    monitor_user where username = ? and password= ?
*/});
exports.loginJudge = function (user, callback) {
  assert(typeof user === 'object');

  var values = [user.user_name, user.user_password];
  mysql.query(USER_LOGIN_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 判断用户名是否存在
 *
 * @param {Object} 用户名
 * @return {Number} 
 */
var USER_EXIST_SQL = multiline(function (){/*
  select user_id from
    monitor_user where username = ?
*/});
exports.userIsExist = function (username, callback) {

  var values = [username];
  mysql.query(USER_EXIST_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 判断设备是否存在
 *
 * @param {Object} 设备码
 * @return {Number} 
 */
var DEVICE_EXIST_SQL = multiline(function (){/*
  select deviceid from
    monitor_device where deviceid = ?
*/});
exports.deviceIsExist = function (deviceid, callback) {


  var values = [deviceid];
  mysql.query(DEVICE_EXIST_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};



/**
 * 插入某设备的作业记录
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_DUTY_SQL = multiline(function (){/*
  INSERT INTO
    monitor_duty_info(id, create_time, update_time, deviceid, T00,T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16)
  VALUES(NULL, now(), now(), ?, ?,?,?,?, ?, ?,?,?,?, ?, ?,?,?,?,?,?, ?)
*/});
exports.insertDutyInfo = function (dutyInfo, callback) {

  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.T00,dutyInfo.T01,
  dutyInfo.T02,dutyInfo.T03,dutyInfo.T04,dutyInfo.T05,
  dutyInfo.T06,dutyInfo.T07,dutyInfo.T08,dutyInfo.T09,dutyInfo.T10,
  dutyInfo.T11,dutyInfo.T12,dutyInfo.T13,dutyInfo.T14,dutyInfo.T15,dutyInfo.T16];
  mysql.query(INSERT_DEVICE_DUTY_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 查找某设备的当班信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_DUTY_SQL = multiline(function (){/*
  Select * from
    monitor_duty_info where deviceid = ? order by id desc
*/});
exports.showDutyInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_DUTY_SQL, values, function(err, result) {

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};



/**
 * 插入某设备的交接班信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_EXCHANGE_SQL = multiline(function (){/*
  INSERT INTO
    monitor_exchange_info(id, create_time, update_time, deviceid,T00, T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16)
  VALUES(NULL, now(), now(), ? , ? , ? , ? , ? , ? , ? , ? , ? , ?,?,?,?,?,?,?,?,?)
*/});
exports.insertExchangeInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.T00,dutyInfo.T01,dutyInfo.T02,dutyInfo.T03,
    dutyInfo.T04,dutyInfo.T05,dutyInfo.T06,dutyInfo.T07,dutyInfo.T08,dutyInfo.T09,
    dutyInfo.T10,dutyInfo.T11,dutyInfo.T12,dutyInfo.T13,dutyInfo.T14,dutyInfo.T15,dutyInfo.T16];
  mysql.query(INSERT_DEVICE_EXCHANGE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找某设备的交接班信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_EXCHANGE_SQL = multiline(function (){/*
  Select * from
    monitor_exchange_info where deviceid = ? order by id desc
*/});
exports.showExchangeInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_EXCHANGE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 插入某设备的违规信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_ERROR_SQL = multiline(function (){/*
  INSERT INTO
    monitor_error_info(id, create_time, update_time, deviceid, T00,T01)
  VALUES(NULL, now(), now(), ? , ?,?)
*/});
exports.insertErrorInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.T00,dutyInfo.T01];
  mysql.query(INSERT_DEVICE_ERROR_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找某设备的违规信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_ERROR_SQL = multiline(function (){/*
  Select * from
    monitor_error_info where deviceid = ? order by id desc
*/});
exports.showErrorInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_ERROR_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 插入某设备的设备状况信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_SITUATION_SQL = multiline(function (){/*
  INSERT INTO
    monitor_situation_info(id, create_time, update_time,deviceid, T00, T01,T02,T03,T04,T05,T06,T07,T08,T09)
  VALUES(NULL, now(), now(), ? , ?,?,?,?,?,?,?,?,?,?)
*/});
exports.insertSituationInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.T00,dutyInfo.T01,dutyInfo.T02,dutyInfo.T03,dutyInfo.T04,dutyInfo.T05,dutyInfo.T06,dutyInfo.T07,dutyInfo.T08,dutyInfo.T09];
  mysql.query(INSERT_DEVICE_SITUATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找某设备的设备状况信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_SITUATION_SQL = multiline(function (){/*
  Select * from
    monitor_situation_info where deviceid = ? order by id desc
*/});
exports.showSituationInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_SITUATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 插入某设备的设备信息记录
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_INFORMATION_SQL = multiline(function (){/*
  INSERT INTO
    monitor_Information_info(id, create_time, update_time, deviceid, T00,T01)
  VALUES(NULL, now(), now(), ? , ?,?)
*/});
exports.insertInformationInfo = function (Info, callback) {
 // console.log(dutyInfo)
  assert(typeof Info === 'object');

  var values = [Info.deviceid,Info.T00,Info.T01];
  mysql.query(INSERT_DEVICE_INFORMATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找某设备的信息码信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_INFORMATION_SQL = multiline(function (){/*
  Select * from
    monitor_Information_info where deviceid = ? order by id desc
*/});
exports.showInformationInfo = function (device_id, callback) {

  var values = [device_id];
  mysql.query(SELECT_DEVICE_INFORMATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 修改列车时刻
 *
 * @param {Object} 时刻id
 * @return {Number} 设备id
 */
var TIMETABLE_MODIFY_SQL = multiline(function (){/*
  UPDATE
    monitor_line_timetable set update_time = now(), train_count = ?, train_time=? where id = ?
*/});
exports.modifyTimetable = function (timetable, callback) {
  assert(typeof timetable === 'object');

  var values = [timetable.train_count,timetable.train_time,timetable.id];

  mysql.query(TIMETABLE_MODIFY_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};




/**
 * 新增列车时刻
 *
 * @param {Object} 信息对象
 * @return {Number} id
 */
var TIMETABLE_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_line_timetable(id, create_time, update_time, type, deviceid,
      train_count, train_time)
  VALUES(NULL, now(), now(), ?, ?, ?, ?)
*/});
exports.addTimeTable = function (timetable, callback) {
  assert(typeof timetable === 'object');

  var values = [timetable.type, timetable.deviceid,
    timetable.train_count,timetable.train_time];
  mysql.query(TIMETABLE_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 查找列车时刻
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var TIMETABLE_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_line_timetable where deviceid= ?
*/});
exports.selectTimeTable = function (timetable, callback) {
  assert(typeof timetable === 'object');

  var values = [timetable.deviceid];
  mysql.query(TIMETABLE_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 按数量查找列车时刻
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var TIMETABLE_COUNT_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_line_timetable where deviceid= ? limit ?,?
*/});
exports.findTimeTableByCount = function (timetable, callback) {
  assert(typeof timetable === 'object');

  var values = [timetable.deviceid,timetable.s,timetable.e];
  mysql.query(TIMETABLE_COUNT_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      console.log(TIMETABLE_COUNT_SELETE_SQL);
      console.log(result);
      console.log(values);
      callback(null, result);
    }
  });
};



/**
 * 删除一个时刻
 *
 * @param {Object} id
 * @return {Number} 设备id
 */
var DELETE_TIMETABLE_SQL = multiline(function (){/*
  delete from
    monitor_line_timetable where id = ?
*/});
exports.deleteTimeTable = function (id, callback) {

  var values = [id];

  mysql.query(DELETE_TIMETABLE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 修改值班人员
 *
 * @param {Object} 人员object
 * @return {Number} 设备id
 */
var DUTYPEOPLE_MODIFY_SQL = multiline(function (){/*
  UPDATE
    monitor_line_dutypeople set update_time = now(), name = ?, number=? where id = ?
*/});
exports.modifyDutyPeople = function (people, callback) {
  assert(typeof people === 'object');

  var values = [people.name,people.number,people.id];

  mysql.query(DUTYPEOPLE_MODIFY_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};




/**
 * 新增值班人员
 *
 * @param {Object} 信息对象
 * @return {Number} id
 */
var DUTYPEOPLE_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_line_dutypeople(id, create_time, update_time, deviceid,
      number, name)
  VALUES(NULL, now(), now(), ?, ?, ?)
*/});
exports.addDutyPeople= function (people, callback) {
  assert(typeof people === 'object');

  var values = [people.deviceid,
    people.number,people.name];
  mysql.query(DUTYPEOPLE_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 查找值班人员
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var DUTYPEOPLE_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_line_dutypeople where deviceid= ?
*/});
exports.selectDutyPeople = function (people, callback) {
  assert(typeof people === 'object');

  var values = [people.deviceid];
  mysql.query(DUTYPEOPLE_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 删除一个值班人员
 *
 * @param {Object} id
 * @return {Number} 设备id
 */
var DELETE_DUTYPEOPLE_SQL = multiline(function (){/*
  delete from
    monitor_line_dutypeople where id = ?
*/});
exports.deleteDutyUser = function (id, callback) {

  var values = [id];

  mysql.query(DELETE_DUTYPEOPLE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};



/**
 * 删除一条操作
 *
 * @param {Object} id
 * @return {Number} 设备id
 */
var DELETE_OPERATION_SQL = multiline(function (){/*
  delete from
    monitor_operation where id = ? and deviceid=?
*/});
exports.deleteOperation = function (id,name, callback) {

  var values = [id,name];

  mysql.query(DELETE_OPERATION_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};




/**
 * 新增操作
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var OPERATION_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_operation(id2,id, create_time, update_time, deviceid,
      type)
  VALUES(null,?, now(), now(), ?, ?)
*/});
exports.addOperation= function (operation, callback) {
  assert(typeof operation === 'object');

  var values = [operation.id,
    operation.deviceid,operation.type];
  mysql.query(OPERATION_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 查找操作
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var OPERATION_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_operation where deviceid= ? limit 1
*/});
exports.selectOperation = function (id, callback) {

  var values = [id];
  mysql.query(OPERATION_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找操作
 *
 * @param {String} code
 * @return {Number} id
 */
var OPERATION_SELETE_SQL_CODE = multiline(function (){/*
  SELECT * from
    monitor_operation where id= ? limit 1
*/});
exports.selectOperationByCode = function (code, callback) {

  var values = [code];
  mysql.query(OPERATION_SELETE_SQL_CODE, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};




/**
 * 新增一条信息与设备关联
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var MSG_DEVICE_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_msg_device(id,code, msg_id,user,dept,demand)
  VALUES(null,?,?,?,?,?)
*/});
exports.addMsgDevice= function (o, callback) {
  assert(typeof o === 'object');
  var values = [o.code,o.msg_id,o.user,o.dept,o.demand];
  mysql.query(MSG_DEVICE_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 新增一条信息
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var MSG_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_message(id,index2,text,msg_id,user,dept,demand)
  VALUES(null,?,?,?,?,?,?)
*/});
exports.addMessage= function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.index,
    msg.text,msg.msg_id,msg.user,msg.dept,msg.demand];
  mysql.query(MSG_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};




/**
 * 查找消息数量
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_COUNTS_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_message where msg_id= ?
*/});
exports.findMessage = function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.msg_id];
  mysql.query(MSG_COUNTS_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      console.log(msg.s,msg.e,MSG_COUNTS_SELETE_SQL)
      console.log(result);
      console.log(values);
      callback(null, result);
    }
  });
};


/**
 * 按数量查找消息
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_COUNT_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_message where msg_id= ? and index2 between ? and ?
*/});
exports.findMessageByCount = function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.msg_id,msg.s,msg.e];
  mysql.query(MSG_COUNT_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      console.log(msg.s,msg.e,MSG_COUNT_SELETE_SQL)
      console.log(result);
      console.log(values);
      callback(null, result);
    }
  });
};


/**
 * 按code查找消息
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_CODE_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_msg_device where code= ?
*/});
exports.findMessageByCode = function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.code];
  mysql.query(MSG_CODE_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {

      callback(null, result);
    }
  });
};

/**
 * 查找消息记录
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_HISTORY_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_msg_history where device_id= ?
*/});
exports.showMsgHistoryInfo = function (deviceid, callback) {

  var values = [deviceid];
  mysql.query(MSG_HISTORY_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {

      callback(null, result);
    }
  });
};

/**
 * 更新消息状态
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_HISTORY_UPDATE_SQL = multiline(function (){/*
  update
    monitor_msg_history set status = ?,comment = ? where device_id= ? and msg_id = ?
*/});
exports.updateMessageHistory = function (msg, callback) {
  assert(typeof msg === 'object');
  console.log(msg.device_id,msg.msg_id,msg.status);
  if(!msg.status){
    msg.status = 1
  }
  var values = [msg.status,msg.comment,msg.device_id,msg.msg_id];
  mysql.query(MSG_HISTORY_UPDATE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 新增信息记录
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var MSG_HISTORY_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_msg_history(id,device_id,msg_id,text,create_time,user,dept,demand)
  VALUES(null,?,?,?,now(),?,?)
*/});
exports.addMsgHistory= function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.deviceid,
    msg.msg_id,msg.text,msg.user,msg.dept,msg.demand];
  mysql.query(MSG_HISTORY_ADD_SQL, values, function(err, result) {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};



/**
 * 新增一条检查信息与设备关联
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var CHECK_DEVICE_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_check_device(id,code, msg_id,user,job)
  VALUES(null,?,?,?,?)
*/});
exports.addCheckDevice= function (o, callback) {
  assert(typeof o === 'object');
  var values = [o.code,o.msg_id,o.user,o.job];
  mysql.query(CHECK_DEVICE_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 新增一条检查信息
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var CHECK_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_check(id,index2,text,msg_id,user,job)
  VALUES(null,?,?,?,?,?)
*/});
exports.addCheck= function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.index,
    msg.text,msg.msg_id,msg.user,msg.job];
  mysql.query(CHECK_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};

/**
 * 按code查找消息
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var CHECK_CODE_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_check_device where code= ?
*/});
exports.findCheckByCode = function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.code];
  mysql.query(CHECK_CODE_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {

      callback(null, result);
    }
  });
};

/**
 * 查找消息记录
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var CHECK_HISTORY_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_check_history where device_id= ?
*/});
exports.showCheckHistoryInfo = function (deviceid, callback) {

  var values = [deviceid];
  mysql.query(CHECK_HISTORY_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {

      callback(null, result);
    }
  });
};

/**
 * 查找check
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var CHECK_HISTORY_SELETE_SQL = multiline(function (){/*
  select * from
    monitor_check_history where device_id= ? and msg_id = ?
*/});
exports.selectCheckHistory = function (msg, callback) {
  assert(typeof msg === 'object');
  if(!msg.status){
    msg.status = 1
  }
  var values = [msg.device_id,msg.msg_id];
  mysql.query(CHECK_HISTORY_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


/**
 * 查找消息
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var MSG_HISTORY_SELETE_SQL = multiline(function (){/*
  select * from
    monitor_msg_history where device_id= ? and msg_id = ?
*/});
exports.selectMessageHistory = function (msg, callback) {
  assert(typeof msg === 'object');
  if(!msg.status){
    msg.status = 1
  }
  var values = [msg.device_id,msg.msg_id];
  mysql.query(MSG_HISTORY_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 更新消息状态
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var CHECK_HISTORY_UPDATE_SQL = multiline(function (){/*
  update
    monitor_check_history set status = ?,comment=? where device_id= ? and msg_id = ?
*/});
exports.updateCheckHistory = function (msg, callback) {
  assert(typeof msg === 'object');
  if(!msg.status){
    msg.status = 1
  }
  var values = [msg.status,msg.comment,msg.device_id,msg.msg_id];
  mysql.query(CHECK_HISTORY_UPDATE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
/**
 * 新增信息记录
 *
 * @param {Object} 操作对象
 * @return {Number} id
 */
var CHECK_HISTORY_ADD_SQL = multiline(function (){/*
  INSERT INTO
    monitor_check_history(id,device_id,msg_id,text,create_time,user,job)
  VALUES(null,?,?,?,now(),?,?)
*/});
exports.addCheckHistory= function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.deviceid,
    msg.msg_id,msg.text,msg.user,msg.job];
  mysql.query(CHECK_HISTORY_ADD_SQL, values, function(err, result) {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};



/**
 * 查找消息数量
 *
 * @param {String} deviceid
 * @return {Number} id
 */
var CHECK_COUNTS_SELETE_SQL = multiline(function (){/*
  SELECT * from
    monitor_check where msg_id= ?
*/});
exports.findCheck = function (msg, callback) {
  assert(typeof msg === 'object');

  var values = [msg.msg_id];
  mysql.query(CHECK_COUNTS_SELETE_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      console.log(msg.s,msg.e,CHECK_COUNTS_SELETE_SQL)
      callback(null, result);
    }
  });
};

thunkify(exports);

