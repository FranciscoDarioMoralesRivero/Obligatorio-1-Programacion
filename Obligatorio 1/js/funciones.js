window.addEventListener("load",setup);
/*Comprobar funcionalidades*/
function setup(){
    document.getElementById("BotonColores").addEventListener("click",CambiarColor);
    document.getElementById("BotonAltaArtista").addEventListener("click",AltaArtistas);
    document.getElementById("BotonAltaExpocicion").addEventListener("click",AltaExpocicion);
    document.getElementById("BotonAltaComentario").addEventListener("click",AltaComentario);
}
function CambiarColor(){
    alert("Cambiar Color")
    
}

function AltaArtistas(){
    alert("Alta Artistas")
    let form=document.getElementById("RegistrarArtistaForm");
    if(form.reportValidity()){
        let Nombre = document.getElementById("idNombre").value;
        let Edad = document.getElementById("idEdad").value;
        let Caracteristicas=document.getElementById("idEstilo").value;
        if(misistema.ExisteArtista(Nombre)){
            alert("Ya Existe Este Artista")
        }else{
            misistema.AgregarArtista(new Nombre(Nombre,Edad,Caracteristicas)){
                actuali
            }
        }
    }
}

function AltaExpocicion(){
    alert("Alta Expocicion")
}

function AltaComentario(){
    alert("Alta Comentario")
}

function AlternarColorFondo(){
    let cambiado=false
    if (cambiado){
        document.getElementById
    }
}
