/**!
 * page.js
 *
 * Copyright(c) 2013 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */

var dao = require('../dao/index');
var debug = require('debug')('controller');

exports.index = function *() {

	//var dao = dao.selectUserDevice(userid);
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('index',{items:items});
}; 

exports.login= function *() {

  this.body = yield this.render('login',{});
}; 
