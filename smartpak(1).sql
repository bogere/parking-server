-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2017 at 07:13 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `smartpak`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE IF NOT EXISTS `drivers` (
  `driver_id` int(200) NOT NULL AUTO_INCREMENT COMMENT 'The primary key for the drivers',
  `username` varchar(200) NOT NULL COMMENT 'username of the drivers',
  `password` varchar(200) NOT NULL COMMENT 'secret passwords to use',
  PRIMARY KEY (`driver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `username`, `password`) VALUES
(1, 'bogere', '$2a$10$bORF2UiUMADfnqDi5x94n./BxOtnqhY1PrUnLIkEWJeBIBEwfII2a'),
(2, 'baker', '$2a$10$bORF2UiUMADfnqDi5x94n.nND0kSZDCrcCovoZYorTzS/mNuSXkmK'),
(3, 'hello', '$2a$10$tkUL9tCN8vfECqFd0A07nuWynUHNxybMs0swy7QCILXxGpLzFBF5O');

-- --------------------------------------------------------

--
-- Table structure for table `parking operator`
--

CREATE TABLE IF NOT EXISTS `parking operator` (
  `operator_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'unique identifier for parking operator',
  `operator_name` varchar(20) NOT NULL COMMENT 'username of the parking operator',
  `operator_pass` varchar(20) NOT NULL COMMENT 'secret passwords to use',
  PRIMARY KEY (`operator_id`),
  UNIQUE KEY `operator_name` (`operator_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `parkingslot`
--

CREATE TABLE IF NOT EXISTS `parkingslot` (
  `slot_id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'unique identifier for parking slot',
  `slot_name` varchar(100) NOT NULL COMMENT 'name of parking slot',
  `slot_occupant` varchar(100) NOT NULL COMMENT ' username of driver who booked',
  `slot_status` tinyint(1) NOT NULL COMMENT 'full or empty or reserved parking slot',
  `reservedTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'time when user reserved the slot',
  `startTime` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000' COMMENT 'when the vehicle parks as detected by sensor',
  `endtime` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000' COMMENT 'when the car leaves the parking slot',
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `parkingslot`
--

INSERT INTO `parkingslot` (`slot_id`, `slot_name`, `slot_occupant`, `slot_status`, `reservedTime`, `startTime`, `endtime`) VALUES
(1, 'slot1', 'uat 123 p', 0, '2017-06-25 17:12:51.141739', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(2, 'slo2', 'uat356', 0, '2017-06-25 17:12:51.211785', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(3, 'slot3', 'uat560', 0, '2017-06-25 17:12:51.289837', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(4, 'slot4', 'uat12t', 0, '2017-06-25 17:12:51.378896', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
