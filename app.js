const formulario = document.getElementById("formulario");
const input = document.getElementById("input");
const listaTarea = document.getElementById("lista-tarea");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

//Tareas por defecto
let tareas = {
  1606231033718: {
    id: 1606231033718,
    texto: "Tarea 1",
    estado: false,
  },
  1606231151976: {
    id: 1606231151976,
    texto: "Tarea 2",
    estado: false,
  },
};
//Local Storage de las tareas de defecto
document.addEventListener("DOMContentLoaded", () => {
  pintarTareas();
});

//Añadir la nueva tarea mediante el DOM
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  setTarea(e);
});

const setTarea = (e) => {
  //No agregar tarea vacía
  if (input.value.trim() === "") {
    console.log("debes escribir una tarea");
    return;
  }
  //Nuevas tareas con sus id
  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false,
  };

  tareas[tarea.id] = tarea;
  //Eliminar el texto de la nueva tarea en la zona del input
  formulario.reset();
  //Mantener efecto de focus en el input
  input.focus();

  pintarTareas();
};

const pintarTareas = () => {
  //Para que la lista no se duplique debe de partir de cero (limpiar el DOM)
  listaTarea.innerHTML = "";
  Object.values(tareas).forEach((tarea) => {
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;
    fragment.appendChild(clone);
  });
  listaTarea.appendChild(fragment);
};
