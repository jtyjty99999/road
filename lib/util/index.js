/**!
 * comment - locals.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   高晓晨 <xiaochen.gaoxc@alibaba-inc.com> (http://github.com/gxcsoccer)
 */

exports.mixin = function mixin(a, b) {
  if (a && b) {
    for (var k in b) {
      if (b.hasOwnProperty(k)) {
        a[k] = b[k];
      }
    }
  }
  return a;
};
