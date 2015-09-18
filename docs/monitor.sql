/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50626
 Source Host           : localhost
 Source Database       : monitor

 Target Server Type    : MySQL
 Target Server Version : 50626
 File Encoding         : utf-8

 Date: 09/18/2015 20:48:42 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `monitor_device`
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_device`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_device` VALUES ('010301005009035', '3', '上海铁路局', '01', '测试测试', '005', '22222', '1-3', '2000', '111', '222', '20m', '30m', '01', '03', '2222', '10', '20', '山东', '济南', '100', '马路', '1', '2015-09-18 03:42:16', '2015-09-18 03:42:16', '杭州工务段', '兰溪车间', '金千线');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_duty_info`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_duty_info`;
CREATE TABLE `monitor_duty_info` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `data` varchar(20) DEFAULT NULL,
  `num` varchar(10) DEFAULT NULL,
  `train` varchar(10) DEFAULT NULL,
  `t0` varchar(10) DEFAULT NULL,
  `m0` varchar(10) DEFAULT NULL,
  `m1` varchar(10) DEFAULT NULL,
  `m2` varchar(10) DEFAULT NULL,
  `t1` varchar(10) DEFAULT NULL,
  `t2` varchar(10) DEFAULT NULL,
  `rem0` varchar(200) DEFAULT NULL,
  `dir` varchar(10) DEFAULT NULL,
  `way` varchar(10) DEFAULT NULL,
  `sou` varchar(10) DEFAULT NULL,
  `t3` varchar(10) DEFAULT NULL,
  `t4` varchar(10) DEFAULT NULL,
  `rem1` varchar(200) DEFAULT NULL,
  `deviceid` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_duty_info`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_duty_info` VALUES ('1', '2015/1/1', '0003', 'K8500', '21:14', '008', '568', '', '21:18', '21:43', '%E6%AD%A3%20%E5%B8%B8', '%E6%9C%AA%', '%E6%89%8B%', '%E6%89%8B%', '00009S', null, '%E4%B8%8D%E6%AD%A3%E5%B8%B8', '010301005009035', '2015-09-18 14:53:21', '2015-09-18 14:53:21'), ('2', '2015/1/1', '0003', 'K8500', '21:14', '008', '568', '', '21:18', '21:43', '%E6%AD%A3%20%E5%B8%B8', '%E6%9C%AA%', '%E6%89%8B%', '%E6%89%8B%', '00009S', null, '%E4%B8%8D%E6%AD%A3%E5%B8%B8', '010301005009035', '2015-09-18 15:24:15', '2015-09-18 15:24:15'), ('3', '2015-09-18', '', '%bb%f5%20%', '', '', '', '', '', '', '%d5%fd%20%20%b3%a3', null, '%ca%d6%b6%', null, null, null, null, '222222222222222', '2015-09-18 20:24:02', '2015-09-18 20:24:02'), ('4', '2015-09-18', '', '%b5%f7%20%', '20%3a29', '111', '222', '333', '20%3a29', '20%3a29', '%d5%fd%20%20%b3%a3', null, '%ca%d6%b6%', null, null, null, null, '010301005009035', '2015-09-18 20:27:31', '2015-09-18 20:27:31'), ('5', '2015-09-18', '', '客  车', '20:31', '222', '111', '222', '20:31', '20:31', '正  常', null, '手动', null, null, null, null, '010301005009035', '2015-09-18 20:31:01', '2015-09-18 20:31:01');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_error_info`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_error_info`;
CREATE TABLE `monitor_error_info` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `time` varchar(1000) DEFAULT NULL,
  `con` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_error_info`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_error_info` VALUES ('1', '010301005009035', '2015-09-18 15:35:21', '2015-09-18 15:35:21', '18%E6%97%B651%E5%88%86', '%E9%81%93%E5%8F%A3%E6%97%A0%E4%BA%BA%E7%A1%AE%E8%AE%A4');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_exchange_info`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_exchange_info`;
