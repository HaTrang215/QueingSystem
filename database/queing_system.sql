-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 11, 2022 lúc 04:09 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `queing_system`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_service`
--

CREATE TABLE `detail_service` (
  `id` int(11) NOT NULL DEFAULT 0,
  `id_detail_service` int(11) NOT NULL,
  `id_service` varchar(10) NOT NULL,
  `auto_increate` int(11) NOT NULL,
  `start` varchar(11) NOT NULL,
  `end` varchar(11) NOT NULL,
  `prefix` varchar(11) DEFAULT NULL,
  `surfix` varchar(11) DEFAULT NULL,
  `reset_daily` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `detail_service`
--

INSERT INTO `detail_service` (`id`, `id_detail_service`, `id_service`, `auto_increate`, `start`, `end`, `prefix`, `surfix`, `reset_daily`, `create_date`, `end_date`, `created_at`, `updated_at`) VALUES
(0, 1, 'MH', 1, '0001', '999', '210', '0', 0, '2022-06-21', '2022-07-07', '2022-07-06 15:55:23', '2022-07-06 18:30:41'),
(0, 2, 'PK', 1, '0001', '999', '210', '0', 0, '2022-06-01', NULL, '2022-07-06 15:55:23', '2022-07-06 18:30:41'),
(0, 3, 'RHM', 1, '0001', '999', '210', '0', 0, '2022-06-26', NULL, '2022-07-06 15:55:23', '2022-07-06 18:30:41'),
(0, 4, 'TM', 1, '0001', '999', '210', '0', 0, '2022-06-26', '2022-07-07', '2022-07-06 15:55:23', '2022-07-06 18:30:41'),
(0, 5, 'TQ', 1, '0001', '999', '210', '0', 0, '2022-06-26', '2022-07-07', '2022-07-06 15:55:23', '2022-07-06 18:30:41'),
(0, 6, 'NK', 1, '0001', '9999', '610', '0', 1, '2022-07-06', NULL, '2022-07-06 09:02:21', '2022-07-06 18:30:41'),
(0, 7, 'MH', 1, '0001', '9999', '610', '0', 1, '2022-07-06', '2022-07-07', '2022-07-06 09:48:58', '2022-07-06 18:30:41'),
(0, 8, 'MH', 1, '0001', '9999', '610', '0', 1, '2022-07-06', '2022-07-07', '2022-07-06 09:49:50', '2022-07-06 18:30:41'),
(0, 9, 'MH', 1, '0001', '9999', '110', '0', 1, '2022-07-06', NULL, '2022-07-06 09:51:19', '2022-07-06 18:30:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diary`
--

