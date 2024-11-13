class RegistrarArtista{

    constructor(Nombre,Edad,Caracteristicas){

        this.Nombre=Nombre;
        this.Edad=Edad;
        this.Caracteristicas=Caracteristicas;
    }toString(){
        return this.Nombre;
    }
}
class IngresarExpocicion{

    constructor(Titulo,Fecha,Descripcion){

        this.Titulo=Titulo;
        this.Fecha=Fecha;
        this.Descripcion=Descripcion;
    }
}
class ComentariosDeVisitas{

    constructor(Titulo,NombreDeVisita,Comentario,Calificacion,HiceVisitaGuiada){
        this.Titulo=
        this.NombreDeVisita=NombreDeVisita;
        this.Comentario=Comentario;
        this.Calificacion=Calificacion;
        this.HiceVisitaGuiada=HiceVisitaGuiada;
    }
}
class Sistema{

    constructor(){
        this.ListaArtista=[];
    }
    AgregarArtista(unElemento){
        this.ListaArtista.push(unElemento);
    }
}