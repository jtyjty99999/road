/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_user`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_user`;
CREATE TABLE `monitor_user` (
  `user_id` int(8) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `type` int(5) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_user
-- ----------------------------
INSERT INTO `monitor_user` VALUES ('1', 'admin', 'admin', '1', null, null);
INSERT INTO `monitor_user` VALUES ('7447452', 'HZHTTH01', 'HZHTTH', '3', '2015-09-24 13:34:25', '2015-09-24 13:34:25');
INSERT INTO `monitor_user` VALUES ('8147992', 'guest', 'guest', '3', '2015-09-18 17:34:13', '2015-09-18 17:34:13');
