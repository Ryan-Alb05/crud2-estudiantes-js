import crearEstudiante from "./Estudiante.js";
import fs from "fs";

const GestorEstudiantes = (() => {
    let estudiantes = {};

    const cargarEstudiantesDesdeJSON = () => {
        try {
            const data = fs.readFileSync("./Estudiantes.json", "utf8");
            const estudiantesJSON = JSON.parse(data);
            
            estudiantesJSON.forEach(est => {
                agregarEstudiante(est.nombre, est.edad, est.area, est.calificaciones);
            });
            
            console.log("✅ Estudiantes precargados desde JSON correctamente.");
        } catch (error) {
            console.error("⚠️ Error al cargar el archivo JSON:", error.message);
        }
    };

    const agregarEstudiante = (nombre, edad, area, calificaciones) => {
        if (!calificaciones.Matematicas || !calificaciones.Naturales || !calificaciones.Sociales || !calificaciones.Espanol) {
            console.log("Error: Debe proporcionar calificaciones para todas las materias básicas.");
            return;
        }
        const estudiante = crearEstudiante(nombre, edad, area, calificaciones);
        estudiantes[estudiante.id] = estudiante;
        console.log(`Estudiante agregado: ${estudiante.nombre}`);
    };

    const listarEstudiantes = () => {
        return Object.values(estudiantes).map(est => ({
            ID: est.id,
            Nombre: est.nombre,
            Edad: est.edad,
            Área: est.area,
            Matemáticas: est.calificaciones?.Matematicas || "N/A",
            Naturales: est.calificaciones?.Naturales || "N/A",
            Sociales: est.calificaciones?.Sociales || "N/A",
            Español: est.calificaciones?.Espanol || "N/A"
        }));
    };

    const buscarEstudiante = (criterio) => {
        return Object.values(estudiantes).find(est => est.id === criterio || est.nombre.toLowerCase() === criterio.toLowerCase()) || "Estudiante no encontrado";
    };

    const actualizarEstudiante = (id, nombre, edad, area, calificaciones) => {
        if (!estudiantes[id]) {
            console.log("⚠️ Estudiante no encontrado.");
            return;
        }
        
        const estudiante = estudiantes[id];
        estudiante.nombre = nombre || estudiante.nombre;
        estudiante.edad = edad ? parseInt(edad) : estudiante.edad;
        estudiante.area = area || estudiante.area;
        estudiante.calificaciones = {
            Matematicas: calificaciones?.Matematicas ?? estudiante.calificaciones.Matematicas,
            Naturales: calificaciones?.Naturales ?? estudiante.calificaciones.Naturales,
            Sociales: calificaciones?.Sociales ?? estudiante.calificaciones.Sociales,
            Espanol: calificaciones?.Espanol ?? estudiante.calificaciones.Espanol
        };
        console.log(`✅ Estudiante ${nombre} actualizado correctamente.`);
    };

    const eliminarEstudiante = (id) => {
        if (!estudiantes[id]) {
            console.log("⚠️ Estudiante no encontrado.");
            return;
        }
        delete estudiantes[id];
        console.log(`✅ Estudiante con ID ${id} eliminado correctamente.`);
    };


    cargarEstudiantesDesdeJSON();

    return {
        agregarEstudiante,
        listarEstudiantes,
        buscarEstudiante,
        actualizarEstudiante,
        eliminarEstudiante
    };
})();

export default GestorEstudiantes;
