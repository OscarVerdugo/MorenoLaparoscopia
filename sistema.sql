-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2019 a las 03:47:54
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `nIdCliente` int(11) NOT NULL,
  `cNombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cDireccion` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cNumTel` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`nIdCliente`, `cNombre`, `cDireccion`, `cNumTel`, `bActivo`) VALUES
(1, 'asda11111', 'asdno', '11111111', 0),
(2, 'no', 'no', 'asdasd', 0),
(3, 'Esto es un nombre', 'Esto es una direccion', '123123412111', 1),
(4, 'si', 'si', '111111111', 1),
(5, 'zc', 'das', '12312', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `nIdEmpleado` int(11) NOT NULL,
  `cNombre` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nIdPuesto` int(11) NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '1',
  `cTelefono` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `cDireccion` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`nIdEmpleado`, `cNombre`, `nIdPuesto`, `bActivo`, `cTelefono`, `cDireccion`) VALUES
(1, 'Oscar Eduardo Verdugo Barraza', 1, 1, '66738239', 'pedorro'),
(2, 'Gerardo Acosta Moreno', 1, 1, '812378', 'aisdi'),
(3, 'asd', 2, 1, 'asd', 'asd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `nIdProducto` int(11) NOT NULL,
  `cDescripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nPrecio` decimal(10,2) NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`nIdProducto`, `cDescripcion`, `nPrecio`, `bActivo`) VALUES
