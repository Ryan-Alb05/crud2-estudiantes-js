let idCounter = 1;

function crearEstudiante(nombre, edad, nivel) {
    return {
        id: idCounter++,
        nombre: nombre,
        edad: edad,
        nivel: nivel
    };
}

export {crearEstudiante};