-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.7.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tfg
CREATE DATABASE IF NOT EXISTS `tfg` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `tfg`;

-- Volcando estructura para tabla tfg.articulo
CREATE TABLE IF NOT EXISTS `articulo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventario_id` int(10) unsigned NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `color` varchar(30) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `cantidad_actual` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_articulo_inventario` (`inventario_id`),
  CONSTRAINT `fk_articulo_inventario` FOREIGN KEY (`inventario_id`) REFERENCES `inventario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla tfg.articulo: ~12 rows (aproximadamente)
DELETE FROM `articulo`;
INSERT INTO `articulo` (`id`, `inventario_id`, `nombre`, `color`, `descripcion`, `cantidad_actual`) VALUES
	(28, 19, 'Artículo 1', 'Amarillo', '', 0),
	(29, 19, 'Artículo 2', 'Azul', '', 0),
	(30, 19, 'Artículo 3', 'Rojo', '', 0),
	(31, 20, 'Artículo 1', 'Amarillo', '', 0),
	(32, 20, 'Artículo 2', 'Azul', '', 0),
	(33, 20, 'Artículo 3', 'Rojo', '', 0),
	(34, 21, 'Artículo 1', 'Amarillo', '', 0),
	(35, 21, 'Artículo 2', 'Azul', '', 0),
	(36, 21, 'Artículo 3', 'Rojo', '', 0),
	(37, 22, 'Artículo 1', 'Amarillo', '', 0),
	(38, 22, 'Artículo 2', 'Azul', '', 0),
	(39, 22, 'Artículo 3', 'Rojo', '', 0);

-- Volcando estructura para tabla tfg.historico
CREATE TABLE IF NOT EXISTS `historico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `articulo_id` int(10) unsigned NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_historico_articulo` (`articulo_id`),
  CONSTRAINT `fk_historico_articulo` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla tfg.historico: ~12 rows (aproximadamente)
DELETE FROM `historico`;
INSERT INTO `historico` (`id`, `articulo_id`, `cantidad`, `fecha_registro`) VALUES
	(24, 28, 0, '2025-05-06 07:00:29'),
	(25, 29, 0, '2025-05-06 07:00:29'),
	(26, 30, 0, '2025-05-06 07:00:29'),
	(27, 31, 0, '2025-05-06 07:42:07'),
	(28, 32, 0, '2025-05-06 07:42:07'),
	(29, 33, 0, '2025-05-06 07:42:07'),
	(30, 34, 0, '2025-05-06 07:42:10'),
	(31, 35, 0, '2025-05-06 07:42:10'),
	(32, 36, 0, '2025-05-06 07:42:10'),
	(33, 37, 0, '2025-05-06 07:42:15'),
	(34, 38, 0, '2025-05-06 07:42:15'),
	(35, 39, 0, '2025-05-06 07:42:15');

-- Volcando estructura para tabla tfg.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(10) unsigned NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_inventario_usuario` (`usuario_id`),
  CONSTRAINT `fk_inventario_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla tfg.inventario: ~4 rows (aproximadamente)
DELETE FROM `inventario`;
INSERT INTO `inventario` (`id`, `usuario_id`, `nombre`, `creado_en`) VALUES
	(19, 1, 'wtfff', '2025-05-06 05:00:29'),
	(20, 1, 'eaaa', '2025-05-06 05:42:07'),
	(21, 1, 'eaaea', '2025-05-06 05:42:10'),
	(22, 1, 'aa', '2025-05-06 05:42:15');

-- Volcando estructura para tabla tfg.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla tfg.usuario: ~1 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id`, `email`, `username`, `password_hash`, `descripcion`) VALUES
	(1, 'alek@alek.com', 'Alek Suso', '$2b$12$kgLYIUBh1SiR2eGhBVsfzO1gzScRl0NbE4HbassUTjsmxQGYTpVG2', 'hola es una descripción esto ee');

-- Volcando estructura para disparador tfg.trg_articulo_after_insert_log_historico
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_articulo_after_insert_log_historico
AFTER INSERT ON articulo
FOR EACH ROW
BEGIN
    INSERT INTO historico (articulo_id, cantidad, fecha_registro)
    VALUES (
        NEW.id,
        NEW.cantidad_actual,
        NOW()
    );
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador tfg.trg_articulo_after_update_log_historico
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER trg_articulo_after_update_log_historico
AFTER UPDATE ON articulo
FOR EACH ROW
BEGIN
    IF OLD.cantidad_actual <> NEW.cantidad_actual THEN
        INSERT INTO historico (articulo_id, cantidad, fecha_registro)
        VALUES (
            NEW.id,
            NEW.cantidad_actual,
            NOW()
        );
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
