const formulario = document.getElementById("formulario");
const input = document.getElementById("input");
const listaTarea = document.getElementById("lista-tarea");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
let tareas = {};


//Añadir la nueva tarea mediante el DOM

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
});
