import estudiantes from "./Estudiante.js";

// 1️⃣ Listado de Estudiantes
export const listarEstudiantes = () => {
  return estudiantes.map(est => ({
      nombre: est.nombre,
      id: est.id,
      área: est.área
  }));
};

// 2️⃣ Búsqueda de Estudiante por Nombre o ID
export const buscarEstudiante = (criterio) => {
  return estudiantes.find(est => est.id === criterio || est.nombre === criterio) || null;
};

// 3️⃣ Promedio de Calificaciones por Estudiante
export const calcularPromedioPorEstudiante = () => {
  return estudiantes.map(est => {
      const calificaciones = Object.values(est.calificaciones);
      const promedio = calificaciones.reduce((acc, nota) => acc + nota, 0) / calificaciones.length;
      return { nombre: est.nombre, promedio: parseFloat(promedio.toFixed(2)), área: est.área };
  });
};

// 4️⃣ Listado de Estudiantes con Promedio Mayor a un Umbral
export const estudiantesConPromedioMayorA = (umbral) => {
  return calcularPromedioPorEstudiante().filter(est => est.promedio > umbral);
};

// 5️⃣Aprobados y Reprobados por Materia
export const aprobadosYReprobadosPorMateria = (materia, umbral = 60) => {
  return estudiantes.reduce((res, est) => {
      const calificacion = est.calificaciones[materia];
      if (calificacion !== undefined) {
          if (calificacion >= umbral) {
              res.aprobados.push({ nombre: est.nombre, calificación: calificacion, área: est.área });
          } else {
              res.reprobados.push({ nombre: est.nombre, calificación: calificacion, área: est.área });
          }
      }
      return res;
  }, { aprobados: [], reprobados: [] });
};

// 6️⃣ Calcular Promedio General del Grupo
export const calcularPromedioGeneral = () => {
    const totalPromedios = calcularPromedioPorEstudiante().reduce((acc, est) => acc + est.promedio, 0);
    return estudiantes.length ? parseFloat((totalPromedios / estudiantes.length).toFixed(2)) : 0;
};

// 7️⃣ Promedio General por Área de Estudio
export const promedioGeneralPorAreaDeEstudio = () => {
  const promedios = estudiantes.reduce((areas, est) => {
      const promedio = calcularPromedioPorEstudiante().find(e => e.nombre === est.nombre).promedio;
      if (!areas[est.área]) {
          areas[est.área] = { total: 0, cantidad: 0 };
      }
      areas[est.área].total += promedio;
      areas[est.área].cantidad++;
      return areas;
  }, {});

  return Object.keys(promedios).map(area => ({
      área: area,
      "Promedio General": parseFloat((promedios[area].total / promedios[area].cantidad).toFixed(2))
  }));
};


// 8️⃣ Distribución de Estudiantes por Área
export const distribucionEstudiantesPorArea = () => {
  return estudiantes.reduce((acc, est) => {
    if (!acc[est.área]) {
      acc[est.área] = [];
    }
    acc[est.área].push(est.nombre);
    return acc;
  }, {});
};


// 9️⃣ Promedio de Cada Materia por Área de Estudio
export const promedioPorMateriaYArea = () => {
  const materias = Object.keys(estudiantes[0].calificaciones);  // Obtener las materias
  return estudiantes.reduce((acc, est) => {
    materias.forEach(materia => {
      if (!acc[est.área]) {
        acc[est.área] = {};
      }
      if (!acc[est.área][materia]) {
        acc[est.área][materia] = { total: 0, cantidad: 0 };
      }
      acc[est.área][materia].total += est.calificaciones[materia];
      acc[est.área][materia].cantidad++;
    });
    return acc;
  }, {});
};

// 🔟 Mejores y Peores Estudiantes por Área
export const mejoresYPeoresPorArea = (estudiantes) => {
  const estudiantesOrdenadosPorArea = estudiantes.reduce((acc, est) => {
      const promedioEstudiante = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / 3;
      if (!acc[est.área]) {
          acc[est.área] = [];
      }
      acc[est.área].push({ nombre: est.nombre, promedio: promedioEstudiante, área: est.área });
      return acc;
  }, {});

  Object.keys(estudiantesOrdenadosPorArea).forEach(area => {
      estudiantesOrdenadosPorArea[area].sort((a, b) => b.promedio - a.promedio);
  });

  return Object.keys(estudiantesOrdenadosPorArea).reduce((acc, area) => {
      acc[area] = {
          mejores: estudiantesOrdenadosPorArea[area].slice(0, 2),
          peores: estudiantesOrdenadosPorArea[area].slice(-2)
      };
      return acc;
  }, {});
};

// 1️⃣1️⃣ Ranking de Estudiantes por Promedio
export const rankingPorPromedio = (estudiantes) => {
  return estudiantes.map(est => {
      const promedio = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / 3;
      return { ...est, promedio };
  }).sort((a, b) => b.promedio - a.promedio);
};

// 1️⃣2️⃣ Cantidad de Aprobados y Reprobados en la Clase
export const cantidadAprobadosYReprobados = (estudiantes) => {
  return estudiantes.reduce((acc, est) => {
      const promedio = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / 3;
      promedio >= 60 ? acc.aprobados++ : acc.reprobados++;
      return acc;
  }, { aprobados: 0, reprobados: 0 });
};

// 1️⃣3️⃣ Reporte de Rendimiento Académico
export const reporteDeRendimiento = (estudiantes) => {
  const totalEstudiantes = estudiantes.length;

  const calcularPromedio = (estudiante) => {
      const calificaciones = Object.values(estudiante.calificaciones);
      return calificaciones.reduce((sum, nota) => sum + nota, 0) / calificaciones.length;
  };

  const promedioGeneral = estudiantes.reduce((sum, est) => sum + calcularPromedio(est), 0) / totalEstudiantes;
  const mejoresEstudiantes = estudiantes.filter(est => calcularPromedio(est) > 85);
  const peoresEstudiantes = estudiantes.filter(est => calcularPromedio(est) < 60);

  return {
      totalEstudiantes,
      promedioGeneral,
      mejoresEstudiantes,
      peoresEstudiantes
  };
};

