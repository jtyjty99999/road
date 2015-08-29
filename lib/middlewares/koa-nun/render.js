/*!
 * comment - koa-nun/index.js
 * Copyright(c) 2014 Alibaba.com
 * Author:
      xiaochen.gaoxc <xiaochen.gaoxc@alibaba-inc.com>
 */

/**
 * Module dependencies.
 */
var thunkify = require('thunkify-wrap');
var delegate = require('delegates');
var utils = require('../../util');
var extension = require('./extension');

module.exports = function(app, env, opt) {
  env.coRender = thunkify(env.render);

  app.response.render = function * (name, locals) {
    var filename = name + '.ntpl';
    var context = {};
    utils.mixin(context, this.locals);
    utils.mixin(context, locals);
    context.ctx = this.ctx;
    return this.body = yield env.coRender(filename, context);
  };

  delegate(app.context, 'response').method('render');

};