/*!
 * comment - koa-nun/index.js
 * Copyright(c) 2014 Alibaba.com
 * Author:
      xiaochen.gaoxc <xiaochen.gaoxc@alibaba-inc.com>

   Todo List:
      [x] resouce cache
      [x] custom extensions
      [x] add render logs
 */

/**
 * Module dependencies.
 */
var path = require('path');
var nunjucks = require('nunjucks');
var thunkify = require('thunkify-wrap');
var FileLoader = require('fileloader');
var utils = require('../../util');
var extension = require('./extension');
var render = require('./render');

module.exports = function(app, opt) {
  var config = app.getEnv('config');
  var viewinfo = config.viewinfo;
  // global macros
  viewinfo.paths.push(path.join(__dirname, './macros'));

  var fileloader = new FileLoader(viewinfo.paths, true, viewinfo.charsets);
  var env = new nunjucks.Environment(fileloader, {
    autoescape: true
  });

  // make sure view templates can visit config
  app.locals.config = config;

  render(app, env, opt);
};
