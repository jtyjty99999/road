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
var dao = require('../dao/index');
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

var cache = {};

function findFromCache(cac,record,deviceid,seq){


	if(!cac.deviceid){
		cac.deviceid = {};
	}


	if(!cac.deviceid.record){

		cac.deviceid.record = {};
	}

	if(cac.deviceid.record.seq&&cac.deviceid.record.seq === seq){

		return 0
	}
	cac.deviceid.record.seq =seq;
	
	return 1
}



var log = function *(next){

	var s;
	var request = this.request,query = this.request.query,qs  =this.request.querystring;

	console.log('got!!!'+this.request.url)

	query = querystring.parse(qs,null,null,{decodeURIComponent:function(s){return s}})
	
	for(var key in query){

		s = query[key];

		query[key] = gbkdecodeURIComponent(s);
		console.log(key+':'+gbkdecodeURIComponent(s))
	}


	if(query.Flag=='End'){


		query.deviceid = query.Name;

		if(query.Record=='Operation'){

			if(findFromCache(cache,'Operation',query.deviceid,query.Seq)){

				try{
					yield dao.insertDutyInfo(query);
					console.log('insert Duty Info from:'+query.Name)
				}catch(e){

					console.log(e)
				}


			}else{

				console.log('dumplacated!');
			}


			
		}else if(query.Record=='Shift'){

			if(findFromCache(cache,'Shift',query.deviceid,query.Seq)){

				try{
					yield dao.insertExchangeInfo(query);
					console.log('insert Exchange Info from:'+query.Name)
				}catch(e){

					console.log(e)
				}


			}else{

				console.log('dumplacated!');
			}





		}else if(query.Record=='Alarm'){

			if(findFromCache(cache,'Alarm',query.deviceid,query.Seq)){

				try{
					yield dao.insertErrorInfo(query);
					console.log('insert Error Info from:'+query.Name)
				}catch(e){

					console.log(e)
				}

			}else{

				console.log('dumplacated!');
			}



		}else if(query.Record=='Repair'){

			if(findFromCache(cache,'Repair',query.deviceid,query.Seq)){

				try{
					yield dao.insertSituationInfo(query);
					console.log('insert Situation Info from:'+query.Name)
				}catch(e){

					console.log(e)
				}

			}else{

				console.log('dumplacated!');
			}



		}else if(query.Record=='Heart'){

			//多数量计数
			var countsByCount = 10;

			//处理心跳请求
			var operation,finalString='',type,id,resultCache;

			if(query.Code){ //判断成功后才删除此操作

				console.log(query.Code,query.Count,query.Count&&query.Count!=='0');
				if(query.Count&&query.Count!=='0'){


					if(query.Para=='05'){

						//去数据库搜出来数据发回去
						resultCache = yield dao.findTimeTableByCount({
							deviceid:query.Name,
							s:(Number(query.Count)-1)*countsByCount,
							e:Number(query.Count)*countsByCount,
						});

						//i要对应加上count*+i
							resultCache.forEach(function(d,i){
								i = countsByCount*(query.Count-1)+i;

								if(i<10){

									i='00'+i;

								}else if(i<99){

									i='0'+i;
								}
								finalString+=',T'+i+'='+d.train_count+'-'+d.train_time;
							});
						this.body =iconv.encode('Name='+query.Name+',Record='+query.Record+',Para=05,Code='+query.Code+',Count='+query.Count+finalString,'gbk');

					}else if(query.Para=='01'){


						//先搜哪一条

						//再搜信息

						//去数据库搜出来数据发回去
						/*
						resultCache = yield dao.findMsgByCount({
							deviceid:query.Name,
							s:(Number(query.Count)-1)*countsByCount,
							e:Number(query.Count)*countsByCount,
						});*/

						//i要对应加上count*+i
						/*
							resultCache.forEach(function(d,i){
								i = countsByCount*(query.Count-1)+i;

								if(i<10){

									i='00'+i;

								}else if(i<99){

									i='0'+i;
								}
								finalString+=',T'+i+'='+d.train_count+'-'+d.train_time;
							});
						this.body =iconv.encode('Name='+query.Name+',Record='+query.Record+',Para=05,Code='+query.Code+',Count='+query.Count+finalString,'gbk');
*/

					}

					return;

				}else{

					yield dao.deleteOperation(query.Code,query.Name);
				}


			}

			try{

				operation = yield dao.selectOperation(query.Name);

			}catch(e){

				console.log(e)
			}

			if(operation.length!==0){

				console.log('detected unsync operation;')
				console.log(operation);
				type = operation[0]['type'],id=operation[0]['id'];

				if(type=='03'){

					//工号上行		

					try{

						resultCache = yield dao.selectDutyPeople({
									deviceid:query.Name
							});			

						resultCache.forEach(function(d,i){

							if(i<10){
								i='0'+i
							}
							finalString+=',Num'+i+'='+d.number+'-'+d.name;
						});
						//console.log(this.body = 'Name='+query.Name+',Record='+query.Record+',Para=03,code='+id+finalString)
						console.log(finalString);
						this.body = iconv.encode('Name='+query.Name+',Record='+query.Record+',Para=03,Code='+id+finalString,'gbk');
						return

					}catch(e){

						console.log(e)
					}


				}else if(type=='05'){


					//时刻上行

					try{

						resultCache = yield dao.selectTimeTable({
									deviceid:query.Name
							});			
						/*
						resultCache.forEach(function(d,i){


							finalString+=',T'+i+'='+d.train_count+'-'+d.train_time;
						});*/
						var count = Math.ceil(resultCache.length/countsByCount);

						if(count<10){

							count='0'+count;

						}
						console.log('Name='+query.Name+',Record='+query.Record+',Para=05,Count='+count+',Code='+id)
						this.body = iconv.encode('Name='+query.Name+',Record='+query.Record+',Para=05,Count='+count+',Code='+id,'gbk');
						return
					}catch(e){

						console.log(e)
					}


				}else if(type=='01'){
					var res;
					//安全上行

					try{

						res = yield dao.selectUserDeviceInfo(query.Name);
						
						if(res[0].securityDay){

							//自动给安全运行天加上当前时间
							//每次提交时可以更新当前时间
							if(res[0].securityDaySecond){

								res[0].securityDaySecond+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

							}else{

								res[0].securityDaySecond = 0;
							}
							if(res.securityDayFirst){

								res[0].securityDayFirst+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

							}else{

								res[0].securityDayFirst = 0;
							}
							if(res.securityDayThird){

								res[0].securityDayThird+= parseInt((+ new Date()-(+new Date(res[0].securityDay)))/1000/24/3600);

							}else{

								res[0].securityDayThird = 0;
							}

						}
						console.log('Name='+query.Name+',Record='+query.Record+',Para=01,Data0='+ res[0].securityDayFirst +',Data1='+res[0].securityDaySecond +',Data2='+res[0].securityDayThird +',Code='+id);
						this.body = iconv.encode('Name='+query.Name+',Record='+query.Record+',Para=01,Data0='+ res[0].securityDayFirst +',Data1='+res[0].securityDaySecond +',Data2='+res[0].securityDayThird +',Code='+id,'gbk');
						return
					}catch(e){

						console.log(e)
					}


				}


			}else{

				console.log('no unsync operation;');
				this.body = 'Name='+query.Name+',Record='+query.Record+',Para=00';
				return
			}


		}


	}

	this.body = 'Name='+query.Name+',Record='+query.Record+',Seq='+query.Seq;

}
//parseInt(Math.random()*1000)  每次工号和列车时刻设置记录一个操作码，每次心跳过来取属于当前设备的一条，code发回去

module.exports = {

	index:index,
	log:log
}