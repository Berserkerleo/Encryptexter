// Constantes para las claves de encriptación
const ENCRYPT_KEYS = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Función general para procesar el texto (encriptar o desencriptar)
function procesarTexto(isEncrypt) {
    // Obtener elementos del DOM
    const inputElement = document.getElementById("encryptInput");
    const tituloResultado = document.getElementById("resultTitle");
    const parrafoResultado = document.getElementById("resultParagraph");
    const imagenResultado = document.getElementById("resultImage");

    // Obtener el texto ingresado y convertirlo a minúsculas
    const texto = inputElement.value.toLowerCase();

    // Verificar si se ingresó texto
    if (!texto) {
        mostrarError(tituloResultado, parrafoResultado, imagenResultado);
        return;
    }

    try {
        // Procesar el texto (encriptar o desencriptar)
        const textoProcessed = isEncrypt ? encriptar(texto) : desencriptar(texto);
        inputElement.value = textoProcessed;
        mostrarResultado(isEncrypt, tituloResultado, parrafoResultado, imagenResultado);
    } catch (error) {
        console.error('Error al procesar el texto:', error);
        swal("Error", "Hubo un problema al procesar el texto", "error");
    }
}

// Función para encriptar el texto
function encriptar(texto) {
    return texto.replace(/[eiaou]/g, letra => ENCRYPT_KEYS[letra]);
}

// Función para desencriptar el texto
function desencriptar(texto) {
    return texto.replace(new RegExp(Object.values(ENCRYPT_KEYS).join('|'), 'g'), 
        match => Object.keys(ENCRYPT_KEYS).find(key => ENCRYPT_KEYS[key] === match));
}

// Función para mostrar el resultado exitoso
function mostrarResultado(isEncrypt, titulo, parrafo, imagen) {
    titulo.textContent = `Texto ${isEncrypt ? 'encriptado' : 'desencriptado'} con éxito`;
    parrafo.textContent = "";
    imagen.src = `./assets/${isEncrypt ? 'exito' : 'desencriptado'}.png`;
    imagen.alt = `Imagen de ${isEncrypt ? 'encriptación' : 'desencriptación'} exitosa`;
}

// Función para mostrar un mensaje de error
function mostrarError(titulo, parrafo, imagen) {
    imagen.src = "./assets/NoFound.png";
    imagen.alt = "Imagen de error: no se encontró texto";
    titulo.textContent = "Parece que no hay nada aquí";
    parrafo.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    swal("Vaya!", "Debes ingresar un texto", "warning");
}

// Evento DOMContentLoaded para asegurar que el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Añadir event listeners a los botones
    document.querySelector('.encrypt-section__btn--encrypt').addEventListener('click', () => procesarTexto(true));
    document.querySelector('.encrypt-section__btn--decrypt').addEventListener('click', () => procesarTexto(false));
});