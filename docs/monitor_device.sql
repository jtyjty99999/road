/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:58:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_device`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_device`;
CREATE TABLE `monitor_device` (
  `deviceid` varchar(20) NOT NULL,
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `roadTopManager` varchar(10) NOT NULL,
  `roadTopManagerCode` varchar(10) NOT NULL,
  `roadname` varchar(50) DEFAULT NULL,
  `roadbelongCode` varchar(10) DEFAULT NULL,
  `roadmiles` varchar(20) DEFAULT NULL,
  `roadfromto` varchar(100) DEFAULT NULL,
  `roadcount` varchar(100) DEFAULT NULL,
  `roadupsituation` varchar(10) DEFAULT NULL,
  `roaddownsituation` varchar(10) DEFAULT NULL,
  `roadleftsituationup` varchar(10) DEFAULT NULL,
  `roadleftsituationdown` varchar(10) DEFAULT NULL,
  `rodeowncarCode` varchar(10) DEFAULT NULL,
  `roadownareaCode` varchar(10) DEFAULT NULL,
  `roadwidth` varchar(20) DEFAULT NULL,
  `roadlineleft` varchar(20) DEFAULT NULL,
  `roadlineright` varchar(20) DEFAULT NULL,
  `roadcity` varchar(20) DEFAULT NULL,
  `roadcountry` varchar(20) DEFAULT NULL,
  `roadtraffic` varchar(20) DEFAULT NULL,
  `roadtype` varchar(20) DEFAULT NULL,
  `user_id` int(8) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `roadownarea` varchar(30) DEFAULT NULL,
  `roadowncar` varchar(30) DEFAULT NULL,
  `roadbelong` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_device
-- ----------------------------
INSERT INTO `monitor_device` VALUES ('010301005009035', '3', '上海铁路局', '01', '通惠路', '005', '22222', '1-333', '2000', '111', '222', '20m', '30m', null, '03', '2222', '10', '20', '杭州', '', '100', '马路', '1', '2015-09-18 03:42:16', '2015-09-26 15:05:54', '杭州工务段', '兰溪车间', '金千线');
INSERT INTO `monitor_device` VALUES ('', '5', '', '', '通惠路道口', '', '', '', '', '', '', '', '', null, '', '', '', '', '', '', '', '', '1', '2015-09-26 10:12:26', '2015-09-26 14:16:42', '', '', '');
INSERT INTO `monitor_device` VALUES ('', '6', '', '', '通惠路道口', '', '', '', '', '', '', '', '', null, '', '', '', '', '', '', '', '', '1', '2015-09-26 10:12:29', '2015-09-26 14:16:42', '', '', '');
INSERT INTO `monitor_device` VALUES ('', '7', '', '', '通惠路道口', '', '', '', '', '', '', '', '', null, '', '', '', '', '', '', '', '', '1', '2015-09-26 10:13:58', '2015-09-26 14:16:42', '', '', '');
INSERT INTO `monitor_device` VALUES ('', '8', '', '', '通惠路道口', '', '', '', '', '', '', '', '', null, '', '', '', '', '', '', '', '', '1', '2015-09-26 10:16:33', '2015-09-26 14:16:42', '', '', '');
INSERT INTO `monitor_device` VALUES ('010301005009036', '9', '上海铁路局', '01', '', '005', '', '', '', '', '', '', '', null, '03', '', '', '', '', '', '', '', '1', '2015-09-26 10:18:17', '2015-09-26 10:18:17', '杭州工务段', '兰溪车间', '金千线');
INSERT INTO `monitor_device` VALUES ('010301005009036', '10', '上海铁路局', '01', '', '005', '', '', '', '', '', '', '', null, '03', '', '', '', '', '', '', '', '1', '2015-09-26 10:18:20', '2015-09-26 10:18:20', '杭州工务段', '兰溪车间', '金千线');
INSERT INTO `monitor_device` VALUES ('010101010041713', '11', '上海铁路局', '01', '通惠路道口', '010', '', '', '', '', '', '', '', null, '01', '', '', '', '', '', '', '', '0', '2015-09-26 14:17:29', '2015-09-26 14:17:29', '蚌埠工务段', '兰溪车间', '');
INSERT INTO `monitor_device` VALUES ('010303008004783', '12', '上海铁路局', '01', '通惠路道口', '008', '', '', '', '', '', '', '', null, '03', '', '', '', '', '', '', '', '1', '2015-09-26 15:20:49', '2015-09-26 15:20:49', '杭州工务段', '杭州车间', '萧萧联络线');
