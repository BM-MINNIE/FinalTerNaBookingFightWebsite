-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 12, 2025 at 12:13 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bingubp`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `loginUser` (
    IN `user_email` VARCHAR(100), 
    IN `user_pass` VARCHAR(100), 
    OUT `roleCus` BOOLEAN, 
    OUT `roleAd` BOOLEAN, 
    OUT `roleSta` BOOLEAN, 
    OUT `exist` BOOLEAN
)   
BEGIN
    DECLARE userRole VARCHAR(50);

    -- Set defaults to FALSE
    SET roleCus = FALSE;
    SET roleAd = FALSE;
    SET roleSta = FALSE;
    SET exist = FALSE;

    -- Get user role with TRIM to remove spaces
    SELECT role INTO userRole
    FROM users
    WHERE TRIM(users.email) = TRIM(user_email) 
      AND TRIM(users.password) = TRIM(user_pass)
    LIMIT 1;

    -- If user found
    IF userRole IS NOT NULL THEN
        SET exist = TRUE;
        
        -- Check role
        IF userRole = 'customer' THEN
            SET roleCus = TRUE;
        ELSEIF userRole = 'admin' THEN
            SET roleAd = TRUE;
        ELSEIF userRole = 'staff' THEN
            SET roleSta = TRUE;
        END IF;
    END IF;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `regis` (IN `FirstName` VARCHAR(100), IN `LastName` VARCHAR(100), IN `ema` VARCHAR(100), OUT `can` BOOLEAN)   BEGIN
    DECLARE countUser INT;

    SELECT COUNT(*) INTO countUser
    FROM users
    WHERE LOWER(fname) = LOWER(FirstName)
      AND LOWER(lname) = LOWER(LastName)
      OR email = ema;

    IF countUser = 0 THEN
        SET can = TRUE;  -- สมัครได้
    ELSE
        SET can = FALSE; -- มีซ้ำแล้ว
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `airplane`
--

CREATE TABLE `airplane` (
  `airplane_id` varchar(20) NOT NULL,
  `model` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `airplane`
--

INSERT INTO `airplane` (`airplane_id`, `model`, `capacity`, `status`) VALUES
('AP001', 'Boeing 737', 160, 'Active'),
('AP002', 'Airbus A350', 300, 'Active'),
('AP003', 'Boeing 787', 250, 'Active'),
('AP004', 'Airbus A320', 180, 'Active'),
('AP005', 'Boeing 737', 160, 'Active'),
('AP006', 'Airbus A350', 300, 'Active'),
('AP007', 'Boeing 787', 250, 'Active'),
('AP008', 'Airbus A320', 180, 'Active'),
('AP009', 'Boeing 737', 160, 'Active'),
('AP010', 'Airbus A350', 300, 'Active'),
('AP011', 'Boeing 787', 250, 'Active'),
('AP012', 'Airbus A320', 180, 'Active'),
('AP013', 'Boeing 737', 160, 'Active'),
('AP014', 'Airbus A350', 300, 'Active'),
('AP015', 'Boeing 787', 250, 'Active'),
('AP016', 'Airbus A320', 180, 'Active'),
('AP017', 'Boeing 737', 160, 'Active'),
('AP018', 'Airbus A350', 300, 'Active'),
('AP019', 'Boeing 787', 250, 'Active'),
('AP020', 'Airbus A320', 180, 'Active'),
('AP021', 'Boeing 737', 160, 'Active'),
('AP022', 'Airbus A350', 300, 'Active'),
('AP023', 'Boeing 787', 250, 'Active'),
('AP024', 'Airbus A320', 180, 'Active'),
('AP025', 'Boeing 737', 160, 'Active'),
('AP026', 'Airbus A350', 300, 'Active'),
('AP027', 'Boeing 787', 250, 'Active'),
('AP028', 'Airbus A320', 180, 'Active'),
('AP029', 'Boeing 737', 160, 'Active'),
('AP030', 'Airbus A350', 300, 'Active'),
('AP031', 'Boeing 787', 250, 'Active'),
('AP032', 'Airbus A320', 180, 'Active'),
('AP033', 'Boeing 737', 160, 'Active'),
('AP034', 'Airbus A350', 300, 'Active'),
('AP035', 'Boeing 787', 250, 'Active'),
('AP036', 'Airbus A320', 180, 'Active'),
('AP037', 'Boeing 737', 160, 'Active'),
('AP038', 'Airbus A350', 300, 'Active'),
('AP039', 'Boeing 787', 250, 'Active'),
('AP040', 'Airbus A320', 180, 'Active'),
('AP041', 'Boeing 737', 160, 'Active'),
('AP042', 'Airbus A350', 300, 'Active'),
('AP043', 'Boeing 787', 250, 'Active'),
('AP044', 'Airbus A320', 180, 'Active'),
('AP045', 'Boeing 737', 160, 'Maintenance'),
('AP046', 'Airbus A350', 300, 'Active'),
('AP047', 'Boeing 787', 250, 'Maintenance'),
('AP048', 'Airbus A320', 180, 'Maintenance'),
('AP049', 'Boeing 737', 160, 'Active'),
('AP050', 'Airbus A350', 300, 'Maintenance'),
('AP051', 'Boeing 787', 250, 'Active'),
('AP052', 'Airbus A320', 180, 'Maintenance'),
('AP053', 'Boeing 737', 160, 'Maintenance'),
('AP054', 'Airbus A350', 300, 'Active'),
('AP055', 'Boeing 787', 250, 'Active'),
('AP056', 'Airbus A320', 180, 'Maintenance'),
('AP057', 'Boeing 737', 160, 'Active'),
('AP058', 'Airbus A350', 300, 'Maintenance'),
('AP059', 'Boeing 787', 250, 'Active'),
('AP060', 'Airbus A320', 180, 'Maintenance'),
('AP061', 'Boeing 737', 160, 'Maintenance'),
('AP062', 'Airbus A350', 300, 'Active'),
('AP063', 'Boeing 787', 250, 'Maintenance'),
('AP064', 'Airbus A320', 180, 'Active'),
('AP065', 'Boeing 737', 160, 'Active'),
('AP066', 'Airbus A350', 300, 'Maintenance'),
('AP067', 'Boeing 787', 250, 'Maintenance'),
('AP068', 'Airbus A320', 180, 'Maintenance'),
('AP069', 'Boeing 737', 160, 'Maintenance'),
('AP070', 'Airbus A350', 300, 'Active'),
('AP071', 'Boeing 787', 250, 'Maintenance'),
('AP072', 'Airbus A320', 180, 'Active'),
('AP073', 'Boeing 737', 160, 'Maintenance'),
('AP074', 'Airbus A350', 300, 'Maintenance'),
('AP075', 'Boeing 787', 250, 'Maintenance'),
('AP076', 'Airbus A320', 180, 'Active'),
('AP077', 'Boeing 737', 160, 'Active'),
('AP078', 'Airbus A350', 300, 'Active'),
('AP079', 'Boeing 787', 250, 'Maintenance'),
('AP080', 'Airbus A320', 180, 'Active'),
('AP081', 'Boeing 737', 160, 'Maintenance'),
('AP082', 'Airbus A350', 300, 'Maintenance'),
('AP083', 'Boeing 787', 250, 'Maintenance'),
('AP084', 'Airbus A320', 180, 'Maintenance'),
('AP085', 'Boeing 737', 160, 'Active'),
('AP086', 'Airbus A350', 300, 'Maintenance'),
('AP087', 'Boeing 787', 250, 'Maintenance'),
('AP088', 'Airbus A320', 180, 'Maintenance'),
('AP089', 'Boeing 737', 160, 'Active'),
('AP090', 'Airbus A350', 300, 'Maintenance'),
('AP091', 'Boeing 787', 250, 'Maintenance'),
('AP092', 'Airbus A320', 180, 'Active'),
('AP093', 'Boeing 737', 160, 'Maintenance'),
('AP094', 'Airbus A350', 300, 'Active'),
('AP095', 'Boeing 787', 250, 'Active'),
('AP096', 'Airbus A320', 180, 'Active'),
('AP097', 'Boeing 737', 160, 'Maintenance'),
('AP098', 'Airbus A350', 300, 'Active'),
('AP099', 'Boeing 787', 250, 'Active'),
('AP100', 'Airbus A320', 180, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE `airports` (
  `airport_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`airport_id`, `name`, `location`) VALUES
