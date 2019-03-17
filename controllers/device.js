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
var dao = require('../dao/index');
var moment = require('moment');



exports.parseCode = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var code = query.code;

	var t1 = code.substring(0,2),
	t2 = code.substring(2,4),
	t3 = code.substring(4,6),
	t4 = code.substring(6,9);

	var t1Name,t2Name,t3Name,t4Name;

	console.log(t1,t2,t3,t4)
	try{

		t1Name = yield dao.findAreaCode(1,t1,'');
		t1Name = t1Name[0]['name'];
	}catch(e){

		t1Name = ''
	}

	try{

		t2Name = yield dao.findAreaCode(2,t2,t1);
		t2Name = t2Name[0]['name'];
	}catch(e){

		t2Name = ''
	}

	try{

		t3Name = yield dao.findAreaCode(3,t3,t2);
		t3Name = t3Name[0]['name'];
	}catch(e){

		t3Name = ''
	}
	try{

		t4Name = yield dao.findAreaCode(4,t4,t3);
		t4Name = t4Name[0]['name'];
	}catch(e){

		t4Name = ''
	}		

	
	this.body = {
		code: 200,
		data: {
			t1: t1,
			t2: t2,
			t3: t3,
			t4: t4,
			t1Name: t1Name,
			t2Name: t2Name,
			t3Name: t3Name,
			t4Name: t4Name
		}
	};

}


exports.modifyDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	


		this.body ={code:500,msg:"添加失败"};

}


exports.addAreaCode = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var codeObj = {
		type:query.type,
		name:query.name,
		code:query.code,
		parent_code:query.parent_code,
		user_id:this.session.user?this.session.user.user_id:null
	}

	var result;

	try{

		result = yield dao.addAreaCode(codeObj);
		this.body = {
			code:200,msg:"添加成功"
		}

	}catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}

}


exports.showDeviceInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceid;

	var res;

	try{

		res = yield dao.selectUserDeviceInfo(deviceId);
		if(res[0].securityDay){

			//自动给安全运行天加上当前时间
			//每次提交时可以更新当前时间
			if(res[0].securityDaySecond!==''&&res[0].securityDaySecond!==null&&res[0].securityDaySecond!==undefined){

				res[0].securityDaySecond+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

			}
			if(res[0].securityDayFirst!==''&&res[0].securityDayFirst!==null&&res[0].securityDayFirst!==undefined){

				res[0].securityDayFirst+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

			}
			if(res[0].securityDayThird!==''&&res[0].securityDayThird!==null&&res[0].securityDayThird!==undefined){

				res[0].securityDayThird+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

			}

		}

		this.body = {code:200,data:res}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"获取信息失败"};

	}	

}

exports.addDevice = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	query.user_id = this.session.user?this.session.user.user_id:'';

	var res1;

	query.securityDaySecond = parseInt(query.securityDaySecond)||0;
	query.securityDayFirst = parseInt(query.securityDayFirst)||0;
	query.securityDayThird = parseInt(query.securityDayThird)||0;

	try{

		res1 = yield dao.deviceIsExist(query.deviceid);

	}

	catch(e){

		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}
	if(res1.length==0){

		try{
			yield dao.addDevice(query);

/*admin自动关联*/
			if(this.session.user.user_name=='admin'){

				yield dao.addUserDeviceRelation(query.deviceid,'admin',this.session.user.user_id);	
			}


			this.body = {
				code:200,msg:"添加成功"
			}
		}

		catch(e){
			console.log(e);
			this.body ={code:500,msg:"添加失败"};

		}		

	}else{
		try{

			yield dao.modifyDevice(query);
			var random = parseInt(Math.random()*1000);
			
			//修改安全天上报
			yield dao.addOperation({
				id:pad(random,4),
				type:'01',
				deviceid:query.deviceid
			})
			var random = parseInt(Math.random()*1000);
			//修改电话号码上报
			yield dao.addOperation({
				id:pad(random,4),
				type:'08',
				deviceid:query.deviceid
			})

			this.body = {
				code:200,msg:"修改成功"
			}



		}catch(e){
			console.log(e);
			this.body ={code:500,msg:"添加失败"};

		}

	}



}

