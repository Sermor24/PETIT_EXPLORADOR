// Array con el listado de canciones a mostrar en el reproductor
const canciones = [
  {
    nombre: "De Que Fa Gust La Lluna",
    archivo: "Conte1.mp3",
    imagen: "img/Conte_1.jpeg",
  },
  { nombre: "Peix Irisat", 
  archivo: "Conte2.mp3", 
  imagen: "img/Conte2.jpeg" 
  },
  { nombre: "La Vaca que va pondre un ou", 
  archivo: "Conte3.mp3", 
  imagen: "img/Conte__3.jpg" 
  },
];
var indiceActual = new Array(1);

// Función para crear mediante JavaScript el listado de canciones
function crearPlayList() {
  const listado = document.createElement("ol");
  listado.setAttribute("id", "listadoMusica");

  canciones.forEach((cancion, index) => {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(cancion.nombre));
    item.setAttribute("id", index);
    item.setAttribute("data-img", cancion.imagen); // Nuevo: agregar atributo data-img
    listado.appendChild(item);
  });

  return listado;
}
document.getElementById("playList").appendChild(crearPlayList());

var listadoMusica = document.getElementById("listadoMusica");
listadoMusica.onclick = (e) => {
  const itemClick = e.target;
  removeActive();
  itemClick.classList.add("active");
  reproduccionActual("Reproduint: " + canciones[itemClick.id].nombre);
  loadMusic(canciones[itemClick.id].archivo);
  updatePetitImage(itemClick.getAttribute("data-img")); // Nuevo: cargar la imagen correspondiente
  player.play();
  indiceActual[0] = e.target.id;
  classIconPlay();
};

// Función para cambiar la imagen de Petit
function updatePetitImage(imageSrc) {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = ""; // Limpiar el contenedor de imagen
  const newImage = document.createElement("img");
  newImage.src = imageSrc;
  newImage.alt = "Audiolibros Petit Explorador";
  imageContainer.appendChild(newImage);
}

// Función para cambiar el icono del reproductor
function classIconPlay() {
  var element = document.getElementById("iconPlay");
  element.classList.remove("fa-pause-circle");
  element.classList.add("fa-play-circle");
}
// Función para control del volumen
const volumen = document.getElementById("volumen");
volumen.oninput = (e) => {
  const vol = e.target.value;
  player.volume = vol;
};

// Función para actualizar la barra de progreso del reproductor
const updateProgress = () => {
  if (player.currentTime > 0) {
    const barra = document.getElementById("progress");
    barra.value = (player.currentTime / player.duration) * 100;

    var duracionSegundos = player.duration.toFixed(0);
    dura = secondsToString(duracionSegundos);
    var actualSegundos = player.currentTime.toFixed(0);
    actual = secondsToString(actualSegundos);

    duracion = actual + " / " + dura;
    document.getElementById("timer").innerText = duracion;
  }
  if (player.ended) {
    nextMusic(); // Reproducir la siguiente pista
  }
};

// Función para reproducir la próxima canción
function nextMusic() {
  const source = document.getElementById("source");
  var musicaActual = Number(indiceActual[0]);
  if (canciones.length == musicaActual + 1) {
    var siguiente = 0;
  } else {
    var siguiente = musicaActual + 1;
  }
  removeActive();
  var item = document.getElementById(siguiente);
  item.classList.add("active");
  loadMusic(canciones[siguiente].archivo);
  player.play();
  indiceActual[0] = siguiente;
  reproduccionActual("Reproduciendo: " + canciones[siguiente].nombre);
  classIconPlay();
}

// Función para reproducir la canción anterior
function prevMusic() {
  const source = document.getElementById("source");
  var musicaActual = Number(indiceActual[0]);
  if (musicaActual == 0) {
    var anterior = canciones.length - 1;
  } else {
    var anterior = musicaActual - 1;
  }
  removeActive();
  var item = document.getElementById(anterior);
  item.classList.add("active");
  loadMusic(canciones[anterior].archivo);
  player.play();
  indiceActual[0] = anterior;
  reproduccionActual("Reproduciendo: " + canciones[anterior].nombre);
  classIconPlay();
}

// Función para remover todas las clases CSS activas
function removeActive() {
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  return elems;
}

// Función para mostrar el nombre del archivo actual en reproducción
function reproduccionActual(texto) {
  document.getElementById("currentPlay").innerText = texto;
}

// Función para cargar las canciones en el reproductor
function loadMusic(ruta) {
  var source = document.getElementById("source");
  var folder = "audio"; // Carpeta donde tenemos almacenada la música
  source.src = folder + "/" + ruta;
  var index = (indiceActual[0] = canciones.findIndex(
    (cancion) => cancion.archivo === ruta
  ));
  removeActive();
  var item = document.getElementById(index);
  item.classList.add("active");
  reproduccionActual("Reproduciendo: " + canciones[index].nombre);
  player.load();
}

// Función para pausar o darle play
function togglePlay() {
  if (player.paused) {
    toggleIcon();
    return player.play();
  } else {
    toggleIcon();
    return player.pause();
  }
}

// Función para cambiar el icono play o pause
function toggleIcon() {
  var element = document.getElementById("iconPlay");
  element.classList.toggle("fa-pause-circle");
  element.classList.toggle("fa-play-circle");
}

// Función para permitir adelantar al hacer clic sobre la barra de progreso
progress.addEventListener("click", adelantar);
function adelantar(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

// Función para convertir segundos a minutos y horas
function secondsToString(seconds) {
  var hour = "";
  if (seconds > 3600) {
    hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    hour += ":";
  }
  var minute = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute;
  var second = seconds % 60;
  second = second < 10 ? "0" + second : second;
  return hour + minute + ":" + second;
}
loadMusic(canciones[0].archivo);
