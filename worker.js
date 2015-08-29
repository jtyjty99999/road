/**!
 * worker.js
 *
 * Copyright(c) 2013 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */



"use strict";

/**
 * Module dependencies.
 */

var http = require('http');
var cluster = require('cluster');
var graceful = require('graceful');
var config = require('./config');
var app = require('./lib/application.js').createApp();

var server = http.createServer(app.callback());
server.listen(config.webPort);


var workerId = Number(cluster.worker && cluster.worker.id || 0);
config.workerId = workerId;


graceful({
  server: server,
  // server: [webServer],
  error: function(err, throwErrorCount) {
    if (err.message) {
      err.message += ' (uncaughtException throw ' + throwErrorCount + ' times on pid:' + process.pid + ')';
    }
    //err.error(err);
  }
});
