/* document.querySelectorAll: seleccionará todos los elementos del documento html que tengan una clase en específico. Ejemplo: .translate
   document.querySelector: Seleccionará un elemento del documento que tenga una clase o etiqueta en específico. Ejemplo: .shadow*/
const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector(".section-presentation-page");
// const section2 = document.querySelector(".section-activities");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

/*Obtenemos el alto del header y section*/
let header_height = header.offsetHeight;        /*con offsetHeight tomamos el alto de los elementos que esten dentro de la etiqueta header */
let section_height = section.offsetHeight;      /*Tomamos el alto de los elementos que esten dentro de la etiqueta section*/
// let section2_height = section2.offsetHeight;      /*Tomamos el alto de los elementos que esten dentro de la etiqueta section*/
console.log(section_height);


/*Evento que detecta cuando la página es scrolleada */
window.addEventListener('scroll', () => {
    /* Almacena el número de pixeles por el que se scrollea la página */
    let scroll = window.pageYOffset;
    
    /* Como scrolleamos la página, esta variable recibe la posición de la sección relativa para el viewport*/
    let sectionY = section.getBoundingClientRect();
    // let section2Y = section.getBoundingClientRect();
    
    /* Se hace una iteración para que por cada elemento, se recibe el valor del atributo data-speed*/
    translate.forEach(element => {
        let speed = element.dataset.speed;
        // console.log(speed);

        /*Finalmente movemos cada elemento basado en el resultado multiplicando el valor del scroll por la velocidad del valor */
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    /* Se hace otra iteración para añadir una opacidad a los elementos del contenedor de la presentación  */
    opacity.forEach(element => {
        element.style.opacity = scroll / ((sectionY.top) + section_height);
    })

    /* Modificamos el valor de la opacidad del título con una formula matemática que nos da un valor entre 0 y 1 basado en el valor del scroll.
    Esta modificación hara que el título desaparezca.*/
    big_title.style.opacity = - scroll / (header_height / 2) + 1;

    /*Esta modificación hace que la altura de la sombra incremente hacia arriba, cuando se scrollea la página hacia abajo. del mismo modo que el anterior se obtiene de una formula matemática */
    shadow.style.height = `${scroll * 0.5 + 300}px`;
    a(scroll, sectionY);
    // navbarFixed(scroll);
})

function a(scroll, sectionY) {
    if(scroll < 520){
        /*Esta modificación añade un ligero efecto al párrafo del contenido de la presentación con un efecto parallax.
        Si el usuario scrollea hacia abajo, el parrafo se mueve ligeramente hacia abajo hasta que se alinee correctamente */
        content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
        /*Esta modificación añade un ligero efecto a la imágen del contenido de la presentación con un efecto parallax.
        Si el usuario scrollea hacia abajo, la imágen se mueve ligeramente hacia arriba hasta que se alinee correctamente */
        image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;
        
        /*Se añade un efecto a la línea situada por debajo del título de la presentación */
        border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
    }
}