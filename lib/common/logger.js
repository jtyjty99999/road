/**!
 * logger.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */
/*
var logger = require('ali-logger');
var config = require('../../config')
logger.init({
	logdir: config.logdir,
	// duration: 3600000 * 24,
	// nameformat: '[{{level}}.]YYYY-MM-DD[.log]',
	// stderr: false, // show error stack in stderr or not
	//level: logger.log, // 默认输出 log 及以上级别的日志
	// stdoutLevel: logger.ERROR, // 输出到标准输出的最低级别, 默认不输出
});

logger.memory = function() {

	var format = function(data) {
		return (data / 1048576).toFixed(1) + 'MB'; // 1048576 = 1024 * 1024
	}
	var self = this;
	var memoryUsage = process.memoryUsage();
	var loadAvg = os.loadavg();
	var msgs = [
		'rss:' + format(memoryUsage.rss),
		'heapTotal:' + format(memoryUsage.heapTotal),
		'heapUsed:' + format(memoryUsage.heapUsed),
		'freeMemory:' + format(os.freemem()),
		'loadAvg:' + loadAvg[0].toFixed(1) + ',' + loadAvg[1].toFixed(1) + ',' + loadAvg[2].toFixed(2)
	];
	logger.info(msgs);
}
*/
module.exports = console;