(1, '222222', '22222.00', 0),
(2, 'Harina', '8912893.00', 0),
(3, 'Levadura', '231.00', 0),
(4, 'Azucar', '238.00', 0),
(5, 'Levadura', '123222.00', 0),
(6, 'Prueba', '99999999.99', 0),
(7, 'Prueba', '1.00', 0),
(8, 'Prueba', '2.00', 0),
(9, 'Prueba', '3.00', 0),
(10, 'Pruebaaiosdoasidnao', '100.00', 0),
(11, 'Levadura', '5.00', 1),
(12, 'Harina', '6.00', 1),
(13, 'Aceite', '7.00', 1),
(14, 'Manteca', '8.00', 1),
(15, 'Chocolate', '10.00', 1),
(16, 'ketchup', '11.00', 1),
(17, 'jarra', '350.00', 1),
(18, 'nuevoproducto', '9.90', 1),
(19, 'NuevoProducto', '111.00', 1),
(20, 'Pruebaasdaisodnaoi', '11.00', 0),
(21, 'asdasd', '220.00', 1),
(22, 'asd', '11.00', 1),
(23, 'asd', '123.00', 1),
(24, 'asdasd', '111.00', 1),
(25, 'asdasd', '111.00', 1),
(26, 'ad', '111.00', 1),
(27, 'asd', '11.00', 1),
(28, 'Harina NUEVO', '300.00', 1),
(29, 'asdf', '22.00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puestos`
--

CREATE TABLE `puestos` (
  `nIdPuesto` int(11) NOT NULL,
  `cDescripcion` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `puestos`
--

INSERT INTO `puestos` (`nIdPuesto`, `cDescripcion`, `bActivo`) VALUES
(1, 'Administrador', 1),
(2, 'Gerente', 1),
(3, 'Vendedo', 0),
(4, 'Vendedor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nIdUsuario` int(11) NOT NULL,
  `cLogin` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cPassword` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nIdEmpleado` int(11) NOT NULL,
  `bOnline` tinyint(1) NOT NULL DEFAULT '0',
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nIdUsuario`, `cLogin`, `cPassword`, `nIdEmpleado`, `bOnline`, `bActivo`) VALUES
(1, 'prueba', '123', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `nIdVenta` int(11) NOT NULL,
  `dFecha` date NOT NULL,
  `nIdEmpleado` int(11) NOT NULL,
  `nIdCliente` int(11) NOT NULL,
  `nSubTotal` decimal(10,2) NOT NULL,
  `nIva` decimal(10,2) NOT NULL,
  `nTotal` decimal(10,2) NOT NULL,
  `bPagado` tinyint(4) DEFAULT '0',
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`nIdVenta`, `dFecha`, `nIdEmpleado`, `nIdCliente`, `nSubTotal`, `nIva`, `nTotal`, `bPagado`, `bActivo`) VALUES
(12, '2019-03-23', 2, 3, '15010.00', '2401.60', '17411.60', 0, 0),
(13, '2019-03-23', 2, 1, '34118.90', '5459.02', '39577.92', 0, 0),
(14, '2019-03-23', 1, 1, '5735.00', '917.60', '6652.60', 0, 0),
(15, '2019-03-23', 2, 3, '4386.00', '701.76', '5087.76', 0, 0),
(16, '2019-03-23', 1, 3, '170.00', '27.20', '197.20', 0, 0),
(17, '2019-03-29', 1, 1, '5650.00', '904.00', '6554.00', 0, 0),
(18, '2019-03-30', 1, 1, '10300.00', '1648.00', '11948.00', 0, 1),
(19, '2019-03-30', 1, 1, '400000.00', '64000.00', '464000.00', 0, 1),
(20, '2019-03-30', 1, 1, '40000.00', '6400.00', '46400.00', 0, 1),
(21, '2019-03-30', 1, 1, '20000.00', '3200.00', '23200.00', 0, 1),
(22, '2019-04-02', 1, 3, '690.00', '110.40', '800.40', 0, 1),
(23, '2019-04-02', 1, 3, '690.00', '110.40', '800.40', 0, 1),
(24, '2019-04-02', 1, 3, '320.00', '51.20', '371.20', 0, 1),
(25, '2019-04-02', 1, 3, '320.00', '51.20', '371.20', 0, 1),
(26, '2019-04-02', 1, 3, '1140.00', '182.40', '1322.40', 0, 1),
(27, '2019-04-04', 1, 1, '1300.00', '208.00', '1508.00', 0, 1),
(28, '2019-04-04', 1, 3, '765.00', '122.40', '887.40', 0, 1),
(29, '2019-11-06', 2, 3, '39.00', '6.24', '45.24', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_detalle`
--

CREATE TABLE `ventas_detalle` (
  `nIdVentaDetalle` int(11) NOT NULL,
  `nIdVenta` int(11) NOT NULL,
  `nIdProducto` int(11) NOT NULL,
  `nCantidad` decimal(10,2) NOT NULL,
  `nPrecio` decimal(10,2) NOT NULL,
  `nImporte` decimal(10,2) NOT NULL,
  `bActivo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas_detalle`
--

INSERT INTO `ventas_detalle` (`nIdVentaDetalle`, `nIdVenta`, `nIdProducto`, `nCantidad`, `nPrecio`, `nImporte`, `bActivo`) VALUES
(7, 14, 7, '14.00', '1.00', '14.00', 0),
(8, 14, 10, '12.00', '100.00', '1200.00', 0),
(9, 14, 19, '11.00', '111.00', '1221.00', 0),
(10, 14, 28, '11.00', '300.00', '3300.00', 0),
(28, 12, 10, '10.00', '100.00', '1000.00', 0),
(29, 12, 11, '2.00', '5.00', '10.00', 0),
(30, 12, 10, '99.00', '100.00', '9900.00', 0),
(31, 12, 10, '11.00', '100.00', '1100.00', 0),
(32, 12, 28, '10.00', '300.00', '3000.00', 0),
(33, 17, 9, '10.00', '3.00', '30.00', 0),
(34, 17, 10, '7.00', '100.00', '700.00', 0),
(35, 17, 28, '9.00', '300.00', '2700.00', 0),
(36, 17, 19, '20.00', '111.00', '2220.00', 0),
(37, 18, 9, '100.00', '3.00', '300.00', 1),
(38, 18, 10, '100.00', '100.00', '10000.00', 1),
(39, 19, 28, '1000.00', '300.00', '300000.00', 1),
(40, 19, 10, '1000.00', '100.00', '100000.00', 1),
(41, 20, 10, '100.00', '100.00', '10000.00', 1),
(42, 20, 28, '100.00', '300.00', '30000.00', 1),
(43, 21, 10, '50.00', '100.00', '5000.00', 1),
(44, 21, 28, '50.00', '300.00', '15000.00', 1),
(45, 22, 12, '50.00', '6.00', '300.00', 1),
(46, 22, 13, '30.00', '7.00', '210.00', 1),
(47, 22, 14, '10.00', '8.00', '80.00', 1),
(48, 22, 11, '20.00', '5.00', '100.00', 1),
(49, 23, 12, '50.00', '6.00', '300.00', 1),
(50, 23, 13, '30.00', '7.00', '210.00', 1),
(51, 23, 14, '10.00', '8.00', '80.00', 1),
(52, 23, 11, '20.00', '5.00', '100.00', 1),
(53, 24, 13, '20.00', '7.00', '140.00', 1),
(54, 24, 12, '30.00', '6.00', '180.00', 1),
(55, 25, 13, '20.00', '7.00', '140.00', 1),
(56, 25, 12, '30.00', '6.00', '180.00', 1),
(57, 26, 12, '30.00', '6.00', '180.00', 1),
(58, 26, 13, '20.00', '7.00', '140.00', 1),
(59, 26, 14, '40.00', '8.00', '320.00', 1),
(60, 26, 11, '100.00', '5.00', '500.00', 1),
(61, 27, 10, '8.00', '100.00', '800.00', 1),
(62, 27, 11, '100.00', '5.00', '500.00', 1),
(63, 28, 11, '32.00', '5.00', '160.00', 1),
(64, 28, 12, '30.00', '6.00', '180.00', 1),
(65, 28, 13, '15.00', '7.00', '105.00', 1),
(66, 28, 14, '40.00', '8.00', '320.00', 1),
(67, 29, 11, '3.00', '5.00', '15.00', 0),
(68, 29, 12, '4.00', '6.00', '24.00', 0),
(71, 16, 13, '10.00', '7.00', '70.00', 0),
(72, 16, 13, '10.00', '7.00', '70.00', 0),
(73, 16, 15, '3.00', '10.00', '30.00', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`nIdCliente`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`nIdEmpleado`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`nIdProducto`);

--
-- Indices de la tabla `puestos`
--
ALTER TABLE `puestos`
  ADD PRIMARY KEY (`nIdPuesto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`nIdUsuario`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`nIdVenta`);

--
-- Indices de la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD PRIMARY KEY (`nIdVentaDetalle`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `nIdCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `nIdEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `nIdProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `puestos`
--
ALTER TABLE `puestos`
  MODIFY `nIdPuesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `nIdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `nIdVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  MODIFY `nIdVentaDetalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
