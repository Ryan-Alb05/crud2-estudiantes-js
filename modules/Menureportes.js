import readline from "readline";
import {
  listarEstudiantes,
  buscarEstudiante,
  calcularPromedioPorEstudiante,
  estudiantesConPromedioMayorA,
  aprobadosYReprobadosPorMateria,
  calcularPromedioGeneral,
  promedioGeneralPorAreaDeEstudio,
  distribucionEstudiantesPorArea,
  promedioPorMateriaYArea,
  mejoresYPeoresPorArea,
  rankingPorPromedio,
  cantidadAprobadosYReprobados,
  reporteDeRendimiento
} from "./reportes.js";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenuReportes() {
  console.log("\n📊 MENÚ DE REPORTES:");
  console.log("1️⃣ - Listar Estudiantes");
  console.log("2️⃣ - Buscar Estudiante por Nombre o ID");
  console.log("3️⃣ - Mostrar Promedios");
  console.log("4️⃣ - Estudiantes con Promedio Mayor a un Umbral");
  console.log("5️⃣ - Aprobados y Reprobados por Materia");
  console.log("6️⃣ - Promedio General del Grupo");
  console.log("7️⃣ - Promedio General por Área");
  console.log("8️⃣ - Distribución de Estudiantes por Área");
  console.log("9️⃣ - Promedio por Materia y Área");
  console.log("🔟 - Mejores y Peores Estudiantes por Área");
  console.log("1️⃣1️⃣ - Ranking de Estudiantes por Promedio");
  console.log("1️⃣2️⃣ - Cantidad de Aprobados y Reprobados");
  console.log("1️⃣3️⃣ - Reporte de Rendimiento");
  console.log("0️⃣ - Volver al Menú Principal");

  rl.question("Elige una opción: ", (opcion) => {
    manejarOpcion(opcion);
  });
}

const manejarOpcion = (opcion) => {
  switch (opcion) {
    case "1":
      console.table(listarEstudiantes());
      break;
    case "2":
      rl.question("🔍 Ingresa el ID o Nombre del estudiante: ", (criterio) => {
        const resultado = buscarEstudiante(isNaN(criterio) ? criterio : Number(criterio));
        console.table(resultado ? [resultado] : ["No encontrado"]);
        mostrarMenuReportes();
      });
      return;
    case "3":
      console.table(calcularPromedioPorEstudiante());
      break;
    case "4":
      rl.question("📈 Ingresa el umbral de promedio: ", (umbral) => {
        console.table(estudiantesConPromedioMayorA(Number(umbral)));
        mostrarMenuReportes();
      });
      return;
    case "5":
      rl.question("📚 Ingresa la materia: ", (materia) => {
        console.table(aprobadosYReprobadosPorMateria(materia));
        mostrarMenuReportes();
      });
      return;
    case "6":
      console.log("📊 Promedio General del Grupo:", calcularPromedioGeneral());
      break;
    case "7":
      console.table(promedioGeneralPorAreaDeEstudio());
      break;
    case "8":
      console.table(distribucionEstudiantesPorArea());
      break;
    case "9":
      console.table(promedioPorMateriaYArea());
      break;
    case "10":
      console.table(mejoresYPeoresPorArea());
      break;
    case "11":
      console.table(rankingPorPromedio());
      break;
    case "12":
      console.table(cantidadAprobadosYReprobados());
      break;
    case "13":
      console.table(reporteDeRendimiento());
      break;
    case "0":
      console.log("🔙 Volviendo al menú principal...");
      rl.close();
      return;
    default:
      console.log("❌ Opción no válida, intenta de nuevo.");
  }
  setTimeout(mostrarMenuReportes, 1000);
};

export default mostrarMenuReportes;
