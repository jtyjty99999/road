/**!
 * data.js
 *
 * Copyright(c) 2013 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */
var querystring = require('querystring');

exports.modifyDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

exports.addDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

exports.addDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
exports.modifyDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}


exports.deleteDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
exports.addTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
exports.modifyTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
exports.deleteTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

exports.showDutyInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var deviceId = this.query.deviceId;

	var res = yield * dao.showDutyInfo(deviceId);

	this.body =res;
}

exports.showExchangeInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield * dao.showExchangeInfo(deviceId);

	this.body =res;
}

exports.showSituationInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;



	var deviceId = this.query.deviceId;

	var res = yield * dao.showSituationInfo(deviceId);

	this.body =res;
}
exports.showErrorInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield * dao.showErrorInfo(deviceId);

	this.body =res;
}

exports.showDeviceInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield * dao.selectUserDevice(deviceId);

	this.body =res;
}