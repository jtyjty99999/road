/**!
 * dispatch.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */


"use strict";

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var util = require('util');
var cluster = require('cluster');
var config = require('./config');
var logger = require('./lib/common/logger');
var err = require('./lib/error');
if (config.enableCluster) {
  var workerPath = path.join(__dirname, 'worker.js');

  cluster.setupMaster({
    exec: workerPath
  });


//以下所有console.log交给logger处理,所有console.err交给err处理
  cluster.on('fork', function (worker) {
    logger.log('[%s] [worker:%d] #%s new worker start', new Date(), worker.process.pid, worker.id);
  });

  cluster.on('online', function (worker) {
    logger.log('[%s] [worker:%d] #%s worker online', new Date(), worker.process.pid, worker.id);
  });

  cluster.on('listening', function (worker, addr) {
    logger.log('[%s] [worker:%d] #%s worker listening on %s:%s:%s',
      new Date(), worker.process.pid, worker.id, addr.address, addr.port, addr.addressType);
  });

  cluster.on('disconnect', function (worker) {
    var w = cluster.fork();
    logger.error('[%s] [master:%s] #%s wroker:%s disconnect! new #%s worker:%s fork',new Date(), process.pid, worker.id, worker.process.pid, w.id, w.process.pid);
  });

  cluster.on('exit', function (worker, code, signal) {
    var exitCode = worker.process.exitCode;
    var err = new Error(util.format('#%s worker:%s died (code: %s, signal: %s)',
      worker.id, worker.process.pid, exitCode, signal));
      err.name = 'WorkerDiedError';
    //err.error(err);
  });

  // Fork workers.
  for (var i = 0; i < config.workerCount; i++) {
    cluster.fork();
  }
}
