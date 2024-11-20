window.addEventListener("load", setup);
/*Comprobar funcionalidades*/
let misistema = new Sistema();
let listaSelecionada=[];
function setup() {
    document.getElementById("BotonColores").addEventListener("click", CambiarColor);
    document.getElementById("BotonAltaArtista").addEventListener("click", AltaArtistas);
    document.getElementById("BotonAltaExpocicion").addEventListener("click", AltaExposicion);
    document.getElementById("BotonAltaComentario").addEventListener("click", AltaComentario);
    document.getElementById("derecha").addEventListener("click",altaListaArtista);
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
            ActualizarListaArtista();
            form.reset();
        }
    }
}
function ActualizarListaArtista(){
    
    let objLista=document.getElementById("idElegir")
    objLista.innerHTML = "";

    for(let artista of misistema.listaArtista){
        let objOpcion=document.createElement("option");

        objOpcion.textContent=artista.nombre
        objOpcion.value = artista.nombre
        objLista.appendChild(objOpcion)
    }
}

function AltaExposicion() {
    let form = document.getElementById("IngresarExposicionesForm");
    if (form.reportValidity()) {
        let titulo = document.getElementById("idTitulo").value;
        let comienzo = document.getElementById("idFecha").value;
        let descripcion = document.getElementById("idDescripcion").value;
        
        if(listaSelecionada.length>0)
        {
            if (misistema.existeExposicion(titulo)) {
                alert("Ya existe esta Exposicion")
            } else {
                misistema.agregarExposicion(titulo, comienzo, descripcion,listaSelecionada)
                alert("Alta Exposiciones")
                form.reset();
                listaSelecionada=[]
                document.getElementById("idElegir2").innerHTML="";
                ActualizarListaArtista();
            }
        }
        else{
            alert("Debe seleccionar por lo menos un artista")
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
        if (misistema.existeComentario(visitante)) {
            alert("Ya ingreso comentario este visitante")
        } else {
            let carita=document.getElementsByName("color");
            alert(carita.value)
            misistema.agregarComentario(exposicion, visitante, comentario, visita)
            alert("Alta Comentarios")
            form.reset();
        }
    }
}

function altaListaArtista()
{


    let listaArtista=document.getElementById("idElegir");
    let itemArtista=listaArtista.value;

    if(itemArtista!="")
    {
    let selectSeleccionada=document.getElementById("idElegir2");
    let item=document.createElement("option");
    item.textContent=itemArtista
    item.value = itemArtista
    selectSeleccionada.appendChild(item)
    listaSelecionada.push(itemArtista);

    let objLista=document.getElementById("idElegir")
    objLista.innerHTML = "";

    for(let artista of misistema.listaArtista){
        if(listaSelecionada.indexOf(artista.nombre)==-1)
        {
            let objOpcion=document.createElement("option");

            objOpcion.textContent=artista.nombre
            objOpcion.value = artista.nombre
            objLista.appendChild(objOpcion)
        }
    }
}
else{
    alert("Seleccione un artista")
}

}//Para retornar Como en El ejemplo usaba mi sistema aca usar ListaSelecionada