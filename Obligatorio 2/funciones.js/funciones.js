window.addEventListener("load", setup);
/*Comprobar funcionalidades*/
let misistema = new Sistema();

function setup() {
  document.getElementById("idBotonColores").addEventListener("click", CambiarColor);
  document.getElementById("idBotonAltaArtista").addEventListener("click", AltaArtistas);
  document.getElementById("idBotonAltaExposicion").addEventListener("click", AltaExposicion);
  document.getElementById("idBotonAltaComentario").addEventListener("click", AltaComentario);
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
  let form = document.getElementById("idRegistrarArtistaForm");
  if (form.reportValidity()) {
    let nombre = document.getElementById("idNombre").value;
    let edad = document.getElementById("idEdad").value;
    let caracteristicas = document.getElementById("idEstilo").value;

    if (nombre === "") {
      alert("Ingrese un nombre");
    } else if (edad === "" || isNaN(edad) || parseInt(edad) <= 17 || parseInt(edad) >= 91) {
      alert("Ingrese una edad valida a partir de 18 hasta 90");
    } else if (caracteristicas === "") {
      alert("Falta poner las Caracteristicas");
    } else if (misistema.existeArtista(nombre)) {
      alert("Ya existe este artista");
    } else {
      misistema.agregarArtista(nombre, parseInt(edad), caracteristicas);
      alert("Artista agregado");
      form.reset();
    }
  }
}

function AltaExposicion() {
  let form = document.getElementById("IngresarExposicionesForm");
  if (form.reportValidity()) {
    let titulo = document.getElementById("idTitulo").value.trim();
    let comienzo = document.getElementById("idFecha").value;
    let descripcion = document.getElementById("idDescripcion").value.trim();

    if (misistema.existeExposicion(titulo)) {
      alert("Ya existe esta exposición.");
    } else {
      misistema.agregarExposicion(titulo, comienzo, descripcion);
      alert("Exposición agregada con éxito.");
      form.reset();
      actualizarExposicionEnCombo();
      actualizarSinComentarios();
    }
  }
}

function actualizarExposicionEnCombo() {
  let objExposicion = document.getElementById("idComboExposicion");
  objExposicion.innerHTML = ""; // Limpiar opciones previas

  for (let exp of misistema.listaExposiciones) {
    // Crear un elemento <option>
    let opcion = document.createElement("option");
    opcion.textContent = exp.titulo; // Mostrar el título de la exposición
    opcion.value = exp.titulo; // Valor opcional si es necesario
    objExposicion.appendChild(opcion); // Agregar al select
  }
}


function AltaComentario() {
  let form = document.getElementById("idComentariosVisitasForm");
  if (form.reportValidity()) {
    // Obtener el título de la exposición seleccionada
    let exposicion = document.getElementById("idComboExposicion").value;

    // Obtener los otros valores del formulario
    let visitante = document.getElementById("idVisitante").value.trim();
    let comentario = document.getElementById("idComentario").value.trim();

    // Determinar si el visitante hizo visita guiada
    let visita = document.getElementById("idVisita").checked ? "Sí" : "No";

    // Obtener la calificación seleccionada
    let calificacion = "";
    let radios = document.getElementsByName("color");
    for (let radio of radios) {
      if (radio.checked) {
        calificacion = radio.value; // Usar el valor en lugar del id
        break;
      }
    }

    // Validar si el visitante ya ingresó un comentario
    if (misistema.existeComentario(visitante)) {
      alert("Ya ingresó comentario este visitante");
    } else {
      // Agregar comentario al sistema con calificación incluida
      misistema.agregarComentario(exposicion, visitante, comentario, calificacion, visita);
      alert("Comentario agregado con éxito");
      form.reset();
      actualizarSinComentarios();
    }
  }
}

function actualizarSinComentarios() {
  let listaSinComentarios = document.getElementById("idSinComentarios");
  listaSinComentarios.innerHTML = ""; // Limpiar la lista actual

  // Filtrar exposiciones sin comentarios
  let exposicionesSinComentarios = misistema.listaExposiciones.filter(exp => {
      return !misistema.listaComentarios.some(com => com.titulo === exp.titulo);
  });

  // Ordenar exposiciones por fecha (ascendente)
  exposicionesSinComentarios.sort((a, b) => {
      let fechaA = new Date(a.fecha);
      let fechaB = new Date(b.fecha);
      return fechaA - fechaB;
  });

  // Actualizar la lista en el HTML
  for (let exp of exposicionesSinComentarios) {
      let item = document.createElement("li");
      item.textContent = `${exp.titulo} - ${exp.fecha}`;
      listaSinComentarios.appendChild(item);
  }

  // Si no hay exposiciones sin comentarios, mostrar un mensajes
  if (exposicionesSinComentarios.length === 0) {
      let item = document.createElement("li");
      item.textContent = "Sin datos";
      listaSinComentarios.appendChild(item);
  }
}



