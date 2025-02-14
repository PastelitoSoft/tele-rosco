
const rueda = document.getElementById("rosco-rueda");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");
const textoModal = document.getElementById("texto-modal");
const letraModal = document.getElementById("letra-modal");
const contenedor = document.getElementById('contenedor');
const fondo = document.getElementById('fondo');
const sonidoRuleta = document.getElementById('sonido-ruleta');
const tada = document.getElementById('tada');

const abecedario = [
    { letra: "A", valor: "Palabras que acompañan el verbo y que indican cómo, cuándo o dónde se realiza una acción." },
    { letra: "B", valor: "Asiento largo que puede encontrarse en plazas. También es un establecimiento donde se realizan operaciones con dinero." },
    { letra: "C", valor: "Signo de puntuación que se usa en la enumeración. También es una forma del verbo 'comer'." },
    { letra: "D", valor: "Adverbio de tiempo que indica que algo sucederá más tarde." },
    { letra: "E", valor: "Adverbio de lugar que indica que algo está en una posición superior a otra cosa." },
    { letra: "F", valor: "Adverbio de modo derivado de 'feliz'." },
    { letra: "G", valor: "Felino doméstico. También es una herramienta para levantar objetos de mucho peso, como un auto." },
    { letra: "H", valor: "Planta pequeña que crece en un terreno. Si se cambia una letra, se obtiene una de las formas del verbo 'hervir'." },
    { letra: "I", valor: "Adverbio de modo derivado de 'igual'." },
    { letra: "J", valor: "Lugar donde se cultivan plantas y flores. También es una etapa de la educación anterior a la primaria." },
    { letra: "K", valor: "Fruta de cáscara marrón y pulpa verde. También es un ave no voladora, pequeña y con pico largo y filoso." },
    { letra: "L", valor: "Clase de adverbios que indican dónde se realiza una acción." },
    { letra: "M", valor: "Clase de adverbios que indican cómo se realiza una acción." },
    { letra: "N", valor: "Ninguna cosa. También es una forma del verbo 'nadar'." },
    { letra: "Ñ", valor: "Contiene Ñ. Parte del día entre el amanecer y el mediodía. También es el día que sigue a hoy." },
    { letra: "O", valor: "Onda que se forma en la superficie del mar. Si se agrega una H al inicio, se forma una palabra que se utiliza para saludar." },
    { letra: "P", valor: "Máxima autoridad de la Iglesia católica. También es un tubérculo comestible, que puede ser blanco o negro." },
    { letra: "Q", valor: "Contiene Q. Adverbio que indica que algo se realiza en este lugar." },
    { letra: "R", valor: "Corriente natural de agua. También es una forma del verbo 'reír'." },
    { letra: "S", valor: "Estrella central del sistema planetario en el que se encuentra la Tierra. También es una nota musical." },
    { letra: "T", valor: "Clase de adverbios que indican cuándo se realiza una acción." },
    { letra: "U", valor: "Adverbio de modo derivado de 'único'." },
    { letra: "V", valor: "Elemento de cera que se usa para alumbrar. También es la pieza de lona que recibe el viento y ayuda a impulsar un barco o velero." },
    { letra: "W", valor: "Conexión inalámbrica para acceder a internet." },
    { letra: "X", valor: "Contiene X. Adverbio de modo derivado de 'próximo'." },
    { letra: "Y", valor: "Contiene Y. Adverbio de tiempo que refiere al día anterior a hoy." },
    { letra: "Z", valor: "Contiene Z. Parte de la planta que está bajo tierra. También es la parte que se repite en las palabras de la misma familia." }
];



/*document.addEventListener("DOMContentLoaded", function () {
    const letras = document.querySelectorAll(".letra");
    const totalLetras = letras.length;

    letras.forEach((letra, index) => {
        const angulo = (index / totalLetras) * 360; // Divide el círculo en partes iguales
        letra.style.transform = `rotate(${angulo}deg) translate(230px) rotate(-${angulo}deg)`;
    });
});*/

document.addEventListener("DOMContentLoaded", function () {
    const letras = document.querySelectorAll(".letra");
    const totalLetras = letras.length;

    function posicionarLetras() {
        const esPantallaPequena = window.innerWidth < 540;
        const radio = esPantallaPequena ? 160 : 230; // Ajusta el radio según el tamaño de la pantalla

        letras.forEach((letra, index) => {
            const angulo = (index / totalLetras) * 360; // Divide el círculo en partes iguales
            letra.style.transform = `rotate(${angulo}deg) translate(${radio}px) rotate(-${angulo}deg)`;

        });
    }

    posicionarLetras(); // Ejecutar al cargar

});

rueda.addEventListener("click", function () {
    if (abecedario.length === 0) {
        letraModal.innerText = "";
        textoModal.innerText = "No quedan letras disponibles. Reinicia el juego.";
        closeButton.innerText = "Reiniciar";
        closeButton.addEventListener("click", () => location.reload());
        return;
    }

    rueda.classList.add("girar");
    sonidoRuleta.play();

    rueda.style.pointerEvents = "none";

    const indice = Math.floor(Math.random() * abecedario.length);
    const letraSeleccionada = abecedario[indice];
    abecedario.splice(indice, 1);

    rueda.addEventListener("animationend", function mostrarModal() {

        const elementoSeleccionado = document.getElementById(letraSeleccionada.letra);

        if (elementoSeleccionado) {
            elementoSeleccionado.classList.add("resaltar");
        }

        console.log("Elemento seleccionado:", elementoSeleccionado);

        rueda.classList.remove("girar");
        rueda.style.pointerEvents = "auto";

        setTimeout(() => {
            tada.play();

            letraModal.innerText = letraSeleccionada.letra;
            textoModal.innerText = letraSeleccionada.valor;
            contenedor.classList.add("blur");
            fondo.classList.add("blur");
            modal.style.display = "flex";
            rueda.removeEventListener("animationend", mostrarModal);

        }, 1200);


    });
});




closeButton.addEventListener("click", function () {
    // Aplicar la animación de cierre

    modal.style.animation = "modal-disappear 0.3s ease-in-out forwards";

    // Esperar que termine la animación antes de cerrar el modal
    setTimeout(() => {
        // Limpiar el contenido del modal
        letraModal.innerText = '';
        textoModal.innerText = '';

        // Remover el fondo blur
        contenedor.classList.remove("blur");
        fondo.classList.remove("blur");

        // Ocultar el modal después de la animación
        modal.style.display = "none";

        // Resetear la animación para la próxima vez
        modal.style.animation = "";
    }, 300); // Duración de la animación (0.3s)
});


