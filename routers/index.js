/**
 * routers/index.js - 路由层
 *
 */

'use strict';

var controllers = require('../controllers');
var page = controllers.page;
var data = controllers.data;

function routes(app) {
  app.get('*', data.log);
  //app.get('/protocol', data.index);
  app.get('/test', function * () {
    yield * this.render('test');
  });
}

module.exports = routes;
