---
title: "Requisitos Técnicos de Levantamientos para Gestores Catastrales bajo Modelo LADM-COL"
excerpt: "Descubra las especificaciones técnicas, tolerancias de precisión y estructuración GDB bajo el estándar LADM-COL para operadores y gestores catastrales en Colombia."
category: "Catastro y Legal"
author: "Equipo PECVA"
publishedAt: "2026-10-30"
readTime: "8 min"
image: "/images/blog/topografia-para-gestores-catastrales-operadores-ladm.webp"
seoDescription: "Requisitos de levantamientos para gestores catastrales y operadores LADM-COL en Colombia. Catastro multipropósito, IGAC y estándares con Consorcio PECVA."
keywords:
  - gestores catastrales ladm col
  - catastro multiproposito especificaciones tecnicas
  - operadores catastrales topografia igac
  - topografia colombia
  - pecva topografia
relatedServiceSlugs:
  - topografos-catastro-multiproposito-metodologia-ladm-col-colombia
  - levantamiento-planimetrico-altimetrico
---

La descentralización del catastro en Colombia —promovida por el Plan Nacional de Desarrollo, la Ley 1955 de 2019 y los Decretos 148 de 2020 y 1170 de 2020— transformó radicalmente el modelo institucional de la gestión predial. Municipios, distritos, departamentos y esquemas asociativos territoriales pueden habilitarse ante el Instituto Geográfico Agustín Codazzi (IGAC) como **Gestores Catastrales** autónomos (por ejemplo, Catastro Bogotá, Catastro Medellín, Catastro Cali, Masora en Antioquia, Asomunicipios en Catatumbo, entre decenas de nuevos gestores). A su vez, estos gestores contratan a **Operadores Catastrales** privados o mixtos para ejecutar las labores operativas de formación, actualización y conservación catastral con enfoque multipropósito.

El corazón de este nuevo esquema es el estándar internacional ISO 19152, adaptado para Colombia como **LADM-COL** (Land Administration Domain Model). En el Consorcio PECVA asesoramos y ejecutamos labores geomáticas para gestores y operadores catastrales, asegurando levantamientos con rigurosidad topográfica, interoperabilidad de datos y cumplimiento de las directrices técnicas del IGAC y la Superintendencia de Notariado y Registro (SNR).

---

## 1. El Salto Paradigmático: Del Catastro Gráfico al Catastro Multipropósito LADM-COL

El catastro tradicional colombiano era fiscal y descriptivo, con geometrías desconectadas y archivos CAD no estructurados. El Catastro Multipropósito bajo LADM-COL exige:
* **Interoperabilidad Total**: La información física del predio levantada por el topógrafo debe articularse automáticamente con el registro jurídico de la ORIP y con los sistemas de planificación municipal (planes de ordenamiento, estratificación y recaudo).
* **Modelo Núcleo LADM-COL**: Estructura de clases estandarizadas que vincula a los interesados (personas naturales, jurídicas, entidades públicas) con los derechos, restricciones y responsabilidades (RRR) sobre las unidades espaciales (terrenos, construcciones, unidades prediales en propiedad horizontal, servidumbres).
* **Topología Sin Errores**: Cero solapes (overlaps) entre predios vecinos, cero vacíos o franjas de tierra no asignadas (gaps) dentro del perímetro municipal, y cierre poligonal matemático perfecto.

---

## 2. Métodos de Levantamiento Predial y Tolerancias de Precisión

La Resolución Conjunta IGAC-SNR (Resolución 1101 de 2020 y directrices complementarias) establece métodos de captura y rangos de precisión según el ámbito territorial:

### Métodos Directos (Topografía en Terreno)
Obligatorios en zonas urbanas de alta densidad, frentes prediales estrechos y áreas rurales con litigios o vegetación densa:
* **Estaciones Totales y GNSS RTK**: Mediciones con precisión horizontal milimétrica a centimétrica.
* **Tolerancias Planimétricas Directas**:
  * En suelo urbano: Error máximo de posición horizontal $\leq 0.10 	ext{ m}$ (10 centímetros).
  * En suelo suburbano o de expansión: $\leq 0.30 	ext{ m}$ (30 centímetros).
  * En suelo rural intensivo: $\leq 0.50 	ext{ m}$ (50 centímetros).
  * En suelo rural disperso o de gran extensión: $\leq 1.00 	ext{ m}$ (1 metro).

