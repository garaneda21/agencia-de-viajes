async function obtenerVuelos() {
    const res = await fetch('http://localhost:5000/vuelos')
    const data = await res.json();

    return data;
}

async function obtenerAsientos(id_pack) {
    const res = await fetch(`http://localhost:5000/vuelos/${id_pack}`)
    const data = await res.json();

    return data;
}

async function obtenerConfirmar(id_pack, num_asiento) {
    const res = await fetch(`http://localhost:5000/vuelos/${id_pack}/${num_asiento}`)
    const data = await res.json();

    return data;
}

async function reservar(body) {
    const res = await fetch('http://localhost:5000/reservar', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()

    return data;
}

async function renderVuelo() {
    const tarjetas = document.getElementById("vuelos");

    const vuelos = await obtenerVuelos();

    for (const vuelo of vuelos) {

        const {
            id_pack,
            pais_origen,
            ciudad_origen,
            aeropuerto_origen,
            pais_destino,
            ciudad_destino,
            aeropuerto_destino,
            fecha_publicacion,
            fecha_viaje,
            hora_partida,
            hora_llegada,
        } = vuelo;

        const card = `
        <div class="card mb-3">
            <h5 class="card-header">
                Vuelo a ${pais_destino}
            </h5>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5><b>Origen</b></h5>
                        <p>${pais_origen}</p>
                        <p>${ciudad_origen}</p>
                        <p>${aeropuerto_origen}</p>
                    </div>
                    <div class="col">
                        <h5><b>Destino</b></h5>
                        <p>${pais_destino}</p>
                        <p>${ciudad_destino}</p>
                        <p>${aeropuerto_destino}</p>
                    </div>
                    <div class="col">
                        <h5><b>Fechas</b></h5>
                        <p>Fecha Viaje: ${fecha_viaje}</p>
                        <p>Hora Partida: ${hora_partida}</p>
                        <p>Hora Llegada: ${hora_llegada}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <a onclick="renderAsiento(${id_pack})" class="btn btn-primary">Reservar</a>
                    </div>
                    <div class="col text-end text-secondary">
                        Publicado en ${fecha_publicacion}
                    </div>
                </div>
            </div>
        </div>
        `

        let div = document.createElement('div');
        div.innerHTML = card;

        tarjetas.append(div)
    }

}

async function renderAsiento(id_pack) {
    // Eliminar tarjetas
    const tarjetas = document.getElementById("vuelos");
    tarjetas.innerHTML = "";

    // Crear Tabla
    const tabla = document.getElementById("asientos");
    tabla.innerHTML = `
        <table class="table table-striped align-middle">
            <thead>
                <tr>
                    <th scope="col">N° Asiento</th>
                    <th scope="col">Tipo Asiento</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Botón</th>
                </tr>
            </thead>
            <tbody id="fila-asientos">
                <!-- insertar asientos -->
            </tbody>
        </table>
    `

    // Insertar elementos dentro de la tabla
    const fila = document.getElementById("fila-asientos");
    const asientos = await obtenerAsientos(id_pack);

    for (const asiento of asientos) {

        const {
            num_asiento,
            nombre_tipo_asiento,
            precio,
        } = asiento;

        const card = `
            <th scope="row">${num_asiento}</th>
            <td>${nombre_tipo_asiento}</td>
            <td>$ ${precio} </td>
            <td>
                <a onclick="renderConfirmar(${id_pack}, ${num_asiento}, ${precio})" class="btn btn-success btn-sm" href="#" role="button">
                    Reservar
                </a>
            </td>
        `

        let tr = document.createElement('tr');
        tr.innerHTML = card;

        fila.append(tr)
    }
}

async function renderConfirmar(id_pack, num_asiento, precio) {
    // Eliminar tarjetas
    const tarjetas = document.getElementById("asientos");
    tarjetas.innerHTML = "";

    const { pack, asiento } = await obtenerConfirmar(id_pack, num_asiento);
    const {
        pais_origen,
        pais_destino,
        id_avion,
        fecha_viaje,
        hora_partida,
        hora_llegada,
    } = pack;
    const { nombre_tipo_asiento } = asiento;

    const confirmar = document.getElementById("confirmar");
    confirmar.innerHTML = `
        <div class="card">
            <div class="card-header  text-center">
                <b>Confirmar Reserva</b>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5>Vuelo</h5>
                        <p>Origen: ${pais_origen}</p>
                        <p>Destino: ${pais_destino}</p>
                        <p>ID Avion: ${id_avion}</p>
                    </div>
                    <div class="col">
                        <h5>Fechas</h5>
                        <p>Fecha Viaje: ${fecha_viaje}</p>
                        <p>Hora Partida: ${hora_partida}</p>
                        <p>Hora Llegada: ${hora_llegada}</p>
                    </div>
                    <div class="col">
                        <h5>Asiento</h5>
                        <p>N° ${num_asiento}</p>
                        <p>${nombre_tipo_asiento}</p>
                        <p>Precio: <b>$ ${precio}</b></p>
                    </div>
                </div>

                <form id="formulario">
                    <div class="mb-3">
                        <label class="form-label">Ingrese su número de documento</label>
                        <input class="form-control" name="num_documento">
                    </div>
                    <div id="alert">
                        <!-- insertar alerta -->
                    </div>
                    <button type="submit" class="btn btn-primary">Confirmar Reserva</button>
                </form>
            </div>
        </div>    
    `

    const form = document.getElementById("formulario");

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        // obtener elementos html
        let elementos = Array.from(evento.target.elements);

        // obtener datos ingresadon en el html
        let datos = elementos.reduce((acc, el) => {
            if (!el.name) return acc;
            acc[el.name] = el.value;
            return acc;
        }, {})

        datos.id_pack = id_pack;
        datos.id_avion = id_avion;
        datos.num_asiento = num_asiento;
        datos.precio = precio;

        console.log(datos);

        // realizar reserva
        const res = await reservar(datos)

        const alert = document.getElementById("alert");

        if (res.error === false) {
            confirmar.innerHTML = `
            <div class="alert alert-success" role="alert">
                Reserva Existosa! ahora puede <a href="index.html" class="alert-link">Volver al Inicio</a>.
            </div>
            `
        }
        else {
            alert.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> ${res.msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
        }
    })
}

renderVuelo();