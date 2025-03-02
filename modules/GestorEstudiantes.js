import {crearEstudiante } from 'modules/Estudiante.js';

const GestorEstudiantes = (() => {
    const estudiantes = {};

    const agregarEstudiante = (nombre, edad, nivel) => {
        const estudiante = crearEstudiante(nombre, edad, nivel);
        estudiantes[estudiante.id] = estudiante;
        console.log(`Estudiante agregado: ${estudiante.nombre}`);
    };

    const listarEstudiantes = () => {
        console.log("Lista de Estudiantes:");
        for (let id in estudiantes) {
            const estudiante = estudiantes[id];
            console.log(`ID: ${estudiante.id}, Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Nivel: ${estudiante.nivel}`);
        }
    };

    const actualizarEstudiante = (id, nombre, edad, nivel) => {
        if (estudiantes[id]) {
            estudiantes[id].nombre = nombre;
            estudiantes[id].edad = edad;
            estudiantes[id].nivel = nivel;
            console.log(`Estudiante actualizado: ${nombre}`);
        } else {
            console.log(`Estudiante con ID ${id} no encontrado.`);
        }
    };

    const eliminarEstudiante = (id) => {
        if (estudiantes[id]) {
            delete estudiantes[id];
            console.log(`Estudiante con ID ${id} eliminado.`);
        } else {
            console.log(`Estudiante con ID ${id} no encontrado.`);
        }
    };

    return {
        agregarEstudiante,
        listarEstudiantes,
        actualizarEstudiante,
        eliminarEstudiante
    };
})();

export default GestorEstudiantes;
