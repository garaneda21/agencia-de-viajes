async function registrar(body) {

    const res = await fetch('http://localhost:5000/registrar', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()

    return data;
}

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

    const res = await registrar(datos)
    console.log(res);

    const alert = document.getElementById("alert");

    if(res.error === false) {
        alert.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Registro Exitoso!</strong> ahora puede volver a <a href="index.html" class="alert-link">la pagina principal</a> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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