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

export.modifyDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

export.addDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

export.addDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
export.modifyDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}


export.deleteDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
export.addTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
export.modifyTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}
export.deleteTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	this.body ={};
}

export.showDutyInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var deviceId = this.query.deviceId;

	var res = yield * dao.showDutyInfo(deviceId);

	this.body =res;
}

export.showExchangeInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield * dao.showExchangeInfo(deviceId);

	this.body =res;
}

export.showSituationInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;



	var deviceId = this.query.deviceId;

	var res = yield * dao.showSituationInfo(deviceId);

	this.body =res;

export.showErrorInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield * dao.showDutyInfo(deviceId);

	this.body =res;
}