CREATE TABLE `diary` (
  `id_diary` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `perform_time` time NOT NULL,
  `perform_date` date NOT NULL,
  `address_IP` varchar(10) NOT NULL,
  `perform_operation` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `diary`
--

INSERT INTO `diary` (`id_diary`, `id_user`, `perform_time`, `perform_date`, `address_IP`, `perform_operation`, `created_at`, `updated_at`) VALUES
(1, 2, '09:33:56', '2022-06-28', 'COM_01', 'Cập nhật ffjskldfjsdjfsdli', '2022-07-06 07:25:18', '2022-07-06 07:24:58'),
(2, 2, '10:33:56', '2022-06-28', 'COM_01', 'Thêm fjlfjsldfjosfjow', '2022-07-06 07:25:18', '2022-07-06 07:24:58'),
(3, 2, '07:43:20', '2022-07-06', '127.0.0.1', 'Thêm thông tin thiết bị INT_06', '2022-07-06 00:43:20', '2022-07-06 00:43:20'),
(4, 2, '09:04:25', '2022-07-06', '127.0.0.1', 'Cập nhật thông tin thiết bị INT_01', '2022-07-06 02:04:25', '2022-07-06 02:04:25'),
(5, 2, '10:05:22', '2022-07-06', '127.0.0.1', 'Thêm thông tin tài khoản của Nguyễn Thanh Ý-STT là 13', '2022-07-06 03:05:22', '2022-07-06 03:05:22'),
(6, 2, '10:07:56', '2022-07-06', '127.0.0.1', 'Thêm thông tin tài khoản của Trần Ngụ Ngôn-STT là 14', '2022-07-06 03:07:56', '2022-07-06 03:07:56'),
(7, 2, '11:13:17', '2022-07-06', '127.0.0.1', 'Cập nhật thông tin tài khoản của Nguyễn Thanh Ý-STT là 13', '2022-07-06 04:13:17', '2022-07-06 04:13:17'),
(8, 2, '11:13:22', '2022-07-06', '127.0.0.1', 'Cập nhật thông tin tài khoản của Nguyễn Thành Nhân-STT là 13', '2022-07-06 04:13:22', '2022-07-06 04:13:22'),
(9, 2, '14:07:12', '2022-07-06', '127.0.0.1', 'Cập nhật thông tin thiết bị CEN_01', '2022-07-06 07:07:12', '2022-07-06 07:07:12'),
(10, 2, '14:07:17', '2022-07-06', '127.0.0.1', 'Cập nhật thông tin thiết bị CEN_01', '2022-07-06 07:07:17', '2022-07-06 07:07:17'),
(11, 2, '16:02:21', '2022-07-06', '127.0.0.1', 'Thêm dịch vụ Khám ngoại khoa', '2022-07-06 09:02:21', '2022-07-06 09:02:21'),
(12, 2, '16:48:58', '2022-07-06', '127.0.0.1', 'Cập nhật dịch vụ Khám tai mũi họng', '2022-07-06 09:48:58', '2022-07-06 09:48:58'),
(13, 2, '16:49:50', '2022-07-06', '127.0.0.1', 'Cập nhật dịch vụ Khám tai mũi họng', '2022-07-06 09:49:50', '2022-07-06 09:49:50'),
(14, 2, '16:51:19', '2022-07-06', '127.0.0.1', 'Cập nhật dịch vụ Khám tai mũi họng', '2022-07-06 09:51:19', '2022-07-06 09:51:19'),
(15, 2, '01:27:49', '2022-07-07', '127.0.0.1', 'Cập nhật thông tin thiết bị CEN_01', '2022-07-06 18:27:49', '2022-07-06 18:27:49'),
(16, 2, '01:33:00', '2022-07-07', '127.0.0.1', 'Cập nhật thông tin tài khoản của Nguyễn Như Yến-STT là 3', '2022-07-06 18:33:00', '2022-07-06 18:33:00'),
(17, 2, '01:33:57', '2022-07-07', '127.0.0.1', 'Thêm thông tin tài khoản của Mạc Như Hưng-STT là 18', '2022-07-06 18:33:57', '2022-07-06 18:33:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `id_equipment` varchar(10) NOT NULL,
  `equipment_name` varchar(20) NOT NULL,
  `address_IP` varchar(20) NOT NULL,
  `status_active` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `equipment`
--

INSERT INTO `equipment` (`id`, `id_equipment`, `equipment_name`, `address_IP`, `status_active`, `id_type`, `id_user`, `created_at`, `updated_at`) VALUES
(0, 'CEN_01', 'Display center 01', '10.11.32.82', 1, 1, 1, '2022-07-05 18:03:10', '2022-07-06 18:27:49'),
(0, 'COM_01', 'Computer 01', '192.168.1.17', 1, 2, 2, '2022-07-05 18:03:10', '2022-07-06 18:27:49'),
(0, 'COUN_01', 'Quầy số 1', '127.0.0.1', 1, 3, 6, '2022-07-05 15:31:41', '2022-07-06 18:27:49'),
(0, 'INT_', 'User interface 01', '127.0.0.1', 1, 1, 1, '2022-07-05 18:03:10', '2022-07-06 18:27:49'),
(0, 'INT_01', 'Kios 02', '10.11.32.82', 1, 3, 1, '2022-07-06 00:29:09', '2022-07-06 18:27:49'),
(0, 'INT_02', 'Kios 02', '10.11.32.82', 1, 3, 8, '2022-07-06 00:32:37', '2022-07-06 18:27:49'),
(0, 'INT_03', 'Kios 02', '10.11.32.82', 1, 3, 9, '2022-07-06 00:37:11', '2022-07-06 18:27:49'),
(0, 'INT_04', 'Kios 02', '10.11.32.82', 1, 3, 10, '2022-07-06 00:41:51', '2022-07-06 18:27:49'),
(0, 'INT_05', 'Kios 02', '10.11.32.82', 1, 3, 11, '2022-07-06 00:42:52', '2022-07-06 18:27:49'),
(0, 'INT_06', 'Kios 02', '10.11.32.82', 1, 3, 12, '2022-07-06 00:43:20', '2022-07-06 18:27:49'),
(0, 'KIO_01', 'Kios 01', '127.0.0.1', 1, 1, 1, '2022-07-05 18:03:10', '2022-07-06 18:27:49'),
(0, 'KIO_02', 'Kios 02', '10.11.32.82', 1, 1, 5, '2022-07-05 14:43:46', '2022-07-06 18:27:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `function`
--

CREATE TABLE `function` (
  `id_function` int(11) NOT NULL,
  `name_fuction` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `function`
--

INSERT INTO `function` (`id_function`, `name_fuction`) VALUES
(1, 'add'),
(2, 'update'),
(3, 'detail');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_function`
--

CREATE TABLE `group_function` (
  `id_group` int(11) NOT NULL,
  `name_group_en` varchar(30) DEFAULT NULL,
  `name_group_vi` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `group_function`
--

INSERT INTO `group_function` (`id_group`, `name_group_en`, `name_group_vi`) VALUES
(1, 'equipment', 'Thiết bị'),
(2, 'service', 'Dịch vụ'),
(3, 'serial-number', 'Cấp sô'),
(4, 'report', 'Báo cáo'),
(5, 'role-management', 'Quản lý vai trò'),
(6, 'account-management', 'Quản lý tài khoản'),
(7, 'diary', 'Nhật ký');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `number_supply`
--

CREATE TABLE `number_supply` (
  `id_number_supply` int(11) NOT NULL,
  `number_supply` varchar(11) NOT NULL,
  `patient_name` varchar(30) DEFAULT NULL,
  `patient_phone` int(12) DEFAULT NULL,
  `patient_email` varchar(30) DEFAULT NULL,
  `id_service` varchar(10) NOT NULL,
  `id_equipment` varchar(10) NOT NULL,
  `start_time` time NOT NULL,
  `start_date` date NOT NULL,
  `used_time` time DEFAULT NULL,
  `used_date` date DEFAULT NULL,
  `expiry_time` time NOT NULL DEFAULT '17:30:00',
  `expiry_date` date NOT NULL,
  `status_active` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `number_supply`
--

INSERT INTO `number_supply` (`id_number_supply`, `number_supply`, `patient_name`, `patient_phone`, `patient_email`, `id_service`, `id_equipment`, `start_time`, `start_date`, `used_time`, `used_date`, `expiry_time`, `expiry_date`, `status_active`, `created_at`, `updated_at`) VALUES
(1, '2100001', 'Lê Huỳnh Ái Vân', 12345678, '', 'MH', 'KIO_01', '08:10:00', '2022-06-25', '09:10:00', '2022-06-25', '17:30:00', '2022-06-25', 2, '2022-07-10 23:26:52', '2022-07-10 23:26:07'),
(2, '2100001', 'Nguyễn Huỳnh Thảo', 123456789, '', 'PK', 'KIO_01', '08:16:00', '2022-06-26', '00:00:00', '0000-00-00', '17:30:00', '2022-06-26', 1, '2022-07-10 23:26:52', '2022-07-10 23:26:07'),
(3, '2100002', 'Lệ Thị Ánh', 123456789, '', 'TQ', 'KIO_01', '08:16:37', '2022-06-26', '00:00:00', '0000-00-00', '17:30:00', '2022-06-26', 0, '2022-07-10 23:26:52', '2022-07-10 23:26:07'),
(4, '2100001', 'Trần Minh Tú', 123456789, '', 'RHM', 'COM_01', '08:16:00', '2022-06-23', NULL, NULL, '17:30:00', '2022-06-23', 0, '2022-07-10 23:26:52', '2022-07-10 23:26:07'),
(5, '21000002', 'Phạm Ái Như', 0, '', 'MH', 'COUN_01', '08:16:51', '2022-07-10', NULL, NULL, '17:30:00', '2022-07-10', 0, '2022-07-10 23:26:52', '2022-07-10 23:26:07'),
(2100006, '2100002', NULL, NULL, NULL, 'RHM', 'COUN_01', '23:28:22', '2022-07-10', NULL, NULL, '17:30:00', '2022-07-10', 0, '2022-07-10 16:28:22', '2022-07-10 16:28:22'),
(2100009, '2100003', NULL, NULL, NULL, 'RHM', 'COUN_01', '23:35:39', '2022-07-10', NULL, NULL, '17:30:00', '2022-07-10', 0, '2022-07-10 16:35:39', '2022-07-10 16:35:39'),
(2100021, '2100004', NULL, NULL, NULL, 'RHM', 'COUN_01', '23:58:33', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-11 00:08:47', '2022-07-11 00:08:47'),
(2100023, '1100001', NULL, NULL, NULL, 'MH', 'COUN_01', '00:09:57', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:09:57', '2022-07-10 17:09:57'),
(2100024, '1100002', NULL, NULL, NULL, 'MH', 'COUN_01', '00:10:33', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:10:33', '2022-07-10 17:10:33'),
(2100025, '1100003', NULL, NULL, NULL, 'MH', 'COUN_01', '00:27:09', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:27:09', '2022-07-10 17:27:09'),
(2100026, '1100004', NULL, NULL, NULL, 'MH', 'COUN_01', '00:30:09', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:30:09', '2022-07-10 17:30:09'),
(2100027, '1100005', NULL, NULL, NULL, 'MH', 'COUN_01', '00:30:22', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:30:22', '2022-07-10 17:30:22'),
(2100028, '1100006', NULL, NULL, NULL, 'MH', 'COUN_01', '00:30:56', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:30:56', '2022-07-10 17:30:56'),
(2100029, '1100007', NULL, NULL, NULL, 'MH', 'COUN_01', '00:31:07', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:31:07', '2022-07-10 17:31:07'),
(2100030, '1100008', NULL, NULL, NULL, 'MH', 'COUN_01', '00:33:20', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:33:20', '2022-07-10 17:33:20'),
(2100031, '1100009', NULL, NULL, NULL, 'MH', 'COUN_01', '00:35:14', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:35:14', '2022-07-10 17:35:14'),
(2100032, '2100002', NULL, NULL, NULL, 'PK', 'COUN_01', '00:36:40', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:36:40', '2022-07-10 17:36:40'),
(2100033, '1100010', NULL, NULL, NULL, 'MH', 'COUN_01', '00:37:00', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:37:00', '2022-07-10 17:37:00'),
(2100034, '2100005', NULL, NULL, NULL, 'RHM', 'COUN_01', '00:37:26', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:37:26', '2022-07-10 17:37:26'),
(2100035, '2100003', NULL, NULL, NULL, 'PK', 'COUN_01', '00:37:32', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:37:32', '2022-07-10 17:37:32'),
(2100036, '2100004', NULL, NULL, NULL, 'PK', 'COUN_01', '00:37:50', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:37:50', '2022-07-10 17:37:50'),
(2100037, '2100005', NULL, NULL, NULL, 'PK', 'COUN_01', '00:37:57', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:37:57', '2022-07-10 17:37:57'),
(2100038, '1100011', NULL, NULL, NULL, 'MH', 'COUN_01', '00:38:09', '2022-07-11', NULL, NULL, '17:30:00', '2022-07-11', 0, '2022-07-10 17:38:09', '2022-07-10 17:38:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '0b9d8afa1f339e394aa60ba45b615bdb65a9bc6e53844ca3d10f3bd0dedfcc9c', '[\"*\"]', NULL, '2022-06-16 03:28:12', '2022-06-16 03:28:12'),
(5, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '2268e8564e069f458ecb8d29f98530be581966e577a323e08f42bbd403de9d61', '[\"*\"]', NULL, '2022-06-16 23:08:35', '2022-06-16 23:08:35'),
(6, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '040875c0b1719a99cb1ea992335fddcdd8c116030428038459cd8e11a27524b9', '[\"*\"]', NULL, '2022-06-16 23:29:24', '2022-06-16 23:29:24'),
(7, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'e5620932ff87a271ee638fbd0166be8a3761b332104c82694fb6b9d42c777862', '[\"*\"]', NULL, '2022-06-17 00:32:41', '2022-06-17 00:32:41'),
(8, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'd069d1e53b17ea9b71344654f56a0b00ed0f356bcc86c0d925e9fbf394a62d58', '[\"*\"]', NULL, '2022-06-17 00:33:56', '2022-06-17 00:33:56'),
(9, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '394ff18e7a1296a0bbfec2fd80e4fe42583cc18ee8f565c43946176877cc6ac0', '[\"*\"]', NULL, '2022-06-17 02:49:37', '2022-06-17 02:49:37'),
(10, 'App\\Models\\User', 5, 'Hatrang215_Token', '5e4763032b32714ce22cf6c344c74be80954a1c3ab70a90f4a213c7c57def186', '[\"*\"]', NULL, '2022-06-17 02:50:27', '2022-06-17 02:50:27'),
(11, 'App\\Models\\User', 5, 'Hatrang215_Token', '80e862f80fad9333f9e110feefb580ee351e72f822609b3e34140e3fc39d738b', '[\"*\"]', NULL, '2022-06-17 03:02:32', '2022-06-17 03:02:32'),
(12, 'App\\Models\\User', 5, 'Hatrang215_Token', 'd02933ed7e4103e4311539433c8c29626ce44c869d92586e5a7e8be4cd5a15c5', '[\"*\"]', NULL, '2022-06-17 03:02:46', '2022-06-17 03:02:46'),
(13, 'App\\Models\\User', 5, 'Hatrang215_Token', 'd60120b568f410baef9b2a21fb54aa33b26ac34d0d0d132d295a9ba8a71c4ec7', '[\"*\"]', NULL, '2022-06-17 03:04:07', '2022-06-17 03:04:07'),
(14, 'App\\Models\\User', 5, 'Hatrang215_Token', '612130aab6b90599693bc6cb0bd51b18fc8d73ab2bc0d8901c615ac1edda38ab', '[\"*\"]', NULL, '2022-06-17 03:04:29', '2022-06-17 03:04:29'),
(15, 'App\\Models\\User', 5, 'Hatrang215_Token', '3bae48e0cc4b48fb1d92759290f7960fa18bd5165f32358e9074ea13e34a0635', '[\"*\"]', NULL, '2022-06-17 03:07:45', '2022-06-17 03:07:45'),
(16, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '40e67400284cfc0f4e77a6aad97f42c1ac4cd65b831f703de6c0df3947851af0', '[\"*\"]', NULL, '2022-06-17 07:38:12', '2022-06-17 07:38:12'),
(17, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '48bdc89f26738c4a5b19d4dbaab3249fdc111abf9d1672c3e15c9a399954a598', '[\"*\"]', NULL, '2022-06-17 11:01:42', '2022-06-17 11:01:42'),
(18, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'fe67559f4030bfe18f3e1b02ee0f23ec7f7d3c9a55e9fcc8cfc5e36503b2fdd0', '[\"*\"]', NULL, '2022-06-17 11:03:13', '2022-06-17 11:03:13'),
(19, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'dfa08914d32ff5a111a61d4090bb2c1abbf3b143ed4c191fa430583421712861', '[\"*\"]', NULL, '2022-06-22 19:56:04', '2022-06-22 19:56:04'),
(20, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'ef1ff2d8848f1975f71e2846f25343f443d3bdaac9823cd0ffcc628b6e847eeb', '[\"*\"]', NULL, '2022-06-22 19:56:43', '2022-06-22 19:56:43'),
(21, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'b54770923c6e282f028d3b9bd844850035ef59093a5b90f006a20bb77a2c2f05', '[\"*\"]', NULL, '2022-06-23 03:02:08', '2022-06-23 03:02:08'),
(22, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '94690207288f82057d042a27411860635bb91b59efd334b30f3deed00cb03cbb', '[\"*\"]', NULL, '2022-06-23 03:02:24', '2022-06-23 03:02:24'),
(23, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'cce72b46a01a35a479353fb40a4609bdca9a9d66d453ece263fc207b290e5bd4', '[\"*\"]', NULL, '2022-06-23 04:07:51', '2022-06-23 04:07:51'),
(24, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '681bbd73b4d88a62c25193d4021eb8e56e79df3de1a70ea2ee4adafa9606cd08', '[\"*\"]', NULL, '2022-06-23 04:59:01', '2022-06-23 04:59:01'),
(25, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'd2f44d523d5be0f170f65faea5eaaad1b42b2eb4ebb2ab5145b570350eef09f5', '[\"*\"]', NULL, '2022-06-23 04:59:20', '2022-06-23 04:59:20'),
(26, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'f70c1f7d551a37d5e283b9adc51a6315dfffc82198f9b1931c305dbc7df9ae59', '[\"*\"]', NULL, '2022-06-23 05:06:37', '2022-06-23 05:06:37'),
(27, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '081276a014ab484f40b2e0de81b6926b5ddcdc3b813a179efb9e45cc5cd17cbb', '[\"*\"]', NULL, '2022-06-23 05:09:27', '2022-06-23 05:09:27'),
(28, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'ec6f275b11444af44bcd03a4b661a7e1355472c39c03ca8854edf6f1fc9fb90b', '[\"*\"]', NULL, '2022-06-23 05:51:30', '2022-06-23 05:51:30'),
(29, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '0ace047677e654a166e1421cc427fc25ce17d19ae3a71636c619ecfa6a9d7d82', '[\"*\"]', NULL, '2022-06-23 05:53:01', '2022-06-23 05:53:01'),
(30, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'a30b9fdcf51a0a9f94319c085a2c704d71f8946f130c695477d82664a098f1ea', '[\"*\"]', NULL, '2022-06-23 06:25:41', '2022-06-23 06:25:41'),
(31, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '3737bb9fa4c573191e84afd249e95144c90318d772f6da0abed6ff16220cdda3', '[\"*\"]', NULL, '2022-06-23 07:56:27', '2022-06-23 07:56:27'),
(32, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '58790f4bc86f00e713393e42d58e5861275b5ce732776f12d77fa5475356bb21', '[\"*\"]', NULL, '2022-06-23 21:56:42', '2022-06-23 21:56:42'),
(33, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '985f911aff8085fd4344ced02d14ec6b502b1e8411fc5ab3539bc426b8242527', '[\"*\"]', NULL, '2022-06-25 05:02:47', '2022-06-25 05:02:47'),
(34, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'ae7b4646f8c758e1267eab1a898012f5dae0869dd8fb4d5a61806003116f1778', '[\"*\"]', NULL, '2022-06-25 15:09:02', '2022-06-25 15:09:02'),
(35, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'c7fee50c66c6d02ccbb0676a4c0081b3aa748f02f9169edb897c8a42df96bff4', '[\"*\"]', NULL, '2022-06-25 15:09:57', '2022-06-25 15:09:57'),
(36, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '67b13fe507ac44ed0004b5cb9648a4177445dca594456a32fcc551539bd2dc40', '[\"*\"]', NULL, '2022-06-25 15:22:11', '2022-06-25 15:22:11'),
(37, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '3afcbcb01d8b3d2b76cb560bf57773e9085271badb34998f91d5466ae430de79', '[\"*\"]', NULL, '2022-06-25 15:22:46', '2022-06-25 15:22:46'),
(38, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '5ed0c5ef9dbb6f0efca9e153cc7a7fbcb7a891643fa9c918a443b22ce1062183', '[\"*\"]', NULL, '2022-06-25 15:28:29', '2022-06-25 15:28:29'),
(39, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '80238fbcc005104fb5abe000dceea8f9250a5aa1487fbc6de9554a7ba1a5aaa0', '[\"*\"]', NULL, '2022-06-25 15:29:58', '2022-06-25 15:29:58'),
(40, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', 'de37817b84c8ce020afc4ce1a6f46bfc6b02e10cc3fa232012c6ddad0017ca4c', '[\"*\"]', NULL, '2022-06-25 15:31:25', '2022-06-25 15:31:25'),
(41, 'App\\Models\\User', 5, 'hatrang@gmail.com_Token', '2055a06fa92fca85e81f32da10cd2f72a5bb9e0d743bdf9f11bca61b173fa300', '[\"*\"]', NULL, '2022-06-25 15:34:46', '2022-06-25 15:34:46'),
(42, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'c952dd6a57ad27b24b55e448f1b82b1731930b501632c2aad2440c0ca8c5bd43', '[\"*\"]', NULL, '2022-06-26 04:21:16', '2022-06-26 04:21:16'),
(43, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'd6f88ee26b19b72424e1ed74db5d30d1bf5f66ddf69c727f298454d58835c765', '[\"*\"]', NULL, '2022-06-28 20:19:04', '2022-06-28 20:19:04'),
(44, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'e248bb8c423f86a20e78da3d0733c18c27f16bf55768939174e95b1e76d73584', '[\"*\"]', NULL, '2022-06-29 10:06:51', '2022-06-29 10:06:51'),
(45, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'b5c2b7ff8d5a4627c540b529195acfbfbc268a272f0e698ff21e971bfedaa71d', '[\"*\"]', NULL, '2022-07-03 18:08:30', '2022-07-03 18:08:30'),
(46, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'd3dc3667e247a2300eaf966f1650edde2d9deb991661bb3c2a42ab883df3f786', '[\"*\"]', NULL, '2022-07-03 18:09:47', '2022-07-03 18:09:47'),
(47, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '82efea66d1a4887e483f1473bfc33e7d52cd22fd4676b0b0f0e682773105d390', '[\"*\"]', NULL, '2022-07-03 18:12:24', '2022-07-03 18:12:24'),
(48, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '0265e559fd5964e8a964fb01c95ad56242f62b64b5d56ff0e5005af65c42a198', '[\"*\"]', NULL, '2022-07-03 18:21:12', '2022-07-03 18:21:12'),
(49, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '3dc0c593de44019a66d65f18c93182770dfd075924d385fc070ef31fe1c73715', '[\"*\"]', NULL, '2022-07-03 19:23:33', '2022-07-03 19:23:33'),
(50, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '358bd7d44c44cb98f58e8a093c65c46e8b4ac4ce818c6779b16e714a8b1e9912', '[\"*\"]', NULL, '2022-07-03 19:27:59', '2022-07-03 19:27:59'),
(51, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '318375b7aeedf182757ad46a93141861d3d2703b54757e1add1765c73f3fa972', '[\"*\"]', NULL, '2022-07-03 19:53:49', '2022-07-03 19:53:49'),
(52, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'd77f889e8f3291e916ee340e3e67459f5785abf65baa0cabf073c257617a04ab', '[\"*\"]', NULL, '2022-07-05 04:36:29', '2022-07-05 04:36:29'),
(53, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '44386574d804356cf736cccbc01e167fef0b27001c82e203c7042cab18a8f918', '[\"*\"]', NULL, '2022-07-05 04:38:30', '2022-07-05 04:38:30'),
(54, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'e09d49edc43de231ae676d14e65c4a900c974e6338561abddd57a2b4815b44b7', '[\"*\"]', NULL, '2022-07-05 22:03:22', '2022-07-05 22:03:22'),
(55, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'ca791c8ca8d797708e483a90463e51b9d828d114b5c4db18f25927333b4b396e', '[\"*\"]', NULL, '2022-07-06 18:20:22', '2022-07-06 18:20:22'),
(56, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', 'df96795aa5b1ee099e0ca43d39874815cfa977908d53d7af34f97560dc3e324b', '[\"*\"]', NULL, '2022-07-06 18:24:15', '2022-07-06 18:24:15'),
(57, 'App\\Models\\User', 2, 'hatrang@gmail.com_Token', '6173eb7bdc07d7bfe06e70a3b2f87bb7a61b133c50f0e6fba724d91c0960da2c', '[\"*\"]', NULL, '2022-07-06 21:29:27', '2022-07-06 21:29:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `responsible`
--

CREATE TABLE `responsible` (
  `id_role` int(11) NOT NULL,
  `id_function` int(11) NOT NULL,
  `id_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `responsible`
--

INSERT INTO `responsible` (`id_role`, `id_function`, `id_group`) VALUES
(1, 1, 1),
(1, 2, 1),
(6, 1, 1),
(6, 1, 2),
(6, 1, 3),
(6, 1, 4),
(6, 1, 5),
(6, 1, 6),
(6, 1, 7),
(6, 2, 1),
(6, 2, 2),
(6, 2, 3),
(6, 2, 4),
(6, 2, 5),
(6, 2, 6),
(6, 2, 7),
(6, 3, 1),
(6, 3, 2),
(6, 3, 3),
(6, 3, 4),
(6, 3, 5),
(6, 3, 6),
(6, 3, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `role_name` varchar(20) NOT NULL,
  `role_describe` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id_role`, `role_name`, `role_describe`) VALUES
(1, 'Kế toán', 'kế có nghĩa là liệt kê, ghi chép những của cải, tài sản, hoạt động của đơn vị, tổ chức; toán là tính toán, tính ra kết quả lao động mà còn người đạt được. Vậy kế toán là gì? Đó là công việc ghi chép, thu nhận, xử lý và cung c'),
(2, 'Bác sĩ', 'Khám chữa bệnh, cho thước bệnh nhân'),
(3, 'Lễ tân', 'Chủ động chào hỏi, ân cần hướng dẫn cho khách hàng theo đúng quy định của bệnh viện.\r\nĐăng ký và thu phí khám bệnh cho KH theo đúng quy trình của bệnh viện.\r\nThanh toán khi có chỉ định của BS\r\nThu tạm ứng: Đối với các trường '),
(4, 'Quản lý', 'Quản lý là việc quản trị của một tổ chức, cho dù đó là một doanh nghiệp, một tổ chức phi lợi nhuận hoặc cơ quan chính phủ. Quản lý bao gồm các hoạt động thiết lập chiến lược của một tổ chức và điều phối các nỗ lực của nhân vi'),
(5, 'Admin', 'Quản trị viên website cho phép điều phối và kiểm soát tất cả quy trình hoạt động của một website hay sử dụng những thông tin số liệu phân tích của website tại thời điểm nào đó để có thể lựa chọn chiến lược phù hợp, hay định h'),
(6, 'Superadmin', 'Quyền Quản trị viên cao nhất của Hệ thống. Với quyền này, bạn có thể sửa đổi tất cả các loại cài đặt ảnh hưởng đến khả năng đăng nhập, truy cập và cộng tác trong Hệ thống của người dùng.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `id_service` varchar(10) NOT NULL,
  `service_name` varchar(30) NOT NULL,
  `describe` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `service`
--

INSERT INTO `service` (`id`, `id_service`, `service_name`, `describe`, `created_at`, `updated_at`) VALUES
(0, 'MH', 'Khám tai mũi họng', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 15:52:53', '2022-07-08 05:51:38'),
(0, 'NK', 'Khám ngoại khoa', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 09:02:21', '2022-07-08 05:51:38'),
(0, 'PK', 'Khám phụ khoa', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 15:52:53', '2022-07-08 05:51:38'),
(0, 'RHM', 'Khám răng hàm mặt', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 15:52:53', '2022-07-08 05:51:38'),
(0, 'TM', 'Khám tim mạch', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 15:52:53', '2022-07-08 05:51:38'),
(0, 'TQ', 'Khám tổng quát', 'Khám và điều trị chuyên sâu về lĩnh vực tai mũi họng.', '2022-07-06 15:52:53', '2022-07-08 05:51:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id_service` varchar(10) NOT NULL,
  `id_equipment` varchar(10) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id_service`, `id_equipment`, `updated_at`, `created_at`) VALUES
('MH', 'CEN_01', '2022-07-06 18:27:49', '2022-07-06 18:27:49'),
('MH', 'COUN_01', '2022-07-05 15:31:41', '2022-07-05 15:31:41'),
('MH', 'INT_01', '2022-07-06 02:04:25', '2022-07-06 02:04:25'),
('MH', 'INT_02', '2022-07-06 00:32:37', '2022-07-06 00:32:37'),
('MH', 'INT_03', '2022-07-06 00:37:11', '2022-07-06 00:37:11'),
('MH', 'INT_04', '2022-07-06 00:41:51', '2022-07-06 00:41:51'),
('MH', 'INT_05', '2022-07-06 00:42:52', '2022-07-06 00:42:52'),
('MH', 'INT_06', '2022-07-06 00:43:20', '2022-07-06 00:43:20'),
('MH', 'KIO_02', '2022-07-05 14:43:46', '2022-07-05 14:43:46'),
('PK', 'CEN_01', '2022-07-06 18:27:49', '2022-07-06 18:27:49'),
('PK', 'COUN_01', '2022-07-05 15:31:41', '2022-07-05 15:31:41'),
('PK', 'INT_01', '2022-07-06 02:04:25', '2022-07-06 02:04:25'),
('PK', 'INT_02', '2022-07-06 00:32:37', '2022-07-06 00:32:37'),
('PK', 'INT_03', '2022-07-06 00:37:11', '2022-07-06 00:37:11'),
('PK', 'INT_04', '2022-07-06 00:41:51', '2022-07-06 00:41:51'),
('PK', 'INT_05', '2022-07-06 00:42:52', '2022-07-06 00:42:52'),
('PK', 'INT_06', '2022-07-06 00:43:20', '2022-07-06 00:43:20'),
('PK', 'KIO_02', '2022-07-05 14:43:46', '2022-07-05 14:43:46'),
('RHM', 'COUN_01', '2022-07-05 15:31:41', '2022-07-05 15:31:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_equipment`
--

CREATE TABLE `type_equipment` (
  `id_type` int(11) NOT NULL,
  `type_name` varchar(20) NOT NULL,
  `type_name_vi` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `type_equipment`
--

INSERT INTO `type_equipment` (`id_type`, `type_name`, `type_name_vi`) VALUES
(1, 'Kios', 'Kios'),
(2, 'Systerm', 'Hệ thống'),
(3, 'display counter', 'Quầy'),
(4, 'display center', 'Trung tâm'),
(5, 'usder interface', 'Kios');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_role` int(11) NOT NULL,
  `status_active` int(11) NOT NULL,
  `status_login` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `avatar`, `username`, `email`, `email_verified_at`, `password`, `id_role`, `status_active`, `status_login`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Thiết bị', '123456789', '', 'Kios 02', '', NULL, '123456789', 0, 0, 0, NULL, NULL, '2022-07-06 18:27:49'),
(2, 'Phạm Ngọc Hà Trang', '123456789', 'uploads/avatar/1656896176.png', 'Hatrang215', 'hatrang@gmail.com', NULL, '$2y$10$DwrarRb5foaDabvKw7oNCekbyL1KwEGpMGCnXB89IQf0HKgRPprtu', 6, 1, 1, NULL, '2022-06-16 02:57:25', '2022-07-06 21:29:27'),
(3, 'Nguyễn Như Yến', '123456789', '', 'YenNhu1234', 'YenNhu@gmail.com', NULL, '123456789', 1, 1, 0, NULL, NULL, '2022-07-06 18:33:00'),
(4, 'Lê Như Hùng', '123456789', '', 'NhuHung12345', 'NhuHung@gmil.com', NULL, '123456789', 2, 1, 0, NULL, '2022-06-28 02:59:23', '2022-06-28 02:59:23'),
(5, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-05 14:43:46', '2022-07-05 14:43:46'),
(6, 'Thiết bị', '', '', 'Counter01', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-05 15:31:41', '2022-07-05 15:31:41'),
(7, 'Thiết bị', '', '', 'Linhcenter02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:29:09', '2022-07-06 00:29:09'),
(8, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:32:37', '2022-07-06 00:32:37'),
(9, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:37:11', '2022-07-06 00:37:11'),
(10, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:41:50', '2022-07-06 00:41:50'),
(11, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:42:52', '2022-07-06 00:42:52'),
(12, 'Thiết bị', '', '', 'Kios 02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 00:43:20', '2022-07-06 00:43:20'),
(13, 'Nguyễn Thành Nhân', '123456789', '', 'ThanhY123', 'ThanhY@gmail.com', NULL, '123456789', 1, 1, 0, NULL, '2022-07-06 03:05:22', '2022-07-06 04:13:22'),
(14, 'Trần Ngụ Ngôn', '123456789', '', 'NguNgon123', 'NguNgon@gmail.com', NULL, '123456789', 4, 1, 0, NULL, '2022-07-06 03:07:56', '2022-07-06 03:07:56'),
(15, 'Thiết bị', '', '', 'LingCenter02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 18:26:07', '2022-07-06 18:26:07'),
(16, 'Thiết bị', '', '', 'LingCenter02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 18:26:16', '2022-07-06 18:26:16'),
(17, 'Thiết bị', '', '', 'LingCenter02', '', NULL, '123456789', 0, 1, 0, NULL, '2022-07-06 18:26:49', '2022-07-06 18:26:49'),
(18, 'Mạc Như Hưng', '123456789', '', 'Nhuhung1234', 'NhuHung@gmail.com', NULL, '123456789', 1, 1, 0, NULL, '2022-07-06 18:33:57', '2022-07-06 18:33:57');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `detail_service`
--
ALTER TABLE `detail_service`
  ADD PRIMARY KEY (`id_detail_service`),
  ADD KEY `FK_detail_service` (`id_service`);

--
-- Chỉ mục cho bảng `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id_diary`),
  ADD KEY `FK_User_Diary` (`id_user`);

--
-- Chỉ mục cho bảng `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id_equipment`),
  ADD KEY `FK_Type_Equipment` (`id_type`),
  ADD KEY `FK_User_Equipment` (`id_user`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `function`
--
ALTER TABLE `function`
  ADD PRIMARY KEY (`id_function`);

--
-- Chỉ mục cho bảng `group_function`
--
ALTER TABLE `group_function`
  ADD PRIMARY KEY (`id_group`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `number_supply`
--
ALTER TABLE `number_supply`
  ADD PRIMARY KEY (`id_number_supply`),
  ADD KEY `FK_Service_Supply` (`id_service`),
  ADD KEY `FK_Equipment_Supply` (`id_equipment`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `responsible`
--
ALTER TABLE `responsible`
  ADD PRIMARY KEY (`id_role`,`id_function`,`id_group`),
  ADD KEY `FK_res_group` (`id_group`),
  ADD KEY `FK_res_func` (`id_function`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Chỉ mục cho bảng `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_service`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_service`,`id_equipment`),
  ADD KEY `FK_equipment` (`id_equipment`);

--
-- Chỉ mục cho bảng `type_equipment`
--
ALTER TABLE `type_equipment`
  ADD PRIMARY KEY (`id_type`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `detail_service`
--
ALTER TABLE `detail_service`
  MODIFY `id_detail_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `group_function`
--
ALTER TABLE `group_function`
  MODIFY `id_group` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `number_supply`
--
ALTER TABLE `number_supply`
  MODIFY `id_number_supply` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2100039;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `type_equipment`
--
ALTER TABLE `type_equipment`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `detail_service`
--
ALTER TABLE `detail_service`
  ADD CONSTRAINT `FK_detail_service` FOREIGN KEY (`id_service`) REFERENCES `service` (`id_service`);

--
-- Các ràng buộc cho bảng `diary`
--
ALTER TABLE `diary`
  ADD CONSTRAINT `FK_User_Diary` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `FK_Type_Equipment` FOREIGN KEY (`id_type`) REFERENCES `type_equipment` (`id_type`),
  ADD CONSTRAINT `FK_User_Equipment` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `number_supply`
--
ALTER TABLE `number_supply`
  ADD CONSTRAINT `FK_Equipment_Supply` FOREIGN KEY (`id_equipment`) REFERENCES `equipment` (`id_equipment`),
  ADD CONSTRAINT `FK_Service_Supply` FOREIGN KEY (`id_service`) REFERENCES `service` (`id_service`);

--
-- Các ràng buộc cho bảng `responsible`
--
ALTER TABLE `responsible`
  ADD CONSTRAINT `FK_res_func` FOREIGN KEY (`id_function`) REFERENCES `function` (`id_function`),
  ADD CONSTRAINT `FK_res_group` FOREIGN KEY (`id_group`) REFERENCES `group_function` (`id_group`),
  ADD CONSTRAINT `FK_res_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Các ràng buộc cho bảng `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `FK_Service` FOREIGN KEY (`id_service`) REFERENCES `service` (`id_service`),
  ADD CONSTRAINT `FK_equipment` FOREIGN KEY (`id_equipment`) REFERENCES `equipment` (`id_equipment`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
