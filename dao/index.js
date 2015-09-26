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
      roaddownsituation,roadleftsituationup,roadleftsituationdown,rodeowncarCode,roadownareaCode,
      roadwidth,roadlineleft,roadlineright,roadcity,roadcountry,roadtraffic,roadtype,roadbelong,roadowncar,roadownarea)
  VALUES(NULL, now(), now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
*/});
exports.addDevice = function (device, callback) {
  assert(typeof device === 'object');

  var values = [device.user_id, device.deviceid,
      device.roadTopManager, device.roadTopManagerCode, device.roadname, device.roadbelongCode, device.roadmiles, device.roadfromto,device.roadcount,device.roadupsituation,
      device.roaddownsituation,device.roadleftsituationup,device.roadleftsituationdown,device.rodeowncarCode,device.roadownareaCode,device.roadwidth,device.roadlineleft,
      device.roadlineright,device.roadcity,device.roadcountry,device.roadtraffic,device.roadtype,device.roadbelong,device.roadowncar,device.roadownarea];
  mysql.query(DEVICE_ADD_SQL, values, function(err, result) {
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
    monitor_place_code where type = ? and code = ?
*/});
exports.findAreaCode = function (type,code, callback) {

  var values = [type,code];
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
 * 插入某设备的当班信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var INSERT_DEVICE_DUTY_SQL = multiline(function (){/*
  INSERT INTO
    monitor_duty_info(id, create_time, update_time, deviceid, data,num,train,t0,m0,m1,m2,t1,t2,rem0,dir,way,sou,t3,t4,rem1)
  VALUES(NULL, now(), now(), ?, ?,?,?,?, ?, ?,?,?,?, ?, ?,?,?,?,?,?)
*/});
exports.insertDutyInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.Data,
  dutyInfo.Num,dutyInfo.Train,dutyInfo.T0,dutyInfo.M0,
  dutyInfo.M1,dutyInfo.M2,dutyInfo.T1,dutyInfo.T2,dutyInfo.Rem0,
  dutyInfo.Dir,dutyInfo.Way,dutyInfo.Sou,dutyInfo.T3,dutyInfo.t4,dutyInfo.Rem1];
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
    monitor_duty_info where deviceid = ?
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
    monitor_exchange_info(id, create_time, update_time, deviceid, data,shift0,shift1,weather,safe0,safe1,safe2,safe3,safe4,safe5)
  VALUES(NULL, now(), now(), ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)
*/});
exports.insertExchangeInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.Data,
  dutyInfo.Shift0,dutyInfo.Shift1,dutyInfo.Weather,dutyInfo.Safe0,
  dutyInfo.Safe1,dutyInfo.Safe2,dutyInfo.Safe3,dutyInfo.Safe4,dutyInfo.Safe5];
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
    monitor_exchange_info where deviceid = ?
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
    monitor_error_info(id, create_time, update_time, deviceid, time,con)
  VALUES(NULL, now(), now(), ? , ?,?)
*/});
exports.insertErrorInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.Time,dutyInfo.Con];
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
    monitor_error_info where deviceid = ?
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
    monitor_situation_info(id, create_time, update_time,deviceid, equ, data0,num0,ele,data1,num1)
  VALUES(NULL, now(), now(), ? , ?,?,?,?,?,?)
*/});
exports.insertSituationInfo = function (dutyInfo, callback) {
 // console.log(dutyInfo)
  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.Equ,dutyInfo.Data0,dutyInfo.Num0,dutyInfo.Ele,dutyInfo.Data1,dutyInfo.Num1];
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
    monitor_situation_info where deviceid = ?
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











thunkify(exports);

