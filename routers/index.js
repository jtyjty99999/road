/**
 * routers/index.js - 路由层
 *
 */

'use strict';

var controllers = require('../controllers');
var page = controllers.page;
var data = controllers.data;

var device = controllers.device;

var aa = controllers.aa;

function routes(app) {
  app.get('/protocol', data.log);
  app.get('/index',page.index);
  app.get('/login',page.login);


  //*用户轨迹分析用*//

  app.get('/aaindex',aa.index);
  app.get('/aalist',aa.list);
    app.get('/aasetup',aa.setup);
    app.get('/aahelp',aa.help);
    app.get('/aamy',aa.my);
    app.get('/aarecord',aa.record);


/*设备详情操作*/

app.get('/ajax/modifyDevice',device.modifyDevice);//修改设备信息
app.get('/ajax/addDevice',device.addDevice);//新增设备信息
app.get('/ajax/showDeviceInfo',device.showDeviceInfo);//展示设备信息

app.get('/ajax/addDutyUser',device.addDutyUser);//新增值班人员
app.get('/ajax/modifyDutyUser',device.modifyDutyUser);//修改值班人员
app.get('/ajax/deleteDutyUser',device.deleteDutyUser);//删除值班人员


app.get('/ajax/addTimeSchedule',device.addTimeSchedule);//新增时刻表
app.get('/ajax/modifyTimeSchedule',device.modifyTimeSchedule);//修改时刻表
app.get('/ajax/deleteTimeSchedule',device.deleteTimeSchedule);//删除时刻表


app.get('/ajax/showDutyInfo',device.showDutyInfo);//当班信息
app.get('/ajax/showExchangeInfo',device.showExchangeInfo);//交接班信息
app.get('/ajax/showSituationInfo',device.showSituationInfo);//设备状况
app.get('/ajax/showErrorInfo',device.showErrorInfo);//设备违规信息

}

module.exports = routes;


