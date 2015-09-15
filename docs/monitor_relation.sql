/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-15 18:54:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_relation`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_relation`;
CREATE TABLE `monitor_relation` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `device_id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_relation
-- ----------------------------
