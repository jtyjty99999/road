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

function getLineName(deviceid){


	var c = deviceid.substring(deviceid.length-6);

	var n = c.substring(3,6);

	var m = c.substring(0,3);

	if(m.length==1){
		m = '00'+m;
	}else if(m.length==2){

		m = '0'+m;
	}
	return 'k'+m+'+'+n
}


function run(arr) {

	var result = [];


	arr.forEach(function(d, i) {

		if (search(result, 'code', d[0].roadTopManagerCode)) {
			result.push({

				name: d[0].roadTopManager,
				children: [],
				code: d[0].roadTopManagerCode,
				url:"/index?roadTopManagerCode="+d[0].roadTopManagerCode,
				target:"_self"
			})

		}

	})

	arr.forEach(function(d, i) {

		result.forEach(function(d2, i2) {

			if (d2.code == d[0].roadTopManagerCode) {

				if (search(d2.children, 'code', d[0].roadownareaCode)) {
					d2.children.push({

						name: d[0].roadownarea,
						children: [],
						code: d[0].roadownareaCode,
						url:"/index?roadTopManagerCode="+d[0].roadTopManagerCode+'&roadownareaCode='+ d[0].roadownareaCode,
						target:"_self"
					})

				}



			}

		})


	})



	arr.forEach(function(d, i) {

		result.forEach(function(d2, i2) {

			if (d2.code == d[0].roadTopManagerCode) {


				d2.children.forEach(function(d3, i3) {



					if (d3.code == d[0].roadownareaCode) {


						if (search(d3.children, 'code', d[0].roadowncarCode)) {
							d3.children.push({

								name: d[0].roadowncar,
								children: [],
								code: d[0].roadowncarCode,
								url:"/index?roadTopManagerCode="+d[0].roadTopManagerCode+'&roadownareaCode='+ d[0].roadownareaCode+'&roadowncarCode='+d[0].roadowncarCode,
								target:"_self"
							})

						}



					}


				})



			}

		})


	})

	return result

}

//console.log(run(a));

function search(arr, key, value) {

	var res = true;

	arr.forEach(function(d, i) {

		if (d[key] == value) {

			res = false;
		}
	})

	return res


}

exports.index = function *(next) {

	var query = this.request.query;

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

		  deviceListInfo = deviceListInfo.map(function(d){
		  	d[0].lineName = getLineName(d[0].deviceid);
		  	return d
		  })


	}catch(e){
		console.log(e)

	}

var navInfo = JSON.stringify(run(deviceListInfo));
//roadTopManagerCode=01&roadownareaCode=03&roadowncarCode=03
	if(query.roadTopManagerCode){

		deviceListInfo = deviceListInfo.filter(function(el){

			return el[0].roadTopManagerCode==query.roadTopManagerCode
		})
	}
	if(query.roadownareaCode){

		deviceListInfo = deviceListInfo.filter(function(el){

			return el[0].roadownareaCode==query.roadownareaCode
		})
	}
	if(query.roadowncarCode){

		deviceListInfo = deviceListInfo.filter(function(el){

			return el[0].roadowncarCode==query.roadowncarCode
		})
	}

	var renderData = {

		name:this.session.user.user_name,
		user_id:this.session.user.user_id,
		deviceListInfo:deviceListInfo,
		usertype:this.session.user.usertype,
		navInfo:navInfo

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