import express from 'express';
import cors from 'cors';
import { db } from './db/db.js'

// instanciar aplicacion
const app = express();

// middleware
app.use(express.json()) //recibir body
app.use(cors());        // permitir fetch

// REGISTRAR UN USUARIO
app.post('/registrar', async (req, res) => {
    try {
        console.log('usuario realizando registro con rut:', req.body.num_documento);

        // obtener datos del front
        const { num_documento, nombre_completo, fec_nacimiento, telefono, nacionalidad } = req.body;

        // comprobar si existe en la db
        const [[existe]] = await db.query(`SELECT num_documento FROM cliente
        WHERE num_documento = ${num_documento};`)

        if (existe === undefined) {
            // realizar insert

            const resul = await db.query(`INSERT INTO cliente
                VALUES (?, ?, ?, ?, ?)`,
                [num_documento, nombre_completo, fec_nacimiento, telefono, nacionalidad]
            )

            res.status(200).send({ error: false, resul })
        }
        else {
            res.status(400).send({ error: true, msg: "El usuario ya existe" })
        }
    } catch (error) {
        res.status(400).send({ error: true, msg: "Ocurrio un problema, Compruebe los datos" })
    }
})

// Consultar una reserva
app.get('/consultar/:num_documento', async (req, res) => {
    console.log("Usuario consultando reserva");

    const { num_documento } = req.params;

    // select * from pack where id_pack = 1;
    const [reservas] = await db.query(`SELECT r.id_reserva, r.id_avion, r.num_asiento, r.fecha_reserva, r.precio_final,
        p.pais_origen, p.pais_destino, p.fecha_viaje, p.hora_partida, p.hora_llegada FROM reserva r
        LEFT JOIN pack p ON p.id_pack = r.id_pack
        WHERE r.num_documento = ${num_documento};`
    );

    if (reservas.length !== 0) {
        res.status(200).send({ error: false, reservas })
    }
    else {
        res.status(404).send({ error: true, msg: "No hay reservas" })
    }
})

/*  Cancelar una reserva 
    como no se puede actualizar nada en la base de datos, para cancelar
    eliminare el registro de la tabla de reservas
*/
app.delete('/cancelar/:id_reserva', async (req, res) => {
    try {
        console.log("Usuario cancelando una reserva");

        const { id_reserva } = req.params;

        const [resul] = await db.query(`DELETE FROM reserva WHERE id_reserva = ${id_reserva}`);

        res.status(200).send({ error: false, resul });
    } catch (error) {
        res.status(400).send({ error: true, msg: "Ocurrio un problema" });
    }
})

// PARA VER Y RESERVAR UN VUELO
app.get('/vuelos', async (req, res) => {
    console.log("usuario revisando vuelos disponibles...");

    // hacer consulta
    const [vuelos] = await db.query("SELECT * FROM pack")

    res.status(200).send(vuelos)
})

app.get('/vuelos/:id_pack', async (req, res) => {
    console.log("usuario reservando pack:", req.params.id_pack);

    const { id_pack } = req.params;

    // obtener asientos disponibles para ese avion
    const [asientos] = await db.query(`SELECT p.id_pack, p.id_avion, p.num_asiento, p.precio, t.nombre_tipo_asiento FROM precio_cambio_asiento p
        LEFT JOIN asiento a ON a.num_asiento = p.num_asiento
        LEFT JOIN tipo_asiento t ON t.id_tipo_asiento = a.id_tipo_asiento
        WHERE p.id_pack = ${id_pack}
        AND p.fec_inicio_precio < now() AND (p.fec_fin_precio >= now() OR p.fec_fin_precio IS NULL)
        AND NOT EXISTS (
            SELECT 1 FROM reserva r
            WHERE r.id_avion = p.id_avion AND r.num_asiento = p.num_asiento
            AND NOT EXISTS (
                SELECT 1 FROM reserva_estado re
                WHERE re.id_reserva = r.id_reserva AND re.id_estado_reserva = 3
            )
        )`
    )

    if (asientos.length === 0) {
        res.status(404).send({ error: true, msg: "no hay asientos disponibles para este vuelo" })
        return;
    }

    res.status(200).send(asientos);
})

app.get('/vuelos/:id_pack/:num_asiento', async (req, res) => {
    console.log("usuario realizara reserva con datos: ", req.params);

    const { id_pack, num_asiento } = req.params;

    // quiero mostrar un resumen del pack que se reservara y el asiento
    const [[pack]] = await db.query(`SELECT * FROM pack WHERE id_pack = ${id_pack}`);

    const [[asiento]] = await db.query(`
        SELECT a.num_asiento, t.nombre_tipo_asiento FROM asiento a
        LEFT JOIN tipo_asiento t ON a.id_tipo_asiento = t.id_tipo_asiento
        WHERE id_avion = ${pack.id_avion} AND num_asiento = ${num_asiento}`
    );

    res.status(200).send({ pack, asiento });
})

app.post('/reservar', async (req, res) => {
    try {
        console.log('usuario realizando reserva con rut:', req.body.num_documento);


        const { num_documento, id_pack, id_avion, num_asiento, precio } = req.body;

        // comprobar si existe en la db
        const [[existe]] = await db.query(`SELECT num_documento FROM cliente
        WHERE num_documento = ${num_documento};`)
        console.log(req.body);

        if (existe !== undefined) {
            // realizar reserva

            const [resul] = await db.query(`
                INSERT INTO reserva (num_documento, id_pack, id_avion, num_asiento, fecha_reserva, precio_final) 
                VALUES (${num_documento}, ${id_pack}, ${id_avion}, ${num_asiento}, NOW(), ${precio})`,
            );

            res.send({ error: false, resul })
        }
        else {
            res.status(400).send({ error: true, msg: "El cliente no existe, registre un nuevo cliente" })
        }
    } catch (error) {
        res.status(400).send({ error: true, msg: "Ocurrio un problema, Compruebe los datos" })
    }
})

app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000...");
})