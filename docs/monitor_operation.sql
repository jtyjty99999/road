/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_operation`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_operation`;
CREATE TABLE `monitor_operation` (
  `update_time` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  `deviceid` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作表，用户的每次操作都会记录在这里';

-- ----------------------------
-- Records of monitor_operation
-- ----------------------------
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:48:08', '2015-09-26 19:48:08', '010301005009036', '03', '49');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:55:12', '2015-09-26 19:55:12', '010301005009035', '03', '195');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:06:04', '2015-09-26 19:06:04', '010301005009035', '03', '227');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:55:22', '2015-09-26 19:55:22', '010301005009035', '03', '279');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:56:21', '2015-09-26 19:56:21', '010301005009035', '03', '319');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:55:24', '2015-09-26 19:55:24', '010301005009035', '03', '531');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:47:40', '2015-09-26 19:47:40', '010301005009036', '03', '535');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:55:25', '2015-09-26 19:55:25', '010301005009035', '03', '542');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:48:07', '2015-09-26 19:48:07', '010301005009036', '03', '550');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:56:24', '2015-09-26 19:56:24', '010301005009035', '03', '675');
INSERT INTO `monitor_operation` VALUES ('2015-09-26 19:27:19', '2015-09-26 19:27:19', '010301005009035', '03', '798');
