/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_line_timetable`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_line_timetable`;
CREATE TABLE `monitor_line_timetable` (
  `type` int(2) NOT NULL COMMENT '上行还是下行',
  `deviceid` varchar(20) NOT NULL,
  `id` int(20) NOT NULL,
  `train_count` varchar(30) NOT NULL,
  `train_time` varchar(30) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_line_timetable
-- ----------------------------
