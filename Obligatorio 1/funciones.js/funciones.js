window.addEventListener("load", () => {
    let botonColores = document.getElementById("idBotonColores");
    let colores = [A4D28C, rgb(152, 251, 152)]; // Colores en formato correcto
    let currentColorIndex = 0;

    botonColores.addEventListener("click", () => {
        document.body.style.backgroundColor = colores[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % 2; // Alterna entre 0 y 1
    });
});