('BKK', 'Suvarnabhumi International Airport', 'Bangkok, Thailand'),
('CTS', 'New Chitose Airport', 'Sapporo, Japan'),
('DMK', 'Don Mueang International Airport', 'Bangkok, Thailand'),
('FUK', 'Fukuoka Airport', 'Fukuoka, Japan'),
('KIX', 'Kansai International Airport', 'Osaka, Japan'),
('NGO', 'Chubu Centrair International Airport', 'Nagoya, Japan'),
('NRT', 'Narita International Airport', 'Tokyo, Japan'),
('OKA', 'Naha Airport', 'Okinawa, Japan');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flight_id` varchar(20) NOT NULL,
  `booking_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `flight_id` varchar(20) NOT NULL,
  `airplane_id` varchar(20) DEFAULT NULL,
  `source_airport_id` varchar(20) NOT NULL,
  `destination_airport_id` varchar(20) NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_time` time NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `availables_seats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`flight_id`, `airplane_id`, `source_airport_id`, `destination_airport_id`, `departure_time`, `arrival_time`, `price`, `availables_seats`) VALUES
('JL718-1', 'AP001', 'NRT', 'BKK', '10:20:00', '15:00:00', '13500.00', 180),
('JL718-2', 'AP002', 'NRT', 'BKK', '16:50:00', '21:30:00', '12900.00', 180),
('JL718-3', 'AP003', 'NRT', 'BKK', '22:30:00', '03:15:00', '11700.00', 180),
('JL728-1', 'AP004', 'KIX', 'BKK', '09:00:00', '14:20:00', '12800.00', 180),
('JL728-2', 'AP005', 'KIX', 'BKK', '17:40:00', '22:55:00', '12200.00', 180),
('JL728-3', 'AP006', 'KIX', 'BKK', '23:10:00', '04:30:00', '11100.00', 180),
('JL738-1', 'AP007', 'FUK', 'BKK', '08:40:00', '13:20:00', '12000.00', 180),
('JL738-2', 'AP008', 'FUK', 'BKK', '15:10:00', '19:50:00', '11400.00', 180),
('JL738-3', 'AP009', 'FUK', 'BKK', '21:00:00', '01:40:00', '10800.00', 180),
('JL748-1', 'AP010', 'OKA', 'BKK', '09:30:00', '14:00:00', '11800.00', 180),
('JL748-2', 'AP011', 'OKA', 'BKK', '17:00:00', '21:20:00', '11200.00', 180),
('JL748-3', 'AP012', 'OKA', 'BKK', '23:15:00', '03:40:00', '10400.00', 180),
('TG640-1', 'AP013', 'BKK', 'KIX', '08:30:00', '13:45:00', '12500.00', 180),
('TG640-2', 'AP014', 'BKK', 'KIX', '13:20:00', '18:30:00', '11800.00', 180),
('TG640-3', 'AP015', 'BKK', 'KIX', '20:00:00', '01:10:00', '10900.00', 180),
('TG642-1', 'AP016', 'BKK', 'NRT', '07:10:00', '13:00:00', '13200.00', 180),
('TG642-2', 'AP017', 'BKK', 'NRT', '12:30:00', '18:15:00', '12600.00', 180),
('TG642-3', 'AP018', 'BKK', 'NRT', '22:00:00', '04:50:00', '11400.00', 180),
('TG650-1', 'AP019', 'BKK', 'NGO', '10:00:00', '14:30:00', '11900.00', 180),
('TG650-2', 'AP020', 'BKK', 'NGO', '15:30:00', '20:00:00', '11300.00', 180),
('TG650-3', 'AP021', 'BKK', 'NGO', '23:50:00', '04:20:00', '10500.00', 180),
('TG651-1', 'AP022', 'NGO', 'BKK', '08:30:00', '12:50:00', '12100.00', 180),
('TG651-2', 'AP023', 'NGO', 'BKK', '15:20:00', '19:40:00', '11500.00', 180),
('TG651-3', 'AP024', 'NGO', 'BKK', '22:00:00', '02:10:00', '10700.00', 180),
('TG660-1', 'AP025', 'BKK', 'FUK', '09:10:00', '14:40:00', '11700.00', 180),
('TG660-2', 'AP026', 'BKK', 'FUK', '16:00:00', '21:25:00', '11200.00', 180),
('TG660-3', 'AP027', 'BKK', 'FUK', '23:45:00', '05:00:00', '9900.00', 180),
('TG670-1', 'AP028', 'BKK', 'OKA', '07:00:00', '12:20:00', '12100.00', 180),
('TG670-2', 'AP029', 'BKK', 'OKA', '13:50:00', '19:00:00', '11600.00', 180),
('TG670-3', 'AP030', 'BKK', 'OKA', '22:30:00', '03:40:00', '10800.00', 180),
('XJ600-1', 'AP031', 'DMK', 'KIX', '06:50:00', '11:30:00', '8900.00', 180),
('XJ600-2', 'AP032', 'DMK', 'KIX', '14:10:00', '19:00:00', '8500.00', 180),
('XJ600-3', 'AP033', 'DMK', 'KIX', '21:30:00', '02:15:00', '7800.00', 180),
('XJ610-1', 'AP034', 'DMK', 'NRT', '07:20:00', '12:10:00', '9200.00', 180),
('XJ610-2', 'AP035', 'DMK', 'NRT', '15:00:00', '20:10:00', '8800.00', 180),
('XJ610-3', 'AP036', 'DMK', 'NRT', '22:45:00', '04:00:00', '8100.00', 180),
('XJ620-1', 'AP037', 'DMK', 'CTS', '06:00:00', '12:30:00', '9700.00', 180),
('XJ620-2', 'AP038', 'DMK', 'CTS', '13:40:00', '20:10:00', '9400.00', 180),
('XJ620-3', 'AP039', 'DMK', 'CTS', '22:10:00', '05:00:00', '8900.00', 180),
('XJ621-1', 'AP040', 'CTS', 'DMK', '07:20:00', '13:00:00', '9800.00', 180),
('XJ621-2', 'AP041', 'CTS', 'DMK', '14:40:00', '20:10:00', '9400.00', 180),
('XJ621-3', 'AP042', 'CTS', 'DMK', '21:30:00', '03:00:00', '9000.00', 180);

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