### Métodos Indirectos (Sensores Remotos)
Utilizados en grandes barridos rurales y catastros masivos:
* Ortofotomosaicos de alta resolución generados por vuelos fotogramétricos con drones o sensores aerotransportados tripulados (GSD $\leq 10 	ext{ cm}$ en rural y $\leq 5 	ext{ cm}$ en urbano).
* Sensores LiDAR para restitución bajo vegetación.
* Fotoidentificación de linderos en oficina validada con inspección física de campo en predios con límites no visibles.

---

## 3. Estructuración y Validación de Geodatabases LADM-COL

El levantamiento topográfico no termina en el plano; debe migrarse a bases de datos espaciales (PostgreSQL/PostGIS o Esri GDB) bajo los repositorios oficiales de INTERLIS:
1. **Esquema de Datos Oficial**: Modelado de clases espaciales:
   * `CR_PuntoLindero`: Coordenadas de los vértices con indicación del método de captura y la incertidumbre métrica.
   * `CR_Lindero`: Segmentos que unen los puntos, con tipo de lindero físico (cerca de alambre, muro de ladrillo, corriente de agua, zanja).
   * `CR_Terreno`: Polígono cerrado del predio con código NUPRE único.
   * `CR_Construccion`: Polígonos de las edificaciones internas con tipología constructiva, número de pisos y uso.
2. **Validación Automática con ili2db y Asistente LADM-COL**: Antes de la radicación final, PECVA somete la base de datos a herramientas automáticas de validación topológica y alfanumérica para garantizar cero inconsistencias en el repositorio de la infraestructura colombiana de datos espaciales (ICDE).

---

## 4. El Rol de Consorcio PECVA como Aliado Técnico

En el Consorcio PECVA aportamos la solvencia técnica que necesitan los Gestores y Operadores Catastrales para cumplir sus metas contractuales:
* **Brigadas Mixtas de Campo**: Ingenieros topógrafos y tecnólogos catastrales capacitados en interacción social comunitaria y levantamiento técnico directo.
* **Procesamiento Masivo de Datos**: Equipos de cómputo de alto rendimiento y especialistas SIG dedicados a la depuración de inconsistencias jurídicas y espaciales.
* **Geodesia de Precisión**: Densificación de redes geodésicas locales amarradas a MAGNA-SIRGAS para dar soporte a todo el municipio.

---

## Preguntas Frecuentes

### ¿Qué es el lenguaje INTERLIS y por qué es obligatorio en el catastro colombiano?
INTERLIS es un lenguaje de modelado conceptual independiente del sistema informático adoptado por Colombia para describir el modelo LADM-COL. Garantiza que la información predial pueda transferirse limpiamente entre diferentes plataformas de software (QGIS, ArcGIS, bases de datos abiertas) sin pérdida ni distorsión de datos espaciales o jurídicos.

### ¿Qué ocurre si un levantamiento topográfico particular no cumple con LADM-COL ante un Gestor Catastral?
El Gestor Catastral rechazará de plano el trámite (sea un desenglobe, una mutación de cabida o una subdivisión), emitiendo un acto de requerimiento técnico. El levantamiento estructurado bajo LADM-COL por PECVA garantiza una radicación exitosa a la primera presentación.

### ¿Cómo interactúa el Gestor Catastral con la Oficina de Registro (ORIP)?
A través del Sistema de Información Registral (SIR) y la interoperabilidad catastral-registral. Cuando el Gestor aprueba la actualización física del predio con el estándar LADM-COL, la información geográfica se cruza con el folio de matrícula para que no existan contradicciones entre la realidad jurídica y física de la propiedad.

---

## Modernización Catastral y Precisión con Consorcio PECVA

En **Consorcio PECVA** somos líderes en la implementación técnica del Catastro Multipropósito y el modelo LADM-COL en Colombia. Garantizamos a entidades públicas y empresas privadas levantamientos prediales con los más exigentes estándares de calidad internacional y rigor geodésico.
