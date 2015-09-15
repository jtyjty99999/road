/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-15 19:28:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_operation`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_operation`;
CREATE TABLE `monitor_operation` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作表，用户的每次操作都会记录在这里';

-- ----------------------------
-- Records of monitor_operation
-- ----------------------------
