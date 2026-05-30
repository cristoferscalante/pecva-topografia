export type ServiceDataEntry = {
  slug: string
  title: string
  shortDescription: string
  overview: string
  image: string
  iconKey:
    | "map"
    | "fileText"
    | "building2"
    | "droplets"
    | "waves"
    | "route"
    | "anchor"
    | "satellite"
    | "plane"
    | "users"
  color: "primary" | "secondary" | "accent"
  highlights: string[]
  deliverables: string[]
  idealFor: string[]
  process: string[]
  seoTitle: string
  seoDescription: string
  keywords: string[]
  relatedArticleSlugs: string[]
  specs: {
    equipment: string
    precision: string
    formats: string
    standards: string
  }
  faqs: {
    question: string
    answer: string
  }[]
}

export const servicesData: ServiceDataEntry[] = [
  {
    slug: "levantamiento-planimetrico-altimetrico",
    title: "Levantamiento planimétrico y altimétrico",
    shortDescription:
      "Captura precisa de coordenadas, cotas y detalles del terreno para proyectos de ingeniería, arquitectura y urbanismo.",
    overview:
      "Captura técnica integral del relieve y características físicas del terreno empleando estaciones digitales de medición láser y receptores GNSS de alta gama en modo RTK. Realizamos el control horizontal y vertical con amarre a la red del Instituto Geográfico Agustín Codazzi (IGAC) o mediante posicionamiento diferencial relativo, entregando representaciones topográficas fieles del relieve y los detalles del terreno.",
    image: "/images/services/levantamiento-planimetrico-altimetrico.png",
    iconKey: "map",
    color: "primary",
    highlights: ["Control horizontal y vertical", "Modelos de terreno", "Planos base para diseño"],
    deliverables: [
      "Plano topográfico digital completo (.DWG de AutoCAD y .PDF firmado)",
      "Cartera de coordenadas y cotas (.XLSX)",
      "Modelo Digital de Terreno en curvas de nivel cada 1m o 0.5m",
      "Informe técnico descriptivo con memoria de cálculo y fotos de campo"
    ],
    idealFor: [
      "Lotes y predios rurales para escrituración o diseño",
      "Implantación arquitectónica de precisión y obras civiles",
      "Estudios previos de factibilidad geométrica"
    ],
    process: [
      "Reconocimiento inicial y monumentación de bases en el predio",
      "Toma de datos con estación total y control geodésico GNSS RTK",
      "Procesamiento y modelamiento matemático en AutoCAD Civil 3D",
      "Control de calidad y entrega del plano técnico con firmas profesionales"
    ],
    seoTitle: "Levantamiento planimetrico y altimetrico en Colombia",
    seoDescription:
      "Servicio de levantamiento planimetrico y altimetrico con alta precision para proyectos de ingenieria, urbanismo y arquitectura en Colombia.",
    keywords: ["levantamiento planimetrico", "levantamiento altimetrico", "planos topograficos"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
    specs: {
      equipment: "Estación Total Láser (precisión de 1\"), Receptores GNSS RTK de doble frecuencia.",
      precision: "Planimétrica: ±1.5 cm | Altimétrica: ±2.0 cm con control diferencial.",
      formats: ".DWG, .DXF, .PDF, .XLSX (coordenadas).",
      standards: "Resolución 1499 del IGAC, Normas Técnicas Colombianas de topografía."
    },
    faqs: [
      {
        question: "¿Cuánto tiempo tarda la entrega del plano topográfico?",
        answer: "Depende del tamaño del terreno. Para lotes típicos de hasta 5 hectáreas, el trabajo de campo se realiza en 1 día y el plano final en AutoCAD Civil 3D se entrega en 2 a 3 días hábiles."
      },
      {
        question: "¿Qué equipos utilizan para garantizar la precisión?",
        answer: "Empleamos estaciones totales de precisión angular a 1\" de segundo con medición láser directa sin prisma, complementadas con antenas GNSS satelitales multibanda RTK de doble frecuencia."
      },
      {
        question: "¿Los planos topográficos vienen firmados por profesionales?",
        answer: "Sí, todos nuestros planos y carteras de campo son procesados y certificados con la firma de un Ingeniero Topógrafo matriculado y con licencia profesional vigente."
      }
    ]
  },
  {
    slug: "desenglobes-y-englobes",
    title: "Levantamientos para desenglobes y englobes",
    shortDescription:
      "Soporte técnico para subdivisión, englobe, escrituración y aclaración de áreas prediales con enfoque catastral y jurídico.",
    overview:
      "Soporte técnico y peritaje catastral especializado para la segregación (desenglobe) o unificación (englobe) de predios urbanos y rurales. Generamos planos individuales y globales con concordancia exacta entre las escrituras, las fichas catastrales y la realidad del terreno, asegurando el cumplimiento estricto con los requerimientos de notarías, oficinas de registro e IGAC.",
    image: "/images/services/desenglobes-y-englobes.png",
    iconKey: "fileText",
    color: "secondary",
    highlights: ["Cuadros de áreas y linderos", "Apoyo para escrituración", "Documentación técnica ordenada"],
    deliverables: [
      "Planos de desenglobe individuales con coordenadas oficiales (.DWG y .PDF)",
      "Memoria técnica descriptiva con cuadro de linderos y colindancias exactas",
      "Cartera de coordenadas por predio y colindantes (.XLSX)",
      "Certificado catastral de georreferenciación firmado"
    ],
    idealFor: [
      "Constructoras e inmobiliarias en subdivisiones urbanas o rurales",
      "Propietarios de suelo rural o urbano para escrituración catastral",
      "Procesos notariales de herencia, sucesiones y aclaración de linderos"
    ],
    process: [
      "Estudio preliminar de escrituras, linderos históricos y ficha catastral",
      "Medición rigurosa de los linderos reales en campo con GNSS",
      "Cálculo y ajuste de poligonales de precisión en oficina",
      "Elaboración de planos y memorias técnicas listas para trámites notariales"
    ],
    seoTitle: "Desenglobes y englobes con soporte topografico",
    seoDescription:
      "Levantamientos para desenglobes, englobes y aclaracion de areas con documentacion tecnica para tramites prediales y escrituracion.",
    keywords: ["desenglobe de predios", "englobe", "aclaracion de areas"],
    relatedArticleSlugs: ["guia-desenglobe-predios"],
    specs: {
      equipment: "GNSS RTK GPS de doble frecuencia, Estación total digital láser.",
      precision: "Posicionamiento centimétrico adaptado a regulaciones de linderos catastrales.",
      formats: ".DWG, .PDF, Informe técnico en .DOCX / .PDF.",
      standards: "Normativas catastrales de la Superintendencia de Notariado y Registro e IGAC."
    },
    faqs: [
      {
        question: "¿Qué requisitos necesito para tramitar un desenglobe predial?",
        answer: "Necesitará la escritura pública del predio mayor, el certificado de tradición y libertad vigente, la ficha catastral y, de forma obligatoria, el plano topográfico georreferenciado con las subdivisiones requeridas."
      },
      {
        question: "¿Sus planos son aptos para presentar ante notaría, registro e IGAC?",
        answer: "Sí, nuestros planos cumplen con todas las especificaciones de la Superintendencia de Notariado y Registro y del IGAC, garantizando que el trámite no tenga rechazos técnicos."
      },
      {
        question: "¿Cómo se calculan los linderos de cada subdivisión?",
        answer: "Se determinan con precisión centimétrica en campo usando GPS geodésico y se amarran al origen único nacional MAGNA-SIRGAS, definiendo un cuadro de áreas y rumbos exactos."
      }
    ]
  },
  {
    slug: "topografia-para-urbanismos",
    title: "Topografía para urbanismos",
    shortDescription:
      "Base topográfica para urbanizaciones, redes, zonas comunes, vías internas y fases de desarrollo de proyectos habitacionales o comerciales.",
    overview:
      "Planificación y control geométrico continuo en el desarrollo de proyectos urbanísticos, parcelaciones y redes viales urbanas. Aseguramos la implantación exacta de diseños arquitectónicos y de ingeniería en el terreno, controlando excavaciones, nivelación de terrazas, rasantes y la ubicación de infraestructuras comunes de manera ágil y milimétrica.",
    image: "/images/services/topografia-para-urbanismos.png",
    iconKey: "building2",
    color: "accent",
    highlights: ["Levantamiento de detalle urbano", "Apoyo a implantación", "Control para etapas de obra"],
    deliverables: [
      "Planos de replanteo y cotas de implantación urbanística (.DWG y .PDF)",
      "Informes técnicos de control geométrico y volumetría de tierras",
      "Monitoreo fotogramétrico de avances mediante vuelos periódicos",
      "Monolitos o mojones físicos de control materializados en obra"
    ],
    idealFor: [
      "Conjuntos residenciales y desarrollos urbanos masivos",
      "Parques industriales, bodegas y centros comerciales",
      "Arquitectos, diseñadores y calculistas estructurales"
    ],
    process: [
      "Cargue y validación geométrica de los planos de diseño arquitectónico",
      "Replanteo físico y estacado de ejes de obra en terreno",
      "Control continuo de niveles y rasantes durante el movimiento de tierras",
      "Verificación final (As-Built) de las estructuras construidas"
    ],
    seoTitle: "Topografia para urbanismos y desarrollos urbanos",
    seoDescription:
      "Estudios topograficos para urbanismos y desarrollos urbanos con informacion util para diseno, licenciamiento y construccion.",
    keywords: ["topografia para urbanismo", "levantamiento urbanistico", "topografia para conjuntos"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
    specs: {
      equipment: "Estación total digital de alta precisión, Niveles de ingeniero, Receptores GNSS RT.K.",
      precision: "Ejes y estructuras: ±3 mm | Rasantes de terrazas: ±10 mm.",
      formats: ".DWG, .XLSX (coordenadas de replanteo), .PDF.",
      standards: "Plan de Ordenamiento Territorial (POT) local, Manuales de diseño urbano."
    },
    faqs: [
      {
        question: "¿Con qué frecuencia se realiza el control topográfico en el urbanismo?",
        answer: "Se coordina según el ritmo de la obra. Típicamente se cuenta con una comisión de replanteo en fases críticas de excavación, movimiento de tierras y fundición de estructuras para asegurar tolerancias."
      },
      {
        question: "¿Qué tolerancias de error manejan en urbanizaciones residenciales?",
        answer: "Para ejes estructurales la tolerancia es de ±3 milímetros, y para nivelación de terrazas y rasantes es de ±10 milímetros, cumpliendo con los estándares de ingeniería más rigurosos."
      },
      {
        question: "¿Cómo apoyan el licenciamiento urbano?",
        answer: "Entregamos el plano base del terreno original con curvas de nivel detalladas y la implantación de diseños, el cual es el insumo principal exigido por curadurías y oficinas de planeación municipal."
      }
    ]
  },
  {
    slug: "topografia-redes-hidrosanitarias",
    title: "Topografía para redes hidrosanitarias",
    shortDescription:
      "Levantamientos especializados para redes de acueducto, alcantarillado, cajas, pozos y pendientes funcionales del sistema.",
    overview:
      "Levantamiento de alta precisión altimétrica para el diseño geométrico e instalación física de redes de alcantarillado, acueducto y tuberías industriales. Ponemos especial énfasis en la lectura de pendientes gravitacionales y la georreferenciación de pozos de inspección, cajas, cámaras y puntos de acometida, previniendo costosos reprocesos de flujo.",
    image: "/images/services/topografia-redes-hidrosanitarias.png",
    iconKey: "droplets",
    color: "primary",
    highlights: ["Lectura de pendientes", "Ubicación de estructuras", "Datos listos para diseño de redes"],
    deliverables: [
      "Perfiles longitudinales detallados con cotas de batea y clave (.DWG)",
      "Plano en planta de la red existente o proyectada con coordenadas georreferenciadas",
      "Fichas técnicas individuales de pozos de inspección y cajas catastrales",
      "Inventario digital (.XLSX) con cotas, profundidades y materiales"
    ],
    idealFor: [
      "Empresas constructoras de acueductos y saneamiento urbano",
      "Consorcios de alcantarillado y redes de servicios públicos",
      "Consultores de ingeniería hidráulica y sanitaria"
    ],
    process: [
      "Inspección, destape de pozos y cámaras para registrar cotas internas",
      "Levantamiento altimétrico de alta precisión con nivel geométrico",
      "Dibujo de perfiles técnicos longitudinales y cálculo de pendientes reales",
      "Generación de planos planta-perfil final georreferenciado"
    ],
    seoTitle: "Topografia para redes hidrosanitarias",
    seoDescription:
      "Topografia aplicada a redes hidrosanitarias para apoyar diseno, ampliacion y optimizacion de sistemas de acueducto y alcantarillado.",
    keywords: ["topografia redes hidrosanitarias", "levantamiento alcantarillado", "topografia acueducto"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
    specs: {
      equipment: "Nivel óptico digital de alta precisión, Estación total digital, Receptores GNSS.",
      precision: "Altimétrica (cotas de batea): ±3 mm en nivelación geométrica cerrada.",
      formats: ".DWG, .PDF, Perfiles en AutoCAD Civil 3D.",
      standards: "Reglamento Técnico del Sector de Agua Potable y Saneamiento Básico (RAS)."
    },
    faqs: [
      {
        question: "¿Por qué es crítica la altimetría en alcantarillados?",
        answer: "Las redes de alcantarillado funcionan por gravedad. Una desviación milimétrica en la pendiente (batea de tubería) puede ocasionar acumulación de sedimentos, reflujos y reprocesos sumamente costosos."
      },
      {
        question: "¿Qué entregables técnicos incluye este servicio?",
        answer: "Entregamos planos de planta georreferenciados, perfiles longitudinales con cotas de batea y clave, fichas detalladas de pozos de inspección y carteras digitales en formato DWG y Excel."
      },
      {
        question: "¿Cómo garantizan que la red fluya por gravedad?",
        answer: "Realizamos nivelaciones geométricas de precisión cerrada en campo con niveles automáticos digitales, garantizando un margen de error menor a ±3 milímetros en las cotas de flujo."
      }
    ]
  },
  {
    slug: "topografia-para-acueductos",
    title: "Topografía para acueductos",
    shortDescription:
      "Estudios topográficos para trazados, líneas de conducción, plantas, tanques y estructuras de abastecimiento de agua.",
    overview:
      "Estudios topográficos detallados para el trazado de líneas de conducción y aducción, tanques de almacenamiento, desarenadores y plantas de tratamiento. Capturamos perfiles longitudinales y secciones transversales minuciosas a lo largo de corredores de servidumbre para garantizar la viabilidad y precisión de los diseños hidráulicos.",
    image: "/images/services/topografia-para-acueductos.png",
    iconKey: "waves",
    color: "secondary",
    highlights: ["Corredores topográficos", "Control para estructuras", "Apoyo al diseño hidráulico"],
    deliverables: [
      "Plano de faja de servidumbre y corredor topográfico (.DWG)",
      "Perfiles longitudinales y secciones transversales cada 10m o 20m",
      "Coordenadas oficiales y memorias técnicas de los puntos de apoyo geodésico",
      "Informe fotográfico técnico de pasos especiales y cruces críticos"
    ],
    idealFor: [
      "Consorcios de ingeniería hidráulica y saneamiento rural",
      "Asociaciones de acueductos veredales y comunitarios",
      "Entidades gubernamentales de infraestructura rural y municipal"
    ],
    process: [
      "Diseño preliminar y exploración física del corredor en campo",
      "Establecimiento de mojones de control geodésico y poligonales secundarias",
      "Medición altimétrica de secciones y perfiles detallados del trayecto",
      "Procesamiento de perfiles y planta definitiva en Civil 3D"
    ],
    seoTitle: "Topografia para proyectos de acueducto",
    seoDescription:
      "Topografia para acueductos y sistemas de abastecimiento de agua con perfiles, corredores y control para estructuras.",
    keywords: ["topografia para acueductos", "corredores de conduccion", "perfil topografico de redes"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
    specs: {
      equipment: "Receptores GNSS RTK de doble frecuencia, Estación total láser de precisión.",
      precision: "Planimétrica: ±1.5 cm | Altimétrica en perfiles: ±1.0 cm.",
      formats: ".DWG, .PDF, Planos de perfil Civil 3D, Carteras XLSX.",
      standards: "Reglamento RAS, lineamientos de corporaciones autónomas regionales (CAR)."
    },
    faqs: [
      {
        question: "¿Qué es una faja de servidumbre y cómo la delimitan?",
        answer: "Es el corredor de terreno a lo largo del trazado de la tubería donde se restringen ciertas actividades. La delimitamos con coordenadas de precisión para legalizar el paso del acueducto con los propietarios colindantes."
      },
      {
        question: "¿Sus estudios sirven para viabilizar diseños hidráulicos?",
        answer: "Absolutamente. El perfil longitudinal y las secciones transversales cada 10 o 20 metros permiten a los ingenieros hidráulicos realizar el cálculo exacto de presiones y pérdidas de carga."
      },
      {
        question: "¿Cómo manejan terrenos escarpados o con bosque denso?",
        answer: "Empleamos una combinación de poligonales cerradas terrestres con estación total y fotogrametría aérea con drones para cubrir zonas inaccesibles sin perder precisión."
      }
    ]
  },
  {
    slug: "topografia-para-vias",
    title: "Topografía para vías",
    shortDescription:
      "Levantamientos, corredores, secciones y apoyo al replanteo de proyectos viales urbanos, rurales e industriales.",
    overview:
      "Servicio integral de topografía vial para el diseño geométrico, replanteo y control de avance de carreteras, vías rurales, patios industriales y accesos. Controlamos de forma rigurosa la geometría vial (alineamientos horizontales, curvas espirales, peraltes, alineamientos verticales, rasantes) y realizamos cubicaciones exactas de movimiento de tierras.",
    image: "/images/services/topografia-para-vias.png",
    iconKey: "route",
    color: "accent",
    highlights: ["Corredores y ejes", "Secciones transversales", "Control para movimiento de tierras"],
    deliverables: [
      "Modelo 3D del corredor vial (.DWG / Civil 3D)",
      "Planos de planta, perfiles longitudinales y secciones transversales",
      "Cálculos volumétricos detallados (corte y relleno) y diagrama de masas",
      "Carteras de coordenadas para replanteo de ejes, bordes y chaflanes"
    ],
    idealFor: [
      "Constructoras viales y de infraestructura en Colombia",
      "Interventorías viales y de obra civil general",
      "Propietarios que desarrollan patios de maniobra o accesos logísticos"
    ],
    process: [
      "Establecimiento de la poligonal de control vial de alta precisión",
      "Levantamiento de la sección original del terreno en faja vial",
      "Replanteo en campo de chaflanes, taludes, bermas y rasantes",
      "Control periódico y cálculo volumétrico mensual de los cortes y rellenos"
    ],
    seoTitle: "Topografia para vias y carreteras",
    seoDescription:
      "Servicio de topografia para vias y carreteras con corredores, perfiles y secciones para diseno y construccion.",
    keywords: ["topografia para vias", "levantamiento vial", "secciones topograficas"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
    specs: {
      equipment: "Estaciones totales de alta precisión, Receptores GNSS RTK, Drones fotogramétricos.",
      precision: "Replanteo de rasantes y ejes: ±5 mm | Cubicaciones volumétricas certificadas.",
      formats: ".DWG, .XML de Civil 3D, .XLSX (Volúmenes), .PDF.",
      standards: "Manuales de Diseño Geométrico de Vías del INVIAS (Colombia)."
    },
    faqs: [
      {
        question: "¿Qué es el replanteo de chaflanes y por qué es importante?",
        answer: "Es marcar físicamente en el terreno los límites donde inician los cortes y rellenos de tierra. Evita que las excavadoras remuevan más tierra de la proyectada, ahorrando costos significativos."
      },
      {
        question: "¿Cómo calculan el volumen de movimiento de tierras?",
        answer: "Comparamos el levantamiento original del terreno con el levantamiento del estado de avance mensual en AutoCAD Civil 3D, calculando volúmenes de corte y relleno mediante el método de áreas promedio."
      },
      {
        question: "¿Qué estándares viales nacionales cumplen?",
        answer: "Nos regimos de manera estricta por el Manual de Diseño Geométrico de Vías del INVIAS, asegurando que peraltes, radios de curvatura y rasantes cumplan con la normatividad colombiana."
      }
    ]
  },
  {
    slug: "batimetria",
    title: "Batimetría",
    shortDescription:
      "Medición de profundidades y configuración del fondo en cuerpos de agua para proyectos hidráulicos, ambientales y portuarios.",
    overview:
      "Estudios morfológicos y medición precisa de profundidades en cuerpos de agua (embalses, represas, lagunas, canales y ríos) mediante tecnología acústica de eco-sonda integrada a receptores GNSS RTK. Permite calcular con exactitud la capacidad de almacenamiento, tasas de sedimentación y configurar curvas de nivel del fondo para dragados e intervenciones ambientales.",
    image: "/images/services/batimetria.png",
    iconKey: "anchor",
    color: "primary",
    highlights: ["Perfiles del fondo", "Apoyo a dragado y mantenimiento", "Información para estudios ambientales"],
    deliverables: [
      "Plano batimétrico con curvas de nivel del fondo acuático (.DWG y .PDF)",
      "Modelos digitales del fondo (MDT acuático) y perfiles transversales",
      "Cálculo volumétrico de capacidad del embalse o volumen de sedimentos",
      "Reporte analítico de perfiles y profundidades de la zona estudiada"
    ],
    idealFor: [
      "Generadoras de energía hidroeléctrica y represas",
      "Corporaciones ambientales y estudios de impacto hídrico",
      "Contratistas de dragado y mantenimiento de embalses"
    ],
    process: [
      "Planificación de grilla de navegación e instalación de GNSS base terrestre",
      "Calibración e instalación del eco-sonar en el bote de batimetría",
      "Navegación capturando datos batimétricos y coordenadas RTK en tiempo real",
      "Procesamiento matemático de datos terrestres y acuáticos en Civil 3D"
    ],
    seoTitle: "Batimetria para estudios hidraulicos y ambientales",
    seoDescription:
      "Servicio de batimetria para cuerpos de agua con modelos de profundidad y soporte tecnico para proyectos hidraulicos y ambientales.",
    keywords: ["batimetria", "estudio de profundidades", "levantamiento en cuerpos de agua"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
    specs: {
      equipment: "Eco-sonda digital monohaz/multihaz, Embarcación equipada, GNSS RTK.",
      precision: "Precisión de profundidad: ±1.0 cm | Posicionamiento: ±1.5 cm.",
      formats: ".DWG, .PDF, Modelos de superficie 3D, Cartera de puntos X, Y, Z.",
      standards: "Lineamientos de la Organización Hidrográfica Internacional (OHI)."
    },
    faqs: [
      {
        question: "¿Hasta qué profundidad puede medir su equipo batimétrico?",
        answer: "Nuestras eco-sondas digitales de alta resolución pueden medir profundidades que van desde 30 centímetros hasta más de 100 metros en lagunas, canales y embalses."
      },
      {
        question: "¿Cómo relacionan las profundidades con las coordenadas terrestres?",
        answer: "La eco-sonda está sincronizada milimétricamente con un receptor GNSS RTK a bordo del bote, lo que asocia cada punto de profundidad con una coordenada X, Y y cota Z georreferenciada."
      },
      {
        question: "¿Para qué sirve medir la tasa de sedimentación?",
        answer: "Permite a las hidroeléctricas u operadores de represas calcular la pérdida de capacidad de almacenamiento útil a lo largo del tiempo y planificar dragados eficientes."
      }
    ]
  },
  {
    slug: "georreferenciacion-magna-sirgas",
    title: "Georreferenciación MAGNA-SIRGAS",
    shortDescription:
      "Materialización y vinculación de puntos de control al sistema de referencia oficial para dar trazabilidad a los proyectos.",
    overview:
      "Materialización, medición y cálculo geodésico de puntos de control de precisión, amarrados oficialmente a la Red Geodésica Nacional activa del Instituto Geográfico Agustín Codazzi (IGAC). Garantiza que toda la información cartográfica y catastral de su proyecto cuente con trazabilidad espacial absoluta y cumpla con las especificaciones técnicas exigidas por entes gubernamentales.",
    image: "/images/services/georreferenciacion-magna-sirgas.png",
    iconKey: "satellite",
    color: "secondary",
    highlights: ["Puntos de control geodésico", "Compatibilidad con normativa nacional", "Base para todas las demás actividades"],
    deliverables: [
      "Informe técnico geodésico detallado con memorias de cálculo y procesamiento diferencial",
      "Placas físicas en concreto materializadas con placa de bronce grabada",
      "Coordenadas elipsoidales, cartesianas y Gauss-Krüger oficiales",
      "Certificación legal firmada por ingeniero topógrafo matriculado"
    ],
    idealFor: [
      "Proyectos institucionales y licencias de construcción de gran escala",
      "Legalización y deslinde catastral de predios de gran extensión",
      "Base geodésica para proyectos viales y de acueductos"
    ],
    process: [
      "Planeación geométrica e instalación física de los monumentos o placas de concreto",
      "Captura de datos GNSS estático de doble frecuencia durante mínimo 2 a 4 horas",
      "Procesamiento de datos con software geodésico especializado utilizando datos de bases del IGAC",
      "Generación del informe técnico final con coordenadas oficiales y firmas"
    ],
    seoTitle: "Georreferenciacion MAGNA-SIRGAS en Colombia",
    seoDescription:
      "Servicio de georreferenciacion MAGNA-SIRGAS para proyectos que requieren puntos de control, trazabilidad y compatibilidad con la referencia oficial de Colombia.",
    keywords: ["magna sirgas", "georreferenciacion colombia", "puntos de control GNSS"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
    specs: {
      equipment: "Receptores GNSS Geodésicos de doble frecuencia (L1/L2) en trípode de precisión.",
      precision: "Precisión posicional absoluta de ±5 mm en procesamiento diferencial estático.",
      formats: "Informe en .PDF / .DOCX, archivos RINEX de datos crudos.",
      standards: "Resolución 1499 del IGAC, Sistema de Referencia Geocéntrico para las Américas (SIRGAS)."
    },
    faqs: [
      {
        question: "¿Qué significa amarrar un punto a la red oficial del IGAC?",
        answer: "Significa posicionar de forma satelital un mojón físico y vincularlo matemáticamente a las estaciones de rastreo permanente del IGAC, obteniendo una coordenada única nacional y legal."
      },
      {
        question: "¿Cuánto tiempo debe tomarse la lectura satelital en campo?",
        answer: "Para puntos geodésicos oficiales, el equipo GNSS de doble frecuencia debe rastrear satélites de forma estática y continua entre 2 y 4 horas según la distancia a la base del IGAC."
      },
      {
        question: "¿Este certificado me sirve para trámites jurídicos o catastrales?",
        answer: "Sí, entregamos un informe técnico detallado con memorias de cálculo, procesamiento diferencial y firma del ingeniero certificado, plenamente válido ante el IGAC, curadurías e instrumentos públicos."
      }
    ]
  },
  {
    slug: "fotogrametria-con-drones",
    title: "Fotogrametría con drones",
    shortDescription:
      "Levantamientos aéreos con UAV para ortofotos, nubes de puntos y modelos digitales en tiempos competitivos.",
    overview:
      "Captura rápida y masiva de información territorial mediante vuelos aéreos de sensores multiespectrales o RGB instalados en UAV (drones) de última tecnología. Generamos ortomosaicos ortorrectificados de alta resolución (píxel centimétrico) y densas nubes de puntos 3D para modelar extensas áreas de difícil acceso de manera ágil e ingeniería de detalle.",
    image: "/images/services/fotogrametria-con-drones.png",
    iconKey: "plane",
    color: "accent",
    highlights: ["Cobertura amplia en menos tiempo", "Ortomosaicos y modelos 3D", "Apoyo para seguimiento de obra"],
    deliverables: [
      "Ortomosaico georreferenciado de alta resolución (.TIF de píxel centimétrico)",
      "Modelo Digital de Terreno (MDT) y Modelo Digital de Superficie (MDS)",
      "Nube de puntos en formato .LAS / .LAZ",
      "Planos de curvas de nivel detalladas (.DWG) e informe técnico de vuelo"
    ],
    idealFor: [
      "Seguimiento de avance mensual en obras lineales e infraestructura",
      "Minería, canteras y control volumétrico de acopios",
      "Planificación territorial, estudios hidráulicos y agrícolas en Colombia"
    ],
    process: [
      "Planeación técnica del plan de vuelo autónomo y configuración de traslapes",
      "Instalación física y georreferenciación GNSS RTK de puntos de control terrestre (GCP)",
      "Ejecución autónoma del vuelo aéreo de captura fotográfica digital",
      "Procesamiento fotogramétrico en software especializado de alto rendimiento (Pix4D)"
    ],
    seoTitle: "Fotogrametria con drones para topografia",
    seoDescription:
      "Fotogrametria con drones para topografia, ortofotos y modelos digitales del terreno con alta eficiencia para grandes areas.",
    keywords: ["fotogrametria con drones", "topografia UAV", "ortofoto georreferenciada"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
    specs: {
      equipment: "Drones profesionales (multirrotor/ala fija), Receptores GNSS para control terrestre.",
      precision: "GSD (resolución de pixel): 1 a 3 cm/píxel | Precisión final del MDT: ±3.0 cm.",
      formats: ".TIF ortofoto, .LAS nube de puntos, .DWG curvas, .PDF.",
      standards: "Regulaciones de la Aeronáutica Civil de Colombia (RAC 91 / RAC 100)."
    },
    faqs: [
      {
        question: "¿Qué resolución visual (GSD) logran con sus vuelos de drones?",
        answer: "Logramos resoluciones altísimas de entre 1 y 3 centímetros por píxel (GSD), lo que permite apreciar detalles milimétricos imposibles de ver con imágenes satelitales convencionales."
      },
      {
        question: "¿Cómo garantizan la precisión métrica de las fotos del dron?",
        answer: "Instalamos puntos de control terrestre físicos (GCP) georreferenciados con GPS diferencial. Estos puntos se usan durante el procesamiento digital para ajustar las fotos y amarrarlas al suelo."
      },
      {
        question: "¿Los drones reemplazan por completo la topografía tradicional terrestre?",
        answer: "No. Son un complemento espectacular para grandes áreas, pero en zonas con bosque extremadamente espeso o para replanteos milimétricos en obra, la topografía terrestre sigue siendo indispensable."
      }
    ]
  },
  {
    slug: "comisiones-topograficas",
    title: "Comisiones topográficas",
    shortDescription:
      "Acompañamiento técnico en campo para constructoras, interventorías y equipos que requieren soporte topográfico confiable.",
    overview:
      "Acompañamiento, soporte e interventoría técnica permanente en campo para la ejecución de proyectos de construcción, excavaciones, obras civiles y viales. Proveemos comisiones topográficas completas (ingeniero topógrafo, cadeneros calificados, equipos de última tecnología y transporte) listas para integrarse al ritmo de trabajo de su obra civil.",
    image: "/images/services/comisiones-topograficas.png",
    iconKey: "users",
    color: "primary",
    highlights: ["Refuerzo operativo en campo", "Control diario de actividades", "Acompañamiento técnico especializado"],
    deliverables: [
      "Reportes técnicos de campo firmados diariamente con soportes",
      "Planos As-Built de las obras e hitos verificados geométricamente",
      "Registros de volumen excavado o vaciado en obra civil",
      "Monitoreo continuo de tolerancias geométricas y cotas"
    ],
    idealFor: [
      "Constructoras generales e interventorías técnicas de obra exigentes",
      "Frentes de obra lineales, túneles y cimentaciones de gran magnitud",
      "Contratistas de movimiento de tierras y excavaciones"
    ],
    process: [
      "Definición de alcances, jornadas e integración con el equipo de obra residente",
      "Medición diaria de niveles, rasantes, excavaciones y replanteo de ejes",
      "Procesamiento nocturno de carteras y dibujo de planos As-Built",
      "Entrega diaria/semanal de reportes técnicos detallados y planos actualizados"
    ],
    seoTitle: "Comisiones topograficas para proyectos de obra",
    seoDescription:
      "Comisiones topograficas y apoyo en campo para proyectos de obra, interventoria y control tecnico con personal especializado.",
    keywords: ["comisiones topograficas", "apoyo topografico en obra", "replanteo en campo"],
    relatedArticleSlugs: ["guia-desenglobe-predios"],
    specs: {
      equipment: "Estación total calibrada, Receptor GNSS RTK, Nivel óptico de precisión, Accesorios.",
      precision: "Control geométrico bajo estrictas tolerancias de planos estructurales.",
      formats: "Reportes diarios en .PDF, planos .DWG de control, carteras .XLSX.",
      standards: "Sistemas de Gestión de Calidad en Obra, normas de sismorresistencia (NSR-10)."
    },
    faqs: [
      {
        question: "¿Qué compone una comisión topográfica estándar?",
        answer: "Está integrada por un Ingeniero Topógrafo o Tecnólogo líder, auxiliares cadeneros calificados, estación total o GPS de alta gama calibrado, accesorios de medición y transporte de campo."
      },
      {
        question: "¿Cómo se reporta el trabajo y avance diario en obra?",
        answer: "Entregamos carteras de campo firmadas diariamente, reportes de volúmenes de obra civil controlados y planos As-Built en formato digital para que el residente de obra tenga control inmediato."
      },
      {
        question: "¿Sus equipos cuentan con certificados de calibración vigentes?",
        answer: "Sí, todos nuestros teodolitos, estaciones totales y niveles cuentan con certificados de calibración expedidos por laboratorios autorizados con una vigencia menor a 6 meses."
      }
    ]
  }
]

export const servicesDataBySlug = new Map(servicesData.map((service) => [service.slug, service]))
