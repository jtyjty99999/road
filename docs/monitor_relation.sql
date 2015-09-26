/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_relation`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_relation`;
CREATE TABLE `monitor_relation` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(30) NOT NULL,
  `user_id` int(8) NOT NULL,
  `username` varchar(30) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_relation
-- ----------------------------
INSERT INTO `monitor_relation` VALUES ('1', '010301005009035', '1', 'admin', '2015-09-18 03:17:50', '2015-09-18 03:17:50');
INSERT INTO `monitor_relation` VALUES ('2', '010301005009035', '8147992', 'guest', '2015-09-18 20:56:22', '2015-09-18 20:56:22');
INSERT INTO `monitor_relation` VALUES ('4', '010301005009035', '7447452', 'HZHTTH01', '2015-09-24 13:35:51', '2015-09-24 13:35:51');
INSERT INTO `monitor_relation` VALUES ('5', '010301005009035', '1', 'admin', '2015-09-26 10:12:56', '2015-09-26 10:12:56');
INSERT INTO `monitor_relation` VALUES ('6', '010301005009036', '1', 'admin', '2015-09-26 10:18:27', '2015-09-26 10:18:27');
INSERT INTO `monitor_relation` VALUES ('7', '010303008004783', '1', 'admin', '2015-09-26 15:21:21', '2015-09-26 15:21:21');
