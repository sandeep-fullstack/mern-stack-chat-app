-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2024 at 01:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pic` varchar(255) DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  `isAdmin` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(255) DEFAULT NULL,
  `deviceId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `pic`, `isAdmin`, `createdAt`, `updatedAt`, `role`, `deviceId`) VALUES
(9, 'sandeep', 'sandeep@gmail.com', '$2a$10$9FpyizSBRoNwPPtgCkFYreGiXavvuEPv.TNXMzTxO7AGl8aNfYY0W', 'https://icon-library.com/images/avatar-icon/avatar-icon-24.jpg', 0, '2024-09-28 10:38:33', '2024-09-28 10:38:33', 'Admin', 'c73c5ee4-06ff-48c8-9686-8f37c5fd3b35'),
(10, 'pardeep', 'pardeep@gmail.com', '$2a$10$yP4SzOgMNTH8Uyh4QYd8JuZsqYWFm4ywlwTlXP0.ohfe4yNc1LCiO', 'https://icon-library.com/images/avatar-icon/avatar-icon-24.jpg', 0, '2024-09-28 10:46:11', '2024-09-28 10:46:11', 'Admin', 'ff700eba-62d3-4f6a-bfa0-b77cde02c8c5'),
(11, 'ramu', 'ramu@gmail.com', '$2a$10$3BdDUtbvD0FxYM8psv.aPu1uqtTvj7aSELlDRjw5Hnb27hRh7dq/i', 'https://icon-library.com/images/avatar-icon/avatar-icon-24.jpg', 0, '2024-09-28 10:58:17', '2024-09-28 10:58:17', 'Admin', 'cc094282-4f81-47ee-808f-306228631e22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
