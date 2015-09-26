/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : monitor

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-09-26 19:59:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `monitor_line_dutypeople`
-- ----------------------------
DROP TABLE IF EXISTS `monitor_line_dutypeople`;
CREATE TABLE `monitor_line_dutypeople` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(30) NOT NULL,
  `update_time` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  `number` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of monitor_line_dutypeople
-- ----------------------------
INSERT INTO `monitor_line_dutypeople` VALUES ('16', '010303008004783', '2015-09-26 19:25:00', '2015-09-26 19:25:00', '3423242342', '2324');
INSERT INTO `monitor_line_dutypeople` VALUES ('17', '010303008004783', '2015-09-26 19:25:26', '2015-09-26 19:25:26', '3423242342', '测试');
INSERT INTO `monitor_line_dutypeople` VALUES ('18', '010303008004783', '2015-09-26 19:26:47', '2015-09-26 19:26:47', '221', '测试');
INSERT INTO `monitor_line_dutypeople` VALUES ('20', '010303008004783', '2015-09-26 19:28:01', '2015-09-26 19:28:01', '3333', '测测');
INSERT INTO `monitor_line_dutypeople` VALUES ('21', '010303008004783', '2015-09-26 19:29:37', '2015-09-26 19:29:37', '3333', '测测');
INSERT INTO `monitor_line_dutypeople` VALUES ('22', '010303008004783', '2015-09-26 19:32:41', '2015-09-26 19:32:41', '3333', '测试');
INSERT INTO `monitor_line_dutypeople` VALUES ('27', '010301005009036', '2015-09-26 19:48:06', '2015-09-26 19:48:06', '544', '21312312');
INSERT INTO `monitor_line_dutypeople` VALUES ('28', '010301005009035', '2015-09-26 19:55:22', '2015-09-26 19:55:22', '4343', '2423');
INSERT INTO `monitor_line_dutypeople` VALUES ('29', '010301005009035', '2015-09-26 19:55:23', '2015-09-26 19:55:23', '4343', '2423');
INSERT INTO `monitor_line_dutypeople` VALUES ('30', '010301005009035', '2015-09-26 19:55:25', '2015-09-26 19:55:25', '4343', '2423');
INSERT INTO `monitor_line_dutypeople` VALUES ('31', '010301005009035', '2015-09-26 19:56:24', '2015-09-26 19:56:24', '44', '43234');
