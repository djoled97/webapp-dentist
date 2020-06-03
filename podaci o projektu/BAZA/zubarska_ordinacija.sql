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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.cena: ~6 rows (approximately)
DELETE FROM `cena`;
/*!40000 ALTER TABLE `cena` DISABLE KEYS */;
INSERT INTO `cena` (`cena_id`, `cena_jedan`, `cena_paket`, `cena_uzrast`, `usluga_id`) VALUES
	(29, 1000, 850, 785, 86),
	(31, 22, 0, 785, 87),
	(34, 1000, 850, 785, 88),
	(40, 1000, 850, 785, 89),
	(48, 111, 850, 785, 108),
	(64, 2, 4, 5, 147);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.karton_pacijent: ~3 rows (approximately)
DELETE FROM `karton_pacijent`;
/*!40000 ALTER TABLE `karton_pacijent` DISABLE KEYS */;
INSERT INTO `karton_pacijent` (`karton_pacijent_id`, `ime`, `prezime`, `datum_rodjenja`, `korisnik_id`) VALUES
	(14, 'Darko', 'Petrovic', '12.12.2001', 8),
	(15, 'Djordje', 'Dimitrijev', '07.07.1996', 7),
	(16, 'Mirko', 'Radanovic', '03.06.1991', 8);
/*!40000 ALTER TABLE `karton_pacijent` ENABLE KEYS */;

-- Dumping structure for table zubarska_ordinacija.kategorija
CREATE TABLE IF NOT EXISTS `kategorija` (
  `kategorija_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`kategorija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.kategorija: ~1 rows (approximately)
DELETE FROM `kategorija`;
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` (`kategorija_id`, `ime`) VALUES
	(1, 'operacija');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.korisnik: ~5 rows (approximately)
DELETE FROM `korisnik`;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` (`korisnik_id`, `ime`, `prezime`, `email`, `username`, `password_hash`, `is_admin`) VALUES
	(3, 'Nikola', 'Djikic', 'nikoladjikic22@gmail.com', 'djika22', '7C3898C04D2998742C310A3429D8667984EAD25508569E9DDFA6AD26F74FA7D3998D4484E4BF3BA87F5D26DB6DD26966EAEB17F3D29E58C22DF123E20E4E75A4', 0),
	(7, 'Djordje', 'Dimitrijev', 'djordjedimitrijev@gmail.com', 'djole97', 'DDE38222840592422CB0609EB1BD7030DAAE9D1B52AB5A40B0194DDB9344E7C3F62B343AC88C489E520510059E38DC67CE51A4F6A4BFD759FCCD483EBF8FD167', 1),
	(8, 'Marko', 'Markovic', 'markomarkovic@gmail.com', 'marko22', '79555906C534551881B44996DF24488E01671B95DD0BC24C99F7CE76B4229C4B9AC033305D9A1A70435C6674AA15F0514FC537AF965EDC7E747D3413F09EDD63', 0),
	(10, 'Madrko', 'Markovdic', 'markomarkdovic@gmail.com', 'markdo22', '2F970D075ADD546A3F76E331E2F0211BE2A2D8D43E31DDF14527D550B4826DC6E993801719AA9909C332BB39E7B1E28DAE4EFAF1092F93B1137FC54A8F265A82', 1),
	(11, 'DDsda', 'dsadasd', 'sdasdasd@gmail.com', 'user', '5B722B307FCE6C944905D132691D5E4A2214B7FE92B738920EB3FCE3A90420A19511C3010A0E7712B054DAEF5B57BAD59ECBD93B3280F210578F547F4AED4D25', 0);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;

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
DELETE FROM `pregled`;
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
  KEY `FK_usluga_kategorija` (`kategorija_id`),
  CONSTRAINT `FK_usluga_kategorija` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`kategorija_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zubarska_ordinacija.usluga: ~4 rows (approximately)
DELETE FROM `usluga`;
/*!40000 ALTER TABLE `usluga` DISABLE KEYS */;
INSERT INTO `usluga` (`usluga_id`, `kataloski_broj`, `naziv_usluge`, `opis`, `kategorija_id`) VALUES
	(86, 1, 'Plombiranje', 'Plombiranje', 1),
	(87, 2, 'Vadjenje zuba', 'Vadjenje zuba', 0),
	(88, 4, 'Ciscenje kamenca', 'Ultrazvucno ciscenje kamenca', 0),
	(89, 3, 'Fiksna proteza', 'Fiksna proteza za svakodnevno nosenje', 0);
/*!40000 ALTER TABLE `usluga` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
