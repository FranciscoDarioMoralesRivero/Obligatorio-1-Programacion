class Artista{

    constructor(Nombre,Edad,Caracteristicas){
  
        this.Nombre=Nombre;
        this.Edad=Edad;
        this.Caracteristicas=Caracteristicas;
    }
    
    toString(){
        return this.Nombre;
    }
  }

  class Expocicion{
  
    constructor(Titulo,Fecha,Descripcion){
  
        this.Titulo=Titulo;
        this.Fecha=Fecha;
        this.Descripcion=Descripcion;
    }
  }
  class Comentario{
  
    constructor(Titulo,NombreDeVisita,Comentario,Calificacion,HiceVisitaGuiada){
        this.Titulo=
        this.NombreDeVisita=NombreDeVisita;
        this.Comentario=Comentario;
        this.Calificacion=Calificacion;
        this.HiceVisitaGuiada=HiceVisitaGuiada;
    }
  }
  class Sistema {

    constructor() {
        this.listaArtista = [];  // Inicializa una lista vacía para almacenar los artistas.
    }

    agregarArtista(Nombre,Edad,Caracteristicas) {
        // Agrega un nuevo artista a la lista.
        let objArtista = new Artista(Nombre,Edad,Caracteristicas)
        this.listaArtista.push(objArtista);
    }

    existeArtista(elNombre) {  // Verifica si un artista con el nombre dado ya existe en la lista.
        let existe = false;
        for (let e of this.listaArtista) {
            if (e.Nombre === elNombre) {  // Compara el nombre del artista actual con el nombre buscado.
                existe = true;
            }
        }
        return existe;
    }
}
