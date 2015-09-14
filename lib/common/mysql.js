/*
 * database common interfaces - common/mysql.js
 *
 * @author tianyi.jiangty@alibaba-inc.com
 */

'use strict';

/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var mysql = require('mysql');
var config = require('../../config');
var logger = require('./logger');
var debug = require('debug')('database');

var isWorker = require('cluster').worker;
var pool = mysql.createPool(config.database);

exports.pool = pool;

exports.query = function (sql, values, cb) {
  if (typeof values === 'function') {
    cb = values;
    values = null;
  }
  pool.query(sql, values, function (err, rows) {
    cb(err, rows);
  });
};

exports.queryOne = function (sql, values, cb) {
  if (typeof values === 'function') {
    cb = values;
    values = null;
  }
  exports.query(sql, values, function (err, rows) {
    if (rows) {
      rows = rows[0];
    }
    cb(err, rows);
  });
};

exports.escape = function (val) {
  return pool.escape(val);
};

thunkify(exports);

function init() {
  exports.query('show tables', function (err, rows) {
    if (err) {
      if (isWorker) {
        logger.log('[%s] [worker:%s] mysql init error: %s', Date(), process.pid, err);
        debug('[%s] [worker:%s] mysql init error: %s', Date(), process.pid, err);
      } else {
        logger.log('[%s] mysql init error: %s', Date(), err);
        debug('[%s] mysql init error: %s', Date(), err);
      }
      setTimeout(init, 1000);
      return;
    }

    if (isWorker) {
      logger.log('[%s] [worker:%s] mysql ready, got %d tables', Date(), process.pid, rows.length);
      debug('[%s] [worker:%s] mysql ready, got %d tables', Date(), process.pid, rows.length);
    } else {
      logger.log('[%s] mysql ready, got %d tables', Date(), rows.length);
      debug('[%s] mysql ready, got %d tables', Date(), rows.length);
    }
  });
}
//init();

