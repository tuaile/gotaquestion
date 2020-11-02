-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 02, 2020 at 04:14 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=919 DEFAULT CHARSET=latin1;

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
(2, 123456789, 'One To Nine', '123456', 'active'),
(3, 987654321, 'Nine To One', '123456', 'active'),
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionid`, `question`, `catagories`, `timestamp`, `answer`, `loginid`, `archived`) VALUES
(3, 'Question 3', 'UX3', '2020-10-05 17:40:08', 'hi', 3, NULL),
(6, '1', 'project1', '2020-10-06 10:56:51', NULL, 2, NULL),
(13, '11111111111111111111111111111111111111111111111111111112rafafawfafwafawfafafasdadawadadadwawdawdawdad111111111111111111111111111111', 'project1', '2020-10-10 16:30:31', NULL, 1, NULL),
(14, '11111111111111111111111111111111111', 'project1', '2020-10-19 11:10:57', NULL, 2, NULL),
(15, '11111111111111111111111111111111111111111', 'project3', '2020-10-19 11:11:25', NULL, 2, NULL),
(16, '11111111111111111111111111111111111111111111', 'project3', '2020-10-19 11:12:09', NULL, 2, NULL),
(17, '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', 'project4', '2020-10-20 14:02:08', NULL, 1, NULL);

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
