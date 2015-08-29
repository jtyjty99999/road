/**!
 * logger.js
 *
 * Copyright(c) 2014 Alibaba Group Holding Limited.
 * Authors:
 *   姜天意 <tianyi.jiangty@alibaba-inc.com> (http://github.com/jtyjty99999)
 */

"use strict";

/**
 * Module dependencies.
 */

var net = require('net');


var tester = {

  length: function(value, min, max) {
    min = min | 0;

    var length = ((value || '') + '').length;

    if (length < min) {
      return false;
    }
    if (max && length > max) {
      return false;
    }
    return true;
  },

  required: function(value) {

    return ((value || '') + '').length > 0;

  },

  idnumber: function(value) {
    'use strict';
    if (/^\d{15}$/.test(value)) {
      return true;
    }
    if ((/^\d{17}[0-9xX]$/).test(value)) {
      var vs = '1,0,x,9,8,7,6,5,4,3,2'.split(','),
        ps = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(','),
        ss = value.toLowerCase().split(''),
        r = 0;
      for (var i = 0; i < 17; i++) {
        r += ps[i] * ss[i];
      }
      var isOk = (vs[r % 11] === ss[17]);
      return isOk;
    }
    return false;
  },

  int: function(value) {
    var val = parseInt(value, 10);
    if (isNaN(val)) {
      return false;
    }
    return (val + '').length === value.length;
  },

  float: function(value) {

    return Math.floor(value) == value

  },

  range: function(value, min, max) {
    value = parseInt(value, 10);
    min = min | 0;
    if (isNaN(value) || value < min) {
      return false;
    }
    if (max && value > max) {
      return false;
    }
    return true;
  },

  ip4: function(value) {
    return net.isIPv4(value);
  },

  ip6: function(value) {
    return net.isIPv6(value);
  },

  ip: function(value) {
    return net.isIP(value);
  }
};

var regMap = {

  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,

  timestamp: /^[1-5]\d{12}$/,

  cn: /^[\u4e00-\u9fa5\u3002\u2022]{2,32}$/,

  mobile: /^(13|15|18|14|17)\d{9}$/,

  zipcode: /^\d{6}$/,

  url: /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/,

}

for (var key in regMap) {

  (function(reg) {

    tester[''+key] = function(value) {

      return reg.test(value);

    }

  })(regMap[key])

}


module.exports = function(type,arguments){

  if(tester[type]){

      return tester[type].apply(null,arguments)

  }

  

}