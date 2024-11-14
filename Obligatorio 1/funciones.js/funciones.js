window.addEventListener("load",setup);
/*Comprobar funcionalidades*/
let misistema= new Sistema();

function setup(){
    document.getElementById("BotonColores").addEventListener("click",CambiarColor);
    document.getElementById("BotonAltaArtista").addEventListener("click",AltaArtistas);
    document.getElementById("BotonAltaExpocicion").addEventListener("click",AltaExpocicion);
    document.getElementById("BotonAltaComentario").addEventListener("click",AltaComentario);
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

function AltaArtistas(){
    let form=document.getElementById("RegistrarArtistaForm");
    if(form.reportValidity()){
        let Nombre = document.getElementById("idNombre").value;
        let Edad = document.getElementById("idEdad").value;
        let Caracteristicas=document.getElementById("idEstilo").value;
        if(misistema.existeArtista(Nombre)){
            alert("Ya Existe Este Artista")
        }else{
            misistema.agregarArtista(Nombre,Edad,Caracteristicas)
            alert("Alta Artistas")
               // ActualizarListaArtista();
                form.reset();
            }
        }
    }


function AltaExpocicion(){
    alert("Alta Expocicion")
}

function AltaComentario(){
    alert("Alta Comentario")
}
