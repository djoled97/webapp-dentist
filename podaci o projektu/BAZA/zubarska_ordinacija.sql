-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for zubarska_ordinacija
CREATE DATABASE IF NOT EXISTS `zubarska_ordinacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zubarska_ordinacija`;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table zubarska_ordinacija.usluga
CREATE TABLE IF NOT EXISTS `usluga` (
  `usluga_id` int NOT NULL AUTO_INCREMENT,
  `kataloski_broj` int NOT NULL DEFAULT '0',
  `naziv_usluge` varchar(64) NOT NULL DEFAULT '0',
  `opis` varchar(255) NOT NULL DEFAULT '0',
  `kategorija` varchar(64) NOT NULL DEFAULT '0',
  PRIMARY KEY (`usluga_id`),
  UNIQUE KEY `kataloski_broj` (`kataloski_broj`),
  UNIQUE KEY `naziv_usluge` (`naziv_usluge`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
