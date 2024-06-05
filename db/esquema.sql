-- CREAR BASE DE DATOS
CREATE DATABASE agencia_de_viajes;
USE agencia_de_viajes;

-- CREAR TABLAS
/*
	CREATE TABLE nombre_de_tabla (
		columna1 tipo,
		columna2 tipo,
		...
		columnan tipo,
		primary key (columna1, ...)
	);
*/
-- tipos de datos
-- int
-- varchar(longitud)
-- date   (yyyy-mm-dd)alter
-- datetime (yyyy-mm-dd hh-mm-ss)
-- time (hh-mm-ss)

CREATE TABLE cliente (
	num_documento int NOT NULL,
    nombre_completo varchar(100), -- hay que ponerle la longitud
    fec_nacimiento date, -- (yyyy-mm-dd)
    telefono varchar(15),
    nacionalidad varchar(50),
    primary key (num_documento)
);

CREATE TABLE reserva(
	id_reserva int not null AUTO_INCREMENT,
    num_documento int not null,
    id_pack int,
    id_avion int,
    num_asiento int,
    fecha_reserva datetime, -- datetime o timestamp
    precio_final int,
    primary key (id_reserva, num_documento)
);

create table reserva_estado(
	id_reserva int not null,
    id_estado_reserva int not null,
    fecha_estado datetime,
    primary key (id_reserva, id_estado_reserva)
);

create table estado(
	id_estado_reserva int not null,
    nombre_estado_reserva varchar(100),
    descripcion_estado varchar(1000),
    primary key (id_estado_reserva)
);

create table pack(
	id_pack int not null AUTO_INCREMENT,
    pais_origen varchar(300),
    ciudad_origen varchar(300),
    aeropuerto_origen varchar(300),
    pais_destino varchar(300),
    ciudad_destino varchar(300),
    aeropuerto_destino varchar(300),
    fecha_publicacion datetime,
    fecha_viaje date,
    hora_partida time,
	hora_llegada time,
    id_avion int,
    primary key (id_pack)
);

create table avion(
	id_avion int not null,
    capacidad_avion int,
    primary key (id_avion)
);

create table asiento (
	id_avion int not null,
    num_asiento int not null,
    id_tipo_asiento int,
    primary key (id_avion, num_asiento)
);

create table tipo_asiento(
	id_tipo_asiento int not null,
	nombre_tipo_asiento varchar(100),
    primary key (id_tipo_asiento)
);

create table precio_cambio_asiento(
	id_pack int not null,
    id_avion int not null,
    num_asiento int not null,
    precio int not null,
    fec_inicio_precio datetime not null,
    fec_fin_precio datetime,
    primary key (id_pack, id_avion, num_asiento, fec_inicio_precio)
);

-- DEFINICION DE FK'savepoint
/*
	ALTER TABLE nombre_tabla_tiene_fk
    ADD CONSTRAINT FOREIGN KEY (columna_fk) references nombre_tabla_ref(columna_ref),
    ADD CONSTRAINT ... ;
*/

ALTER TABLE reserva
ADD CONSTRAINT FOREIGN KEY (num_documento) REFERENCES cliente(num_documento),
ADD CONSTRAINT FOREIGN KEY (id_pack) REFERENCES pack(id_pack),
ADD CONSTRAINT FOREIGN KEY (id_avion, num_asiento) REFERENCES asiento(id_avion, num_asiento);

ALTER TABLE reserva_estado
ADD CONSTRAINT FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
ADD CONSTRAINT FOREIGN KEY (id_estado_reserva) REFERENCES estado(id_estado_reserva);

ALTER TABLE pack
ADD CONSTRAINT FOREIGN KEY (id_avion) REFERENCES avion(id_avion);

ALTER TABLE asiento
ADD CONSTRAINT FOREIGN KEY (id_avion) REFERENCES avion(id_avion),
ADD CONSTRAINT FOREIGN KEY (id_tipo_asiento) REFERENCES tipo_asiento(id_tipo_asiento);

ALTER TABLE precio_cambio_asiento
ADD CONSTRAINT FOREIGN KEY (id_pack) REFERENCES pack(id_pack),
ADD CONSTRAINT FOREIGN KEY (id_avion, num_asiento) REFERENCES asiento(id_avion, num_asiento);
