-- --------------------------------------------------------
-- Host:                         152.70.125.116
-- Server version:               10.3.34-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for drcheguei
CREATE DATABASE IF NOT EXISTS `drcheguei` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `drcheguei`;

-- Dumping structure for table drcheguei.appointments
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sector_id` int(10) NOT NULL,
  `doctor_id` int(10) NOT NULL,
  `hc` varchar(15) NOT NULL,
  `status` int(10) NOT NULL,
  `schedule` datetime NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_appointment_for_hc_and_doctor` (`hc`,`doctor_id`,`schedule`),
  KEY `sector_id` (`sector_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `status` (`status`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`status`) REFERENCES `appointment_statuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table drcheguei.appointments: ~35 rows (approximately)
INSERT INTO `appointments` (`id`, `sector_id`, `doctor_id`, `hc`, `status`, `schedule`, `last_update`, `creation_date`) VALUES
	(14, 1, 11, '12345', 2, '2022-06-29 21:00:00', '2022-07-15 07:50:49', '2022-06-01 07:18:26'),
	(15, 1, 11, '15613', 2, '2022-07-23 00:00:00', '2022-07-15 07:50:53', '2022-06-01 07:18:26'),
	(16, 1, 23, '34736', 3, '2022-08-12 00:00:00', '2022-07-15 07:50:56', '2022-06-01 07:18:26'),
	(17, 1, 29, '55760', 3, '2022-08-16 00:00:00', '2022-06-01 08:40:49', '2022-06-01 07:18:26'),
	(18, 1, 12, '28837', 3, '2022-07-23 00:00:00', '2022-07-15 07:50:58', '2022-06-01 07:18:26'),
	(19, 1, 28, '45732', 5, '2022-08-26 00:00:00', '2022-07-15 07:53:03', '2022-06-01 07:18:26'),
	(20, 1, 24, '73877', 3, '2022-07-13 21:00:00', '2022-07-15 07:53:05', '2022-06-01 07:18:26'),
	(21, 1, 21, '12346', 2, '2022-06-24 15:00:00', '2022-07-15 07:53:06', '2022-06-16 17:18:51'),
	(22, 1, 11, '12345', 1, '2022-07-13 21:00:00', '2022-07-15 22:03:28', '2022-07-04 15:00:00'),
	(23, 1, 11, '12345', 1, '2022-07-13 22:00:00', '2022-07-15 07:53:15', '2022-07-04 15:00:00'),
	(24, 1, 11, '12345', 1, '2022-07-13 20:00:00', '2022-07-15 07:53:17', '2022-07-04 15:00:00'),
	(25, 1, 11, '12345', 1, '2022-07-13 21:30:00', '2022-07-15 07:53:19', '2022-07-04 15:00:00'),
	(26, 1, 11, '12345', 6, '2022-07-13 21:20:00', '2022-07-15 07:53:21', '2022-07-04 15:00:00'),
	(27, 1, 11, '12345', 5, '2022-07-13 23:20:00', '2022-07-15 07:53:22', '2022-07-04 15:00:00'),
	(55, 1, 49, '11111', -1, '2022-07-15 21:30:00', '2022-07-16 00:44:18', '2022-07-15 20:24:48'),
	(56, 1, 49, '22222', 3, '2022-07-15 19:00:00', '2022-07-24 17:57:25', '2022-07-15 20:25:11'),
	(57, 1, 49, '33333', -1, '2022-07-15 20:40:00', '2022-07-16 00:44:12', '2022-07-15 20:35:09'),
	(58, 1, 49, '44444', -1, '2022-07-15 20:48:00', '2022-07-16 00:44:14', '2022-07-15 20:35:52'),
	(59, 1, 49, '55555', -1, '2022-07-15 21:20:00', '2022-07-16 00:44:16', '2022-07-15 20:36:23'),
	(60, 1, 50, '66666', -1, '2022-07-15 20:56:00', '2022-07-15 21:08:34', '2022-07-15 20:55:27'),
	(61, 1, 46, '12345', -1, '2022-07-15 18:27:00', '2022-07-15 21:28:49', '2022-07-15 21:27:28'),
	(62, 1, 49, '66666', -1, '2022-07-15 20:12:00', '2022-07-15 23:13:15', '2022-07-15 23:12:52'),
	(63, 1, 49, '66666', -1, '2022-07-16 20:13:00', '2022-07-15 23:13:41', '2022-07-15 23:13:27'),
	(64, 1, 49, '11111', 3, '2022-07-15 21:56:00', '2022-07-16 01:03:38', '2022-07-16 00:44:38'),
	(65, 1, 49, '33333', 6, '2022-07-15 21:59:00', '2022-07-16 01:03:55', '2022-07-16 00:44:55'),
	(66, 1, 49, '44444', -1, '2022-07-15 21:59:00', '2022-07-16 01:05:13', '2022-07-16 00:45:08'),
	(67, 1, 49, '55555', -1, '2022-07-15 22:53:00', '2022-07-16 01:04:02', '2022-07-16 00:45:23'),
	(68, 1, 49, '12345', 6, '2022-07-15 23:06:00', '2022-07-24 17:57:34', '2022-07-16 01:00:24'),
	(69, 1, 47, '12378', -1, '2022-07-15 23:05:00', '2022-07-16 01:03:27', '2022-07-16 01:02:28'),
	(70, 1, 49, '44444', 2, '2022-07-16 22:04:00', '2022-07-16 01:05:29', '2022-07-16 01:04:48'),
	(71, 1, 46, '12122', 1, '2022-07-15 09:59:00', '2022-07-16 01:07:45', '2022-07-16 01:07:45'),
	(72, 1, 46, '11111', 1, '2022-07-15 09:02:00', '2022-07-16 01:08:17', '2022-07-16 01:08:17'),
	(73, 1, 46, '12122', 1, '2022-07-15 22:30:00', '2022-07-16 01:14:31', '2022-07-16 01:14:31'),
	(74, 1, 48, '11111', -1, '2022-07-16 11:11:00', '2022-07-16 21:18:07', '2022-07-16 21:17:48'),
	(75, 1, 48, '23123', -1, '2022-07-16 03:21:00', '2022-07-16 21:50:29', '2022-07-16 21:49:35');

-- Dumping structure for table drcheguei.appointment_statuses
CREATE TABLE IF NOT EXISTS `appointment_statuses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table drcheguei.appointment_statuses: ~6 rows (approximately)
INSERT INTO `appointment_statuses` (`id`, `name`, `description`) VALUES
	(-1, 'Removido', 'Consulta apagada'),
	(1, 'Não confirmado', 'Aguardando a chegada do paciente'),
	(2, 'Presente', 'Paciente realizou o check-in com sucesso'),
	(3, 'Finalizado', 'Consulta Finalizada'),
	(5, 'Consulta Cancelada', 'Consulta Cancelada pelo Paciente ou Médico'),
	(6, 'Paciente Faltou', 'Paciente Faltou à Consulta');

-- Dumping structure for table drcheguei.sectors
CREATE TABLE IF NOT EXISTS `sectors` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table drcheguei.sectors: ~1 rows (approximately)
INSERT INTO `sectors` (`id`, `name`, `description`) VALUES
	(1, 'Pediatria', 'Pediatria HC Unicamp');

-- Dumping structure for table drcheguei.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL DEFAULT 1,
  `doc` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_login` (`username`) USING BTREE,
  KEY `type` (`type`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `user_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table drcheguei.users: ~33 rows (approximately)
INSERT INTO `users` (`id`, `type`, `doc`, `name`, `username`, `email`, `phone`, `password`, `last_login`, `creation_date`) VALUES
	(11, 2, '000000', 'Administrador', 'admin', 'admin@drcheguei.com', '00 00000-0000', '21232f297a57a5a743894a0e4a801fc3', '2022-07-15 22:05:35', '2022-06-01 07:11:49'),
	(12, 1, '389092', 'Aurelia Chang', 'aurelia', 'aureliachang@unicamp.br', '68 44136-5788', 'B3D072B5-94B6-321E-61E9-8D1FE841B9F9', '2022-06-01 08:41:37', '2022-06-01 07:11:49'),
	(13, 1, '692698', 'Zelenia Pitts', 'zelenia', 'zeleniapitts5986@unicamp.br', '42 53845-4679', 'A1E76757-5104-8E83-C98E-A507C8A7F378', '2022-06-01 08:41:40', '2022-06-01 07:11:49'),
	(14, 2, '62786', 'Dane Clay', 'dane', 'daneclay@unicamp.br', '45 23276-4527', '6D4BD4C5-C69B-7489-40D9-41B396C2B63F', '2022-06-01 08:41:41', '2022-06-01 07:11:49'),
	(15, 1, '596458', 'Yuli Lowe', 'yuli', 'yulilowe@unicamp.br', '39 75394-2314', '35C42E9E-058A-FBDC-EBBF-621AC24EA966', '2022-06-01 08:41:42', '2022-06-01 07:11:49'),
	(16, 1, '289278', 'Brady Black', 'brady', 'bradyblack5183@unicamp.br', '38 46562-7539', '72C769EA-623E-9E0C-5FCC-A5A5EC8A4785', '2022-06-01 08:41:44', '2022-06-01 07:11:49'),
	(17, 1, '840045', 'Ivan Young', 'ivan', 'ivanyoung5584@unicamp.br', '86 65868-5384', '575C935E-4956-63E8-E248-C7528A8B6977', '2022-06-01 08:41:46', '2022-06-01 07:11:49'),
	(18, 2, '423423', 'Bevis Wilkins', 'bevis', 'beviswilkins@unicamp.br', '26 55762-2185', '1B5AC5DD-D1CE-558C-BC2F-DDDA29565618', '2022-06-01 08:41:48', '2022-06-01 07:11:49'),
	(19, 2, '878265', 'Ursula Webster', 'ursula', 'ursulawebster3699@unicamp.br', '76 85188-6646', 'A6C8F372-D54A-B3C2-CD82-8D3AAE9BD311', '2022-06-01 08:41:50', '2022-06-01 07:11:49'),
	(20, 2, '627469', 'Russell Sanchez', 'russell', 'russellsanchez5081@unicamp.br', '22 82622-7747', '26392384-DF5B-BD25-610C-65F958469B67', '2022-06-01 08:41:54', '2022-06-01 07:11:49'),
	(21, 2, '600741', 'Fredericka Rosa', 'fredericka', 'frederickarosa5215@unicamp.br', '36 12552-1786', 'D05363E8-BBBD-E239-472E-1C5675328C1D', '2022-06-01 08:41:55', '2022-06-01 07:11:49'),
	(22, 1, '956185', 'Aaron Gutierrez', 'aaron', 'aarongutierrez7074@unicamp.br', '12 44634-2974', '59C05B78-A514-8E84-5D1A-D3F94689E583', '2022-06-01 08:41:57', '2022-06-01 07:11:49'),
	(23, 1, '678850', 'Allen Garrett', 'allen', 'allengarrett9443@unicamp.br', '46 34248-7765', '3A2A4798-AD6F-A84B-7773-81F00CB55D42', '2022-06-01 08:42:00', '2022-06-01 07:11:49'),
	(24, 2, '174858', 'Price Vega', 'price', 'pricevega9129@unicamp.br', '91 66352-8896', '2A683869-892D-A6C2-C5AB-E86B98C96E9F', '2022-06-01 08:42:01', '2022-06-01 07:11:49'),
	(25, 1, '751184', 'Madeline Dominguez', 'madeline', 'madelinedominguez1523@unicamp.br', '84 32343-3658', '341BBAA9-0401-3D28-EAB6-3019F178E1BC', '2022-06-01 08:42:03', '2022-06-01 07:11:49'),
	(26, 2, '282356', 'Karyn Bryan', 'karyn', 'karynbryan@unicamp.br', '43 76568-8796', '7D353EEB-C6EA-2782-232B-47DCFBE4B91A', '2022-06-01 08:42:05', '2022-06-01 07:11:49'),
	(27, 2, '564808', 'Elmo Peters', 'elmo', 'elmopeters1471@unicamp.br', '33 59664-4955', '194CA14D-CA8B-6DCE-4C9A-E0399B7A4F4F', '2022-06-01 08:42:07', '2022-06-01 07:11:49'),
	(28, 2, '301957', 'Portia Conrad', 'portia', 'portiaconrad4914@unicamp.br', '78 67552-6745', 'AD09E771-AE94-7F56-7075-749D8E98B94A', '2022-06-01 08:42:08', '2022-06-01 07:11:49'),
	(29, 2, '896567', 'Ruby Conley', 'ruby', 'rubyconley1374@unicamp.br', '94 73553-6153', '57BD7A72-5899-4681-64B3-C064B654EF83', '2022-06-01 08:42:09', '2022-06-01 07:11:49'),
	(30, 2, '946032', 'Yeo Estrada', 'yeo', 'yeoestrada@unicamp.br', '44 66487-2526', '73A49E3F-BDFE-F177-BE05-E3D8D1341BA1', '2022-06-01 08:42:11', '2022-06-01 07:11:49'),
	(31, 2, '220208', 'Leticia Adrielli Luz', 'leticia', 'l220208@dac.unicamp.br', '19 99365-6664', 'e959088c6049f1104c84c9bde5560a13', '2022-07-05 00:15:46', '2022-06-01 07:11:49'),
	(32, 2, '000000', 'Exemplo', 'exemplo', 'exemplo@drcheguei.com', '00 00000-0000', '8eb90ec152bd30f4a53f15bf805783dc', '2022-07-15 19:43:39', '2022-06-01 07:11:49'),
	(33, 2, '11111', 'Médico 1', 'medico1', 'medico1@test.com', '1111111', '8418e47de4521e663254df9c682f2d57', '2022-07-15 19:50:47', '2022-07-15 19:44:56'),
	(46, 2, '11111', 'Grupo 1', 'grupo1', 'grupo1@test.com', '1111111', 'a4295b37c0ff4edfc160eec2eb7e7f02', '2022-07-16 01:02:04', '2022-07-15 20:23:27'),
	(47, 2, '22222', 'Grupo 2', 'grupo2', 'grupo2@test.com', '2222222', '9f63b1509a6bae0742e3278022fd167d', '2022-07-16 01:10:46', '2022-07-15 20:23:27'),
	(48, 2, '33333', 'Grupo 3', 'grupo3', 'grupo3@test.com', '3333333', '69ddeb808aead87ffca7b7cb0a4567ef', '2022-07-16 21:48:55', '2022-07-15 20:23:27'),
	(49, 2, '44444', 'Grupo 4', 'grupo4', 'grupo4@test.com', '4444444', '96f2005583b2522abbbc69128ee11639', '2022-07-24 17:56:50', '2022-07-15 20:23:27'),
	(50, 2, '55555', 'Grupo 5', 'grupo5', 'grupo5@test.com', '5555555', '4ce8af84b56d2fea5e23538f524a9ca7', '2022-07-15 21:26:28', '2022-07-15 20:23:27'),
	(51, 2, '66666', 'Grupo 6', 'grupo6', 'grupo6@test.com', '6666666', '5bcc554f193a44440de1f2990928c977', NULL, '2022-07-15 20:23:27'),
	(52, 2, '77777', 'Grupo 7', 'grupo7', 'grupo7@test.com', '7777777', 'a2db7088322569de502d0930d62a3365', NULL, '2022-07-15 20:23:27'),
	(53, 2, '88888', 'Grupo 8', 'grupo8', 'grupo8@test.com', '8888888', '00b89f9d032cf9f1f2947240917ff3b2', NULL, '2022-07-15 20:23:27'),
	(54, 2, '99999', 'Grupo 9', 'grupo9', 'grupo9@test.com', '9999999', '00e1e1504d6c920a449368343762fa3d', NULL, '2022-07-15 20:23:27'),
	(55, 2, '10101', 'Grupo 10', 'grupo10', 'grupo10@test.com', '1010101', '7cc675a174ce6288f2a9aff1eb554666', NULL, '2022-07-15 20:23:27');

-- Dumping structure for table drcheguei.user_types
CREATE TABLE IF NOT EXISTS `user_types` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table drcheguei.user_types: ~2 rows (approximately)
INSERT INTO `user_types` (`id`, `name`, `description`) VALUES
	(1, 'Equipe', 'Doutores, Enfermeiros'),
	(2, 'Administrador', 'Administrador');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
