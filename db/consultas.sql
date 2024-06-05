/*
SELECT columna1, columna2, ...
FROM nombre_tabla; 
WHERE condiciones
*/

select * from cliente;
select * from pack;
select * from reserva;
select * from reserva_estado;
select * from estado;
SELECT * from precio_cambio_asiento;
SELECT * from tipo_asiento;
select * from asiento;

-- ver solo el nombre de los clientes y su nacionalidad
select nombre_completo, nacionalidad
from cliente;

-- el where se usa para filtrar los datos que queremos
	-- ver solo los clientes de nacionalidad argentina
select * from cliente
where nacionalidad = 'Argentina';

-- ver todos los pack de vuelo que no inicien en colombia
select * from pack
where pais_origen != 'Colombia'; -- distinto !=, <>

-- ver todos los pack de vuelo que no inicien en argentina y mexico
select * from pack
where pais_origen != 'Argentina' AND pais_origen != 'México';

-- ver todos los precios de asientos que cuesten entre $400 y $500
select * from precio_cambio_asiento
where precio between 400 and 500;

-- ver los clientes cuyos numeros de telefono empiecen en 56
select * from cliente
where telefono like '56%';

-- ver los clientes ordenados por fecha de nacimiento
select * from cliente
order by fec_nacimiento desc;
select * from cliente
order by fec_nacimiento asc;

-- obtener el numero packs de vuelo que parten desde colombia
-- as es un alias
select count(*) as numero_de_vuelos_desde_colombia from pack
where pais_origen = 'Colombia';

-- obtener el numero de asientos de cualquier avion por cada tipo de asiento
select id_tipo_asiento, count(id_tipo_asiento) as cantidad from asiento
group by id_tipo_asiento;

-- obtener la edad de cada cliente y su nombre
select curdate();
select now();
select nombre_completo, timestampdiff(year, fec_nacimiento, curdate()) as edad
from cliente;

-- obtener todos los precios de asientos que esten vigentes ahora
select * from precio_cambio_asiento
where fec_inicio_precio < now() AND (now() <= fec_fin_precio OR fec_fin_precio is null);

/* SOLO UN EJEMPLO
UPDATE nombre_tabla
SET columna1 = valor1, columna2 = valor2, ...
WHERE condicion; 
*/
-- actualizar la reserva 1 como cancelada
UPDATE reserva_estado
SET id_estado_reserva = 3
WHERE id_reserva = 1; -- si no se añade el where queda la caga >:D 

-- ver si existe en los registros el cliente con num_documento 135
select exists (
	select 1 from cliente
    where num_documento = 135
) as existe_cliente ;

-- CONSULTA QUE USE EN EL BACKEND
-- ver los asientos que no han sido reservados o se cancelo su reserva
-- no debe existir en la tabla de reservas o aparecer en reserva estado con estado cancelada)
select * from asiento a
where not exists (
	-- comprobar si existen en la tabla de reserva
	select 1 from reserva r
    where a.id_avion = r.id_avion and a.num_asiento = r.num_asiento
    and not exists (
		-- comprobar si existen en la tabla de reserva estado con estado cancelado
		select 1 from reserva_estado re
        where re.id_reserva = r.id_reserva and re.id_estado_reserva = 3 -- 3 es cancelada
    )
);
/*
	JOINS: nos perminten unir datos de dos tablas para verlos
    LEFT JOIN
		- nos trae todos los datos que nesesitemos de otra tabla a nuestra consulta
          si estos existen
	RIGHT JOIN
		- lo mismo pero toma como tabla principal la otra
*/
	
-- obtener los numero de asientos y el nombre del tipo
select * from asiento;
select * from tipo_asiento;
-- USANDO LEFT
select a.num_asiento, ta.nombre_tipo_asiento
from asiento a
left join tipo_asiento ta
on a.id_tipo_asiento = ta.id_tipo_asiento;

-- Obtener los datos de los clientes que han realizado al menos una reserva, 
-- junto con la id del pack y el numero de asiento seleccionado.
select c.num_documento, c.nombre_completo, c.nacionalidad, r.id_pack, r.num_asiento from cliente c
right join reserva r on r.num_documento = c.num_documento;