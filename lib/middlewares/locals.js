/**!
 * locals.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   高晓晨 <xiaochen.gaoxc@alibaba-inc.com> (http://github.com/gxcsoccer)
 */


'use strict';

/**
 * Module dependencies.
 */

var merge = require('merge-descriptors');
var delegate = require('delegates');
var utils = require('../util');

function locals(ctx, parent) {
  merge(ctx, {
    /**
     * Get locals.
     *
     * @return {Object} locals
     * @api public
     */

    get locals() {
      if (this._locals) {
        return this._locals;
      }
      this._locals = utils.mixin({}, parent && parent.locals);
      return this._locals;
    },

    /**
     * Extend req locals with new locals.
     *
     * @param {Object} locals
     * @api public
     */

    set locals(locals) {
      utils.mixin(this.locals, locals);
    }
  });
}

module.exports = function localsify(app, o) {
  locals(app);
  app.locals = o;

  locals(app.response, app);
  // delegate this.locals to this.response.locals
  delegate(app.context, 'response').access('locals');
};