CREATE TABLE `monitor_exchange_info` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(30) NOT NULL,
  `data` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `shift0` varchar(30) DEFAULT NULL,
  `shift1` varchar(30) DEFAULT NULL,
  `weather` varchar(30) DEFAULT NULL,
  `safe0` varchar(30) DEFAULT NULL,
  `safe1` varchar(30) DEFAULT NULL,
  `safe2` varchar(30) DEFAULT NULL,
  `safe3` varchar(30) DEFAULT NULL,
  `safe4` varchar(30) DEFAULT NULL,
  `safe5` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_exchange_info`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_exchange_info` VALUES ('1', '010301005009035', '2015/1/16:50', '2015-09-18 15:24:04', '2015-09-18 15:24:04', '0003', '0005', '%E6%99%B4', '%E6%AD%A3%E5%B8%B8', '%E6%AD%A3%E5%B8%B8', '%E6%AD%A3%E5%B8%B8', '%E6%AD%A3%E5%B8%B8', '%E6%AD%A3%E5%B8%B8', '%E6%AD%A3%E5%B8%B8'), ('2', '010301005009035', '2015-09-18', '2015-09-18 20:34:30', '2015-09-18 20:34:30', '6789', '0123', '晴', '正常', '正常', '正常', '非正常', '非正常', '非正常');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_online`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_online`;
CREATE TABLE `monitor_online` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='记录设备的实时信息';

-- ----------------------------
--  Table structure for `monitor_operation`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_operation`;
CREATE TABLE `monitor_operation` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作表，用户的每次操作都会记录在这里';

-- ----------------------------
--  Table structure for `monitor_place_code`
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_place_code`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_place_code` VALUES ('1', '2015-09-18 01:50:35', '2015-09-18 01:50:35', '1', '1', '01', '上海铁路局', '0'), ('3', '2015-09-18 01:52:08', '2015-09-18 01:52:08', '1', '2', '03', '杭州工务段', '01'), ('4', '2015-09-18 01:52:29', '2015-09-18 01:52:29', '1', '3', '01', '兰溪车间', '03'), ('5', '2015-09-18 01:53:11', '2015-09-18 01:53:11', '1', '4', '005', '金千线', '01'), ('6', '2015-09-18 01:53:53', '2015-09-18 01:53:53', '1', '2', '01', '蚌埠工务段', '01'), ('7', '2015-09-18 01:54:01', '2015-09-18 01:54:01', '1', '2', '02', '阜阳工务段', '01'), ('8', '2015-09-18 01:54:10', '2015-09-18 01:54:10', '1', '2', '04', '合肥工务段', '01'), ('9', '2015-09-18 01:54:23', '2015-09-18 01:54:23', '1', '2', '05', '南京桥工段', '01'), ('10', '2015-09-18 01:54:33', '2015-09-18 01:54:33', '1', '2', '06', '宁波工务段', '01');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_relation`
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_relation`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_relation` VALUES ('1', '010301005009035', '1', 'admin', '2015-09-18 03:17:50', '2015-09-18 03:17:50');
COMMIT;

-- ----------------------------
--  Table structure for `monitor_situation_info`
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `monitor_situation_info`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_situation_info` VALUES ('1', '010301005009035', '2015-09-18 15:43:55', '2015-09-18 15:43:55', null, null, null, null, null, null), ('2', '010301005009035', '2015-09-18 20:41:18', '2015-09-18 20:41:18', null, null, null, null, null, null), ('3', '010301005009035', '2015-09-18 20:48:02', '2015-09-18 20:48:02', '道口铺面', '15-09-18 20:47', '0123', '调度', '0123', null);
COMMIT;

-- ----------------------------
--  Table structure for `monitor_user`
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
--  Records of `monitor_user`
-- ----------------------------
BEGIN;
INSERT INTO `monitor_user` VALUES ('1', 'admin', 'admin', '1', null, null), ('8147992', 'guest', 'guest', '3', '2015-09-18 17:34:13', '2015-09-18 17:34:13');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