exports.downMsg = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var ids = query.ids;
	ids = ids.split(',');
	ids = ids.filter(function(d){

		return d!=='';
	});
	var user = query.user;
	var dept = query.dept;
	var demand = query.demand;
	var whole = query.text;
	var random = parseInt(Math.random()*100000);
	var msg_id = pad(random,6);

	var message = [];

	/*字符分割逻辑，留着备用
	var n = 10;

	for (var i = 0, l = whole.length; i < l/n; i++) {

		message.push(whole.slice(n*i, n*(i+1)));

	}*/

	message.push(whole);

		try{


			yield ids.map(function(d){
				var code = pad(random,4);
				dao.addOperation({
					id:code,
					type:'02',
					deviceid:d
				})

				dao.addMsgHistory({

					msg_id:msg_id,
					text:whole,
					deviceid:d,
					user,
					dept,
					demand	
				})

				return dao.addMsgDevice({
					msg_id:msg_id,
					code:code,
					user,
					dept,
					demand
				});

			})

			yield message.map(function(d,index){

				return dao.addMessage({
							text:d,
							index:index,
							msg_id:msg_id,
							user,
							dept,
							demand
				});
			})

			var random = parseInt(Math.random()*1000);
		
			this.body = {
				code:200,msg:"上报成功"
			}

		}catch(e){
			console.log(e);
			this.body ={code:500,msg:"上报失败"};

		}

}



exports.downCheck = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var user = query.user;
	var job = query.job;
	var whole = query.text;
	var random = parseInt(Math.random()*100000);
	var msg_id = pad(random,6);
	var deviceid = query.deviceid;
	var message = [];

	/*字符分割逻辑，留着备用
	var n = 10;

	for (var i = 0, l = whole.length; i < l/n; i++) {

		message.push(whole.slice(n*i, n*(i+1)));

	}*/
	message.push(whole);
		try{
				var code = pad(random,4);
				dao.addOperation({
					id:code,
					type:'09',
					deviceid:deviceid
				})
				dao.addCheckHistory({

					msg_id:msg_id,
					text:whole,
					deviceid:deviceid,
					user,
					job	
				})
				dao.addCheckDevice({
					msg_id:msg_id,
					code:code,
					user,
					job
				});
			yield message.map(function(d,index){
				return dao.addCheck({
							text:d,
							index:index,
							msg_id:msg_id,
							user,
							job
				});
			})
			var random = parseInt(Math.random()*1000);
			this.body = {
				code:200,msg:"上报检查成功"
			}
		}catch(e){
			console.log(e);
			this.body ={code:500,msg:"上报失败"};
		}

}

var crypto = require('crypto');
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

exports.requestVerifyCode = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;
	var phone = query.phone;
	var random = parseInt(Math.random()*100000);
	var verify_code = parseInt(Math.random()*100000);
	var deviceid = query.code;
	var message = [];
		try{
				var code = pad(random,4);
				//添加一个验证码协议

				//如果原来有，删除掉原来的operation

				var resultCache = yield dao.selectPhoneCodeByPhone({
							deviceid,
							phone:phone
				});

				if(resultCache.length!==0){
					yield dao.deleteOperation(resultCache[0]['op_code'],deviceid);
				}

				dao.addOperation({
					id:code,
					type:'10',
					deviceid:deviceid
				})
				// 生成一个验证码占位,通过md5进行判别更新
				dao.addPhoneCode({
					code:pad(verify_code,6),
					deviceid:deviceid,
					phone:phone,
					update_time:+new Date(),
					op_code:code,
					md5:md5(deviceid+phone)
				});
			this.body = {
				code:200,msg:"发送成功"
			}
		}catch(e){
			console.log(e);
			this.body ={code:500,msg:"发送失败"};
		}
}

exports.loginByCode = function* () {
	var obj = {
		user_name: this.query.user_name,
		user_password: this.query.user_password,
		phone: this.query.phone,
		vcode: this.query.vcode,
		deviceid: this.query.code
	}
	// 一天时间过期，判断更新时间和code
	var isValid = yield dao.judgeVerify(obj);
	if (isValid.length === 0 || isValid[0].update_time > 0) {
		this.session.wrongCode = true;
		this.redirect('/loginMobile');
	} else {
		var res = yield dao.loginJudge(obj);
		if (res && res.length !== 0) {
			this.session.user = {};
			this.session.user.user_id = res[0].user_id;
			this.session.user.user_name = res[0].username;
			this.session.user.usertype = res[0].type;
			this.redirect('/check?code=' + this.query.code);
		} else {
			this.session.judged = true;
			this.redirect('/loginMobile');
		}
	}
}

