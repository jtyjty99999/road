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

//var comment = require('../dao/index');
var debug = require('debug')('controller');

exports.index = function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/index',{items:items});
}; 

exports.list= function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/list',{items:items});
}; 
exports.setup= function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/setup',{items:items});
}; 
exports.help= function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/help',{items:items});
}; 
exports.my= function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/my',{items:items});
}; 
exports.record= function *() {
	var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
	this.body = yield this.render('analysis/record',{items:items});
}; 