/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_place_code`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_place_code`;
CREATE TABLE `monitor_place_code` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `type` int(3) NOT NULL,
  `code` varchar(8) NOT NULL,
  `name` varchar(20) NOT NULL,
  `parent_code` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_place_code
-- ----------------------------
INSERT INTO `monitor_place_code` VALUES ('1', '2015-09-18 01:50:35', '2015-09-18 01:50:35', '1', '1', '01', '上海铁路局', '0');
INSERT INTO `monitor_place_code` VALUES ('3', '2015-09-18 01:52:08', '2015-09-18 01:52:08', '1', '2', '03', '杭州工务段', '01');
INSERT INTO `monitor_place_code` VALUES ('4', '2015-09-18 01:52:29', '2015-09-18 01:52:29', '1', '3', '01', '兰溪车间', '03');
INSERT INTO `monitor_place_code` VALUES ('5', '2015-09-18 01:53:11', '2015-09-18 01:53:11', '1', '4', '005', '金千线兰溪车间', '01');
INSERT INTO `monitor_place_code` VALUES ('6', '2015-09-18 01:53:53', '2015-09-18 01:53:53', '1', '2', '01', '蚌埠工务段', '01');
INSERT INTO `monitor_place_code` VALUES ('7', '2015-09-18 01:54:01', '2015-09-18 01:54:01', '1', '2', '02', '阜阳工务段', '01');
INSERT INTO `monitor_place_code` VALUES ('8', '2015-09-18 01:54:10', '2015-09-18 01:54:10', '1', '2', '04', '合肥工务段', '01');
INSERT INTO `monitor_place_code` VALUES ('9', '2015-09-18 01:54:23', '2015-09-18 01:54:23', '1', '2', '05', '南京桥工段', '01');
INSERT INTO `monitor_place_code` VALUES ('10', '2015-09-18 01:54:33', '2015-09-18 01:54:33', '1', '2', '06', '宁波工务段', '01');
INSERT INTO `monitor_place_code` VALUES ('11', '2015-09-26 15:18:57', '2015-09-26 15:18:57', '1', '3', '03', '杭州车间', '03');
INSERT INTO `monitor_place_code` VALUES ('12', '2015-09-26 15:19:39', '2015-09-26 15:19:39', '1', '4', '008', '萧萧联络线杭州车间', '03');
