-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-05-2023 a las 10:43:01
-- Versión del servidor: 5.7.40
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api_empleo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicants`
--

DROP TABLE IF EXISTS `applicants`;
CREATE TABLE IF NOT EXISTS `applicants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobOffer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applicants`
--

INSERT INTO `applicants` (`id`, `jobOffer_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 23, 2, '2023-04-27 02:05:47', '2023-04-27 02:05:47'),
(2, 23, 5, '2023-04-27 02:05:47', '2023-04-27 02:05:47'),
(55, 39, 51, '2023-05-28 09:09:00', '2023-05-28 09:09:00'),
(37, 23, 37, '2023-05-20 21:40:43', '2023-05-20 21:40:43'),
(45, 23, 46, '2023-05-23 18:40:48', '2023-05-23 18:40:48'),
(35, 31, 44, '2023-05-19 18:31:23', '2023-05-19 18:31:23'),
(7, 15, 2, '2023-05-01 11:11:13', '2023-05-01 11:11:13'),
(29, 24, 38, '2023-05-15 19:17:25', '2023-05-15 19:17:25'),
(44, 37, 46, '2023-05-23 18:40:21', '2023-05-23 18:40:21'),
(42, 31, 37, '2023-05-21 10:35:07', '2023-05-21 10:35:07'),
(11, 33, 37, '2023-05-10 12:34:26', '2023-05-10 12:34:26'),
(12, 32, 38, '2023-05-10 12:38:51', '2023-05-10 12:38:51'),
(32, 36, 44, '2023-05-19 18:16:52', '2023-05-19 18:16:52'),
(22, 34, 40, '2023-05-14 17:44:19', '2023-05-14 17:44:19'),
(31, 33, 41, '2023-05-16 09:28:42', '2023-05-16 09:28:42'),
(17, 32, 36, '2023-05-13 22:03:51', '2023-05-13 22:03:51'),
(24, 34, 38, '2023-05-14 17:52:39', '2023-05-14 17:52:39'),
(25, 34, 39, '2023-05-14 17:54:08', '2023-05-14 17:54:08'),
(39, 24, 37, '2023-05-21 09:32:10', '2023-05-21 09:32:10'),
(43, 37, 39, '2023-05-21 19:26:52', '2023-05-21 19:26:52'),
(46, 23, 47, '2023-05-24 17:22:59', '2023-05-24 17:22:59'),
(47, 38, 37, '2023-05-25 11:33:05', '2023-05-25 11:33:05'),
(57, 39, 53, '2023-05-28 10:29:07', '2023-05-28 10:29:07'),
(56, 34, 51, '2023-05-28 09:20:26', '2023-05-28 09:20:26'),
(50, 36, 37, '2023-05-25 12:43:40', '2023-05-25 12:43:40'),
(54, 39, 50, '2023-05-27 15:48:41', '2023-05-27 15:48:41'),
(52, 38, 45, '2023-05-25 18:05:42', '2023-05-25 18:05:42'),
(53, 38, 38, '2023-05-25 18:06:56', '2023-05-25 18:06:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Cáceres', '2022-12-19 13:08:57', '2022-12-20 13:10:03'),
(2, 'Badajoz', '2022-12-20 13:08:57', '2022-12-21 13:10:16'),
(3, 'Sevilla', NULL, NULL),
(4, 'León', '2023-05-17 15:10:31', '2023-05-17 15:10:31'),
(5, 'Granada', '2023-05-28 10:12:48', '2023-05-28 10:12:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_offers`
--

DROP TABLE IF EXISTS `job_offers`;
CREATE TABLE IF NOT EXISTS `job_offers` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `category_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `salary` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_user` (`user_id`),
  KEY `fk_post_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `job_offers`
--

INSERT INTO `job_offers` (`id`, `user_id`, `category_id`, `title`, `content`, `image`, `salary`, `type`, `status_id`, `created_at`, `updated_at`) VALUES
(23, 5, 2, 'Puesto de trabajo en videoclub', 'Horario : L-V\r\nSe busca personas amantes del cine y con don de gente.', '', 1250, 'Temporal 6 meses', 1, '2023-04-17 18:36:21', '2023-05-24 17:27:13'),
(24, 5, 2, 'Puesto de trabajo en tienda moviles. ', 'Horario : L-S\r\nSe busca personas apasionadas por los móviles', '', 1400, 'Temporal 3 meses', 2, '2023-04-17 18:36:21', '2023-05-16 11:42:46'),
(28, 36, 1, 'Puesto trabajo en fábrica', '<p>contenido oferta prueba 6 CAMBIADA 2</p>', '', 3000, 'fijo', 2, '2023-05-06 19:56:28', '2023-05-20 21:43:07'),
(29, 36, 2, 'Socorrista', '<p>Puesto de trabajo de oferta prueba 7</p>', '1683125772laptop.jpg', 1000, 'Indefinido', 2, '2023-05-06 21:43:59', '2023-05-18 18:25:09'),
(30, 42, 2, 'Maestro primaria', '<p>Se busca maestro con experiencia mínimo de 2 años en escuelas públicas o concertadas.</p>', '1683457703entrepreneur.jpg', 1450, 'Indefinido', 0, '2023-05-07 11:08:35', '2023-05-21 08:49:03'),
(31, 36, 1, 'Periodista digital', '<p>Se valora experiencia en cubrir diferentes ferias de tecnologia</p>', '1683498082laptop.jpg', 1400, 'Temproal 2 meses', 1, '2023-05-07 22:21:36', '2023-05-21 10:38:59'),
(32, 36, 2, 'Se busca enfermero', '<p>Se busca fenfermero con experiencia</p>', '1683537658idea.jpg', 1000, 'Indefinido 3 meses', 1, '2023-05-08 09:21:27', '2023-05-16 15:18:59'),
(33, 36, 1, 'Escritor de prompts', '<p>Se busca titulados en Filosofía, Sociología, Filología.</p>', '1684229384idea.jpg', 1650, 'Temporal 6 meses', 1, '2023-05-08 09:21:50', '2023-05-16 09:57:43'),
(34, 36, 1, 'Puesto de analista de datos', '<p>Analista de datos de campañas de publicidad online</p>', '1683819663idea.jpg', 1350, 'Indefinido', 2, '2023-05-11 09:32:28', '2023-05-28 09:22:34'),
(36, 36, 2, 'monitor de ocio libre', '<p>Se busca persona activa</p>', '1684521135iphone.jpg', 1200, 'Temporal 2 mes', 0, '2023-05-19 17:55:30', '2023-05-28 10:37:48'),
(37, 42, 1, 'Oferta panadero', '', '', 1200, 'Indefinido', 1, '2023-05-21 08:48:27', '2023-05-23 19:18:26'),
(38, 36, 1, 'conductor autobus', '', '', 1000, '1 mes', 1, '2023-05-24 23:47:40', '2023-05-25 18:09:01'),
(39, 49, 1, 'Barman', '<p>Experiencia dilatada y en preparación de cocktails</p>', '', 1200, 'Temporal 6 meses', 1, '2023-05-25 17:02:31', '2023-05-28 10:40:13'),
(40, 52, 1, 'Escritor de periódico', '<p>Persona con formación literaria</p>', '', 1300, 'Indefinido', 0, '2023-05-28 10:11:37', '2023-05-28 10:11:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=224 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2023-05-06 12:33:47', '2023-05-06 12:33:47'),
(2, 'empleador', '2023-05-06 12:33:47', '2023-05-06 12:33:47'),
(3, 'demandante', '2023-05-06 12:33:47', '2023-05-06 12:33:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status_job_offer`
--

DROP TABLE IF EXISTS `status_job_offer`;
CREATE TABLE IF NOT EXISTS `status_job_offer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_job_offer` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `status_job_offer`
--

INSERT INTO `status_job_offer` (`id`, `status_job_offer`) VALUES
(1, 'vacante'),
(2, 'cubierta'),
(3, 'dada de baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `role_id` int(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `curriculo` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `role_id`, `email`, `password`, `description`, `image`, `curriculo`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'admin', 'admin', 1, 'admin@admin.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', 'Descripción admin', '1684434239default_job.jpg', '', '2022-12-18 13:07:14', '2023-05-18 18:24:01', NULL),
(2, 'Paco', 'Fernández', 2, 'pacoo@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Rojo periquieto <strong><u>yeah 2</u></strong></p>', '1678795151butterfly.jpg', '', '2023-02-22 19:51:36', '2023-04-12 19:01:06', NULL),
(5, 'ana', 'blason', 2, 'email05@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684949053woman-1.jpg', NULL, '2023-05-01 10:45:15', '2023-05-24 17:24:18', NULL),
(34, 'Maria', 'Butragueno Arenal', 1, 'email06@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Hloal soy maria</p>', '1683537178woman-1.jpg', '1683537191curriculumVitae-Ejemplos.pdf', '2023-05-04 20:21:28', '2023-05-08 09:14:09', NULL),
(36, 'Geralt', 'de Rivia', 2, 'email07@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Brujo</p>', '1684972456man-1.jpg', '1683533571curriculumVitae-Ejemplos.pdf', '2023-05-05 09:09:49', '2023-05-25 19:44:16', NULL),
(37, 'Joséma', 'Azaña', 3, 'email08@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>bios paco pino 2</p>', '1683451608man-2.jpg', '1684663254curriculo_5.pdf', '2023-05-05 09:12:31', '2023-05-21 10:32:22', NULL),
(38, 'Jaime', 'Pérez', 3, 'email09@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684087437man-3.jpg', '1684139671curriculo_2.pdf', '2023-05-08 08:10:40', '2023-05-15 08:34:42', NULL),
(39, 'Sofía', 'Ruíz', 3, 'email10@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684087492woman-1.jpg', '1684139726curriculo_4.pdf', '2023-05-08 08:10:40', '2023-05-21 19:26:36', NULL),
(41, 'Carla', 'Gutiérrez', 3, 'marekfgamer@gmail.com3', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684088706woman-2.jpg', '1684102060curriculo_5.pdf', '2023-05-14 18:24:30', '2023-05-15 08:36:29', NULL),
(42, 'Julio', 'Iglesias', 2, 'email11@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Canto</p>', '1684518532man-2.jpg', NULL, '2023-05-19 17:46:16', '2023-05-20 21:35:14', NULL),
(44, 'igaaa', 'swiatekk', 3, 'email12@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>tenis</p>', '1684520967woman-1.jpg', '1684618143curriculo_4.pdf', '2023-05-19 18:06:53', '2023-05-20 22:13:29', NULL),
(45, 'Antonio', 'Banderas', 3, 'email13@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684618061man-1.jpg', '1684618066curriculo_1.pdf', '2023-05-20 21:27:04', '2023-05-20 21:27:48', NULL),
(46, 'Freddy', 'Mercury', 3, 'marekfgamer2@gmail.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Cantar</p>', '1684867155man-2.jpg', '1684867162curriculo_3.pdf', '2023-05-23 18:38:27', '2023-05-23 18:44:33', NULL),
(47, 'Mario', 'Bros', 3, 'marekfgamer4@gmail.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, '1684948961man-1.jpg', '1684948967curriculo_3.pdf', '2023-05-24 17:21:43', '2023-05-24 17:22:49', NULL),
(48, 'Luis', 'Tosar', 2, 'email02@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', NULL, NULL, NULL, '2023-05-24 23:54:56', '2023-05-24 23:54:56', NULL),
(49, 'Maria', 'Sarapova', 2, 'email14@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Competencia</p>', '1685266188woman-1.jpg', NULL, '2023-05-25 17:01:29', '2023-05-28 09:29:49', NULL),
(50, 'Luigi', 'Bros', 3, 'marekfgamer@gmail.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Preparado para saltar huecos</p>', '1685034227man-3.jpg', '1685034232curriculo_2.pdf', '2023-05-25 17:03:16', '2023-05-25 17:03:57', NULL),
(51, 'Jack', 'Kerouac', 3, 'email15@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Experiencia en escritura y experimentación</p>', '1685264758man-2.jpg', '1685264764curriculo_5.pdf', '2023-05-28 09:04:51', '2023-05-28 09:06:06', NULL),
(52, 'Michael', 'Ende', 2, 'email16@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Imaginativo</p>', '1685268736man-2.jpg', NULL, '2023-05-28 10:10:44', '2023-05-28 10:12:17', NULL),
(53, 'Pablo', 'Neruda', 3, 'email17@email.com', 'd74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1', '<p>Inventor</p>', '1685269603man-1.jpg', '1685269771curriculo_3.pdf', '2023-05-28 10:26:18', '2023-05-28 10:29:32', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `job_offers`
--
ALTER TABLE `job_offers`
  ADD CONSTRAINT `fk_post_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
