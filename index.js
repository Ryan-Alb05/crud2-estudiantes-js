import GestorEstudiantes from 'modules/GestorEstudiantes.js';


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log("\n--- Menú de Gestión de Estudiantes ---");
    console.log("1. Agregar Estudiante");
    console.log("2. Listar Estudiantes");
    console.log("3. Actualizar Estudiante");
    console.log("4. Eliminar Estudiante");
    console.log("5. Salir");
    readline.question("Seleccione una opción: ", (opcion) => {
        manejarOpcion(opcion);
    });
}

function manejarOpcion(opcion) {
    switch (opcion) {
        case '1':
            readline.question("Nombre: ", (nombre) => {
                readline.question("Edad: ", (edad) => {
                    readline.question("Nivel: ", (nivel) => {
                        GestorEstudiantes.agregarEstudiante(nombre, edad, nivel);
                        mostrarMenu();
                    });
                });
            });
            break;
        case '2':
            GestorEstudiantes.listarEstudiantes();
            mostrarMenu();
            break;
        case '3':
            readline.question("ID del estudiante a actualizar: ", (id) => {
                readline.question("Nuevo Nombre: ", (nombre) => {
                    readline.question("Nueva Edad: ", (edad) => {
                        readline.question("Nuevo Nivel: ", (nivel) => {
                            GestorEstudiantes.actualizarEstudiante(id, nombre, edad, nivel);
                            mostrarMenu();
                        });
                    });
                });
            });
            break;
        case '4':
            readline.question("ID del estudiante a eliminar: ", (id) => {
                GestorEstudiantes.eliminarEstudiante(id);
                mostrarMenu();
            });
            break;
        case '5':
            console.log("Saliendo...");
            readline.close();
            break;
        default:
            console.log("Opción no válida. Intente de nuevo.");
            mostrarMenu();
            break;
    }
}

mostrarMenu();