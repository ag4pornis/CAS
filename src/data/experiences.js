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
    "El proyecto CAS consistió en la creación de un huerto urbano comunitario en el centro de día de la tercera edad de nuestro barrio. Durante cuatro meses, colaboramos de forma directa con los residentes para diseñar bancales accesibles, sembrar hortalizas y plantas aromáticas, y establecer un sistema de riego sostenible. Esta iniciativa fomentó el intercambio intergeneracional, mejoró el bienestar físico y emocional de los mayores y creó una red de voluntariado permanente en nuestro colegio para mantener el espacio vivo.",
  image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&auto=format&fit=crop&q=80",
  timeline: [
    {
      phase: "Investigación",
      date: "Septiembre 2025",
      description: "Identificación de la necesidad en el centro de día y planificación inicial.",
      details: "El primer paso fue contactsr con los responsables del centro de día para conocer sus necesidades. Realizamos visitas semanales durante todo septiembre, entrevistando a residentes y personal para entender qué tipo de espacio verde necesitaban. Investigamos técnicas de huerto urbano accesible, bancales elevados para sillas de ruedas y sistemas de riego por goteo de bajo mantenimiento. También estudiamos experiencias similares en otros barrios para extraer buenas prácticas.",
      reflection: "Esta fase me enseñó la importancia de escuchar antes de actuar. Pensé que sabía lo que la gente necesitaba, pero las conversaciones con los mayores cambiaron completamente mi perspectiva. Aprendí a hacer preguntas abiertas y a documentar necesidades reales en vez de asumir.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&auto=format&fit=crop&q=80",
      learningOutcomes: [1, 3],
    },
    {
      phase: "Planificación",
      date: "Octubre 2025",
      description: "Diseño de los bancales elevados y organización de las comisiones de trabajo.",
      details: "Con la información recopilada, diseñamos un plano del patio del centro con ocho bancales elevados a diferentes alturas. Organizamos al grupo en comisiones: jardinería, construcción, comunicación y logística. Elaboramos un presupuesto detallado y solicitamos donaciones de materiales a empresas locales. Crearon un cronograma semanal con tareas asignadas y un sistema de comunicación por grupo de mensajería.",
      reflection: "Planificar en equipo fue un reto enorme. Tuvimos desacuerdos sobre el diseño de los bancales y tuvimos que aprender a negociar y encontrar soluciones de compromiso. Descubrí que una buena planificación ahorra muchísimo tiempo después, pero que también hay que ser flexible cuando las cosas no salen como se esperaba.",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1000&auto=format&fit=crop&q=80",
      learningOutcomes: [1, 3, 5],
    },
    {
      phase: "Ejecución",
      date: "Nov - Dic 2025",
      description: "Construcción, siembra inicial y talleres intergeneracionales semanales.",
      details: "Durante dos meses, trabajamos cada sábado construyendo los bancales con madera reciclada y sembrando hortalizas, hierbas aromáticas y flores. Los residentes participaron activamente en la siembra y nos enseñaron trucos de jardinería que llevaban décadas practicando. Organizamos talleres semanales de cocina con las hierbas cosechadas y sesiones de fotografía del huerto. El sistema de riego se instaló en la tercera semana y funcionó correctamente desde el primer día.",
      reflection: "Los sábados en el huerto se convirtieron en lo mejor de mi semana. Ver cómo los bancales pasaban de ser planos de madera a jardines llenos de vida fue mágico. Los momentos más significativos fueron las conversaciones con Doña Carmen mientras plantábamos tomates — me contó su infancia en el campo y me enseñó que la jardinería es mucho más que poner tierra en una maceta.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&auto=format&fit=crop&q=80",
      learningOutcomes: [1, 2, 4, 5],
    },
    {
      phase: "Reflexión",
      date: "Enero 2026",
      description: "Evaluación del impacto social y reflexiones sobre el aprendizaje colaborativo.",
      details: "En la fase final, recopilamos feedback de los residentes, el personal y los propios participantes mediante entrevistas y encuestas. El huerto generó un cambio visible en el bienestar de los residentes: aumento de actividad física, más interacción social y mejor estado de ánimo. Creamos un informe de impacto social y una presentación para el colegio. También dejamos un plan de mantenimiento permanente con un grupo de voluntarios del colegio.",
      reflection: "Esta fase me hizo darme cuenta de que el verdadero éxito no se mide en kilos de tomates, sino en las sonrisas que generaste. El proyecto me transformó: pasé de ver el servicio como una obligación a entenderlo como una oportunidad genuina de conectar con otros. Aprendí que liderar no es mandar, sino crear las condiciones para que cada persona pueda aportar lo mejor de sí.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&auto=format&fit=crop&q=80",
      learningOutcomes: [1, 2, 4, 6, 7],
    },
  ],
};

