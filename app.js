const ENCRYPT_KEYS = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function procesarTexto(isEncrypt) {
    const inputElement = document.getElementById("encryptInput");
    const tituloResultado = document.getElementById("resultTitle");
    const parrafoResultado = document.getElementById("resultParagraph");
    const imagenResultado = document.getElementById("resultImage");
    const copyButton = document.getElementById("copyButton");

    const texto = inputElement.value.toLowerCase();

    if (!texto) {
        mostrarError(tituloResultado, parrafoResultado, imagenResultado);
        copyButton.style.display = 'none';
        return;
    }

    try {
        const textoProcessed = isEncrypt ? encriptar(texto) : desencriptar(texto);
        inputElement.value = textoProcessed;
        mostrarResultado(isEncrypt, tituloResultado, parrafoResultado, imagenResultado);
        copyButton.style.display = 'block';
    } catch (error) {
        console.error('Error al procesar el texto:', error);
        alert("Error: Hubo un problema al procesar el texto");
        copyButton.style.display = 'none';
    }
}

function encriptar(texto) {
    return texto.replace(/[eiaou]/g, letra => ENCRYPT_KEYS[letra]);
}

function desencriptar(texto) {
    return texto.replace(new RegExp(Object.values(ENCRYPT_KEYS).join('|'), 'g'), 
        match => Object.keys(ENCRYPT_KEYS).find(key => ENCRYPT_KEYS[key] === match));
}

function mostrarResultado(isEncrypt, titulo, parrafo, imagen) {
    titulo.textContent = `Texto ${isEncrypt ? 'encriptado' : 'desencriptado'} con éxito`;
    parrafo.textContent = "";
    imagen.src = `./assets/${isEncrypt ? 'exito' : 'desencriptado'}.png`;
    imagen.alt = `Imagen de ${isEncrypt ? 'encriptación' : 'desencriptación'} exitosa`;
}

function mostrarError(titulo, parrafo, imagen) {
    imagen.src = "./assets/NoFound.png";
    imagen.alt = "Imagen de error: no se encontró texto";
    titulo.textContent = "Parece que no hay nada aquí";
    parrafo.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    alert("Vaya! Debes ingresar un texto");
}

function copiarTexto() {
    const inputElement = document.getElementById("encryptInput");
    inputElement.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    
    document.querySelector('.encrypt-section__btn--encrypt').addEventListener('click', () => procesarTexto(true));
    document.querySelector('.encrypt-section__btn--decrypt').addEventListener('click', () => procesarTexto(false));
    
    document.getElementById('copyButton').addEventListener('click', copiarTexto);
});