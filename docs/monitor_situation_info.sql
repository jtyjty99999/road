/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_situation_info`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_situation_info`;
CREATE TABLE `monitor_situation_info` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(20) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `equ` varchar(100) DEFAULT NULL,
  `data0` varchar(100) DEFAULT NULL,
  `num0` varchar(100) DEFAULT NULL,
  `ele` varchar(100) DEFAULT NULL,
  `data1` varchar(100) DEFAULT NULL,
  `num1` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_situation_info
-- ----------------------------
INSERT INTO `monitor_situation_info` VALUES ('3', '010301005009035', '2015-09-18 20:48:02', '2015-09-18 20:48:02', '道口铺面', '15-09-18 20:47', '0123', '调度', '0123', '111');
INSERT INTO `monitor_situation_info` VALUES ('4', '010301005009035', '2015-09-21 12:08:23', '2015-09-21 12:08:23', '123', '2014/7/25', '0007', '67', '2014/7/27', '0002');
INSERT INTO `monitor_situation_info` VALUES ('5', '010301005009035', '2015-09-21 14:06:33', '2015-09-21 14:06:33', '123', '2014/7/25', '0007', '67', '2014/7/27', '0002');
INSERT INTO `monitor_situation_info` VALUES ('6', '010301005009035', '2015-09-21 14:08:16', '2015-09-21 14:08:16', '123', '2014/7/25', '0007', '67', '2014/7/27', '0002');
INSERT INTO `monitor_situation_info` VALUES ('7', '010301005009035', '2015-09-21 14:42:18', '2015-09-21 14:42:18', '123', '2014/7/25', '0007', '67', '2014/7/27', '0002');
INSERT INTO `monitor_situation_info` VALUES ('8', '010301005009035', '2015-09-21 14:44:50', '2015-09-21 14:44:50', '123', '2014/7/25', '0007', '67', '2014/7/27', '0002');
INSERT INTO `monitor_situation_info` VALUES ('9', '010301005009035', '2015-09-21 14:55:35', '2015-09-21 14:55:35', '123', '2014/7/25', '0007', '67', '2014/7/27', '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
INSERT INTO `monitor_situation_info` VALUES ('10', '010301005009035', '2015-09-22 10:33:16', '2015-09-22 10:33:16', '道口信号', '15-09-21 13:21', '1234', '车站', '1234', null);
INSERT INTO `monitor_situation_info` VALUES ('11', '010301005009036', '2015-09-26 19:14:44', '2015-09-26 19:14:44', '道口信号', '15-09-26 19:14', '7890', '车站', '7890', null);
