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

exports.index = function *(next) {

	if(!this.session.user){

		this.redirect('/login');
		return 
	}
	var user_id = this.session.user.user_id;

	var deviceList = [];

	try{

		deviceList = yield dao.selectUserDevice(user_id);


	}catch(e){
		console.log(e)

	}


var deviceListInfo = [];

	try{

		  deviceListInfo = yield deviceList.map(function (d) {
		    return dao.selectUserDeviceInfo(d.deviceid);

		  });

		  //console.log(deviceListInfo)


	}catch(e){
		console.log(e)

	}

	var renderData = {

		name:this.session.user.user_name,
		user_id:this.session.user.user_id,
		deviceListInfo:deviceListInfo,
		usertype:this.session.user.usertype

	}

	//var dao = dao.selectUserDevice(userid);
	this.body = yield this.render('index',renderData);
}; 

exports.login= function *() {


	if(this.session.judged){

  		this.body = yield this.render('login',{errorMsg:'用户不存在或密码错误！'});

	}else{

		this.body = yield this.render('login',{errorMsg:''});

	}


}; 
exports.logout = function *(){

	this.session.user = null;
	this.session.judged = false;
	this.redirect('/login');
}
exports.checkLogin = function *(){

	var url = this.query.redirect;

	var obj = {
		user_name:this.query.user_name,
		user_password:this.query.user_password
	}

	var res = yield dao.loginJudge(obj);

	if(res&&res.length!==0){

		this.session.user = {};
		this.session.user.user_id = res[0].user_id;
		this.session.user.user_name = res[0].username;
		this.session.user.usertype = res[0].type;
		if(!url){

			this.redirect('/index');

		}else{

			this.redirect(url);
		}


	}else{
		this.session.judged = true;
			this.redirect('/login');

	}



}