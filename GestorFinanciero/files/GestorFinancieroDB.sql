CREATE DATABASE GestorFinancieroDB
GO

USE GestorFinancieroDB

CREATE TABLE Cliente(
IdCliente int identity(1,1) primary key,
Nombre nvarchar(150) NOT NULL,
Documento nvarchar(20) unique NOT NULL,
Correo nvarchar(100),
Telefono nvarchar(20),
Estado bit default 1,
FechaRegistro datetime default getdate()
);

CREATE TABLE CuentaBancaria(
IdCuenta int identity(1,1) primary key,
IdCliente int references Cliente(IdCliente),
NumeroCuenta nvarchar(20) unique,
Saldo decimal(18,2), default 0,
Estado bit default 1,
FechaRegistro datetime default getdate()
);

CREATE TABLE Movimiento(
IdMovimiento int identity(1,1) primary key,
IdCuenta int references CuentaBancaria(IdCuenta),
TipoMovimiento nvarchar(20),
Monto decimal(18,2) NOT NULL,
SaldoRestante decimal(18,2),
Descripcion nvarchar(200),
FechaRegistro datetime default getdate()
);

CREATE TABLE Transferencia(
IdTransferencia int identity(1,1) primary key,
IdCuentaOrigen int references CuentaBancaria(IdCuenta),
IdCuentaDestino int references CuentaBancaria(IdCuenta),
Monto decimal(18,2),
FechaRegistro datetime default getdate()
);