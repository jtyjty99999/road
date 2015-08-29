/**!
 * config.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var os = require('os');
fs.existsSync = fs.existsSync || path.existsSync;
var pkg = require('../package.json');

var root = path.dirname(__dirname);
var logdir = path.join(root, 'logs');
mkdirp.sync(logdir);

var workerCount = os.cpus().length;
if (workerCount > 12) {
  workerCount = 12;
}

var config = {
  version: pkg.version,
  webPort: 8080,
  enableCluster: true, //存在session共享的问题
  workerCount: workerCount,
  debug: true, // 是否开启调试模式, 输出标准错误, 线上环境需要设置为 false
  logdir: logdir,
  assetsDir:path.resolve(__dirname, '../assets'),
  viewinfo: {
    paths: [path.resolve(__dirname, '../views')]
  },
  database: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'monitor',
    password: 'root',
    multipleStatements: true,
    connectionLimit: 10
  }
};

module.exports = config;
