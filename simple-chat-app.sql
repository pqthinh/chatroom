-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2022 at 08:13 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple-chat-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `roomId` varchar(20) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `file` varchar(1000) DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `roomId`, `userId`, `message`, `file`, `createAt`, `updatedAt`, `deletedAt`) VALUES
(5, '1642274760076', '3', 'hello world', NULL, '2022-01-16 00:00:00', NULL, NULL),
(6, '1642186394877', '6', 'hello', NULL, '2022-01-16 00:00:00', NULL, NULL),
(7, '1642274643359', '6', 'hello\n', NULL, '2022-01-16 00:00:00', NULL, NULL),
(8, '1642274643359', '6', 'hi Thanh', NULL, '2022-01-16 00:00:00', NULL, NULL),
(9, '1642274760076', '6', 'hi\n', NULL, '2022-01-16 00:00:00', NULL, NULL),
(10, '1642274760076', '3', 'hello', NULL, '2022-01-16 00:00:00', NULL, NULL),
(11, '1642274760076', '3', 'ko hien tin nhan', NULL, '2022-01-16 00:00:00', NULL, NULL),
(12, '1642274760076', '3', 'hi bro', NULL, '2022-01-16 04:15:56', NULL, NULL),
(13, '1642274760076', '6', 'hello Thanhf', NULL, '2022-01-16 04:21:56', NULL, NULL),
(14, '1642274643359', '3', 'hi friend', NULL, '2022-01-16 21:44:41', NULL, NULL),
(15, '1642274643359', '3', 'hi friend', 'https://firebasestorage.googleapis.com/v0/b/wemarket-a8540.appspot.com/o/chat%2Fmessage_room_1642274643359%2F1642357707456.jpg?alt=media&token=9ec940c7-fb50-46b8-b728-c0a4329f3b66', '2022-01-16 21:44:41', NULL, NULL),
(16, '1642274643359', '3', 'hello', '', '2022-01-17 01:30:39', NULL, NULL),
(17, '1642274643359', '3', 'hi', '', '2022-01-17 01:44:20', NULL, NULL),
(18, '1642274760076', '3', '[]', 'https://firebasestorage.googleapis.com/v0/b/wemarket-a8540.appspot.com/o/chat%2Fmessage_room_1642274760076%2F1642358680194.jpg?alt=media&token=aedd499d-ccec-4959-814a-92ff2d64d9fd', '2022-01-17 01:48:29', NULL, NULL),
(19, '1642274643359', '6', 'hi', '', '2022-01-17 02:08:29', NULL, NULL),
(20, '1642274643359', '6', '', 'https://firebasestorage.googleapis.com/v0/b/wemarket-a8540.appspot.com/o/chat%2Fmessage_room_1642274643359%2F1642360123224.jpg?alt=media&token=ae574837-15e1-4a63-9ca4-5de65833c165', '2022-01-17 02:08:43', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `roomId` varchar(20) NOT NULL,
  `lastMessage` varchar(100) DEFAULT NULL,
  `lastAvtive` date DEFAULT NULL,
  `idUser` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `name` varchar(100) DEFAULT NULL,
  `avatar` varchar(1000) NOT NULL DEFAULT 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-doremon-dang-an-banh-ran.jpg',
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `roomId`, `lastMessage`, `lastAvtive`, `idUser`, `createdAt`, `name`, `avatar`, `updatedAt`, `deletedAt`) VALUES
(26, '1642274643359', NULL, NULL, 3, '2022-01-16', '', 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-doremon-dang-an-banh-ran.jpg', NULL, NULL),
(27, '1642274643359', NULL, NULL, 6, '2022-01-16', NULL, 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-doremon-dang-an-banh-ran.jpg', NULL, NULL),
(28, '1642274760076', NULL, NULL, 6, '2022-01-16', '', 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-doremon-dang-an-banh-ran.jpg', NULL, NULL),
(29, '1642274760076', NULL, NULL, 7, '2022-01-16', NULL, 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-doremon-dang-an-banh-ran.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` varchar(1000) NOT NULL DEFAULT 'http://image.vtc.vn/files/f1/2013/06/07/ngoc-trinh_1jpg.jpg',
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `lastLogin` date DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `name`, `avatar`, `email`, `password`, `lastLogin`, `createdAt`, `updatedAt`) VALUES
(3, 'thanhnt', 'thanhnt', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcGLfMcRQLeG6HSAfx7kym7mqEfQMQAiykHg&usqp=CAU', 'thanh@gmail.com', '$2b$10$P2Eg2gCZqxUx34XdQ1UZrOCqlmXGVPCgpDbKwRBZaN4LOFX/7nXFe', NULL, '2022-01-15', NULL),
(6, 'thinh', 'thinh', ' http://image.vtc.vn/files/f1/2013/06/07/ngoc-trinh_1jpg.jpg ', 'thinh@gmail.com', '$2b$10$mxZvYBJZxbsnSgxdNBZIeOTE8.Xa9hgGkCGlEMp7EuAhuWSRGPUWi', NULL, '2022-01-15', NULL),
(7, '$2b$10$5aeCf/RakQ0cb', 'thinhpq', ' http://image.vtc.vn/files/f1/2013/06/07/ngoc-trinh_1jpg.jpg ', 'thinhpq2@gmail.com', '$2b$10$.Wf0NH4.1Tjf9V.elVj9XeUw9t9nlBhPlgokmcgqFGEc0G/Ul/gUu', NULL, '2022-01-15', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
