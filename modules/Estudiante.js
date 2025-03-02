
let currentId = 1;

function crearEstudiante(nombre, edad, nivel) {
    return {
        id: currentId++,
        nombre: nombre,
        edad: edad,
        nivel: nivel
    };
}

export { crearEstudiante };