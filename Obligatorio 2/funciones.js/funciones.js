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

function altaArtistas() {
  let form = document.getElementById("idRegistrarArtistaForm");
  if (form.reportValidity()) {
    let nombre = document.getElementById("idNombre").value;
    let edad = document.getElementById("idEdad").value;
    let caracteristicas = document.getElementById("idEstilo").value;
    if (misistema.existeArtista(nombre)) {
      alert("Ya existe este artista");
    } else {
      misistema.agregarArtista(nombre, parseInt(edad), caracteristicas);
      alert("Artista agregado");
      actualizarListaArtista();
      form.reset();
    }
  }
}

function actualizarListaArtista() {

  let objLista = document.getElementById("idElegir")
  objLista.innerHTML = "";

  for (let artista of misistema.listaArtista) {
    let objOpcion = document.createElement("option");
    objOpcion.textContent = artista.nombre;
    objOpcion.value = artista.nombre;
    objLista.appendChild(objOpcion);
  }
}

function altaExposicion() {
  let form = document.getElementById("IngresarExposicionesForm");
  if (form.reportValidity()) {
    let titulo = document.getElementById("idTitulo").value.trim();
    let comienzo = document.getElementById("idFecha").value;
    let descripcion = document.getElementById("idDescripcion").value.trim();
    if (listaSeleccionada.length > 0) {
      if (misistema.existeExposicion(titulo)) {
        alert("Ya existe esta exposición.");
      } else {
        misistema.agregarExposicion(titulo, comienzo, descripcion, listaSeleccionada);
        alert("Exposición agregada con éxito.");
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


function altaComentario() {
  let form = document.getElementById("idComentariosVisitasForm");
  if (form.reportValidity()) {
    let exposicion = document.getElementById("idComboExposicion").value;
    let visitante = document.getElementById("idVisitante").value.trim();
    let comentario = document.getElementById("idComentario").value.trim();
    let visita = document.getElementById("idVisita").checked ? "Sí" : "No";
    let calificacion = "";
    let radios = document.getElementsByName("color");
    for (let radio of radios) {
      if (radio.checked) {
        calificacion = radio.value;
        break;
      }
    }
    if (misistema.existeComentario(visitante)) {
      alert("Ya ingresó comentario este visitante");
    } else {
      misistema.agregarComentario(exposicion, visitante, comentario, calificacion, visita);
      alert("Comentario agregado con éxito");
      form.reset();
      actualizarSinComentarios();
    }
  }
}

function actualizarMasArtistas() {
  // Obtener el elemento HTML para mostrar el resultado
  let listaMasArtistas = document.getElementById("idMasArtistas");
  listaMasArtistas.innerHTML = ""; // Limpia la lista actual

  // Verifica si hay exposiciones en el sistema
  if (misistema.listaExposiciones.length === 0) {
      let item = document.createElement("li");
      item.textContent = "Sin datos";
      listaMasArtistas.appendChild(item);
      return;
  }

  // Determinar la máxima cantidad de artistas
  let maxArtistas = 0;
  let exposicionesMaximas = [];

  for (let expo of misistema.listaExposiciones) {
      let cantidadArtistas = expo.listaArtista.length;

      if (cantidadArtistas > maxArtistas) {
          maxArtistas = cantidadArtistas;
          exposicionesMaximas = [expo.titulo]; // Nueva lista con esta exposición
      } else if (cantidadArtistas === maxArtistas) {
          exposicionesMaximas.push(expo.titulo); // Agrega exposición con misma cantidad
      }
  }

  // Actualizar el HTML con los títulos de las exposiciones con más artistas
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

function altaListaArtista() {
  let listaArtista = document.getElementById("idElegir");
  let itemSeleccionado = listaArtista.options[listaArtista.selectedIndex]; // Obtiene la opción seleccionada

  if (itemSeleccionado) {
      let valorArtista = itemSeleccionado.value;

      // Mover al segundo select
      let selectSeleccionada = document.getElementById("idElegir2");
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.textContent = valorArtista;
      nuevaOpcion.value = valorArtista;
      selectSeleccionada.appendChild(nuevaOpcion);

      // Actualizar lista seleccionada
      listaSeleccionada.push(valorArtista);

      // Eliminar del primer select
      listaArtista.removeChild(itemSeleccionado);
  } else {
      alert("Seleccione un artista válido");
  }
}

