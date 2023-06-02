let jugadorPuntos = 0;
let computadoraPuntos = 0;
let maximoJuegos = 5;
let juegoIniciado = false; // Variable para controlar si el juego ha comenzado
let juegoFinalizado = false;

function jugar(eleccionUsuario) {
  if (juegoFinalizado) {
    return;
  }

  if (!juegoIniciado) { // Verificar si el juego ha comenzado
    juegoIniciado = true; // Marcar el juego como iniciado
    document.getElementById('reiniciar-juego').style.display = 'inline-block'; // Mostrar el botón "Reiniciar Juego"
  }

  let opciones = ['piedra', 'papel', 'tijeras'];
  let eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];

  let resultado = determinarResultado(eleccionUsuario, eleccionComputadora);

  let resultadoTexto = `Elegiste: ${eleccionUsuario}.<br>
                            La computadora eligió: ${eleccionComputadora}.<br>
                            ${resultado}`;

  document.getElementById('resultado').innerHTML = resultadoTexto;

  actualizarMarcador(resultado);
}

function determinarResultado(eleccionUsuario, eleccionComputadora) {
  if (eleccionUsuario === eleccionComputadora) {
    return 'Es un empate. No sumaste puntos.';
  }

  if ((eleccionUsuario === 'piedra' && eleccionComputadora === 'tijeras') ||
    (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
    (eleccionUsuario === 'tijeras' && eleccionComputadora === 'papel')) {
    jugadorPuntos++;
    if (jugadorPuntos === maximoJuegos) {
      finalizarJuego('jugador');
    }
    return '¡Ganaste!';
  }

  computadoraPuntos++;
  if (computadoraPuntos === maximoJuegos) {
    finalizarJuego('computadora');
  }
  return '¡Perdiste! Inténtalo de nuevo.';
}

function actualizarMarcador(resultado) {
  document.getElementById('jugador-puntos').textContent = jugadorPuntos;
  document.getElementById('computadora-puntos').textContent = computadoraPuntos;

  if (resultado === 'Es un empate.') {
    document.getElementById('marcador').className = 'empate';
  } else {
    document.getElementById('marcador').className = '';
  }
}

function finalizarJuego(ganador) {
  juegoFinalizado = true;

  let resultadoFinal = '';

  if (ganador === 'jugador') {
    resultadoFinal = '¡Has ganado el juego!';
  } else {
    resultadoFinal = 'La computadora ha ganado el juego.';
  }

  document.getElementById('resultado').innerHTML = resultadoFinal;

  let buttons = document.getElementsByClassName('icon-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function reiniciarJuego() {
  jugadorPuntos = 0;
  computadoraPuntos = 0;
  juegoFinalizado = false;
  juegoIniciado = false; // Marcar el juego como no iniciado
  document.getElementById('reiniciar-juego').style.display = 'none'; // Ocultar el botón "Reiniciar Juego"

  document.getElementById('resultado').innerHTML = '';
  document.getElementById('jugador-puntos').textContent = '0';
  document.getElementById('computadora-puntos').textContent = '0';

  let buttons = document.getElementsByClassName('icon-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}
const btnReset = document.getElementById("reiniciar-juego");

btnReset.addEventListener("click", (event) => {
  event.preventDefault();
  reiniciarJuego();
});