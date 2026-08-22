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
  images: [
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&auto=format&fit=crop&q=80"
  ],
  timeline: [
    {
      phase: "Investigación",
      date: "Septiembre 2025",
      description: "Identificación de la necesidad en el centro de día y planificación inicial.",
      details: "El primer paso fue contactar con los responsables del centro de día para conocer sus necesidades. Realizamos visitas semanales durante todo septiembre, entrevistando a residentes y personal para entender qué tipo de espacio verde necesitaban. Investigamos técnicas de huerto urbano accesible, bancales elevados para sillas de ruedas y sistemas de riego por goteo de bajo mantenimiento. También estudiamos experiencias similares en otros barrios para extraer buenas prácticas.",
      reflection: "Esta fase me enseñó la importancia de escuchar antes de actuar. Pensé que sabía lo que la gente necesitaba, pero las conversaciones con los mayores cambiaron completamente mi perspectiva. Aprendí a hacer preguntas abiertas y a documentar necesidades reales en vez de asumir.",
      images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&auto=format&fit=crop&q=80"],
      learningOutcomes: [1, 3],
      diary: [
        { date: "3 Sept 2025", title: "Primera visita al centro", content: "Hoy fuimos por primera vez al centro de día. Nos recibió la directora, Doña Lucía, y nos paseó por las instalaciones. El patio trasero estaba vacío — solo tierra y unas macetas rotas. Un grupo de residentes se acercó a vernos con curiosidad. Doña Carmen me preguntó si sabíamos de jardinería. Le dije que no, pero que estábamos dispuestos a aprender." },
        { date: "12 Sept 2025", title: "Entrevistas con residentes", content: "Volvimos con un cuestionario preparado. Hablamos con ocho residentes durante una hora. La mayoría quería un espacio al aire libre donde sentarse, pero también había interés en plantar cosas. Don Manuel, que fue agricultor, nos contó técnicas tradicionales de siembra que nunca habíamos oído." },
        { date: "22 Sept 2025", title: "Investigación de técnicas", content: "Pasamos la tarde investigando bancales elevados accesibles para sillas de ruedas. Encontramos un diseño que permitía regular la altura. También estudiamos sistemas de riego por goteo de bajo mantenimiento. Tomamos notas detalladas para la fase de planificación." },
      ],
    },
    {
      phase: "Planificación",
      date: "Octubre 2025",
      description: "Diseño de los bancales elevados y organización de las comisiones de trabajo.",
      details: "Con la información recopilada, diseñamos un plano del patio del centro con ocho bancales elevados a diferentes alturas. Organizamos al grupo en comisiones: jardinería, construcción, comunicación y logística. Elaboramos un presupuesto detallado y solicitamos donaciones de materiales a empresas locales. Crearon un cronograma semanal con tareas asignadas y un sistema de comunicación por grupo de mensajería.",
      reflection: "Planificar en equipo fue un reto enorme. Tuvimos desacuerdos sobre el diseño de los bancales y tuvimos que aprender a negociar y encontrar soluciones de compromiso. Descubrí que una buena planificación ahorra muchísimo tiempo después, pero que también hay que ser flexible cuando las cosas no salen como se esperaba.",
      images: [
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1000&auto=format&fit=crop&q=80"
      ],
      learningOutcomes: [1, 3, 5],
      diary: [
        { date: "5 Oct 2025", title: "Diseño de bancales", content: "Trazamos el plano del patio con ocho bancales elevados a tres alturas diferentes: 40cm, 60cm y 80cm para adaptarnos a residentes sentados, de pie y en silla de ruedas. Cada banco tendrá 1.20m de largo por 0.60m de profundidad." },
        { date: "19 Oct 2025", title: "Organización de comisiones", content: "Repartimos los roles: jardinería (sembrar y cuidar las plantas), construcción (armar los bancales), comunicación (redes sociales y carteles) y logística (materiales y transporte). Yo quedé en construcción con tres compañeros." },
        { date: "28 Oct 2025", title: "Presupuesto finalizado", content: "Presentamos el presupuesto al colegio: 320 euros en madera reciclada, tornillos y tierra. Las empresas del barrio ofrecieron donar las herramientas. El director aprobó todo en una tarde." },
      ],
    },
    {
      phase: "Ejecución",
      date: "Nov - Dic 2025",
      description: "Construcción, siembra inicial y talleres intergeneracionales semanales.",
      details: "Durante dos meses, trabajamos cada sábado construyendo los bancales con madera reciclada y sembrando hortalizas, hierbas aromáticas y flores. Los residentes participaron activamente en la siembra y nos enseñaron trucos de jardinería que llevaban décadas practicando. Organizamos talleres semanales de cocina con las hierbas cosechadas y sesiones de fotografía del huerto. El sistema de riego se instaló en la tercera semana y funcionó correctamente desde el primer día.",
      reflection: "Los sábados en el huerto se convirtieron en lo mejor de mi semana. Ver cómo los bancales pasaban de ser planos de madera a jardines llenos de vida fue mágico. Los momentos más significativos fueron las conversaciones con Doña Carmen mientras plantábamos tomates — me contó su infancia en el campo y me enseñó que la jardinería es mucho más que poner tierra en una maceta.",
      images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&auto=format&fit=crop&q=80"],
      learningOutcomes: [1, 2, 4, 5],
      diary: [
        { date: "2 Nov 2025", title: "Primera jornada de construccion", content: "Llegamos a las 9 de la manana con la madera y las herramientas. Don Manuel nos ayudo a cortar las tablas con una sierra manual. Montamos los dos primeros bancales antes del mediodia. Los residentes nos trajo zumo y galletas." },
        { date: "16 Nov 2025", title: "Siembra con los residentes", content: "Dona Carmen nos enseno a plantar tomates, albahaca y lavanda. Cada residente eligio que queria plantar en su bancale. Dona Pilar, que nunca habia jardinado, planto sus primeras fresas con una emocion que nos contagio a todos." },
        { date: "7 Dic 2025", title: "Instalacion del riego", content: "El sistema de goteo quedo instalado en toda la zona. Funciono desde el primer dia. Los residentes estaban asombrados de ver como el agua llegaba sola a cada planta. Organizamos el primer taller de cocina con la albahaca que ya habia crecido." },
        { date: "21 Dic 2025", title: "Sesion de fotos del huerto", content: "Organizamos una sesion de fotografia documental del huerto para mostrar el antes y el despues. Las fotos quedaron preciosas: los bancales llenos de verduras, los sonrisas de los mayores, las manos en la tierra." },
      ],
    },
    {
      phase: "Reflexión",
      date: "Enero 2026",
      description: "Evaluación del impacto social y reflexiones sobre el aprendizaje colaborativo.",
      details: "En la fase final, recopilamos feedback de los residentes, el personal y los propios participantes mediante entrevistas y encuestas. El huerto generó un cambio visible en el bienestar de los residentes: aumento de actividad física, más interacción social y mejor estado de ánimo. Creamos un informe de impacto social y una presentación para el colegio. También dejamos un plan de mantenimiento permanente con un grupo de voluntarios del colegio.",
      reflection: "Esta fase me hizo darme cuenta de que el verdadero éxito no se mide en kilos de tomates, sino en las sonrisas que generaste. El proyecto me transformó: pasé de ver el servicio como una obligación a entenderlo como una oportunidad genuina de conectar con otros. Aprendí que liderar no es mandar, sino crear las condiciones para que cada persona pueda aportar lo mejor de sí.",
      images: ["https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&auto=format&fit=crop&q=80"],
      learningOutcomes: [1, 2, 4, 6, 7],
      diary: [
        { date: "11 Ene 2026", title: "Encuesta de impacto", content: "Recogimos feedback de 12 residentes y 5 miembros del personal mediante entrevistas personales. El 90% dijo que su estado de animo habia mejorado desde que empezo el huerto. Dona Carmen nos regalo un ramo de lavanda seca." },
        { date: "25 Ene 2026", title: "Presentacion al colegio", content: "Explicamos el proyecto ante 200 alumnos y profesores en el acto del trimestre. Proyectamos un video con el antes y el despues del patio. Muchos alumnos se ofrecieron como voluntarios para el proximo trimestre." },
      ],
    },
    {
      phase: "Demonstración",
      date: "Febrero 2026",
      description: "Difusion de resultados, exposicion fotografia y handed-over al grupo de voluntarios.",
      details: "Organizamos una exposicion fotografica en el hall del colegio con 30 fotos del proceso, desde la primera visita hasta el huerto en plena produccion. Creamos un video documental de 5 minutos y lo publicamos en las redes del colegio. Realizamos una sesion de transferencia con el nuevo grupo de voluntarios, entregando un manual de mantenimiento y el cronograma de riego. El centro de dia firmo un compromiso de conservacion a largo plazo.",
      reflection: "Compartir los resultados fue tan gratificante como el proyecto mismo. Ver la exposicion llena de gente que se acercaba a contarnos lo inspirador que les parecia nuestro trabajo me hizo sentir que el esfuerzo habia valido la pena. Entregar el huerto a los voluntarios fue un acto de confianza: aprendi que liderar tambien es saber soltar.",
      images: ["https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&auto=format&fit=crop&q=80"],
      learningOutcomes: [1, 2, 4, 5, 6, 7],
      diary: [
        { date: "3 Feb 2026", title: "Montaje de la exposicion", content: "Seleccionamos 30 fotos del proyecto y las imprimimos en formato grande. Colgamos cada foto con una breve descripcion del momento que capturaba. El hall del colegio se transformo en una galeria temporal." },
        { date: "14 Feb 2026", title: "Inauguracion y transferencia", content: "Vinieron residentes, familias, profesores y el grupo nuevo de voluntarios. Dona Carmen hizo un pequeno discurso que nos dejo a todos sin palabras. Luego pasamos el testigo oficialmente al grupo de voluntarios, entregandoles el manual que habiamos preparado." },
      ],
    },
  ],
  globalReflection: "A lo largo de estos dos anos, CAS me ha transformado de maneras que no imaginaba. Al principio veia las actividades como obligaciones aparte de mis estudios, pero poco a poco descubri que eran las experiencias que mas me definieron. La pintura me enseno paciencia, la media maraton me enseno que los limites son mentales, y las clases de matematicas me enseno que ensenar es la mejor manera de aprender. El proyecto del huerto fue el punto de inflexion: deje de ver el servicio como algo que se hace por otros para entenderlo como algo que haces contigo mismo, en conexion con los demas. CAS me enseno que crecer no esta en los libros, sino en las conversaciones con Dona Manuel, en los sabajos de siembra, en las derrotas en la cancha y en las noches componiendo musica. Mi mayor aprendizaje es que la vida real no se mide en notas, sino en las personas que tocas y en las experiencias que te cambian por dentro.",
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
      images: [
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578926078693-4eb3d4499e44?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1000&auto=format&fit=crop&q=80"
      ],
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
      images: ["https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1502224562085-639556652f33?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80"],
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
      images: ["https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1000&auto=format&fit=crop&q=80"],
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
