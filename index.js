import readline from 'readline';
import GestorEstudiantes from './modules/GestorEstudiantes.js';


const rl = readline.createInterface({
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
    rl.question("Seleccione una opción: ", (opcion) => {
        manejarOpcion(opcion);
    });
}

function manejarOpcion(opcion) {
    switch (opcion) {
        case '1':
            rl.question("Nombre: ", (nombre) => {
                rl.question("Edad: ", (edad) => {
                    rl.question("Nivel: ", (nivel) => {
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
            rl.question("ID del estudiante a actualizar: ", (id) => {
                rl.question("Nuevo Nombre: ", (nombre) => {
                    rl.question("Nueva Edad: ", (edad) => {
                        rl.question("Nuevo Nivel: ", (nivel) => {
                            GestorEstudiantes.actualizarEstudiante(id, nombre, edad, nivel);
                            mostrarMenu();
                        });
                    });
                });
            });
            break;
        case '4':
            rl.question("ID del estudiante a eliminar: ", (id) => {
                GestorEstudiantes.eliminarEstudiante(id);
                mostrarMenu();
            });
            break;
        case '5':
            console.log("Saliendo...");
            rl.close();
            break;
        default:
            console.log("Opción no válida. Intente de nuevo.");
            mostrarMenu();
            break;
    }
}

mostrarMenu();