async function obtenerReservas(num_documento) {
    const res = await fetch(`http://localhost:5000/consultar/${num_documento}`);
    const data = await res.json();

    return data;
}

async function cancelarReserva(id_reserva) {
    const res = await fetch(`http://localhost:5000/cancelar/${id_reserva}`, { method: "DELETE" })
    const data = await res.json();

    const reserva = document.getElementById(`reserva-${id_reserva}`)
    reserva.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Reserva cancelada con Exito
        </div>
    `

    return data;
}

async function renderReservas() {
    const form = document.getElementById("form");

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        // obtener elementos html
        let elementos = Array.from(evento.target.elements);

        // obtener datos ingresadon en el html
        let { num_documento } = elementos.reduce((acc, el) => {
            if (!el.name) return acc;

            acc[el.name] = el.value;
            return acc;
        }, {})

        const { reservas } = await obtenerReservas(num_documento)

        const containter = document.getElementById("contenedor");
        containter.innerHTML = ""

        console.log(reservas);

        if (reservas !== undefined) {
            for (const reserva of reservas) {
                const {
                    id_reserva,
                    id_avion,
                    num_asiento,
                    fecha_reserva,
                    precio_final,
                    pais_origen,
                    pais_destino,
                    fecha_viaje,
                    hora_partida,
                    hora_llegada,
                } = reserva;
    
                const card = `
                    <div id="reserva-${id_reserva}">
                        <div class="card mb-3">
                            <h5 class="card-header">
                                Vuelo ${pais_origen} a ${pais_destino} Reservado en ${fecha_reserva}
                            </h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <h5>Pack</h5>
                                        <p>ID Avion: ${id_avion}</p>
                                        <p>Numero de Asiento: ${num_asiento}</p>
                                        <p>Precio: <b>$ ${precio_final}</b></p>
                                    </div>
                                    <div class="col">
                                        <h5>Fechas</h5>
                                        <p>Fecha Viaje: ${fecha_viaje}</p>
                                        <p>Hora Partida: ${hora_partida}</p>
                                        <p>Hora Llegada: ${hora_llegada}</p>
                                    </div>
                                </div>
                                <button onclick="cancelarReserva(${id_reserva})" class="btn btn-sm btn-outline-danger">Cancelar Reserva</button>
                            </div>
                        </div>
                    </div>
                `
    
                let div = document.createElement('div');
                div.innerHTML = card;
    
                containter.append(div)
            }
        }
        else {
            containter.innerHTML = `
            <div class="alert alert-info" role="alert">
                No tiene reservas registradas. <a class="alert-link" href="index.html">Volver al Inicio</a>
            </div>
            `
        }
    })
}

renderReservas();