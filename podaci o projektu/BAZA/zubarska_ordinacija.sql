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

-- Dumping data for table zubarska_ordinacija.cena: ~4 rows (approximately)
/*!40000 ALTER TABLE `cena` DISABLE KEYS */;
INSERT INTO `cena` (`cena_id`, `cena_jedan`, `cena_paket`, `cena_uzrast`, `usluga_id`) VALUES
	(29, 1000, 850, 785, 86),
	(31, 1000, 850, 785, 87),
	(34, 1000, 850, 785, 88),
	(37, 1000, 850, 785, 89);
/*!40000 ALTER TABLE `cena` ENABLE KEYS */;

-- Dumping data for table zubarska_ordinacija.karton_pacijent: ~3 rows (approximately)
/*!40000 ALTER TABLE `karton_pacijent` DISABLE KEYS */;
INSERT INTO `karton_pacijent` (`karton_pacijent_id`, `ime`, `prezime`, `datum_rodjenja`, `korisnik_id`) VALUES
	(14, 'Darko', 'Petrovic', '12.12.2001', 8),
	(15, 'Djordje', 'Dimitrijev', '07.07.1996', 7),
	(16, 'Mirko', 'Radanovic', '03.06.1991', 8);
/*!40000 ALTER TABLE `karton_pacijent` ENABLE KEYS */;

-- Dumping data for table zubarska_ordinacija.korisnik: ~3 rows (approximately)
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` (`korisnik_id`, `ime`, `prezime`, `email`, `username`, `password_hash`, `is_admin`) VALUES
	(3, 'Nikola', 'Djikic', 'nikoladjikic22@gmail.com', 'djika22', '462E35CFEC64F25516B6468D584D004B061B1E95A1228112F46F133D6A83949985A7884948D28CD18B4D1BA6BCDE57FD7ECC63487A5E30E02E903B6B69B9D431', 0),
	(7, 'Djordje', 'Dimitrijev', 'djordjedimitrijev@gmail.com', 'djole97', 'DDE38222840592422CB0609EB1BD7030DAAE9D1B52AB5A40B0194DDB9344E7C3F62B343AC88C489E520510059E38DC67CE51A4F6A4BFD759FCCD483EBF8FD167', 0),
	(8, 'Marko', 'Markovic', 'markomarkovic@gmail.com', 'marko22', '79555906C534551881B44996DF24488E01671B95DD0BC24C99F7CE76B4229C4B9AC033305D9A1A70435C6674AA15F0514FC537AF965EDC7E747D3413F09EDD63', 0);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;

-- Dumping data for table zubarska_ordinacija.pregled: ~2 rows (approximately)
/*!40000 ALTER TABLE `pregled` DISABLE KEYS */;
INSERT INTO `pregled` (`pregled_id`, `usluga_id`, `karton_pacijent_id`, `datum`) VALUES
	(1, 86, 14, '11.11.2019'),
	(2, 87, 15, '13.05.2020');
/*!40000 ALTER TABLE `pregled` ENABLE KEYS */;

-- Dumping data for table zubarska_ordinacija.usluga: ~4 rows (approximately)
/*!40000 ALTER TABLE `usluga` DISABLE KEYS */;
INSERT INTO `usluga` (`usluga_id`, `kataloski_broj`, `naziv_usluge`, `opis`, `kategorija`) VALUES
	(86, 1, 'Plombiranje', 'Plombiranje', 'Popravka'),
	(87, 2, 'Vadjenje zuba', 'Vadjenje zuba', 'Hirurska intervencija'),
	(88, 4, 'Ciscenje kamenca', 'Ultrazvucno ciscenje kamenca', 'Higijena zuba'),
	(89, 3, 'Fiksna proteza', 'Fiksna proteza za svakodnevno nosenje', 'Dentalna pomagala');
/*!40000 ALTER TABLE `usluga` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
