class Artista {

  constructor(nombre, edad, caracteristicas) {

    this.nombre = nombre;
    this.edad = edad;
    this.caracteristicas = caracteristicas;
  }

  toString() {
    return this.Nombre;
  }
}

class Exposicion {

  constructor(titulo, fecha, descripcion) {

    this.titulo = titulo;
    this.fecha = fecha;
    this.descripcion = descripcion;
  }
}

class Comentario {

  constructor(titulo, nombreDeVisita, comentario, calificacion, hiceVisitaGuiada) {
    this.titulo = titulo;
    this.nombreDeVisita = nombreDeVisita;
    this.comentario = comentario;
    this.calificacion = calificacion;
    this.hiceVisitaGuiada = hiceVisitaGuiada;
  }
}

class Sistema {

  constructor() {
    this.listaArtista = [];  // Inicializa una lista vacía para almacenar los artistas.
    this.listaExposiciones = [];
    this.listaComentarios = [];
  }

  agregarArtista(nombre, edad, caracteristicas) {
    // Agrega un nuevo artista a la lista.
    let objArtista = new Artista(nombre, edad, caracteristicas)
    this.listaArtista.push(objArtista);
  }

  existeArtista(elNombre) {  // Verifica si un artista con el nombre dado ya existe en la lista.
    let existe = false;
    for (let e of this.listaArtista) {
      if (e.nombre === elNombre) {  // Compara el nombre del artista actual con el nombre buscado.
        existe = true;
      }
    }
    return existe;
  }

  agregarExposicion(titulo, fecha, descripcion) {
    let objExposicion = new Exposicion(titulo, fecha, descripcion)
    this.listaExposiciones.push(objExposicion);
  }

  existeExposicion(elTitulo) {
    let existe = false;
    for (let u of this.listaExposiciones) {
      if (u.titulo === elTitulo) {
        existe = true;
      }
    }
    return existe;
  }

  agregarComentario(exposicion, nombreVisita, comentario, calificacion, hiceVisitaGuiada) {
    let objComentario = new Comentario(exposicion, nombreVisita, comentario, calificacion, hiceVisitaGuiada)
    this.listaComentarios.push(objComentario);
  }

  existeComentario(elVisitante) {
    let existe = false;
    for (let o of this.listaComentarios) {
      if (o.visitante === elVisitante) {
        existe = true;
      }
    }
    return existe;
  }
}