CREATE TABLE `passengers` (
  `passenger_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `flight_id` varchar(20) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `passport_no` varchar(50) NOT NULL,
  `seat_no` varchar(10) NOT NULL,
  `luggage_weight` int(11) NOT NULL,
  `Meal` enum('','Norm','Vegan','Low','Diabetic') NOT NULL,
  `Wifi` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `payment_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seat_no` varchar(5) NOT NULL,
  `airplane_id` varchar(20) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`seat_no`, `airplane_id`, `available`) VALUES
('10A', NULL, 0),
('10B', NULL, 1),
('10C', NULL, 1),
('10D', NULL, 1),
('10E', NULL, 1),
('10F', NULL, 1),
('11A', NULL, 1),
('11B', NULL, 1),
('11C', NULL, 1),
('11D', NULL, 1),
('11E', NULL, 1),
('11F', NULL, 1),
('12A', NULL, 1),
('12B', NULL, 1),
('12C', NULL, 1),
('12D', NULL, 1),
('12E', NULL, 0),
('12F', NULL, 1),
('13A', NULL, 1),
('13B', NULL, 1),
('13C', NULL, 1),
('13D', NULL, 1),
('13E', NULL, 1),
('13F', NULL, 1),
('14A', NULL, 1),
('14B', NULL, 1),
('14C', NULL, 1),
('14D', NULL, 1),
('14E', NULL, 1),
('14F', NULL, 1),
('15A', NULL, 1),
('15B', NULL, 0),
('15C', NULL, 1),
('15D', NULL, 1),
('15E', NULL, 1),
('15F', NULL, 1),
('16A', NULL, 1),
('16B', NULL, 1),
('16C', NULL, 1),
('16D', NULL, 1),
('16E', NULL, 1),
('16F', NULL, 1),
('17A', NULL, 1),
('17B', NULL, 1),
('17C', NULL, 1),
('17D', NULL, 1),
('17E', NULL, 1),
('17F', NULL, 1),
('18A', NULL, 1),
('18B', NULL, 1),
('18C', NULL, 0),
('18D', NULL, 1),
('18E', NULL, 1),
('18F', NULL, 1),
('19A', NULL, 1),
('19B', NULL, 1),
('19C', NULL, 1),
('19D', NULL, 1),
('19E', NULL, 1),
('19F', NULL, 1),
('1A', NULL, 1),
('1B', NULL, 0),
('1C', NULL, 1),
('1D', NULL, 1),
('1E', NULL, 1),
('1F', NULL, 1),
('20A', NULL, 1),
('20B', NULL, 1),
('20C', NULL, 1),
('20D', NULL, 0),
('20E', NULL, 1),
('20F', NULL, 1),
('21A', NULL, 1),
('21B', NULL, 1),
('21C', NULL, 1),
('21D', NULL, 1),
('21E', NULL, 1),
('21F', NULL, 1),
('22A', NULL, 1),
('22B', NULL, 1),
('22C', NULL, 1),
('22D', NULL, 1),
('22E', NULL, 1),
('22F', NULL, 0),
('23A', NULL, 1),
('23B', NULL, 1),
('23C', NULL, 1),
('23D', NULL, 1),
('23E', NULL, 1),
('23F', NULL, 1),
('24A', NULL, 1),
('24B', NULL, 1),
('24C', NULL, 1),
('24D', NULL, 1),
('24E', NULL, 1),
('24F', NULL, 1),
('25A', NULL, 0),
('25B', NULL, 1),
('25C', NULL, 1),
('25D', NULL, 1),
('25E', NULL, 1),
('25F', NULL, 1),
('26A', NULL, 1),
('26B', NULL, 1),
('26C', NULL, 1),
('26D', NULL, 1),
('26E', NULL, 1),
('26F', NULL, 1),
('27A', NULL, 1),
('27B', NULL, 1),
('27C', NULL, 1),
('27D', NULL, 1),
('27E', NULL, 1),
('27F', NULL, 1),
('28A', NULL, 1),
('28B', NULL, 1),
('28C', NULL, 1),
('28D', NULL, 1),
('28E', NULL, 0),
('28F', NULL, 1),
('29A', NULL, 1),
('29B', NULL, 1),
('29C', NULL, 1),
('29D', NULL, 1),
('29E', NULL, 1),
('29F', NULL, 1),
('2A', NULL, 0),
('2B', NULL, 1),
('2C', NULL, 1),
('2D', NULL, 1),
('2E', NULL, 1),
('2F', NULL, 1),
('30A', NULL, 1),
('30B', NULL, 1),
('30C', NULL, 1),
('30D', NULL, 1),
('30E', NULL, 1),
('30F', NULL, 1),
('31A', NULL, 1),
('31B', NULL, 1),
('31C', NULL, 1),
('31D', NULL, 1),
('31E', NULL, 1),
('31F', NULL, 1),
('32A', NULL, 1),
('32B', NULL, 1),
('32C', NULL, 1),
('32D', NULL, 1),
('32E', NULL, 1),
('32F', NULL, 1),
('3A', NULL, 1),
('3B', NULL, 1),
('3C', NULL, 1),
('3D', NULL, 1),
('3E', NULL, 0),
('3F', NULL, 1),
('4A', NULL, 1),
('4B', NULL, 1),
('4C', NULL, 1),
('4D', NULL, 1),
('4E', NULL, 1),
('4F', NULL, 1),
('5A', NULL, 1),
('5B', NULL, 1),
('5C', NULL, 0),
('5D', NULL, 1),
('5E', NULL, 1),
('5F', NULL, 1),
('6A', NULL, 1),
('6B', NULL, 1),
('6C', NULL, 1),
('6D', NULL, 1),
('6E', NULL, 1),
('6F', NULL, 1),
('7A', NULL, 1),
('7B', NULL, 1),
('7C', NULL, 1),
('7D', NULL, 0),
('7E', NULL, 1),
('7F', NULL, 1),
('8A', NULL, 1),
('8B', NULL, 1),
('8C', NULL, 1),
('8D', NULL, 1),
('8E', NULL, 1),
('8F', NULL, 0),
('9A', NULL, 1),
('9B', NULL, 1),
('9C', NULL, 1),
('9D', NULL, 1),
('9E', NULL, 1),
('9F', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('customer','admin','staff') NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `fname`, `lname`, `email`, `role`, `createdAt`) VALUES
(1, '1234', 'Tony', 'Stark', 'ironman@gmail.com', 'customer', '2025-11-04 15:25:35'),
(2, '12345', 'Steve', 'Roger', 'roger007@gmail.com', 'admin', '2025-11-05 22:55:49'),
(3, 'thor123', 'Thor', 'Odinson', 'thor.odinson@marvel.com', 'admin', '2025-11-06 17:00:48'),
(4, 'widow123', 'Natasha', 'Romanoff', 'natasha.romanoff@marvel.com', 'staff', '2025-11-06 17:00:48'),
(5, 'hulk123', 'Bruce', 'Banner', 'bruce.banner@marvel.com', 'customer', '2025-11-06 17:00:48'),
(6, 'spidey123', 'Peter', 'Parker', 'peter.parker@marvel.com', 'customer', '2025-11-06 17:00:48'),
(7, 'strange123', 'Stephen', 'Strange', 'stephen.strange@marvel.com', 'admin', '2025-11-06 17:00:48'),
(8, 'panther123', 'TChalla', 'Udaku', 'tchalla.udaku@marvel.com', 'staff', '2025-11-06 17:00:48'),
(9, 'scarlet123', 'Wanda', 'Maximoff', 'wanda.maximoff@marvel.com', 'customer', '2025-11-06 17:00:48'),
(10, 'hawk123', 'Clint', 'Barton', 'clint.barton@marvel.com', 'staff', '2025-11-06 17:00:48'),
(11, 'wasp123', 'Hope', 'Van Dyne', 'hope.vandyne@marvel.com', 'customer', '2025-11-06 17:00:48'),
(12, 'ant123', 'Scott', 'Lang', 'scott.lang@marvel.com', 'admin', '2025-11-06 17:00:48'),
(13, 'loki123', 'Loki', 'Laufeyson', 'loki.laufeyson@marvel.com', 'customer', '2025-11-06 17:00:48'),
(14, 'thanos123', 'Thanos', '', 'thanos@marvel.com', 'admin', '2025-11-06 17:00:48'),
(15, 'nebula123', 'Nebula', '', 'nebula@marvel.com', 'staff', '2025-11-06 17:00:48'),
(16, 'gamora123', 'Gamora', '', 'gamora@marvel.com', 'customer', '2025-11-06 17:00:48'),
(17, 'rocket123', 'Rocket', 'Raccoon', 'rocket.raccoon@marvel.com', 'staff', '2025-11-06 17:00:48'),
(18, 'groot123', 'Groot', '', 'groot@marvel.com', 'customer', '2025-11-06 17:00:48'),
(19, 'mantis123', 'Mantis', '', 'mantis@marvel.com', 'customer', '2025-11-06 17:00:48'),
(20, 'drax123', 'Drax', 'The Destroyer', 'drax@marvel.com', 'staff', '2025-11-06 17:00:48'),
(21, 'vision123', 'Vision', '', 'vision@marvel.com', 'admin', '2025-11-06 17:00:48'),
(22, 'sam123', 'Sam', 'Wilson', 'sam.wilson@marvel.com', 'staff', '2025-11-06 17:00:48'),
(23, 'bucky123', 'Bucky', 'Barnes', 'bucky.barnes@marvel.com', 'customer', '2025-11-06 17:00:48'),
(24, 'carol123', 'Carol', 'Danvers', 'carol.danvers@marvel.com', 'admin', '2025-11-06 17:00:48'),
(25, 'nick123', 'Nick', 'Fury', 'nick.fury@marvel.com', 'admin', '2025-11-06 17:00:48'),
(26, 'peggy123', 'Peggy', 'Carter', 'peggy.carter@marvel.com', 'customer', '2025-11-06 17:00:48'),
(27, 'pietro123', 'Pietro', 'Maximoff', 'pietro.maximoff@marvel.com', 'staff', '2025-11-06 17:00:48'),
(28, 'hela123', 'Hela', 'Odinsdottir', 'hela@marvel.com', 'customer', '2025-11-06 17:00:48'),
(29, 'valkyrie123', 'Brunnhilde', '', 'valkyrie@marvel.com', 'staff', '2025-11-06 17:00:48'),
(30, 'shuri123', 'Shuri', '', 'shuri@marvel.com', 'admin', '2025-11-06 17:00:48'),
(31, 'okoye123', 'Okoye', '', 'okoye@marvel.com', 'customer', '2025-11-06 17:00:48'),
(32, 'mordo123', 'Karl', 'Mordo', 'karl.mordo@marvel.com', 'staff', '2025-11-06 17:00:48'),
(33, '123', 'test', 'test', 'test@gmail.com', 'customer', '2025-11-12 15:04:12'),
(34, '123', 'testnaka', 'testja', 'test2@gmail.com', 'staff', '2025-11-12 15:10:04'),
(35, '123a', 'test555', 'test5555', 'test1234656@gmail.com', 'customer', '2025-11-12 15:42:18'),
(36, 'adminnaja555', 'test123', 'test', 'test123@gmail.com', 'admin', '2025-11-12 16:09:42'),
(37, 'staffnaja555', 'test123456', 'test', 'test123456@gmail.com', 'staff', '2025-11-12 16:10:41'),
(38, 'adminnaja555', 'test1234', 'test', 'test1111@gmail.com', 'admin', '2025-11-12 16:22:19'),
(39, 'staffnaja555', 'test222', 'test', 'test22@gmail.com', 'staff', '2025-11-12 16:23:18'),
(40, '123456', 'minnie', 'test', 'minnie22@gmail.com', 'customer', '2025-11-12 16:24:33');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `userCreateDateTime` BEFORE INSERT ON `users` FOR EACH ROW SET NEW.createdAt = CURRENT_TIMESTAMP
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airplane`
--
ALTER TABLE `airplane`
  ADD PRIMARY KEY (`airplane_id`);

--
-- Indexes for table `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`airport_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `flight_id` (`flight_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`flight_id`),
  ADD KEY `airplane_id` (`airplane_id`),
  ADD KEY `source_airport_id` (`source_airport_id`),
  ADD KEY `destination_airport_id` (`destination_airport_id`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`passenger_id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `flight_id` (`flight_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seat_no`),
  ADD KEY `airplane_id` (`airplane_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `passenger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`airplane_id`) REFERENCES `airplane` (`airplane_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`source_airport_id`) REFERENCES `airports` (`airport_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`destination_airport_id`) REFERENCES `airports` (`airport_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `passengers`
--
ALTER TABLE `passengers`
  ADD CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `passengers_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`flight_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`airplane_id`) REFERENCES `airplane` (`airplane_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
