/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_exchange_info`
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_exchange_info
-- ----------------------------
INSERT INTO `monitor_exchange_info` VALUES ('9', '010301005009035', '2015-09-21', '2015-09-22 10:32:33', '2015-09-22 10:32:33', '0123', '1234', '暴雨', '非正常', '非正常', '非正常', '非正常', '非正常', '非正常');
INSERT INTO `monitor_exchange_info` VALUES ('10', '010301005009035', '2015-09-22', '2015-09-22 11:06:42', '2015-09-22 11:06:42', '1234', '7890', '大雪', '非正常', '正常', '非正常', '正常', '非正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('11', '010301005009035', '2015-09-22', '2015-09-22 11:41:28', '2015-09-22 11:41:28', '7890', '4567', '暴雪', '非正常', '非正常', '非正常', '非正常', '非正常', '非正常');
INSERT INTO `monitor_exchange_info` VALUES ('12', '010301005009035', '2015-09-22', '2015-09-22 16:10:21', '2015-09-22 16:10:21', '4567', '7890', '暴雪', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('13', '010301005009035', '2015-09-23', '2015-09-23 13:20:09', '2015-09-23 13:20:09', '7890', '0123', '阴', '非正常', '非正常', '非正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('14', '010301005009035', '2015-09-24', '2015-09-24 11:57:54', '2015-09-24 11:57:54', '0123', '6789', '暴雨', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('15', '010301005009035', '2015-09-24', '2015-09-24 13:24:52', '2015-09-24 13:24:52', '0009', '0007', '晴', '正常', '正常', '正常', '非正常', '非正常', '非正常');
INSERT INTO `monitor_exchange_info` VALUES ('16', '010301005009035', '2015-09-24', '2015-09-24 13:29:36', '2015-09-24 13:29:36', '0007', '0006', '晴', '非正常', '非正常', '非正常', '非正常', '非正常', '非正常');
INSERT INTO `monitor_exchange_info` VALUES ('17', '010301005009035', '2015-09-26', '2015-09-26 12:14:31', '2015-09-26 12:14:31', '0123', '0123', 'ft', 'ft', 'ft', 'ft', 'ft', 'ft', 'ft');
INSERT INTO `monitor_exchange_info` VALUES ('18', '010301005009035', '2015-09-26', '2015-09-26 12:49:19', '2015-09-26 12:49:19', '0123', '6789', 'ft', 'ft', 'ft', 'ft', 'ft', 'ft', 'ft');
INSERT INTO `monitor_exchange_info` VALUES ('19', '010301005009036', '2015-09-26', '2015-09-26 17:13:13', '2015-09-26 17:13:13', '6789', '6789', 'ft', '', '', '', '', '', '');
INSERT INTO `monitor_exchange_info` VALUES ('20', '010301005009036', '2015-09-26', '2015-09-26 17:26:19', '2015-09-26 17:26:19', '6789', '7890', '\\栬', '', '\\栬', '\\栬', '\\栬', '\\栬', '\\栬');
INSERT INTO `monitor_exchange_info` VALUES ('21', '010301005009036', '2015-09-26', '2015-09-26 17:39:41', '2015-09-26 17:39:41', '7890', '6789', 'ft', '', '', '', '', '', '');
INSERT INTO `monitor_exchange_info` VALUES ('22', '010301005009036', '2015-09-26', '2015-09-26 17:40:12', '2015-09-26 17:40:12', '6789', '6789', 'ft', '', '', '', '', '', '');
INSERT INTO `monitor_exchange_info` VALUES ('23', '010301005009036', '2015-09-26', '2015-09-26 18:01:49', '2015-09-26 18:01:49', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('24', '010301005009036', '2015-09-26', '2015-09-26 18:12:31', '2015-09-26 18:12:31', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('25', '010301005009036', '20150926', '2015-09-26 18:13:59', '2015-09-26 18:13:59', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('26', '010301005009036', '2015-09-26', '2015-09-26 18:16:18', '2015-09-26 18:16:18', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', null);
INSERT INTO `monitor_exchange_info` VALUES ('27', '010301005009036', '2015-09-26', '2015-09-26 18:26:06', '2015-09-26 18:26:06', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('28', '010301005009036', '2015-09-26', '2015-09-26 18:26:13', '2015-09-26 18:26:13', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('29', '010301005009036', '2015-09-26', '2015-09-26 18:26:57', '2015-09-26 18:26:57', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('30', '010301005009036', '2015-09-26', '2015-09-26 18:51:37', '2015-09-26 18:51:37', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('31', '010301005009036', '2015-09-26', '2015-09-26 18:58:08', '2015-09-26 18:58:08', '6789', '0123', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('32', '010301005009036', '2015-09-26', '2015-09-26 19:14:14', '2015-09-26 19:14:14', '0123', '7890', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('33', '010301005009036', '2015-09-26', '2015-09-26 19:23:40', '2015-09-26 19:23:40', '7890', '7890', '晴', '非正常', '非正常', '非正常', '非正常', '非正常', '非正常');
INSERT INTO `monitor_exchange_info` VALUES ('34', '010301005009036', '2015-09-26', '2015-09-26 19:24:38', '2015-09-26 19:24:38', '7890', '4567', '晴', '正常', '正常', '正常', '正常', '正常', '正常');
INSERT INTO `monitor_exchange_info` VALUES ('35', '010301005009036', '2015-09-26', '2015-09-26 19:57:48', '2015-09-26 19:57:48', '4567', '7890', '暴雪', '正常', '正常', '正常', '正常', '正常', '正常');
