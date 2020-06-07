-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5992
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table zubarska_ordinacija.cena
CREATE TABLE IF NOT EXISTS `cena` (
  `cena_id` int NOT NULL AUTO_INCREMENT,
  `cena_jedan` int NOT NULL DEFAULT '0',
  `cena_paket` int NOT NULL DEFAULT '0',
  `cena_uzrast` int NOT NULL DEFAULT '0',
  `usluga_id` int DEFAULT '0',
  PRIMARY KEY (`cena_id`),
  UNIQUE KEY `usluga_id` (`usluga_id`),
  CONSTRAINT `cena_fk0` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`usluga_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.cena: ~4 rows (approximately)
/*!40000 ALTER TABLE `cena` DISABLE KEYS */;
INSERT INTO `cena` (`cena_id`, `cena_jedan`, `cena_paket`, `cena_uzrast`, `usluga_id`) VALUES
	(29, 1000, 850, 785, 86),
	(31, 1000, 850, 785, 87),
	(34, 1000, 850, 785, 88),
	(37, 1000, 850, 785, 89);
/*!40000 ALTER TABLE `cena` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.karton_pacijent
CREATE TABLE IF NOT EXISTS `karton_pacijent` (
  `karton_pacijent_id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(64) NOT NULL DEFAULT '0',
  `prezime` varchar(64) NOT NULL DEFAULT '0',
  `datum_rodjenja` varchar(255) NOT NULL DEFAULT '0',
  `korisnik_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`karton_pacijent_id`),
  KEY `karton_pacijent_fk0` (`korisnik_id`),
  CONSTRAINT `karton_pacijent_fk0` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.karton_pacijent: ~2 rows (approximately)
/*!40000 ALTER TABLE `karton_pacijent` DISABLE KEYS */;
INSERT INTO `karton_pacijent` (`karton_pacijent_id`, `ime`, `prezime`, `datum_rodjenja`, `korisnik_id`) VALUES
	(14, 'Darko', 'Petrovic', '12.12.2001', 8),
	(15, 'Djordje', 'Dimitrijev', '07.07.1996', 7),
	(16, 'Mirko', 'Radanovic', '03.06.1991', 8);
/*!40000 ALTER TABLE `karton_pacijent` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.kategorija
CREATE TABLE IF NOT EXISTS `kategorija` (
  `kategorija_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`kategorija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.kategorija: ~1 rows (approximately)
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` (`kategorija_id`, `ime`) VALUES
	(1, 'Dentalna pomagala'),
	(2, 'Intervencije');
/*!40000 ALTER TABLE `kategorija` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.korisnik
CREATE TABLE IF NOT EXISTS `korisnik` (
  `korisnik_id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(64) NOT NULL DEFAULT '0',
  `prezime` varchar(64) NOT NULL DEFAULT '0',
  `email` varchar(128) NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL DEFAULT '0',
  `password_hash` varchar(255) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.korisnik: ~5 rows (approximately)
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` (`korisnik_id`, `ime`, `prezime`, `email`, `username`, `password_hash`, `is_admin`) VALUES
	(3, 'Nikola', 'Djikic', 'nikoladjikic22@gmail.com', 'djika22', '462E35CFEC64F25516B6468D584D004B061B1E95A1228112F46F133D6A83949985A7884948D28CD18B4D1BA6BCDE57FD7ECC63487A5E30E02E903B6B69B9D431', 0),
	(7, 'Djordje', 'Dimitrijev', 'djordjedimitrijev@gmail.com', 'djole97', 'DDE38222840592422CB0609EB1BD7030DAAE9D1B52AB5A40B0194DDB9344E7C3F62B343AC88C489E520510059E38DC67CE51A4F6A4BFD759FCCD483EBF8FD167', 1),
	(8, 'Marko', 'Markovic', 'markomarkovic@gmail.com', 'marko22', '79555906C534551881B44996DF24488E01671B95DD0BC24C99F7CE76B4229C4B9AC033305D9A1A70435C6674AA15F0514FC537AF965EDC7E747D3413F09EDD63', 0),
	(15, 'Petar', 'Pitur', 'pera22@gmail.com', 'pera22', '70A32BE04E36A57AF1721F2FD0C251E61DD3E08F17ABEBD4254B2E836A1A1D67BC964B0FA73ED761A6FB97B8B7A6D21756461E2EE7E2CD8DE2AA5AC5352F9943', 1),
	(17, 'David', 'Davidovic', 'david22@gmail.com', 'david22', 'ED71AD5555789626A9ED4A08B3A4A366F896E2923C5373E714DE76602F8EBFE280B04D11AD54D3440366892C265B815A94A3531CC2CD2FFC0F9CAADEAC1BCA8D', 1);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.korisnik_token
CREATE TABLE IF NOT EXISTS `korisnik_token` (
  `korisnik_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`korisnik_token_id`),
  KEY `fk_korisnik_token_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_korisnik_token_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.korisnik_token: ~0 rows (approximately)
/*!40000 ALTER TABLE `korisnik_token` DISABLE KEYS */;
INSERT INTO `korisnik_token` (`korisnik_token_id`, `korisnik_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 7, '2020-06-06 21:50:41', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImtvcmlzbmlrSWQiOjcsInVzZXJuYW1lIjoiZGpvbGU5NyIsImV4cERhdGUiOjE1OTQxNTE0NDEuMjIyLCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTQ3MzA0MX0.dkc9gZxmOoLdvbV532hdcIFcbKlyyYlUehaTdKhE01g', '2020-07-07 19:50:41', 1),
	(2, 7, '2020-06-06 23:04:46', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImtvcmlzbmlrSWQiOjcsInVzZXJuYW1lIjoiZGpvbGU5NyIsImV4cERhdGUiOjE1OTQxNTU4ODYuMjQxLCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTQ3NzQ4Nn0.O9ZzztnAN3fFOIREAW9lXqb8qpzq2VkWVAiG9MqvNOQ', '2020-07-07 21:04:46', 1),
	(3, 7, '2020-06-06 23:04:48', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImtvcmlzbmlrSWQiOjcsInVzZXJuYW1lIjoiZGpvbGU5NyIsImV4cERhdGUiOjE1OTQxNTU4ODguNDM4LCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTQ3NzQ4OH0.babce3_n5VNiJYHxA_kvMzonZORVDngTXzStiBGcUkw', '2020-07-07 21:04:48', 1),
	(4, 7, '2020-06-06 23:04:49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImtvcmlzbmlrSWQiOjcsInVzZXJuYW1lIjoiZGpvbGU5NyIsImV4cERhdGUiOjE1OTQxNTU4ODkuMTYzLCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTQ3NzQ4OX0.RldFEB3OmR7foBW3MlQF_i2-Cmm16RnazEvuSBDNMMU', '2020-07-07 21:04:49', 1),
	(5, 7, '2020-06-06 23:33:11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM1OTkxLjIwNCwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0NzkxOTF9.707b6AJgjzMhlyVrv_cWqHQf4CB-RskZkXKNIT49a68', '2020-08-07 21:33:11', 1),
	(6, 7, '2020-06-06 23:38:10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2MjkwLjA5OSwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk0OTB9.nvqlFxMu8Rd3dbCZzZNYcugE2z1dAsGP_VVstmzVA_I', '2020-08-07 21:38:10', 1),
	(7, 7, '2020-06-06 23:40:15', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDE1LjQ2NywiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MTV9.hAZm956EC66hMsTOk_uoBkHAYmNXin3t5VOAakviTdk', '2020-08-07 21:40:15', 1),
	(8, 7, '2020-06-06 23:40:16', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDE2LjYxMSwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MTZ9.204R5qfUMyFg900ORIADB2UCP6iW5c3Z1Nxhv7FNacU', '2020-08-07 21:40:16', 1),
	(9, 7, '2020-06-06 23:40:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDE5LjAwMiwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MTl9._QXS3x0usRTOBWkCD1Ae_GM7Y59Y80YFcVrcJZSWxnM', '2020-08-07 21:40:19', 1),
	(10, 7, '2020-06-06 23:40:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDE5LjcxOCwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MTl9.GJLFlVCFVk0I_kOgVnUwRpFJaBV0aML4q17kzmYW7Zg', '2020-08-07 21:40:19', 1),
	(11, 7, '2020-06-06 23:40:20', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDIwLjM4LCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTQ3OTYyMH0.1ZNF8wu03pwTWtiqGQoUDH-bftQMVMd7k6yjwh4_qf8', '2020-08-07 21:40:20', 1),
	(12, 7, '2020-06-06 23:40:20', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDIwLjk2OSwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MjB9.8Ln-yyEAdKcVBnnK1dS1-snO2FOEZiEjvu66P9y-hxQ', '2020-08-07 21:40:20', 1),
	(13, 7, '2020-06-06 23:40:21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDIxLjUzOSwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MjF9.CryZCOph3ivapzxF7B-EffEWw5MCdBLKbVmx2Yvpl1E', '2020-08-07 21:40:21', 1),
	(14, 7, '2020-06-06 23:40:22', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDIyLjA2OSwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MjJ9.S81GFB0J8yaGFSifgXveqydqFjalc7J3Kku4jTgFavo', '2020-08-07 21:40:22', 1),
	(15, 7, '2020-06-06 23:40:22', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NDIyLjUyMiwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk2MjJ9.RWnGnrkcoPM1sGoSNSJaHJUtz7grur8ef3pW3Acr-Kw', '2020-08-07 21:40:22', 1),
	(16, 7, '2020-06-06 23:44:20', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2NjYwLjQ2NCwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk4NjB9.glihNlm6R58zWm1XGXk3-IJeXgGM3P9IWllpeofnbwU', '2020-08-07 21:44:20', 1),
	(17, 7, '2020-06-06 23:44:57', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODM2Njk3LjgzNiwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE0Nzk4OTd9.pKN3uEqBYLDb1YsOvwtR_Mql8Q16chfBaxIa3SB-brA', '2020-08-07 21:44:57', 1),
	(18, 7, '2020-06-07 11:02:43', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImtvcmlzbmlrSWQiOjcsInVzZXJuYW1lIjoiZGpvbGU5NyIsImV4cERhdGUiOjE1OTQxOTg5NjMuNDg1LCJpcCI6Ijo6MSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjUuMCIsImlhdCI6MTU5MTUyMDU2M30.F5G_BhUwpAZS3gAfPLAzoM_TYRWp6KCYhHoXQuCCi9E', '2020-07-08 09:02:43', 1),
	(19, 7, '2020-06-07 11:04:06', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJrb3Jpc25pa0lkIjo3LCJ1c2VybmFtZSI6ImRqb2xlOTciLCJleHBEYXRlIjoxNTk2ODc3NDQ2LjAzMiwiaXAiOiI6OjEiLCJ1c2VyQWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI1LjAiLCJpYXQiOjE1OTE1MjA2NDZ9.oMFKFcHqdRkE39DRN3rVv_t-iB54uSQ4skN7LhkjRCc', '2020-08-08 09:04:06', 1);
/*!40000 ALTER TABLE `korisnik_token` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.pregled
CREATE TABLE IF NOT EXISTS `pregled` (
  `pregled_id` int NOT NULL AUTO_INCREMENT,
  `usluga_id` int NOT NULL DEFAULT '0',
  `karton_pacijent_id` int NOT NULL DEFAULT '0',
  `datum` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pregled_id`),
  KEY `pregled_fk0` (`usluga_id`),
  KEY `pregled_fk1` (`karton_pacijent_id`),
  CONSTRAINT `pregled_fk0` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`usluga_id`) ON UPDATE CASCADE,
  CONSTRAINT `pregled_fk1` FOREIGN KEY (`karton_pacijent_id`) REFERENCES `karton_pacijent` (`karton_pacijent_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.pregled: ~2 rows (approximately)
/*!40000 ALTER TABLE `pregled` DISABLE KEYS */;
INSERT INTO `pregled` (`pregled_id`, `usluga_id`, `karton_pacijent_id`, `datum`) VALUES
	(1, 86, 14, '11.11.2019'),
	(2, 87, 15, '13.05.2020');
/*!40000 ALTER TABLE `pregled` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.usluga
CREATE TABLE IF NOT EXISTS `usluga` (
  `usluga_id` int NOT NULL AUTO_INCREMENT,
  `kataloski_broj` int NOT NULL DEFAULT '0',
  `naziv_usluge` varchar(64) NOT NULL DEFAULT '0',
  `opis` varchar(255) NOT NULL DEFAULT '0',
  `kategorija_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`usluga_id`),
  UNIQUE KEY `kataloski_broj` (`kataloski_broj`),
  UNIQUE KEY `naziv_usluge` (`naziv_usluge`),
  KEY `FK_0` (`kategorija_id`),
  CONSTRAINT `FK_0` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`kategorija_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.usluga: ~4 rows (approximately)
/*!40000 ALTER TABLE `usluga` DISABLE KEYS */;
INSERT INTO `usluga` (`usluga_id`, `kataloski_broj`, `naziv_usluge`, `opis`, `kategorija_id`) VALUES
	(86, 1, 'Plombiranje', 'Plombiranje', 0),
	(87, 2, 'Vadjenje zuba', 'Vadjenje zuba', 0),
	(88, 4, 'Ciscenje kamenca', 'Ultrazvucno ciscenje kamenca', 0),
	(89, 3, 'Fiksna proteza', 'Fiksna proteza za svakodnevno nosenje', 0);
/*!40000 ALTER TABLE `usluga` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
