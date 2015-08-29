'use strict';

/*
 * comment.js 评论表
 *
 * @author ruoqi.drq@alibaba-inc.com
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

/**
 * 加载页面级别评论
 *
 * @param {String} 应用id
 * @param {String} 区块id
 * @return {Array} 评论列表
 *
 */
var COMMENT_PAGE_LIST_SQL = multiline(function() {/*
  SELECT * FROM
    comment
  WHERE
    app_id=?
  AND
    trace_id=?
  AND
    status=0
*/});
exports.getPageComments = function getPageComments(app_id, trace_id, callback) {
  assert(app_id && trace_id);

  mysql.query(COMMENT_PAGE_LIST_SQL, [app_id, trace_id], function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/**
 * 获取评论
 *
 * @param {Number} 评论id
 * @return {Object} 评论对象
 */
var COMMENT_GET_BY_ID = multiline(function() {/*
  SELECT * FROM
    comment
  WHERE
    id=?
*/});
exports.getCommentById = function getCommentById(comment_id, callback) {
  assert(typeof comment_id === 'number');

  mysql.query(COMMENT_GET_BY_ID, [comment_id], function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result[0]);
    }
  });
};

/**
 * 删除评论
 *
 * @param {Number} 评论id
 * @return {Boolean} 是否成功
 */
var COMMENT_DELETE_SQL = multiline(function() {/*
  UPDATE
    comment
  SET
    status=1
  WHERE
    id=?
*/});
exports.del = function del(comment_id, callback) {
  assert(typeof comment_id === 'number');

  mysql.query(COMMENT_DELETE_SQL, [comment_id], function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, true);
    }
  });
};

/**
 * 更新评论
 *
 * @param {Object} user对象
 * @return
 */
var COMMENT_ADDUSER_SQL = multiline(function() {/*
  UPDATE
    comment
  SET
    buc_id=?,
    avatar=?
  WHERE
    user_name=?
*/});
exports.addUser = function addUser(user, callback) {
  assert(typeof user === 'object');

  mysql.query(COMMENT_ADDUSER_SQL, [user.bucid, user.avatar_url, user.name], function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, true);
    }
  });
};

thunkify(exports);

