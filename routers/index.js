/**
 * routers/index.js - 路由层
 *
 */

'use strict';

var controllers = require('../controllers');
var page = controllers.page;
var data = controllers.data;

function routes(app) {
  app.get('/protocol', data.log);
  app.get('/index',page.index);
}

module.exports = routes;
