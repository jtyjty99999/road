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
var iconv=require('iconv-lite');
var querystring = require('querystring');

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

function gbkdecodeURIComponent(s){
	var buff,result;
		s = s.replace(/%([a-zA-Z0-9]{2})/g,function(_,code){
		    return String.fromCharCode(parseInt(code,16));
		});

		buff=new Buffer(s,'binary');

		result=iconv.decode(buff,'GBK');

		return result 
}

var log = function *(next){

	var s;
	var request = this.request,query = this.request.query,qs  =this.request.querystring;
	console.log('got!!!'+this.request.url)

	query = querystring.parse(qs,null,null,{decodeURIComponent:function(s){return s}})
	
	for(var key in query){

		s = query[key];
		console.log(key+':'+gbkdecodeURIComponent(s))
	}
	this.body = 'Name='+query.Name+',Record='+query.Record+',Seq='+query.Seq;
}

module.exports = {

	index:index,
	log:log
}