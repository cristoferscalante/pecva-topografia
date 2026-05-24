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
}

export const servicesData: ServiceDataEntry[] = [
  {
    slug: "levantamiento-planimetrico-altimetrico",
    title: "Levantamiento planimetrico y altimetrico",
    shortDescription:
      "Captura precisa de coordenadas, cotas y detalles del terreno para proyectos de ingenieria, arquitectura y urbanismo.",
    overview:
      "Desarrollamos levantamientos topograficos con equipos GNSS, estacion total y control de campo para entregar informacion confiable desde la etapa de prefactibilidad hasta la ejecucion de obra.",
    image: "/illustrations/field-crew.svg",
    iconKey: "map",
    color: "primary",
    highlights: ["Control horizontal y vertical", "Modelos de terreno", "Planos base para diseno"],
    deliverables: ["Plano topografico georreferenciado", "Curvas de nivel y MDT", "Cartera de coordenadas y cotas"],
    idealFor: ["Lotes y predios rurales", "Implantacion arquitectonica", "Estudios previos de ingenieria"],
    process: ["Reconocimiento del area", "Levantamiento con control de precision", "Procesamiento y entrega tecnica"],
    seoTitle: "Levantamiento planimetrico y altimetrico en Colombia",
    seoDescription:
      "Servicio de levantamiento planimetrico y altimetrico con alta precision para proyectos de ingenieria, urbanismo y arquitectura en Colombia.",
    keywords: ["levantamiento planimetrico", "levantamiento altimetrico", "planos topograficos"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
  },
  {
    slug: "desenglobes-y-englobes",
    title: "Levantamientos para desenglobes y englobes",
    shortDescription:
      "Soporte tecnico para subdivision, englobe, escrituracion y aclaracion de areas prediales con enfoque catastral y juridico.",
    overview:
      "Integramos trabajo de campo, revision documental y cuadros de areas para facilitar tramites prediales con informacion clara, verificable y consistente con la normativa aplicable.",
    image: "/illustrations/planning-team.svg",
    iconKey: "fileText",
    color: "secondary",
    highlights: ["Cuadros de areas y linderos", "Apoyo para escrituracion", "Documentacion tecnica ordenada"],
    deliverables: ["Plano de desenglobe o englobe", "Memoria tecnica de areas", "Cartera de coordenadas por predio"],
    idealFor: ["Constructoras", "Propietarios de suelo", "Procesos notariales y catastrales"],
    process: ["Analisis predial", "Levantamiento y verificacion de linderos", "Planos y soporte documental final"],
    seoTitle: "Desenglobes y englobes con soporte topografico",
    seoDescription:
      "Levantamientos para desenglobes, englobes y aclaracion de areas con documentacion tecnica para tramites prediales y escrituracion.",
    keywords: ["desenglobe de predios", "englobe", "aclaracion de areas"],
    relatedArticleSlugs: ["guia-desenglobe-predios"],
  },
  {
    slug: "topografia-para-urbanismos",
    title: "Topografia para urbanismos",
    shortDescription:
      "Base topografica para urbanizaciones, redes, zonas comunes, vias internas y fases de desarrollo de proyectos habitacionales o comerciales.",
    overview:
      "Generamos informacion de detalle para urbanistas, arquitectos y calculistas que necesitan una lectura precisa del terreno y de las restricciones del sitio antes de intervenirlo.",
    image: "/illustrations/urban-crew.svg",
    iconKey: "building2",
    color: "accent",
    highlights: ["Levantamiento de detalle urbano", "Apoyo a implantacion", "Control para etapas de obra"],
    deliverables: ["Plano base urbanistico", "Ubicacion de redes visibles", "Apoyo para replanteo"],
    idealFor: ["Conjuntos residenciales", "Parques industriales", "Proyectos comerciales"],
    process: ["Coordinacion con diseno", "Campo y captura de detalle", "Entregables listos para coordinacion tecnica"],
    seoTitle: "Topografia para urbanismos y desarrollos urbanos",
    seoDescription:
      "Estudios topograficos para urbanismos y desarrollos urbanos con informacion util para diseno, licenciamiento y construccion.",
    keywords: ["topografia para urbanismo", "levantamiento urbanistico", "topografia para conjuntos"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
  },
  {
    slug: "topografia-redes-hidrosanitarias",
    title: "Topografia para redes hidrosanitarias",
    shortDescription:
      "Levantamientos especializados para redes de acueducto, alcantarillado, cajas, pozos y pendientes funcionales del sistema.",
    overview:
      "Leemos el comportamiento del terreno y la infraestructura existente para que el diseno de redes hidrosanitarias tenga pendientes coherentes, puntos de conexion confiables y menos reprocesos.",
    image: "/illustrations/utility-team.svg",
    iconKey: "droplets",
    color: "primary",
    highlights: ["Lectura de pendientes", "Ubicacion de estructuras", "Datos listos para diseno de redes"],
    deliverables: ["Plano de redes existentes", "Perfiles longitudinales", "Inventario de estructuras visibles"],
    idealFor: ["Urbanizadores", "Contratistas de redes", "Consultoria hidraulica"],
    process: ["Inspeccion de estructuras", "Levantamiento de puntos criticos", "Entrega de perfiles y planos"],
    seoTitle: "Topografia para redes hidrosanitarias",
    seoDescription:
      "Topografia aplicada a redes hidrosanitarias para apoyar diseno, ampliacion y optimizacion de sistemas de acueducto y alcantarillado.",
    keywords: ["topografia redes hidrosanitarias", "levantamiento alcantarillado", "topografia acueducto"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
  },
  {
    slug: "topografia-para-acueductos",
    title: "Topografia para acueductos",
    shortDescription:
      "Estudios topograficos para trazados, lineas de conduccion, plantas, tanques y estructuras de abastecimiento de agua.",
    overview:
      "Levantamos corredores, puntos de control y elementos relevantes del sistema para que los proyectos de acueducto partan de informacion util desde el diseno conceptual hasta la construccion.",
    image: "/illustrations/waterworks-team.svg",
    iconKey: "waves",
    color: "secondary",
    highlights: ["Corredores topograficos", "Control para estructuras", "Apoyo al diseno hidraulico"],
    deliverables: ["Plano de corredor", "Perfiles de linea", "Coordenadas de puntos de control"],
    idealFor: ["Proyectos de expansion", "Acueductos veredales", "Optimizacion de sistemas existentes"],
    process: ["Definicion de alcance", "Levantamiento por tramo", "Procesamiento y validacion tecnica"],
    seoTitle: "Topografia para proyectos de acueducto",
    seoDescription:
      "Topografia para acueductos y sistemas de abastecimiento de agua con perfiles, corredores y control para estructuras.",
    keywords: ["topografia para acueductos", "corredores de conduccion", "perfil topografico de redes"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
  },
  {
    slug: "topografia-para-vias",
    title: "Topografia para vias",
    shortDescription:
      "Levantamientos, corredores, secciones y apoyo al replanteo de proyectos viales urbanos, rurales e industriales.",
    overview:
      "Trabajamos la geometria del corredor vial con informacion de secciones, ejes y niveles para que el diseno y la ejecucion cuenten con control topografico desde el inicio.",
    image: "/illustrations/road-crew.svg",
    iconKey: "route",
    color: "accent",
    highlights: ["Corredores y ejes", "Secciones transversales", "Control para movimiento de tierras"],
    deliverables: ["Plano del corredor vial", "Secciones y perfiles", "Puntos para replanteo y control"],
    idealFor: ["Carreteras rurales", "Vias urbanas", "Patios industriales y accesos"],
    process: ["Reconocimiento del corredor", "Campo y captura de secciones", "Modelacion y entrega final"],
    seoTitle: "Topografia para vias y carreteras",
    seoDescription:
      "Servicio de topografia para vias y carreteras con corredores, perfiles y secciones para diseno y construccion.",
    keywords: ["topografia para vias", "levantamiento vial", "secciones topograficas"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
  },
  {
    slug: "batimetria",
    title: "Batimetria",
    shortDescription:
      "Medicion de profundidades y configuracion del fondo en cuerpos de agua para proyectos hidraulicos, ambientales y portuarios.",
    overview:
      "Ejecutamos levantamientos batimetricos para conocer la morfologia del fondo y apoyar decisiones tecnicas en embalses, lagunas, canales y otros cuerpos de agua.",
    image: "/illustrations/marine-crew.svg",
    iconKey: "anchor",
    color: "primary",
    highlights: ["Perfiles del fondo", "Apoyo a dragado y mantenimiento", "Informacion para estudios ambientales"],
    deliverables: ["Plano batimetrico", "Curvas de profundidad", "Modelos de fondo y secciones"],
    idealFor: ["Embalses", "Lagos y lagunas", "Canales y obras hidraulicas"],
    process: ["Planeacion de navegacion", "Captura de datos y control", "Procesamiento y visualizacion tecnica"],
    seoTitle: "Batimetria para estudios hidraulicos y ambientales",
    seoDescription:
      "Servicio de batimetria para cuerpos de agua con modelos de profundidad y soporte tecnico para proyectos hidraulicos y ambientales.",
    keywords: ["batimetria", "estudio de profundidades", "levantamiento en cuerpos de agua"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
  },
  {
    slug: "georreferenciacion-magna-sirgas",
    title: "Georreferenciacion MAGNA-SIRGAS",
    shortDescription:
      "Materializacion y vinculacion de puntos de control al sistema de referencia oficial para dar trazabilidad a los proyectos.",
    overview:
      "Conectamos tu proyecto con la red geodesica nacional para que toda la informacion topografica tenga coherencia espacial, repetibilidad y soporte tecnico para tramites y construccion.",
    image: "/illustrations/geodesy-crew.svg",
    iconKey: "satellite",
    color: "secondary",
    highlights: ["Puntos de control geodesico", "Compatibilidad con normativa nacional", "Base para todas las demas actividades"],
    deliverables: ["Coordenadas oficiales", "Informe de georreferenciacion", "Placas o puntos materializados"],
    idealFor: ["Proyectos institucionales", "Predios y licencias", "Obras que requieren trazabilidad"],
    process: ["Planeacion de puntos", "Observacion GNSS", "Ajuste y documentacion final"],
    seoTitle: "Georreferenciacion MAGNA-SIRGAS en Colombia",
    seoDescription:
      "Servicio de georreferenciacion MAGNA-SIRGAS para proyectos que requieren puntos de control, trazabilidad y compatibilidad con la referencia oficial de Colombia.",
    keywords: ["magna sirgas", "georreferenciacion colombia", "puntos de control GNSS"],
    relatedArticleSlugs: ["importancia-georreferenciacion-magna-sirgas"],
  },
  {
    slug: "fotogrametria-con-drones",
    title: "Fotogrametria con drones",
    shortDescription:
      "Levantamientos aereos con UAV para ortofotos, nubes de puntos y modelos digitales en tiempos competitivos.",
    overview:
      "Aplicamos tecnologia drone para capturar grandes extensiones o zonas de dificil acceso y convertirlas en productos medibles que aceleran la toma de decisiones.",
    image: "/illustrations/drone-crew.svg",
    iconKey: "plane",
    color: "accent",
    highlights: ["Cobertura amplia en menos tiempo", "Ortomosaicos y modelos 3D", "Apoyo para seguimiento de obra"],
    deliverables: ["Ortofoto georreferenciada", "Nube de puntos o MDT", "Analisis visual del terreno"],
    idealFor: ["Mineria y canteras", "Obras lineales", "Predios de gran extension"],
    process: ["Planeacion de vuelo", "Captura y control terrestre", "Procesamiento fotogrametrico"],
    seoTitle: "Fotogrametria con drones para topografia",
    seoDescription:
      "Fotogrametria con drones para topografia, ortofotos y modelos digitales del terreno con alta eficiencia para grandes areas.",
    keywords: ["fotogrametria con drones", "topografia UAV", "ortofoto georreferenciada"],
    relatedArticleSlugs: ["drones-revolucion-levantamientos-topograficos"],
  },
  {
    slug: "comisiones-topograficas",
    title: "Comisiones topograficas",
    shortDescription:
      "Acompanamiento tecnico en campo para constructoras, interventorias y equipos que requieren soporte topografico confiable.",
    overview:
      "Nos integramos temporal o permanentemente al frente de trabajo para reforzar levantamientos, replanteos, controles de avance y verificaciones de obra.",
    image: "/illustrations/site-support-team.svg",
    iconKey: "users",
    color: "primary",
    highlights: ["Refuerzo operativo en campo", "Control diario de actividades", "Acompanamiento tecnico especializado"],
    deliverables: ["Reportes de avance", "Puntos y controles de obra", "Apoyo al equipo tecnico residente"],
    idealFor: ["Frentes de obra exigentes", "Interventoria", "Equipos que requieren capacidad adicional"],
    process: ["Definicion del frente de apoyo", "Integracion con el equipo", "Control y seguimiento operativo"],
    seoTitle: "Comisiones topograficas para proyectos de obra",
    seoDescription:
      "Comisiones topograficas y apoyo en campo para proyectos de obra, interventoria y control tecnico con personal especializado.",
    keywords: ["comisiones topograficas", "apoyo topografico en obra", "replanteo en campo"],
    relatedArticleSlugs: ["guia-desenglobe-predios"],
  },
]

export const servicesDataBySlug = new Map(servicesData.map((service) => [service.slug, service]))
