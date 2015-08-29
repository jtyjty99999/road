'use strict';

var assert = require('assert');
var mysql = require('../lib/common/mysql');
var pool = mysql.pool;
var thunkify = require('thunkify');

var getConn = pool.getConnection.bind(pool);

describe('mysql', function() {
  describe('transaction', function () {
    it('should rollback when rollback called', function* (){
      var conn = yield getConn;
      var query = thunkify(conn.query).bind(conn);
      var rollback = thunkify(conn.rollback).bind(conn);
      var origin = yield query('select count(*) as count from test');
      yield query('set autocommit=0');
      yield query('insert into test values(null)');
      yield query('insert into test values(null)');
      yield query('insert into test values(null)');
      yield query('insert into test values(null)');
      yield rollback();
      yield query('set autocommit=1');
      var now = yield query('select count(*) as count from test');
      assert.equal(origin[0].count, now[0].count);
      conn.release();
    });
  });
});
