// Todas nuestras cotizaciones
const quotes = [
    'Una vez descartado lo imposible, lo que queda, por improbable que parezca, debe ser la verdad.',
    'No hay nada más engañoso que un hecho obvio.',
    'Debería saber a estas alturas que cuando un hecho parece oponerse a una larga serie de deducciones, invariablemente resulta ser capaz de soportar alguna otra interpretación.',
    'Nunca hago excepciones. Una excepción confirma la regla.',
    'Lo que un hombre puede inventar, otro lo puede descubrir.',
    'Nada aclara tanto un caso como contárselo a otra persona.',
    'La educación nunca termina, Watson. Es una serie de lecciones, con la más grande para el final.',
];
// Almacenar la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let words = [];
let wordIndex = 0;
// El inicio del tiempo
let startTime = Date.now();
// Elementos de página
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


document.getElementById('start').addEventListener('click', () => {
    // Obtenga una cotización
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Pon la cita en una variedad de palabras
    words = quote.split(' ');
    // Restablecer el índice de Word para el seguimiento
    wordIndex = 0;
  
    // Actualizaciones de la interfaz de usuario

    // Crear una matriz de elementos span para que podamos establecer una clase
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convertir en cadena y establecer como innerHTML en la visualización de comillas
    quoteElement.innerHTML = spanWords.join('');
    // Resalta la primera palabra
    quoteElement.childNodes[0].className = 'highlight';
    // Borrar cualquier mensaje anterior
    messageElement.innerText = '';
  
    // Configurar el cuadro de texto

    // Borrar el cuadro de texto
    typedValueElement.value = '';
    // Establecer enfoque
    typedValueElement.focus();
    // Establecer el controlador de eventos
  
    // Iniciar el temporizador
    startTime = new Date().getTime();
  });

  typedValueElement.addEventListener('input', () => {
    // Obtener la palabra actual
    const currentWord = words[wordIndex];
    // Obtener el valor actual
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // Fin de la frase
      // Mostrar suseso
      const elapsedTime = new Date().getTime() - startTime;
      const message = `¡FELICIDADES! terminaste de escribir la cita en ${elapsedTime / 1000} segundos.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // Fin de la palabra
      // borrar typedValueElement para la nueva palabra
      typedValueElement.value = '';
      // Pasar a la siguiente palabra
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // Resalta la nueva palabra
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // Actualmente correcto
      // Resalta la siguiente palabra
      typedValueElement.className = '';
    } else {
      // Estado de error
      typedValueElement.className = 'error';
    }
  });