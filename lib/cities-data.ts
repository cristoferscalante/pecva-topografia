export type CitySEOData = {
  slug: string
  name: string
  region: string
  description: string
  intro: string
  keywords: string[]
}

export const citiesData: CitySEOData[] = [
  {
    slug: "pitalito",
    name: "Pitalito",
    region: "Huila",
    description: "Servicios de topografía profesional en Pitalito, Huila. Somos el epicentro técnico de la región para levantamientos catastrales, rurales y fotogrametría aérea.",
    intro: "Pitalito es nuestro epicentro de operaciones. Desde aquí coordinamos y brindamos servicios de topografía de precisión milimétrica, georreferenciación y asesoría legal predial para el Huila y el sur del país.",
    keywords: ["topografia en pitalito", "desenglobes pitalito", "topografo en pitalito huila", "drones pitalito"]
  },
  {
    slug: "neiva",
    name: "Neiva",
    region: "Huila",
    description: "Topografía de alta precisión en Neiva, Huila. Levantamientos viales, redes de acueducto y desenglobes con respaldo oficial del IGAC.",
    intro: "Como capital del Huila, Neiva es un centro de constante desarrollo. Ofrecemos levantamientos planimétricos, altimétricos y control geométrico de vías con total movilidad y equipos GNSS RTK de doble frecuencia.",
    keywords: ["topografia en neiva", "topografo neiva", "desenglobe neiva", "batimetria neiva"]
  },
  {
    slug: "bogota",
    name: "Bogotá",
    region: "Cundinamarca",
    description: "Servicios topográficos especializados en Bogotá D.C. Control de obras, topografía para urbanismos y redes hidrosanitarias de alta precisión.",
    intro: "Atendemos los requerimientos de la capital del país. Brindamos soporte técnico y comisiones topográficas a constructoras, interventorías y obras civiles con rigurosidad matemática y planos Civil 3D.",
    keywords: ["topografia en bogota", "comisiones topograficas bogota", "topografo en bogota", "urbanismo bogota"]
  },
  {
    slug: "medellin",
    name: "Medellín",
    region: "Antioquia",
    description: "Topografía profesional en Medellín y el Valle de Aburrá. Fotogrametría con drones, batimetrías y georreferenciación de linderos catastrales.",
    intro: "Llevamos precisión a Antioquia. Ofrecemos topografía aplicada a urbanismos, levantamiento de parcelaciones y modelado de terreno con drones para proyectos arquitectónicos e industriales.",
    keywords: ["topografia en medellin", "drones medellin", "topografo medellin", "georreferenciacion medellin"]
  },
  {
    slug: "cali",
    name: "Cali",
    region: "Valle del Cauca",
    description: "Estudios topográficos y batimetrías de alta precisión en Cali y el Valle del Cauca. Levantamientos prediales y catastrales certificados.",
    intro: "Cubrimos la región del Valle del Cauca. Brindamos servicios especializados en desenglobes, topografía de redes y control geométrico de vías con desplazamiento ágil y reporte diario de obra.",
    keywords: ["topografia en cali", "batimetria cali", "topografo cali", "desenglobes cali"]
  },
  {
    slug: "barranquilla",
    name: "Barranquilla",
    region: "Atlántico",
    description: "Topografía e ingeniería de precisión en Barranquilla y la región Caribe. Control topográfico en obras civiles y comisiones de obra.",
    intro: "Soporte topográfico para el Caribe colombiano. Apoyamos proyectos logísticos, portuarios e industriales con estaciones totales de alta gama y nivelación geométrica de precisión.",
    keywords: ["topografia en barranquilla", "topografo barranquilla", "comision topografica barranquilla"]
  },
  {
    slug: "bucaramanga",
    name: "Bucaramanga",
    region: "Santander",
    description: "Servicios de topografía profesional en Bucaramanga y Santander. Levantamientos rurales, alinderamiento de predios y geodesia certificada.",
    intro: "Topografía con rigor técnico en Santander. Apoyamos el desarrollo de infraestructura, loteamientos y estudios geodésicos amarrados al sistema oficial MAGNA-SIRGAS.",
    keywords: ["topografia en bucaramanga", "topografo bucaramanga", "desenglobes santander"]
  },
  {
    slug: "pereira",
    name: "Pereira",
    region: "Risaralda",
    description: "Estudios de topografía de precisión en Pereira y el Eje Cafetero. Levantamiento planimétrico, altimétrico y fotogrametría aérea.",
    intro: "Ofrecemos soluciones topográficas completas para Risaralda y el Eje Cafetero. Levantamientos rurales y urbanos ideales para trámites prediales y licencias de construcción.",
    keywords: ["topografia en pereira", "topografo pereira", "drones eje cafetero"]
  },
  {
    slug: "ibague",
    name: "Ibagué",
    region: "Tolima",
    description: "Topografía certificada en Ibagué, Tolima. Levantamientos hidráulicos para acueductos, alcantarillados y control de movimiento de tierras.",
    intro: "Brindamos soporte técnico en el departamento del Tolima. Especialistas en levantamientos de trazados viales, redes de acueducto y perfiles longitudinales con alta fidelidad altimétrica.",
    keywords: ["topografia en ibague", "topografo ibague", "acueducto tolima"]
  },
  {
    slug: "popayan",
    name: "Popayán",
    region: "Cauca",
    description: "Servicios de topografía y geodesia en Popayán, Cauca. Linderos catastrales, sucesiones y levantamientos con drones de alta precisión.",
    intro: "Atendemos de manera prioritaria al departamento del Cauca debido a su cercanía a nuestro epicentro en Pitalito. Ofrecemos desenglobes, mediciones y peritajes con total respaldo técnico.",
    keywords: ["topografia en popayan", "topografo popayan", "desenglobe cauca"]
  },
  {
    slug: "pasto",
    name: "Pasto",
    region: "Nariño",
    description: "Topografía profesional en Pasto, Nariño. Desenglobes de fincas, georreferenciación MAGNA-SIRGAS y planos de curvas de nivel.",
    intro: "Ofrecemos cobertura de primer nivel en el departamento de Nariño. Mediciones centimétricas y planos certificados ideales para curadurías, notarías y el IGAC.",
    keywords: ["topografia en pasto", "topografo pasto", "desenglobes narino"]
  },
  {
    slug: "mocoa",
    name: "Mocoa",
    region: "Putumayo",
    description: "Topografía e ingeniería de precisión en Mocoa y el Putumayo. Linderos rurales, fotogrametría y estudios hidráulicos de detalle.",
    intro: "Debido a la conexión directa con el sur del Huila, brindamos servicios prioritarios en el Putumayo. Levantamientos rurales, alinderamientos y control volumétrico con máxima movilidad.",
    keywords: ["topografia en mocoa", "topografo mocoa", "putumayo topografia"]
  },
  {
    slug: "florencia",
    name: "Florencia",
    region: "Caquetá",
    description: "Servicios de topografía certificados en Florencia, Caquetá. Levantamientos para desenglobes, vías rurales y control de obra civil.",
    intro: "Brindamos cobertura completa en Florencia y el departamento del Caquetá. Apoyo técnico para loteamientos, trazados de redes y linderos prediales con total fiabilidad.",
    keywords: ["topografia en florencia", "topografo caqueta", "desenglobes florencia"]
  },
  {
    slug: "manizales",
    name: "Manizales",
    region: "Caldas",
    description: "Topografía profesional y control de taludes en Manizales, Caldas. Modelos digitales de terreno y curvas de nivel de alta fidelidad.",
    intro: "Soluciones de ingeniería en el departamento de Caldas. Levantamientos planimétricos y altimétricos adaptados a terrenos con fuertes pendientes y control de estabilidad de obras.",
    keywords: ["topografia en manizales", "topografo manizales", "curvas de nivel caldas"]
  },
  {
    slug: "armenia",
    name: "Armenia",
    region: "Quindío",
    description: "Servicios topográficos en Armenia, Quindío. Planos base para licencias de construcción, desenglobes y seguimiento de obra civil.",
    intro: "Apoyamos el desarrollo urbano y turístico del Quindío con levantamientos de detalle, replanteo de ejes de obra y planos topográficos listos para trámites catastrales.",
    keywords: ["topografia en armenia", "topografo quindio", "licencias armenia"]
  },
  {
    slug: "villavicencio",
    name: "Villavicencio",
    region: "Meta",
    description: "Topografía rural y catastral de precisión en Villavicencio y los Llanos Orientales. Levantamiento de grandes predios rurales y fotogrametría.",
    intro: "Llevamos ingeniería y geodesia a los Llanos Orientales. Levantamientos de predios de gran extensión con drones y antenas satelitales de alta gama para planos catastrales y viales.",
    keywords: ["topografia en villavicencio", "topografo meta", "drones llanos", "rural villavicencio"]
  }
]

export const citiesDataBySlug = new Map(citiesData.map((city) => [city.slug, city]))
