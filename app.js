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

listaTarea.addEventListener("click", (e) => {
  btnAccion(e);
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
  //Mensaje de Tareas no pendientes
  if (Object.values(tareas).length === 0) {
    listaTarea.innerHTML = ` 
  <div class="alert alert-dark text-center">
  No hay tareas pendientes 😍
  </div>`;
    return;
  }

  //Para que la lista no se duplique debe de partir de cero (limpiar el DOM)
  listaTarea.innerHTML = "";
  Object.values(tareas).forEach((tarea) => {
    //**** Muy IMPORTANTE clonar antes de modificar el template ****/
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;

    if (tarea.estado) {
      //Cambiar el fondo de la tarea hecha
      clone
        .querySelector(".alert")
        .classList.replace("alert-warning", "alert-primary");
      //Sustituir el botón check por la rueda
      clone
        .querySelectorAll(".fas")[0]
        .classList.replace("fa-check-circle", "fa-undo-alt");

      //Tachar la tarea hecha
      clone.querySelector("p").style.textDecoration = "Line-through";
    }

    clone.querySelectorAll(".fas")[0].dataset.id = tarea.id;
    clone.querySelectorAll(".fas")[1].dataset.id = tarea.id;
    fragment.appendChild(clone);
  });
  listaTarea.appendChild(fragment);
};

const btnAccion = (e) => {
  if (e.target.classList.contains("fa-check-circle")) {
    //Cambiar el estado de las tareas a hecha
    tareas[e.target.dataset.id].estado = true;
    pintarTareas();
  }
  //Eliminar tarea
  if (e.target.classList.contains("fa-minus-circle")) {
    delete tareas[e.target.dataset.id];
    pintarTareas();
  }

  //Sustituir el botón de la rueda por el botón check
  if (e.target.classList.contains("fa-undo-alt")) {
    tareas[e.target.dataset.id].estado = false;
    pintarTareas();
  }

  e.stopPropagation();
};