export const experiences = {
  creativity: [
    {
      id: "c1",
      title: "Taller de Pintura al Óleo",
      date: "Octubre 2025",
      description:
        "Participé en un taller de pintura al óleo donde aprendí técnicas de composición y color. Descubrí una nueva forma de expresar mis emociones.",
      details:
        "Durante este taller intensivo de cuatro semanas, me enfoqué en el uso de la espátula y la mezcla de pigmentos tradicionales. Aprendí a estructurar una pintura desde las primeras manchas de color base hasta los toques finales de luz. Cada sesión duraba tres horas y requería una inmensa concentración para capturar la atmósfera del modelo en vivo. Este reto me ayudó a desarrollar un ojo crítico para las proporciones y la luz.",
      learningOutcomes: [1, 2, 4],
      reflection:
        "Esta experiencia me enseñó la importancia de la paciencia y la perseverancia en el proceso creativo, descubriendo que los errores sobre el lienzo son oportunidades para cambiar de dirección.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "c2",
      title: "Composición Musical Digital",
      date: "Noviembre 2025",
      description:
        "Compuse una pieza original para guitarra inspirada en paisajes sonoros naturales.",
      details:
        "Compuse una pieza musical de tres minutos para guitarra acústica y sintetizadores atmosféricos. El proceso incluyó la escritura de la partitura inicial, la grabación multipista en un software de audio digital (DAW) y la posterior mezcla y masterización. Esta experiencia me desafió a comprender la estructura armónica y a perseverar en la edición de audio para lograr un acabado limpio.",
      learningOutcomes: [1, 3, 4],
      reflection:
        "Aprendí a canalizar mis emociones a través de la música y a apreciar el proceso de creación por encima del resultado técnico final, mejorando mis habilidades en el entorno digital.",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "c3",
      title: "Diseño de Póster Benéfico",
      date: "Diciembre 2025",
      description:
        "Diseñé el póster promocional para un evento benéfico del colegio utilizando herramientas digitales.",
      details:
        "Diseñé un cartel digital para la campaña anual de recolección de juguetes de nuestro colegio. Utilicé herramientas profesionales de diseño vectorial y composición de tipografía. Trabajé en estrecha colaboración con el departamento de comunicación social para asegurar que el mensaje fuera claro, cálido y efectivo para la comunidad escolar.",
      learningOutcomes: [2, 5, 7],
      reflection:
        "Combinar creatividad con un propósito social fue muy gratificante. Entender las necesidades de comunicación visual me ayudó a poner mi creatividad al servicio directo de los demás.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80",
    },
  ],
  activity: [
    {
      id: "a1",
      title: "Preparación Media Maratón",
      date: "Noviembre 2025",
      description:
        "Entrené durante 3 meses para completar mi primera media maratón. Un reto de resistencia física y mental.",
      details:
        "Establecí un plan de entrenamiento riguroso de 12 semanas, corriendo 4 veces por semana e incrementando la distancia progresivamente. Enfrenté el desafío físico de correr largas distancias y aprendí a escuchar a mi cuerpo para evitar lesiones. Completar la carrera de 21 km fue una experiencia increíble que demostró los resultados de la perseverancia.",
      learningOutcomes: [1, 2, 4],
      reflection:
        "La disciplina del entrenamiento me enseñó que los límites son fundamentalmente mentales y que la constancia diaria es el único camino para alcanzar objetivos ambiciosos.",
      image: "https://images.unsplash.com/photo-1502224562085-639556652f33?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "a2",
      title: "Escalada en Rocódromo",
      date: "Enero 2026",
      description:
        "Inicié clases de escalada deportiva, superando mi miedo a las alturas progresivamente.",
      details:
        "Asistí a sesiones de escalada deportiva de dificultad progresiva. Aprendí el uso correcto del arnés, las técnicas de aseguramiento del compañero (belaying) y la lectura previa de las rutas (vías) en la pared. Esta experiencia me exigió una gran fuerza de concentración y me ayudó a superar la barrera del miedo a las alturas.",
      learningOutcomes: [1, 2, 3],
      reflection:
        "Enfrentar miedos es un proceso gradual que requiere confianza en uno mismo y en el compañero que asegura la cuerda. Aprendí a centrarme en el siguiente movimiento, paso a paso.",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "a3",
      title: "Liga de Fútbol Sala Escolar",
      date: "Sept 2025 - Presente",
      description:
        "Participación activa en la liga de fútbol sala del colegio, mejorando trabajo en equipo.",
      details:
        "Participé como defensa y en ocasiones capitán de nuestro equipo en la liga escolar. Coordiné tácticas de juego defensivo y motivé al equipo en momentos difíciles del torneo. Aprendimos a aceptar las derrotas como oportunidades de mejora y a celebrar el progreso conjunto por encima de las individualidades.",
      learningOutcomes: [3, 5, 6],
      reflection:
        "El deporte en equipo me ha enseñado el valor de la comunicación, el esfuerzo colectivo y la lealtad competitiva. Liderar al equipo en la cancha me ayudó a crecer a nivel personal.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80",
    },
  ],
  service: [
    {
      id: "s1",
      title: "Clases de Apoyo de Matemáticas",
      date: "Octubre 2025 - Presente",
      description:
        "Ofrezco clases de apoyo semanales de matemáticas a alumnos de cursos inferiores.",
      details:
        "Impartí tutorías semanales de álgebra y geometría a estudiantes de secundaria inferior que presentaban dificultades en la asignatura. Preparé ejercicios prácticos y busqué metodologías dinámicas adaptadas al ritmo de cada alumno para hacer el aprendizaje accesible y ameno.",
      learningOutcomes: [3, 5, 6, 7],
      reflection:
        "Enseñar me ha ayudado a consolidar mis propios conocimientos y a desarrollar una profunda empatía. La satisfacción de ver a otros comprender un problema es inigualable.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "s2",
      title: "Voluntariado en Banco de Alimentos",
      date: "Diciembre 2025",
      description:
        "Colaboré en la recogida y distribución de alimentos para familias necesitadas durante las fiestas.",
      details:
        "Participé activamente durante los fines de semana de diciembre en la clasificación, embalaje y control de calidad de donaciones de alimentos no perecederos. Trabajé codo con codo con voluntarios de diversas edades y procedencias, logrando optimizar la línea de embalaje del centro de distribución.",
      learningOutcomes: [5, 6, 7],
      reflection:
        "Ver el impacto directo de nuestro trabajo en las familias beneficiadas fue profundamente conmovedor. Me concienció sobre la importancia de la logística social en proyectos de ayuda humanitaria.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "s3",
      title: "Limpieza Comunitaria de Playas",
      date: "Febrero 2026",
      description:
        "Organicé una jornada de limpieza de playa con compañeros del colegio, recogiendo más de 50 kg de residuos.",
      details:
        "Convocamos y organizamos a un grupo de 15 compañeros para retirar residuos plásticos e industriales de la playa local. Clasificamos los desechos para su correcto reciclaje y registramos los datos para contribuir al mapa estatal de contaminación costera, sensibilizando a los bañistas locales sobre la preservación marina.",
      learningOutcomes: [3, 5, 6, 7],
      reflection:
        "La responsabilidad medioambiental es un deber de todos. Ver la cantidad de microplásticos acumulados me impulsó a comprometerme de forma más activa en iniciativas ecológicas.",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1000&auto=format&fit=crop&q=80",
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
