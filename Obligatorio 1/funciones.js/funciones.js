window.addEventListener("load", setup);
/*Comprobar funcionalidades*/
let misistema = new Sistema();

function setup() {
    document.getElementById("BotonColores").addEventListener("click", CambiarColor);
    document.getElementById("BotonAltaArtista").addEventListener("click", AltaArtistas);
    document.getElementById("BotonAltaExpocicion").addEventListener("click", AltaExposicion);
    document.getElementById("BotonAltaComentario").addEventListener("click", AltaComentario);
}

function CambiarColor() {
    let cambiarColor1 = document.getElementById("idCambioMuseo");
    let cambiarColor2 = document.getElementById("idCambioIngresos");
    let cambiarColor3 = document.getElementById("idCambioInfo");

    let colorPrincipal = "rgb(152, 251, 152)";
    let colorAlterno = "#A4D28C";

    let colorActual = window.getComputedStyle(cambiarColor1).backgroundColor;

    if (colorActual === colorPrincipal) {
        cambiarColor1.style.backgroundColor = colorAlterno;
        cambiarColor2.style.backgroundColor = colorAlterno;
        cambiarColor3.style.backgroundColor = colorAlterno;
    } else {
        cambiarColor1.style.backgroundColor = colorPrincipal;
        cambiarColor2.style.backgroundColor = colorPrincipal;
        cambiarColor3.style.backgroundColor = colorPrincipal;
    }
}

function AltaArtistas() {
    let form = document.getElementById("RegistrarArtistaForm");
    if (form.reportValidity()) {
        let nombre = document.getElementById("idNombre").value;
        let edad = document.getElementById("idEdad").value;
        let caracteristicas = document.getElementById("idEstilo").value;
        if (misistema.existeArtista(nombre)) {
            alert("Ya Existe Este Artista")
        } else {
            misistema.agregarArtista(nombre, edad, caracteristicas)
            alert("Alta Artistas")
            // ActualizarListaArtista();
            form.reset();
        }
    }
}


function AltaExposicion() {
    let form = document.getElementById("IngresarExposicionesForm");
    if (form.reportValidity()) {
        let titulo = document.getElementById("idTitulo").value;
        let comienzo = document.getElementById("idFecha").value;
        let descripcion = document.getElementById("idDescripcion").value;
        if (misistema.existeExposicion(titulo)) {
            alert("Ya existe esta Exposicion")
        } else {
            misistema.agregarExposicion(titulo, comienzo, descripcion)
            alert("Alta Exposiciones")
            form.reset();
        }
    }
}

function AltaComentario() {
    let form = document.getElementById("IngresarExposicionesForm");
    if (form.reportValidity()) {
        let exposicion = document.getElementById("idExposicion").value;
        let visitante = document.getElementById("idVisitante").value;
        let comentario = document.getElementById("idComentario").value;
        let visita = document.getElementById("idVisita").value;
        if (misistema.existeExposicion(visitante)) {
            alert("Ya ingreso comentario este visitante")
        } else {
            misistema.agregarExposicion(exposicion, visitante, comentario, visita)
            alert("Alta Comentarios")
            form.reset();
        }
    }
}