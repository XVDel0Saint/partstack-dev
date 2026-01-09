-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2026 at 05:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partstackdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_08_150556_create_oauth_auth_codes_table', 2),
(5, '2026_01_08_150557_create_oauth_access_tokens_table', 2),
(6, '2026_01_08_150558_create_oauth_refresh_tokens_table', 2),
(7, '2026_01_08_150559_create_oauth_clients_table', 2),
(8, '2026_01_08_150600_create_oauth_device_codes_table', 2),
(9, '2026_01_08_151748_create_products_table', 3),
(10, '2026_01_08_160952_add_role_to_users_table', 4),
(11, '2026_01_08_212512_add_image_to_products_table', 5),
(12, '2026_01_08_230601_add_category_to_products_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0444dbad52f0c0c08201eb452358be443457f8f794a76eff8249fcd18315716be82adab4db07d3c9', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:36:50', '2026-01-08 11:36:50', '2027-01-08 19:36:50'),
('09eb9f2273ff0cb19e8d39d92ca6294b991e6c854962531c4d38c6a7547ae074b969c5e3e3440602', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 15:24:05', '2026-01-08 15:24:05', '2027-01-08 23:24:05'),
('192b393bd3c5e2c96d2d8ffff9f5f643b42ef28f12b13fc06bed199a78e7a70082c8ce8f7911b949', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:15:35', '2026-01-08 12:15:35', '2027-01-08 20:15:35'),
('1d257ae2989a1c7d6327ae87f37123fceae180826860bd12aee1317a9d813433e76ccbcbf28c7a06', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:28:29', '2026-01-08 12:28:29', '2027-01-08 20:28:29'),
('2b5de5bbfc5362ba8901b2a0c0770db803261707db9bcc69642df8f4ef53c45d214d133a23aecb14', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 14:20:38', '2026-01-08 14:20:38', '2027-01-08 22:20:38'),
('2d978718771eb16911b56903f323eb52702f10b84d96f650ae636c2de91f889585d7d381c542d5d6', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:37:17', '2026-01-08 12:37:17', '2027-01-08 20:37:17'),
('3b7ed73f3efb32489abacc9ec9100600d550718273583dfc035f7ac41ede632f8ed4bcb3e5e52828', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:59:46', '2026-01-08 11:59:46', '2027-01-08 19:59:46'),
('3f4fb33da41bf139f8008f1f0682d928cc29e6c28b7b994dc87715f391def848803601d4c3590ac2', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:58:45', '2026-01-08 11:58:45', '2027-01-08 19:58:45'),
('405b0bb20da09a376508dad19915827c0ec73f029a478151daf9509ccf388cc55056c629f5047314', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:19:05', '2026-01-08 12:19:05', '2027-01-08 20:19:05'),
('44dbb742e9a782f7e116cd2a5612b08e6697527242d2156ee4d43938a2717ecd04444e3bc472843f', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 15:31:42', '2026-01-08 15:31:42', '2027-01-08 23:31:42'),
('5c5c8d6dfb1bf51b3880aec0426684459fcffb36a28976b9ff47e7b46a2196bb12aa220129384211', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 08:13:48', '2026-01-08 08:13:48', '2027-01-08 16:13:48'),
('5d399836397510b5454e310bba303f20df286e69a3cf2a64eeec198f522bc43ab2b060107aaecb65', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:58:59', '2026-01-08 11:58:59', '2027-01-08 19:58:59'),
('611cc28dd122c96021ecdba17103e71a81c65903b8445abcdc277c34ae9ae7c421fc077339b00842', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 19:55:53', '2026-01-08 19:55:53', '2027-01-09 03:55:53'),
('6679337a9fad9e069415a8936f1b0caff622886c053d29406ff2d126ec882d5c5528cae161341289', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:15:57', '2026-01-08 12:15:57', '2027-01-08 20:15:57'),
('6e7175a09576255f3af44e1f20e80c9a7922fa06c3cb47df1057223a1f652969cf3cf758141a82ff', 4, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:29:09', '2026-01-08 12:29:09', '2027-01-08 20:29:09'),
('72e451a53259e00cedbfcd797106799f6027b2fb0deb25817d04cff146261d6e22c72b59ad906857', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:56:10', '2026-01-08 12:56:10', '2027-01-08 20:56:10'),
('76910b69a314743bb7d93fa05322f093583c02e7333e440be9149ae7c4cc465d4457e4b167f43be7', 7, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 17:45:32', '2026-01-08 17:45:32', '2027-01-09 01:45:32'),
('786494081562a743b3ab436fdc2498c14c17e298e3ef995f4a7ed26b30fd02b9b65b8c19002d6f63', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 08:19:09', '2026-01-08 08:19:09', '2027-01-08 16:19:09'),
('8033524dbe17d2111c9cad13f0f8e901c17d8bc2b39e534c2e854a0a3b6a93fbf5bff94f2ce99386', 7, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 19:29:22', '2026-01-08 19:29:22', '2027-01-09 03:29:22'),
('8391630c796bba1a0be2ed51040463800d531a1c7096a3693a020fe31227da6e1aad0a63ec3d2795', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 07:58:27', '2026-01-08 07:58:27', '2027-01-08 15:58:27'),
('880cf765d1ac37a9a32b2e30e893e3e369d49276609cc09f571e596ea5c01b7afcfab5a133ddc849', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:16:43', '2026-01-08 12:16:43', '2027-01-08 20:16:43'),
('8d18745ab598fc0e5aa8b7423bf57af835eaf9351ba05dd3c23f755dc237031049d480b4345ec944', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 19:00:26', '2026-01-08 19:00:26', '2027-01-09 03:00:26'),
('99581a172b7d2493545c135ad7fc90e4aed4d16431e2b8f9869897d8161c04bc84d19e89f5db4bec', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:02:11', '2026-01-08 12:02:11', '2027-01-08 20:02:11'),
('9a48d899cd7803bcb7f5deab5d124e1eef8fefbdcdaff2ce70dda9c9bfecac728813611942cf3360', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 08:17:48', '2026-01-08 08:17:48', '2027-01-08 16:17:48'),
('9eb9aacd3f542359b30080b3085537c0e086fa60f98e80c4077c5ca01f052472b0f04441e94a2c5a', 6, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 17:42:26', '2026-01-08 17:42:26', '2027-01-09 01:42:26'),
('a2f08fcf27bae6d1055b97bed887d2a48cb3d0f65a0cebaa0aaa06b290066e94fc77786d0e80929a', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 08:26:37', '2026-01-08 08:26:37', '2027-01-08 16:26:37'),
('a587da5a2f42abcaa00d7cfe2a532599e4f47f5bef7e776a59e890f7f2430652553e810bcc9c3274', 4, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:32:24', '2026-01-08 12:32:24', '2027-01-08 20:32:24'),
('aa09fa466ae60d046edd37899638510b862352a9766a6e1ccf3d96faeef4f84c3da70e92f81b5368', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:18:47', '2026-01-08 12:18:47', '2027-01-08 20:18:47'),
('ae1d8eb83171b1a3e99c7298dca9c3a0dafbc1361d9607f49b66e5b43ef900ed64675a845f59388d', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:54:11', '2026-01-08 11:54:11', '2027-01-08 19:54:11'),
('aeec9add6f2861b23fe7cf737e499e3c42174253addc137530a337e55422a136717cb5a0093d5ead', 5, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 15:27:48', '2026-01-08 15:27:48', '2027-01-08 23:27:48'),
('ba399f58e8bb2d73e488d900232b9ba8949c0ac9b673d8fd3384acebdb1440a4cfebc7e055c791a9', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:51:14', '2026-01-08 12:51:14', '2027-01-08 20:51:14'),
('c05f313d1d49dc4e21b6e06377b495766e2bfd00dae5fc2adea4d5ce571d28cea9984281e0859999', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 13:02:01', '2026-01-08 13:02:01', '2027-01-08 21:02:01'),
('c59cf3681c499467bc68be8e410b59b2db4348463cf765b728fe1b595703e36fb478cba282d43baf', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:59:41', '2026-01-08 11:59:41', '2027-01-08 19:59:41'),
('cabe52feb7c7ecd90bc8435c1c08ea6d141eeeb0f7b7820d3d888de8b9de322e418d2715d0eed83a', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 18:10:37', '2026-01-08 18:10:37', '2027-01-09 02:10:37'),
('ccbfaea619f40db33d4b3d8ac0dba8697474a42fca2ec63c6d234279cbed5e06871428740327a119', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 07:59:59', '2026-01-08 07:59:59', '2027-01-08 15:59:59'),
('d0ded051dec38dfc9e6664166945d3914ce7dc0854caafb860392442b908090f5440797c3997779b', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:10:56', '2026-01-08 12:10:56', '2027-01-08 20:10:56'),
('d69807c8af525f1c3d7e295d5622700b6ce6fb0360aa434e71811f003182930cb221c7123851593e', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:24:47', '2026-01-08 12:24:47', '2027-01-08 20:24:47'),
('d99ddea936a857b4c5cbd238713a97a6729f0eafac68fe613d27afbafd9a8bfb8afe51bef83aa8d0', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:59:31', '2026-01-08 11:59:31', '2027-01-08 19:59:31'),
('df80974ea16cdfd9bb04975f7151ec7602b52e0337f97352a6907b32748322ea42768eace9586032', 8, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 19:52:59', '2026-01-08 19:52:59', '2027-01-09 03:52:59'),
('e8c415aff8afe37d051baf02f8b2e4d8b48eb28128eed05f9585f93d3db2b063dddf01ce5a92babe', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:10:45', '2026-01-08 12:10:45', '2027-01-08 20:10:45'),
('ebcec4e570839ebdabc58912e6e9b159dc16f854eb767b4f9e36407a586478d289dcb53850a44cd8', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:18:16', '2026-01-08 12:18:16', '2027-01-08 20:18:16'),
('ebf9bc57afcb2c7cdb98d40af9bf73e07fbb7ab6d54e00c3249acad4017ece8598bfd598d233b645', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 12:19:27', '2026-01-08 12:19:27', '2027-01-08 20:19:27'),
('f547e113a9dfaa62d7e8a1c102e7883650c5803252b46343c1bd796a99884476a0fd8bb662ec8183', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 11:59:48', '2026-01-08 11:59:48', '2027-01-08 19:59:48'),
('fe2df4660b0efa8f085ec96c87f872e370321593af236d038991c5efe99e4b65922a017df9b4945e', 2, '019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', 'PartStack', '[]', 0, '2026-01-08 07:54:58', '2026-01-08 07:54:58', '2027-01-08 15:54:58');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` char(36) NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` char(36) NOT NULL,
  `owner_type` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect_uris` text NOT NULL,
  `grant_types` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `owner_type`, `owner_id`, `name`, `secret`, `provider`, `redirect_uris`, `grant_types`, `revoked`, `created_at`, `updated_at`) VALUES
('019b9e24-94c4-7093-b5b7-b4d92ac2e6ea', NULL, NULL, 'Laravel', '$2y$12$08eJwk2xiaMg6uoj4WzuIew8T0P/axqgJC6qk6ozzXUv9iehtyf1a', NULL, '[]', '[\"personal_access\"]', 0, '2026-01-08 07:05:56', '2026-01-08 07:05:56');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_device_codes`
--

CREATE TABLE `oauth_device_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `user_code` char(8) NOT NULL,
  `scopes` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `user_approved_at` datetime DEFAULT NULL,
  `last_polled_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` char(80) NOT NULL,
  `access_token_id` char(80) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `price`, `stock`, `image`, `created_at`, `updated_at`) VALUES
(32, 'AMD Ryzen 5 7600x', 'CPU', 'Updated High Mid level Gaming CPU', 120.00, 27, 'products/SZuzwyqIWcpupLogX3m4kinxKK5AfwQ7DOUtOHlH.jpg', '2026-01-08 16:00:01', '2026-01-08 19:35:37'),
(33, 'Coolermaster ML240L v2', 'Cooling', 'Water cooling for PC', 350.00, 15, 'products/BeNNZiBRI2BNoFUto2puaaYT0xr5LCxUQNu9zBCK.jpg', '2026-01-08 16:01:29', '2026-01-08 16:01:29'),
(35, 'Kingston nv2 storage', 'Storage', 'Storage for PC', 110.00, 22, 'products/0skFD6xFFMll0XjRSb4Ti4G4BMcEmlKJiIx9Yxex.png', '2026-01-08 16:04:30', '2026-01-08 16:04:30'),
(36, 'Gigabyte P450B', 'Power', 'Power supply for PC', 89.00, 8, 'products/aB8qdZyCsQm7D38cb9yvaAw3xjWPIPsA95mKJoqB.jpg', '2026-01-08 16:06:06', '2026-01-08 16:06:06'),
(37, 'Fractal Case', 'Case', 'Gaming case', 50.00, 9, 'products/HOFvJ73mFZgUDWn2b9T56liFhabL85Z8vznZ2Gpp.jpg', '2026-01-08 16:06:42', '2026-01-08 16:06:42'),
(38, 'NVIDIA RTX 4080 Super', 'GPU', 'High end gaming GPU', 570.00, 14, 'products/5mndkb99DMPAqMpCePs8gRGDsZn9xjN4lXAZJuyj.jpg', '2026-01-08 16:07:23', '2026-01-08 16:07:23'),
(39, 'Asus TUF PSU', 'CPU', 'Power supply for PC', 98.00, 19, 'products/KK1fCXoUIxjlnyjeaTxxOIcvRekmRfbeRYt4s1hg.jpg', '2026-01-08 16:09:28', '2026-01-08 16:09:28'),
(40, 'CORSAIR ddr5 RAM', 'Memory', 'RAM for computer', 88.99, 3, 'products/3RRTev1Zkg1sxf1sWqOQmL1dId7pZ6C5OkJzBrzP.jpg', '2026-01-08 16:44:56', '2026-01-08 16:44:56'),
(41, 'Intel Core i9-14900K', 'CPU', '24-core gaming processor', 589.99, 24, 'products/2D9zmv9RNNjqaouJtOVwnXlchtAN4H2ZfYdJFVyF.jpg', '2026-01-08 19:50:31', '2026-01-08 19:50:31');

--
-- Triggers `products`
--
DELIMITER $$
CREATE TRIGGER `before_products_insert` BEFORE INSERT ON `products` FOR EACH ROW BEGIN
    IF NEW.stock < 0 THEN
        SET NEW.stock = 0;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('8em2x3eQ2U4zZlfdl6S1EiFuW6J5hOXtrHuXOUE2', NULL, '127.0.0.1', 'PostmanRuntime/7.49.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSVZwT1lxUGUwUWZOS0ZUcWQyTXVocFQ4N3kzWHBOaHpXa0ZuQ2ZKTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1767927891);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Test User', 'test@example.com', '2026-01-08 07:20:25', '$2y$12$I.ZNwVyX49fKgaXBngPBk.0MVm/ca/AISySF8zzIWSdceoA7m76CG', 'b55wQwR8jM', '2026-01-08 07:20:26', '2026-01-08 08:11:13', 'admin'),
(2, 'Xyrel', 'xyrel@test.com', NULL, '$2y$12$f9QA2zfIfbLzLPf3bXdno.Cux89dolkcKDlnskOBVReHOc35zVfbm', NULL, '2026-01-08 07:49:22', '2026-01-08 08:18:48', 'admin'),
(4, 'User', 'user1@test.com', NULL, '$2y$12$52Su5QLxxTRCpoBKALZOcuiyWtaujE5cEdLwSph5gAyVjuJle4psq', NULL, '2026-01-08 12:29:09', '2026-01-08 12:29:09', 'user'),
(5, 'User', 'user2@test.com', NULL, '$2y$12$WKhBxPKbyadsKUn2UnbfsOirsoKlq.0XJnudUzTS0M8rxazc5fBzG', NULL, '2026-01-08 15:27:48', '2026-01-08 15:27:48', 'user'),
(6, 'User', 'user3@test.com', NULL, '$2y$12$XsAZil59EWB0iq4wBRDCBeN.JoBWinWTUvTy7RJayoGF866ZdckGS', NULL, '2026-01-08 17:42:26', '2026-01-08 17:42:26', 'user'),
(7, 'User', 'admin2@email.com', NULL, '$2y$12$12RTpQ0vud09Zo9G/EC0i.bfJEj.oZJX5Hk4kKaLXalr1WgdAp.im', NULL, '2026-01-08 17:45:32', '2026-01-08 17:45:32', 'admin'),
(8, 'John Doe', 'john@example.com', NULL, '$2y$12$7o7w.d0vbbf2O2E6/tymD..4e9avOEOVb9tbcidpGyyqHsnNOnqQK', NULL, '2026-01-08 19:52:59', '2026-01-08 19:52:59', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_owner_type_owner_id_index` (`owner_type`,`owner_id`);

--
-- Indexes for table `oauth_device_codes`
--
ALTER TABLE `oauth_device_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `oauth_device_codes_user_code_unique` (`user_code`),
  ADD KEY `oauth_device_codes_user_id_index` (`user_id`),
  ADD KEY `oauth_device_codes_client_id_index` (`client_id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
