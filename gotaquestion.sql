-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 03, 2020 at 12:18 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gotaquestion`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) NOT NULL,
  `browser` varchar(300) NOT NULL,
  `activity` varchar(300) NOT NULL,
  `loginid` int(11) NOT NULL,
  PRIMARY KEY (`logid`),
  KEY `FK_LoginID` (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`logid`, `timestamp`, `ip`, `browser`, `activity`, `loginid`) VALUES
(1, '2020-11-03 09:28:10', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 1),
(2, '2020-11-03 09:28:11', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 1),
(3, '2020-11-03 09:28:12', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewquestion', 1),
(4, '2020-11-03 09:28:53', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 1),
(5, '2020-11-03 09:28:53', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 1),
(6, '2020-11-03 09:28:55', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewquestion', 1),
(7, '2020-11-03 09:46:03', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 2),
(8, '2020-11-03 09:46:03', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 2),
(9, '2020-11-03 09:46:03', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewquestion', 2),
(10, '2020-11-03 09:46:24', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 2),
(11, '2020-11-03 09:46:24', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'loginsuccess', 2),
(12, '2020-11-03 09:46:24', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewquestion', 2),
(13, '2020-11-03 09:47:52', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'createquestion', 2),
(14, '2020-11-03 09:47:52', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewquestion', 2),
(15, '2020-11-03 09:54:07', '::1', 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'viewuser', 2);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `loginid` int(11) NOT NULL AUTO_INCREMENT,
  `studentnumber` int(9) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginid`, `studentnumber`, `fullname`, `password`, `status`) VALUES
(1, 123456789, 'Jack David', '123456', 'active'),
(2, 470842368, 'James Paul', '123456', 'active'),
(3, 987654321, 'Mark Chair', '123456', 'active'),
(4, 111111111, 'Bad Users', '123456', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `questionid` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(300) NOT NULL,
  `catagories` varchar(30) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `answer` text,
  `loginid` int(11) NOT NULL,
  `archived` enum('Yes','No') DEFAULT NULL,
  PRIMARY KEY (`questionid`),
  KEY `FK_Login` (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionid`, `question`, `catagories`, `timestamp`, `answer`, `loginid`, `archived`) VALUES
(3, 'Question 3', 'UX3', '2020-10-05 17:40:08', NULL, 3, NULL),
(6, '1', 'project1', '2020-10-06 10:56:51', NULL, 2, NULL),
(13, '11111111111111111111111111111111111111111111111111111112rafafawfafwafawfafafasdadawadadadwawdawdawdad111111111111111111111111111111', 'project1', '2020-10-10 16:30:31', NULL, 1, NULL),
(14, '11111111111111111111111111111111111', 'project1', '2020-10-19 11:10:57', NULL, 2, NULL),
(15, '11111111111111111111111111111111111111111', 'project3', '2020-10-19 11:11:25', NULL, 2, NULL),
(16, '11111111111111111111111111111111111111111111', 'project3', '2020-10-19 11:12:09', NULL, 2, NULL),
(17, '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', 'project4', '2020-10-20 14:02:08', NULL, 1, NULL),
(18, 'another test that will be implemented', 'project1', '2020-11-03 09:47:52', NULL, 2, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `FK_LoginID` FOREIGN KEY (`loginid`) REFERENCES `login` (`loginid`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_Login` FOREIGN KEY (`loginid`) REFERENCES `login` (`loginid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
