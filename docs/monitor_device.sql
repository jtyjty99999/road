/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-15 18:54:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_device`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_device`;
CREATE TABLE `monitor_device` (
  `monitor_id` int(10) NOT NULL,
  `id` int(30) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_device
-- ----------------------------
