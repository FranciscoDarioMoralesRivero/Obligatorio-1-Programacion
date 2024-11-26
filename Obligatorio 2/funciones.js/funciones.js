window.addEventListener("load", setup);
/*Comprobar funcionalidades*/
let misistema = new Sistema();
let listaSeleccionada = [];

function setup() {
  document.getElementById("idBotonColores").addEventListener("click", cambiarColor);
  document.getElementById("idBotonAltaArtista").addEventListener("click", altaArtistas);
  document.getElementById("idBotonAltaExposicion").addEventListener("click", altaExposicion);
  document.getElementById("idBotonAltaComentario").addEventListener("click", altaComentario);
  document.getElementById("idDerecha").addEventListener("click", altaListaArtista);
}

function cambiarColor() {
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

// Form Artistas Inicio

function altaArtistas() {
  let form = document.getElementById("idRegistrarArtistaForm");
  if (form.reportValidity()) {
    let nombre = document.getElementById("idNombre").value;
    let edad = document.getElementById("idEdad").value;
    let caracteristicas = document.getElementById("idEstilo").value;
    if (misistema.existeArtista(nombre)) {
      alert("Ya existe este artista");
    } else {
      misistema.agregarArtista(nombre, edad, caracteristicas);
      alert("Alta Artistas");
      actualizarListaArtista();
      form.reset();
    }
  }
}

function actualizarListaArtista() {

  let objLista = document.getElementById("idElegir");
  objLista.innerHTML = "";

  for (let artista of misistema.listaArtista) {
    let objOpcion = document.createElement("option");

    objOpcion.textContent = artista.nombre;
    objOpcion.value = artista.nombre;
    objLista.appendChild(objOpcion);
  }
}
// Form Artistas Final

function altaExposicion() {
  let form = document.getElementById("idIngresarExposicionesForm");
  if (form.reportValidity()) {
    let titulo = document.getElementById("idTitulo").value;
    let comienzo = document.getElementById("idFecha").value;
    let descripcion = document.getElementById("idDescripcion").value;

    if (listaSeleccionada.length > 0) {
      if (misistema.existeExposicion(titulo)) {
        alert("Ya existe esta exposición.");
      } else {
        misistema.agregarExposicion(titulo, comienzo, descripcion, listaSeleccionada);
        alert("Alta Exposiciones");
        form.reset();
        listaSeleccionada = [];
        document.getElementById("idElegir2").innerHTML = "";
        actualizarListaArtista();
        actualizarExposicionEnCombo();
        actualizarSinComentarios();
        actualizarMasArtistas();
      }
    }
    else {
      alert("Debe seleccionar por lo menos un artista");
    }
  }
}


function actualizarExposicionEnCombo() {
  let objExposicion = document.getElementById("idExposicion");
  objExposicion.innerHTML = "";

  for (let exp of misistema.listaExposiciones) {
    let opcion = document.createElement("option");
    opcion.textContent = exp.titulo;
    opcion.value = exp.titulo;
    objExposicion.appendChild(opcion);
  }
}

function altaListaArtista() {

  let listaArtista = document.getElementById("idElegir");
  let itemArtista = listaArtista.value;

  if (itemArtista != "") {
    let selectSeleccionada = document.getElementById("idElegir2");
    let item = document.createElement("option");
    item.textContent = itemArtista
    item.value = itemArtista
    selectSeleccionada.appendChild(item)
    listaSeleccionada.push(itemArtista);

    let objLista = document.getElementById("idElegir")
    objLista.innerHTML = "";

    for (let artista of misistema.listaArtista) {
      if (listaSeleccionada.indexOf(artista.nombre) == -1) {
        let objOpcion = document.createElement("option");

        objOpcion.textContent = artista.nombre
        objOpcion.value = artista.nombre
        objLista.appendChild(objOpcion)
      }
    }
  }
  else {
    alert("Seleccione un artista")
  }
}//Para retornar Como en El ejemplo usaba mi sistema aca usar ListaSelecionada

function altaComentario() {
  let form = document.getElementById("idComentariosVisitasForm");
  if (form.reportValidity()) {
    let exposicion = document.getElementById("idExposicion").value;
    let visitante = document.getElementById("idVisitante").value;
    let comentario = document.getElementById("idComentario").value;
    let visita = document.getElementById("idVisita").checked ? "Sí" : "No";

    let calificacion = "";
    let radios = document.getElementsByName("color");
    for (let radio of radios) {
      if (radio.checked) {
        calificacion = radio.value;
      }
    }

    if (misistema.existeComentario(visitante)) {
      alert("Ya ingresó comentario este visitante");
    } else {
      misistema.agregarComentario(exposicion, visitante, comentario, calificacion, visita);
      alert("Alta Comentarios");
      form.reset();
      actualizarSinComentarios();
      exposicionInfoComentarios();
    }
  }
}

function actualizarMasArtistas() {
  let listaMasArtistas = document.getElementById("idMasArtistas");
  listaMasArtistas.innerHTML = "";

  if (misistema.listaExposiciones.length === 0) {
    let item = document.createElement("li");
    item.textContent = "Sin datos";
    listaMasArtistas.appendChild(item);
    return;
  }

  let maxArtistas = 0;
  let exposicionesMaximas = [];

  for (let expo of misistema.listaExposiciones) {
    let cantidadArtistas = expo.listaArtista.length;

    if (cantidadArtistas > maxArtistas) {
      maxArtistas = cantidadArtistas;
      exposicionesMaximas = [expo.titulo];
    } else if (cantidadArtistas === maxArtistas) {
      exposicionesMaximas.push(expo.titulo);
    }
  }

  for (let titulo of exposicionesMaximas) {
    let item = document.createElement("li");
    item.textContent = titulo;
    listaMasArtistas.appendChild(item);
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
    let li = document.createElement("li");
    li.textContent = `${exp.titulo} - ${exp.fecha}`;
    listaSinComentarios.appendChild(li);
  }

  // Si no hay exposiciones sin comentarios, mostrar un mensajes
  if (exposicionesSinComentarios.length === 0) {
    let li = document.createElement("li");
    li.textContent = "Sin datos";
    listaSinComentarios.appendChild(li);
  }
}

function exposicionInfoComentarios() {
  let objExposicion2 = document.getElementById("idExposicion2");
  objExposicion2.innerHTML = "<option>Todas</option>";

  for (let opt of misistema.listaComentarios) {
    let opcion = document.createElement("option");
    opcion.textContent = opt.titulo;
    opcion.value = opt.titulo;
    objExposicion2.appendChild(opcion);
  }
}


