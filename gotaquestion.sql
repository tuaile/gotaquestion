-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 25, 2021 at 03:08 AM
-- Server version: 8.0.21
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
-- Table structure for table `catagories`
--

DROP TABLE IF EXISTS `catagories`;
CREATE TABLE IF NOT EXISTS `catagories` (
  `catagoriesid` int NOT NULL AUTO_INCREMENT,
  `catagories` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`catagoriesid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catagories`
--

INSERT INTO `catagories` (`catagoriesid`, `catagories`) VALUES
(1, 'Project 1'),
(2, '	\r\nProject 2'),
(3, '	\r\nProject 3'),
(4, '	\r\nProject 4'),
(5, 'UX 1'),
(6, 'UX 2'),
(7, 'UX 3'),
(8, 'Uncategorised');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `logid` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) NOT NULL,
  `browser` varchar(300) NOT NULL,
  `activity` varchar(300) NOT NULL,
  `loginid` int NOT NULL,
  PRIMARY KEY (`logid`),
  KEY `FK_LoginID` (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=16119 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `loginid` int NOT NULL AUTO_INCREMENT,
  `studentnumber` int NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `role` enum('teacher','student') NOT NULL DEFAULT 'student',
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginid`, `studentnumber`, `fullname`, `password`, `status`, `role`) VALUES
(1, 123456789, 'Teacher Smiths', '$2y$10$SWvyI/EqMlgIo82UomvcuOjb82Y3bOMSIimAAcciZp3ZxXoAlik7i', 'active', 'teacher'),
(2, 987654321, 'Student Barry', '$2y$10$WxrJEFso3zLXK5NQgc5ubexfTkb13xwzFwwXDCu2KhNWjlGeXqSn.', 'active', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `questionid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(300) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `answer` text,
  `loginid` int NOT NULL,
  `archived` enum('Yes','No') DEFAULT NULL,
  `catagories` int NOT NULL,
  PRIMARY KEY (`questionid`),
  KEY `FK_Login` (`loginid`),
  KEY `FK_Catagories` (`catagories`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`questionid`, `question`, `timestamp`, `answer`, `loginid`, `archived`, `catagories`) VALUES
(172, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper cursus odio, a elementum diam. In et tincidunt erat. Praesent erat lacus, semper eu elementum ut, convallis id lorem. Quisque porta, nisl nec dapibus blandit, turpis lectus finibus ex, id venenatis ante magna vel sapien. Nam ', '2021-05-25 13:04:51', NULL, 1, NULL, 1),
(173, 'In id porttitor lacus, vel tempor eros. Donec sed egestas magna, quis luctus enim. Quisque vel blandit purus. Maecenas eget libero id elit viverra iaculis nec in urna. Praesent malesuada turpis dolor, non ornare metus congue vel. Aenean ultricies eleifend leo, id varius eros mollis non. Donec nulla ', '2021-05-25 13:05:04', NULL, 1, NULL, 5),
(174, 'Etiam euismod aliquet nulla, id sodales nulla mattis eu. Mauris vitae mi eget neque tincidunt iaculis. Suspendisse posuere velit ut elit commodo, at ultrices ligula efficitur. In in porttitor lectus. Etiam eget ligula quis odio faucibus ullamcorper at eget metus. Maecenas ex augue, fermentum eu grav', '2021-05-25 13:05:19', NULL, 1, NULL, 6);

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
  ADD CONSTRAINT `FK_Catagories` FOREIGN KEY (`catagories`) REFERENCES `catagories` (`catagoriesid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
