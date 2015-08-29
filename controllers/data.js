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

//HTTP://183.247.161.70:8080/protocol?Name=萧萧联络线K4+723&Record=Operation&Seq=0&Data=2015/1/1&Num=0003&Train=K8500&T0=21:14&M0=008&M1=568&M2=&T1=21:18&T2=21:43&Rem0=正  常&Dir=未知&Way=手动存储&Sou=手动时间&T3=00009S&T4=&Rem1=不正常

var index = function *() {

	var request = this.request,query = this.request.query
	
	var items = [];

	for(var key in query){

		items.push({

			title:key,
			value:query[key]
		})
	}

	console.log(this.query)
	//this.body = yield this.render('test',{items:items});
	this.body = query.Name+';Record='+query.Record+';Seq=0'
}; 

var log = function *(next){

	var request = this.request,query = this.request.query
	console.log('got!!!'+this.request.url)
	for(var key in query){

		console.log(key+':'+decodeURIComponent(query[key]))
	}
	this.body = '11111111111111111111111111111111'
}

module.exports = {

	index:index,
	log:log
}