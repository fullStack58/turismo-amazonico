const navbar = document.querySelector(".navbar");

let navBarCollapse = false;
let scroll = 0;
var threshold = 500; // Almacena el umbral (en píxeles) donde queremos activar el navbar fijo según el valor que nos de la variable anterior

/*Evento que detecta cuando la página es scrolleada */
window.addEventListener("scroll", () => {
    /* Almacena el número de pixeles por el que se scrollea la página */
    scroll = window.pageYOffset || window.scrollY;

    navbarFixed(scroll, threshold);
});

function navbarFixed(scroll, threshold) {
    // Si el scroll ha alcanzado el umbral, se añade la clase 'fixed' de (styles.css) al elemento (.navbar) que lo almacena la constante (const navbar).
    if (scroll > threshold || navBarCollapse) {
        navbar.style.cssText =
            "transition:background 0.2s ease-in-out; position:fixed; z-index: 101; padding:20px; background: rgba(0, 0, 0, 0.79); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(7.5px); -webkit-backdrop-filter: blur(7.5px);";
    } else if (scroll < threshold) {
        navbar.style.cssText =
            "transition:background 0.2s ease-in-out; position: absolute; top: 0; left: 0; width: 100%; padding:20px; z-index: 100; background-color: transparent;";
    }
}

// Debe verificar que el DOM se halla cargado que son los elementos de la pagina
document.addEventListener("DOMContentLoaded", () => {
    const navbarCollapse = document.querySelector("#navbarID");

    navbarCollapse.addEventListener("shown.bs.collapse", () => {
        navBarCollapse = true;
        navbarFixed(scroll, threshold);
    });

    navbarCollapse.addEventListener("hidden.bs.collapse", () => {
        navBarCollapse = false;
        navbarFixed(scroll, threshold);
    });
});
