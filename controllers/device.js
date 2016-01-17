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

	query.securityDaySecond = parseInt(query.securityDaySecond);
	query.securityDayFirst = parseInt(query.securityDayFirst);
	query.securityDayThird = parseInt(query.securityDayThird);

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
			
			yield dao.addOperation({
				id:pad(random,4),
				type:'01',
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
	})
	var whole = query.text;
	var random = parseInt(Math.random()*100000);
	var msg_id = pad(random,6);

	var message = [];

	var n = 10;

	for (var i = 0, l = whole.length; i < l/n; i++) {

		message.push(whole.slice(n*i, n*(i+1)));

	}

		try{
			console.log(ids);
			
			yield ids.map(function(d){
				var code = pad(random,4);
				dao.addOperation({
					id:code,
					type:'02',
					deviceid:d
				})

				return dao.addMsgDevice({
					msg_id:msg_id,
					code:code
				});

			})

			yield message.map(function(d,index){

				return dao.addMessage({
							text:d,
							index:index,
							msg_id:msg_id
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

	var res = yield  dao.showSituationInfo(deviceId);

	this.body =res;
}
exports.showErrorInfo = function *(next){

	var request = this.request,query = this.request.query,qs  =this.request.querystring;


	var deviceId = this.query.deviceId;

	var res = yield  dao.showErrorInfo(deviceId);

	this.body =res;
}

