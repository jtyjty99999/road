'use strict';

var comment = require('../../dao/comment');
var assert = require('assert');

describe('comment', function() {
  describe('#add', function() {
    it('should add a record to comment table', function* (){
      var comment_id = yield comment.add({
        user_name: 'ruoqi.drq',
        content: '雪卒测试评论'
      });
      assert(typeof comment_id === 'number');
    });
  });

  describe('#getPageComments', function (){
    var comment_id;
    before(function* (){
      comment_id = yield comment.add({
        user_name: 'ruoqi.drq',
        content: '雪卒测试评论',
        app_id: 'app_123456',
        trace_id: 'trace_123456'
      });
    });
    after(function* (){
      if (comment_id) {
        yield comment.del(comment_id);
      }
    });
    it('should return one matched record', function *(){
      var record = yield comment.getPageComments('app_123456', 'trace_123456');
      assert(record.length === 1);
    });
  });

  describe('#getCommentById', function (){
    var comment_id;
    before(function* (){
      comment_id = yield comment.add({
        user_name: 'ruoqi.drq',
        content: '雪卒测试评论',
        app_id: 'app_1234567',
        trace_id: 'trace_1234567'
      });
    });
    it('should return one matched record', function *(){
      var record = yield comment.getCommentById(comment_id);
      assert(typeof record.id === 'number');
    });
  });

  describe('#delete', function() {
    var comment_id;
    before(function* (){
      comment_id = yield comment.add({
        user_name: 'ruoqi.drq',
        content: '雪卒测试评论',
        app_id: 'app_1234567',
        trace_id: 'trace_1234567'
      });
    });
    it('set status to 1 when deleted', function *(){
      yield comment.del(comment_id);
      var record = yield comment.getCommentById(comment_id);
      assert(record.status === 1);
    });
  });

  describe('#addUser', function() {
    var comment_id;
    var user_name = '雪卒' + Math.random();
    before(function* (){
      comment_id = yield comment.add({
        user_name: user_name,
        content: '雪卒测试评论',
        app_id: 'app_1234567',
        trace_id: 'trace_1234567'
      });
    });
    it('should set buc_id and avatar', function *() {
      var user = {
        name: user_name,
        avatar_url: 'https://avatars2.githubusercontent.com/u/1474688?v=2&s=460',
        bucid: 12312
      };
      yield comment.addUser(user);
      var com = yield comment.getCommentById(comment_id);
      assert(com.buc_id === user.bucid);
      assert(com.avatar === user.avatar_url);
    });
  });
});
