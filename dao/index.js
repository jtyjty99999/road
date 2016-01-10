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
      roadwidth,roadlineleft,roadlineright,roadcity,roadcountry,roadtraffic,roadtype,roadbelong,roadowncar,roadownarea,securityDayFirst,securityDaySecond,securityDayThird,securityDay)
  VALUES(NULL, now(), now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)
*/});
exports.addDevice = function (device, callback) {
  assert(typeof device === 'object');
  var values = [device.user_id, device.deviceid,
      device.roadTopManager, device.roadTopManagerCode, device.roadname, device.roadbelongCode, device.roadmiles, device.roadfromto,device.roadcount,device.roadupsituation,
      device.roaddownsituation,device.roadleftsituationup,device.roadleftsituationdown,device.roadowncarCode,device.roadownareaCode,device.roadwidth,device.roadlineleft,
      device.roadlineright,device.roadcity,device.roadcountry,device.roadtraffic,device.roadtype,device.roadbelong,device.roadowncar,device.roadownarea,device.securityDayFirst,device.securityDaySecond,device.securityDayThird,device.securityDay];
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
      roadwidth=?,roadlineleft=?,roadlineright=?,roadcity=?,roadcountry=?,roadtraffic=?,roadtype=?,roadbelong=?,roadowncar=?,roadownarea=?,securityDayFirst=?,securityDaySecond=?,securityDayThird=?,securityDay=? where deviceid = ?
*/});
exports.modifyDevice = function (device, callback) {
  assert(typeof device === 'object');
  var values = [
      device.roadTopManager, device.roadTopManagerCode, device.roadname, device.roadbelongCode, device.roadmiles, device.roadfromto,device.roadcount,device.roadupsituation,
      device.roaddownsituation,device.roadleftsituationup,device.roadleftsituationdown,device.roadowncarCode,device.roadownareaCode,device.roadwidth,device.roadlineleft,
      device.roadlineright,device.roadcity,device.roadcountry,device.roadtraffic,device.roadtype,device.roadbelong,device.roadowncar,device.roadownarea,device.securityDayFirst,device.securityDaySecond,device.securityDayThird,device.securityDay,device.deviceid];

  mysql.query(DEVICE_MODIFY_SQL, values, function(err, result) {
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

  assert(typeof dutyInfo === 'object');

  var values = [dutyInfo.deviceid,dutyInfo.Data,
  dutyInfo.Num,dutyInfo.Train,dutyInfo.T0,dutyInfo.M0,
  dutyInfo.M1,dutyInfo.M2,dutyInfo.T1,dutyInfo.T2,dutyInfo.Rem0,
  dutyInfo.Dir0,dutyInfo.Way,dutyInfo.Sou,dutyInfo.T3,dutyInfo.T4,dutyInfo.Rem1];
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





thunkify(exports);

