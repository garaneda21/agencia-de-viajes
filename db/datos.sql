USE agencia_de_viajes;

/*
INSERT INTO nombre_tabla (columna1, columna2, columna3, ...)
VALUES (dato1, dato2, dato3, ...); 

INSERT INTO nombre_tabla
VALUES (dato1, dato2, dato3, ...); 
*/
select * from cliente;

-- Inserts para la tabla cliente
INSERT INTO cliente
VALUES
	(123, 'Juan Pérez', '1985-05-15', '54123456789', 'Argentina'),
	(789, 'Alejandro Gonzales', '1986-12-13', '54432378908', 'Argentina'),
	(987, 'María García', '1990-08-20', '5212345678901', 'Mexico'),
	(135, 'Ana Rodríguez', '1988-12-10', '571234567890', 'Colombia');

-- Inserts para la tabla avion
INSERT INTO avion VALUES
(123, 200),
(456, 150),
(789, 180),
(890, 200);

INSERT INTO pack VALUES
(1, 'Argentina', 'Buenos Aires', 'Aeropuerto Ministro Pistarini', 'Colombia', 'Bogotá', 'Aeropuerto El Dorado', '2024-03-27', '2024-05-01', '8:00', '14:00', 123),
(2, 'México', 'Ciudad de México', 'Aeropuerto de la Ciudad de México', 'Perú', 'Lima', 'Aeropuerto Jorge Chávez', '2024-03-28', '2024-06-15', '10:00', '18:00', 456),
(3, 'Colombia', 'Bogotá', 'Aeropuerto El Dorado', 'Argentina', 'Buenos Aires', 'Aeropuerto Ministro Pistarini', '2024-03-01', '2024-04-15', '12:00', '18:00', 789),
(4, 'Colombia', 'Bogotá', 'Aeropuerto El Dorado', 'México', 'Ciudad de México', 'Aeropuerto de la Ciudad de México', '2024-05-01', '2024-07-01', '8:00', '14:00', 890);

INSERT INTO tipo_asiento VALUES
(1, 'Asiento Económico'),
(2, 'Asiento Premium'),
(3, 'Asiento Ejecutivo');

INSERT INTO asiento VALUES
(123, 190, 1),
(123, 180, 1),
(456, 55, 2),
(789, 12, 3),
(890, 91, 1);

INSERT INTO precio_cambio_asiento VALUES
(1, 123, 190, 400, '2024-03-27', '2024-04-30'),
(1, 123, 190, 500, '2024-05-01', NULL),
(1, 123, 180, 400, '2024-03-27', '2024-04-30'),
(1, 123, 180, 500, '2024-05-01', NULL),
(2, 456, 55, 550, '2024-03-28', '2024-05-15'),
(2, 456, 55, 600, '2024-05-16', '2024-06-01'),
(2, 456, 55, 650, '2024-06-02', NULL),
(3, 789, 12, 650, '2024-03-01', '2024-04-01'),
(3, 789, 12, 700, '2024-04-02', NULL),
(4, 890, 91, 400, '2024-05-01', '2024-06-30'),
(4, 890, 91, 450, '2024-07-01', NULL);

-- Inserts para la tabla reserva
INSERT INTO reserva VALUES
(1, 123, 1, 123, 190, '2024-04-01', 400),
(2, 789, 1, 123, 180, '2024-05-05', 500),
(3, 987, 2, 456, 55, '2024-05-20', 600),
(4, 135, 3, 789, 12, '2024-04-05', 700),
(5, 135, 4, 890, 91, '2024-05-15', 400);

INSERT INTO estado VALUES
(1, 'Confirmada', 'cliente confirmó su reserva'),
(2, 'Realizada', 'el vuelo ya fue realizado'),
(3, 'Cancelada', 'cliente canceló su reserva');

INSERT INTO reserva_estado VALUES
(1, 1, '2024-04-01'),
(2, 1, '2024-05-01'),
(3, 1, '2024-05-20'),
(4, 2, '2024-04-05'),
(5, 1, '2020-05-15');

-- PARA DESPUES AL HACER LA APLICACION
-- PARA DESPUES AL HACER LA APLICACION
-- PARA DESPUES AL HACER LA APLICACION

insert into cliente values
(246, 'Laura Martínez', '1992-07-25', '56987654321', 'Chile'),
(468, 'Martín Fernández', '1990-03-15', '59812345678', 'Uruguay');


insert into asiento
values
	(123, 1 , 3),
    (123, 2 , 3),
    (123, 3 , 3);
    
-- Ejemplo de precios para el asiento 1 del avión 123
INSERT INTO precio_cambio_asiento VALUES
(1, 123, 1, 400, '2024-03-27', '2024-04-30'),
(1, 123, 1, 500, '2024-05-01', null);

-- Ejemplo de precios para el asiento 2 del avión 123
INSERT INTO precio_cambio_asiento VALUES
(1, 123, 2, 400, '2024-03-27', '2024-04-30'),
(1, 123, 2, 500, '2024-05-01', null);

-- Ejemplo de precios para el asiento 3 del avión 123
INSERT INTO precio_cambio_asiento VALUES
(1, 123, 3, 400, '2024-03-27', '2024-04-30'),
(1, 123, 3, 500, '2024-05-01', null);