exports.addUserDeviceRelation = function *(next){


	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = query.deviceid,username = query.username;

	var res1,res2;

	try{

		res1 = yield dao.deviceIsExist(deviceId);

		if(res1.length==0){

			this.body = {
				code:200,msg:"设备不存在"
			}
			return

		}

	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"关联失败"};

	}

	try{

		res2 = yield dao.userIsExist(username);

		if(res2.length==0){

			this.body = {
				code:200,msg:"用户不存在"
			}

			return 
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}	


	try{

		yield dao.addUserDeviceRelation(deviceId,username,res2[0].user_id);

			this.body = {
				code:200,msg:"关联成功"
			}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"关联失败"};

	}	


}
exports.addUser = function *(next){


	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var username = query.username;

	var res1,res2;
	try{

		res2 = yield dao.userIsExist(username);

		if(res2.length!==0){

			this.body = {
				code:200,msg:"用户名已经存在"
			}

			return 
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}	


	var user_id = parseInt(Math.random()*10000000,10);

	try{

		yield dao.addUser({
			username:username,
			user_id:user_id,
			type:query.type,
			password:query.password

		});

		this.body = {
				code:200,msg:"添加成功"
			}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}	


}
function pad(num, n) { 
	return (Array(n).join(0) + num).slice(-n); 
} 

exports.downByUser = function*(next){

		var request = this.request,query = this.request.query,qs  =this.request.querystring;

		var random = parseInt(Math.random()*1000);
		try{

			yield dao.addOperation({
				id:pad(random,4),
				type:query.type,
				deviceid:query.deviceId
			})
			this.body = {
				code:200,msg:"下发成功"
			}
		}catch(e){

			this.body = {
				code:500,msg:"下发失败"
			}

		}




}
exports.addDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	try{

		yield dao.addDutyPeople({
			name:query.name,
			number:query.number,
			deviceid:query.deviceId

		});
		/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'03',
			deviceid:query.deviceId
		})
*/
		this.body = {
				code:200,msg:"添加成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}	



}
exports.modifyDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	try{

		yield dao.modifyDutyPeople({
			name:query.name,
			number:query.number,
			id:query.id

		});
/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'03',
			deviceid:query.deviceid
		})
*/
		this.body = {
				code:200,msg:"修改成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"修改失败"};

	}	
}
exports.deleteDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	try{

		yield dao.deleteDutyUser(query.id);
/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'03',
			deviceid:query.deviceid
		})
*/
		this.body = {
				code:200,msg:"删除成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"删除失败"};

	}	


}

exports.selectDutyUser = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;
	var res= [];

	try{

		res = yield dao.selectDutyPeople({
			deviceid:query.deviceId
		});

		this.body = {
				code:200,msg:"获取成功",data:res
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"获取列表失败"};

	}	
}
exports.addTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	try{

		yield dao.addTimeTable({
			train_time:query.train_time,
			train_count:query.train_count,
			deviceid:query.deviceId,
			type:query.type
		});
		/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'05',
			deviceid:query.deviceId
		})*/

		this.body = {
				code:200,msg:"添加成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"添加失败"};

	}	

}

exports.deleteTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	try{

		yield dao.deleteTimeTable(query.id);
		/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'05',
			deviceid:query.deviceId
		})*/
		this.body = {
				code:200,msg:"删除成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"删除失败"};

	}	
}
exports.modifyTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	try{

		yield dao.modifyTimeTable({
			train_time:query.train_time,
			train_count:query.train_count,
			id:query.id,
			type:query.type
		});
		/*
		var random = parseInt(Math.random()*1000);
		yield dao.addOperation({
			id:pad(random,4),
			type:'05',
			deviceid:query.deviceId
		})*/
		this.body = {
				code:200,msg:"修改成功"
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"修改失败"};

	}	
}
exports.selectTimeSchedule = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var res= [];

	try{

		res = yield dao.selectTimeTable({
			deviceid:query.deviceId
		});

		this.body = {
				code:200,msg:"获取成功",data:res
		}
	}

	catch(e){
		console.log(e);
		this.body ={code:500,msg:"获取列表失败"};

	}	
}

exports.showDutyInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	var deviceId = this.query.deviceId;

	var res = yield  dao.showDutyInfo(deviceId);

	this.body =res;
}

exports.showExchangeInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield  dao.showExchangeInfo(deviceId);

	this.body =res;
}

exports.showSituationInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;
	var deviceId = this.query.deviceId;
	var type = this.query.type;
	var res = yield  dao.showSituationInfo(deviceId, type);
	this.body =res;
}
exports.showErrorInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield  dao.showErrorInfo(deviceId);

	this.body =res;
}

exports.showInformationInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield  dao.showInformationInfo(deviceId);

	this.body =res;
}


exports.showMsgHistoryInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield dao.showMsgHistoryInfo(deviceId);
	res = res.map(function(d){
		d.create_time = moment(d.create_time).format('YYYY-MM-DD HH:mm:ss');
		return d
	})

	this.body =res;
}



exports.showCheckHistoryInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield dao.showCheckHistoryInfo(deviceId);
	res = res.map(function(d){
		d.create_time = moment(d.create_time).format('YYYY-MM-DD HH:mm:ss');
		return d
	})

	this.body =res;
}