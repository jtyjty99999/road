/**
 * routers/index.js - 路由层
 *
 */

'use strict';

var controllers = require('../controllers');
var page = controllers.page;
var data = controllers.data;

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
}

module.exports = routes;
