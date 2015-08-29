/**!
 * application.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */
var koa = require('koa');
var router = require('koa-router');
var onerror = require('koa-onerror');
var middlewares = require('koa-middlewares');

var routes = require('../routers/index.js');
var config = require('../config');

exports.createApp = function(options) {
  options = options || {};
  var app = koa();
  inject(app);
  initApp(app, options);
  return app;
};

/**
 * 初始化
 */
function initApp(app, options) {
  options.base = options.base || process.cwd();

  app.inject(env);
  app.setEnv('baseDir', options.base);
  app.setEnv('config', config);


  app.proxy = true;
  app.use(middlewares.favicon());
  app.use(middlewares.rt());

  if (config.debug && app.env !== 'test') {
    onerror(app);
  }

  app.inject(require('./middlewares/locals'));
  app.inject(require('./middlewares/koa-nun'));

  //router
  app.use(router(app));
  app.inject(routes);

  app.on('error', function(err) {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    console.log(err.stack);
  });
}

function inject(app) {
  app.inject = function(func) {
    func(app);
  };
}

function env(app) {
  app._customEnvs = {};
  app.setEnv = function(name, val) {
    this._customEnvs[name] = val;
  };
  app.getEnv = function(name) {
    return this._customEnvs[name];
  };
}
