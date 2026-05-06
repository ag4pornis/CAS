// ============================================
// CAS Experience Data
// Replace with your own experiences!
// ============================================

export const personalInfo = {
  name: "Tu Nombre",
  school: "Tu Colegio - IB Diploma Programme",
  year: "2025-2026",
  bio: "Estudiante del Bachillerato Internacional apasionado/a por el aprendizaje experiencial. A través de CAS he descubierto nuevas formas de expresión creativa, superado retos físicos y contribuido significativamente a mi comunidad.",
};

export const casDescription = {
  title: "¿Qué es CAS?",
  text: "Creatividad, Actividad y Servicio (CAS) es uno de los tres elementos troncales del Programa del Diploma del Bachillerato Internacional. CAS busca que los alumnos desarrollen su crecimiento personal a través de experiencias significativas fuera del ámbito académico.",
  strands: [
    {
      id: "creativity",
      name: "Creatividad",
      description:
        "Explorar ideas, arte y expresiones que involucren pensamiento creativo. Desde la música hasta el diseño, cada proyecto es una oportunidad para innovar.",
      color: "var(--creativity)",
    },
    {
      id: "activity",
      name: "Actividad",
      description:
        "Esfuerzo físico que contribuye a un estilo de vida saludable. Deportes, retos personales y actividades que sacan lo mejor de nosotros.",
      color: "var(--activity)",
    },
    {
      id: "service",
      name: "Servicio",
      description:
        "Compromiso colaborativo y recíproco con la comunidad. Acciones significativas que generan un impacto real en la vida de los demás.",
      color: "var(--service)",
    },
  ],
};

export const casProject = {
  title: "Proyecto CAS",
  subtitle: "Mi gran proyecto colaborativo",
  description:
    "El proyecto CAS es una actividad colaborativa de al menos un mes de duración que aborda una necesidad de la comunidad. Este proyecto representa el culmen de mi experiencia CAS, combinando creatividad, actividad y servicio en una iniciativa significativa.",
  details:
    "Aquí puedes describir tu proyecto CAS en detalle. ¿Cuál fue la necesidad que identificaste? ¿Cómo planificaste las etapas? ¿Qué desafíos enfrentaste? ¿Qué impacto tuvo en la comunidad?",
  timeline: [
    {
      phase: "Investigación",
      date: "Septiembre 2025",
      description: "Identificación de la necesidad y planificación inicial.",
    },
    {
      phase: "Planificación",
      date: "Octubre 2025",
      description: "Diseño del plan de acción y organización del equipo.",
    },
    {
      phase: "Ejecución",
      date: "Nov - Dic 2025",
      description: "Implementación del proyecto con la comunidad.",
    },
    {
      phase: "Reflexión",
      date: "Enero 2026",
      description: "Evaluación del impacto y reflexiones finales.",
    },
  ],
};

export const experiences = {
  creativity: [
    {
      id: "c1",
      title: "Taller de Pintura",
      date: "Octubre 2025",
      description:
        "Participé en un taller de pintura al óleo donde aprendí técnicas de composición y color. Descubrí una nueva forma de expresar mis emociones.",
      learningOutcomes: [1, 2, 4],
      reflection:
        "Esta experiencia me enseñó la importancia de la paciencia y la perseverancia en el proceso creativo.",
    },
    {
      id: "c2",
      title: "Composición Musical",
      date: "Noviembre 2025",
      description:
        "Compuse una pieza original para guitarra inspirada en paisajes sonoros naturales.",
      learningOutcomes: [1, 3, 4],
      reflection:
        "Aprendí a canalizar mis emociones a través de la música y a apreciar el proceso de creación.",
    },
    {
      id: "c3",
      title: "Diseño de Póster Benéfico",
      date: "Diciembre 2025",
      description:
        "Diseñé el póster promocional para un evento benéfico del colegio utilizando herramientas digitales.",
      learningOutcomes: [2, 5, 7],
      reflection:
        "Combinar creatividad con un propósito social fue muy gratificante.",
    },
  ],
  activity: [
    {
      id: "a1",
      title: "Media Maratón",
      date: "Noviembre 2025",
      description:
        "Entrené durante 3 meses para completar mi primera media maratón. Un reto de resistencia física y mental.",
      learningOutcomes: [1, 2, 4],
      reflection:
        "La disciplina del entrenamiento me enseñó que los límites son mentales.",
    },
    {
      id: "a2",
      title: "Escalada en Rocódromo",
      date: "Enero 2026",
      description:
        "Inicié clases de escalada deportiva, superando mi miedo a las alturas progresivamente.",
      learningOutcomes: [1, 2, 3],
      reflection:
        "Enfrentar miedos es un proceso gradual que requiere confianza en uno mismo.",
    },
    {
      id: "a3",
      title: "Liga de Fútbol Sala",
      date: "Sept 2025 - Presente",
      description:
        "Participación activa en la liga de fútbol sala del colegio, mejorando trabajo en equipo.",
      learningOutcomes: [3, 5, 6],
      reflection:
        "El deporte en equipo me ha enseñado el valor de la comunicación y el esfuerzo colectivo.",
    },
  ],
  service: [
    {
      id: "s1",
      title: "Clases de Apoyo",
      date: "Octubre 2025 - Presente",
      description:
        "Ofrezco clases de apoyo semanales de matemáticas a alumnos de cursos inferiores.",
      learningOutcomes: [3, 5, 6, 7],
      reflection:
        "Enseñar me ha ayudado a consolidar mis propios conocimientos y a desarrollar empatía.",
    },
    {
      id: "s2",
      title: "Banco de Alimentos",
      date: "Diciembre 2025",
      description:
        "Colaboré en la recogida y distribución de alimentos para familias necesitadas durante las fiestas.",
      learningOutcomes: [5, 6, 7],
      reflection:
        "Ver el impacto directo de nuestro trabajo en las familias fue profundamente conmovedor.",
    },
    {
      id: "s3",
      title: "Limpieza de Playa",
      date: "Febrero 2026",
      description:
        "Organicé una jornada de limpieza de playa con compañeros del colegio, recogiendo más de 50 kg de residuos.",
      learningOutcomes: [3, 5, 6, 7],
      reflection:
        "La responsabilidad medioambiental es un deber de todos. Pequeñas acciones generan grandes cambios.",
    },
  ],
};

export const learningOutcomes = [
  {
    id: 1,
    name: "Identificar fortalezas y áreas de crecimiento",
    short: "Fortalezas",
  },
  { id: 2, name: "Demostrar que se han afrontado desafíos", short: "Desafíos" },
  {
    id: 3,
    name: "Demostrar cómo iniciar y planificar una experiencia",
    short: "Planificación",
  },
  {
    id: 4,
    name: "Mostrar compromiso y perseverancia",
    short: "Perseverancia",
  },
  {
    id: 5,
    name: "Demostrar habilidades de trabajo colaborativo",
    short: "Colaboración",
  },
  {
    id: 6,
    name: "Demostrar compromiso con cuestiones de importancia global",
    short: "Impacto Global",
  },
  {
    id: 7,
    name: "Reconocer y considerar el aspecto ético de las decisiones",
    short: "Ética",
  },
];
