'use strict';

/*
 * comment.js 评论表
 *
 * @author tianyi.jiangty@alibaba-inc.com
 *
 */
var mysql = require('../lib/common/mysql');
var thunkify = require('thunkify-wrap');
var assert = require('assert');
var multiline = require('multiline');

/**
 * 添加评论
 *
 * @param {Object} 评论对象
 * @return {Number} 评论id
 */
var COMMENT_ADD_SQL = multiline(function (){/*
  INSERT INTO
    comment(id, create_time, update_time, user_name, content,
      status, parent_id, app_id, trace_id, avatar, buc_id)
  VALUES(NULL, now(), now(), ?, ?, 0, ?, ?, ?, ?, ?)
*/});
exports.add = function add(comment, callback) {
  assert(typeof comment === 'object');

  var values = [comment.user_name, comment.content,
    comment.parent_id, comment.app_id, comment.trace_id,
    comment.avatar, comment.bud_id];
  mysql.query(COMMENT_ADD_SQL, values, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  });
};


thunkify(exports);

