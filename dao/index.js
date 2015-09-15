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
    monitor_device(id, create_time, update_time, user_name, content,
      status, parent_id, app_id, trace_id, avatar, buc_id)
  VALUES(NULL, now(), now(), ?, ?, 0, ?, ?, ?, ?, ?)
*/});
exports.addDevice = function (device, callback) {
  assert(typeof device === 'object');

  var values = [device.user_name, device.content,
    device.parent_id, device.app_id, device.trace_id,
    device.avatar, device.bud_id];
  mysql.query(COMMENT_ADD_SQL, values, function(err, result) {
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
    monitor_user(id, create_time, update_time, user_name, content,
      status, parent_id, app_id, trace_id, avatar, buc_id)
  VALUES(NULL, now(), now(), ?, ?, 0, ?, ?, ?, ?, ?)
*/});
exports.addAccount = function (device, callback) {
  assert(typeof device === 'object');

  var values = [device.user_name, device.content,
    device.parent_id, device.app_id, device.trace_id,
    device.avatar, device.bud_id];
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
    monitor_relation(id, create_time, update_time, user_name, device_id)
  VALUES(NULL, now(), now(), ?, ?)
*/});
exports.addUserDeviceRelation = function (device, callback) {
  assert(typeof device === 'object');

  var values = [device.user_name, device.id];
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
  Select device_id from
    monitor_relation where user_name = ?
*/});
exports.selectUserDevice = function (user_name, callback) {
  assert(typeof device === 'object');

  var values = [user_name];
  mysql.query(SELECT_USER_DEVICE_SQL, values, function(err, result) {
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
    monitor_device where device_id = ?
*/});
exports.selectUserDevice = function (device_id, callback) {
  assert(typeof device === 'object');

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
    monitor_user where user_name = ? and user_password= ?
*/});
exports.loginJudge = function (user, callback) {
  assert(typeof device === 'object');

  var values = [user.user_name, user.user_password];
  mysql.query(USER_LOGIN_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
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
    monitor_info where device_id = ? and type = "duty"
*/});
exports.showDutyInfo = function (device_id, callback) {
  assert(typeof device === 'object');

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
 * 查找某设备的交接班信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_EXCHANGE_SQL = multiline(function (){/*
  Select * from
    monitor_info where device_id = ? and type = "exchange"
*/});
exports.showExchangeInfo = function (device_id, callback) {
  assert(typeof device === 'object');

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
 * 查找某设备的违规信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_ERROR_SQL = multiline(function (){/*
  Select * from
    monitor_info where device_id = ? and type = "error"
*/});
exports.showErrorInfo = function (device_id, callback) {
  assert(typeof device === 'object');

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
 * 查找某设备的设备状况信息
 *
 * @param {Object} 设备id
 * @return {array} 
 */
var SELECT_DEVICE_SITUATION_SQL = multiline(function (){/*
  Select * from
    monitor_info where device_id = ? and type = "situation"
*/});
exports.showSituationInfo = function (device_id, callback) {
  assert(typeof device === 'object');

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

