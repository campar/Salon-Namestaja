-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2018 at 07:08 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flaskbaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

CREATE TABLE `kategorija` (
  `id` int(10) UNSIGNED NOT NULL,
  `naziv` text NOT NULL,
  `opis` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`id`, `naziv`, `opis`) VALUES
(1, 'Stolice', 'Drvene stolice sa 4 nogare'),
(2, 'Ormari', 'Ormar ili orman kada im rasirite vrata, bice vam potpuno svejedno');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(10) UNSIGNED NOT NULL,
  `ime` text NOT NULL,
  `prezime` text NOT NULL,
  `korisnicko_ime` text NOT NULL,
  `lozinka` text NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `ime`, `prezime`, `korisnicko_ime`, `lozinka`, `is_admin`) VALUES
(1, 'jeste', 'bbb', 'svaba', '123', 0),
(3, 'jeste', 'aaa', 'pera', '313131', 0),
(4, 'jeste', 'aaa', 'zvrka', '313131', 0),
(5, 'jeste', 'aaa', 'mika', '313131', 0),
(6, 'jeste', 'aaa', 'neeeboska', '313131', 0),
(7, 'zdravkica', 'njegovo', 'jankovici', 'pbkdf2:sha256:50000$2esSY22d$fc221cde65e416bb3bbabecceff79127fa11b75db575fa792de2efba24befaa2', 0);

-- --------------------------------------------------------

--
-- Table structure for table `porudzbina`
--

CREATE TABLE `porudzbina` (
  `id` int(10) UNSIGNED NOT NULL,
  `korisnik_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `porudzbina`
--

INSERT INTO `porudzbina` (`id`, `korisnik_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `porudzbinaproizvod`
--

CREATE TABLE `porudzbinaproizvod` (
  `porudzbina_id` int(10) UNSIGNED NOT NULL,
  `proizvod_id` int(10) UNSIGNED NOT NULL,
  `kolicina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proizvod`
--

CREATE TABLE `proizvod` (
  `id` int(10) UNSIGNED NOT NULL,
  `cena` double UNSIGNED NOT NULL,
  `naziv` text NOT NULL,
  `opis` text NOT NULL,
  `slika` text NOT NULL,
  `kolicina` int(10) UNSIGNED NOT NULL,
  `kategorija_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvod`
--

INSERT INTO `proizvod` (`id`, `cena`, `naziv`, `opis`, `slika`, `kolicina`, `kategorija_id`) VALUES
(1, 1000, 'stolicee', 'stolica crvena', 'Blue_Prince_Cheer_4.png', 10, 1),
(2, 1999, 'bez imena', 'opis je', 'adadda', 20, 1),
(4, 1999, 'bez imena', 'opis je', 'adadda', 20, 1),
(5, 1999, 'bez imena', 'opis je', 'adadda', 20, 1),
(6, 199910, 'bez imena', 'opis je', 'adadda', 20, 1),
(7, 1999101, 'bez imena', 'opis je', 'adadda', 203, 1),
(8, 10010, 'bez imena', 'opis je', 'adadda', 203, 1),
(24, 5.999000072479248, 'bez imena', 'opis je', 'adadda', 203, 1),
(25, 6, 'bez imena', 'opis je', 'adadda', 203, 1),
(26, 5.989999771118164, 'bez imena', 'opis je', 'adadda', 203, 1),
(27, 6, 'bez imena', 'opis je', 'adadda', 203, 1),
(28, 556666, 'bez imena', 'opis je', 'adadda', 203, 1),
(29, 556667, 'bez imena', 'opis je', 'adadda', 203, 1),
(30, 556667, 'bez imena', 'opis je', 'adadda', 203, 1),
(31, 5.989999771118164, 'bez imena', 'opis je', 'adadda', 203, 1),
(32, 9999.8798828125, 'bez imena', 'opis je', 'adadda', 203, 1),
(33, 9, 'bez imena', 'opis je', 'adadda', 203, 1),
(34, 9999.8896484375, 'bez imena', 'opis je', 'adadda', 203, 1),
(35, 9, 'bez imena', 'opis je', 'adadda', 203, 1),
(36, 9, 'bez imena', 'opis je', 'adadda', 203, 1),
(37, 9, 'bez imena', 'opis je', 'adadda', 203, 1),
(38, 9999.88, 'bez imena', 'opis je', 'adadda', 203, 1),
(39, 9999.886, 'bez imena', 'opis je', 'adadda', 203, 1),
(40, 9999.88, 'bez imena', 'opis je', 'adadda', 203, 1),
(41, 9, 'bez imena', 'opis je', 'adadda', 203, 1),
(42, 9999.88, 'bez imena', 'opis je', 'adadda', 203, 1),
(43, 9999.88, 'BEZ IMENA', 'opis je', 'adadda', 203, 1),
(44, 9999.88, 'BEZ IMENA', 'opis je', 'adadda', 203, 1),
(45, 9999.88, 'BEZ IMENA', 'opis je', 'adadda', 203, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategorija`
--
ALTER TABLE `kategorija`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `korisnickoIme` (`korisnicko_ime`(15));

--
-- Indexes for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnik_id` (`korisnik_id`);

--
-- Indexes for table `porudzbinaproizvod`
--
ALTER TABLE `porudzbinaproizvod`
  ADD PRIMARY KEY (`porudzbina_id`,`proizvod_id`);

--
-- Indexes for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategorija_id` (`kategorija_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategorija`
--
ALTER TABLE `kategorija`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `porudzbina`
--
ALTER TABLE `porudzbina`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `proizvod`
--
ALTER TABLE `proizvod`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `porudzbina`
--
ALTER TABLE `porudzbina`
  ADD CONSTRAINT `porudzbina_korisnik_id_fkey` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`);

--
-- Constraints for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD CONSTRAINT `proizvod_kategorija_id_fkey` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
