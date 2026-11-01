---
title: "Topografía para Titulación de Baldíos y Adjudicación de Tierras con la ANT"
excerpt: "Aprenda los requisitos de levantamiento topográfico bajo estándar LADM-COL para adjudicación de baldíos ante la Agencia Nacional de Tierras (ANT)."
category: "Catastro y Legal"
author: "Equipo PECVA"
publishedAt: "2026-10-30"
readTime: "8 min"
image: "/images/blog/topografia-para-titulacion-baldios-adjudicacion-ant.webp"
seoDescription: "Topografía para titulación de baldíos y adjudicación de tierras con la ANT en Colombia. Estándar LADM-COL, MAGNA-SIRGAS y planos con Consorcio PECVA."
keywords:
  - topografia titulacion baldios ant
  - adjudicacion de tierras agencia nacional de tierras
  - levantamiento ladm col baldios colombia
  - topografia colombia
  - pecva topografia
relatedServiceSlugs:
  - servicios-topograficos-para-saneamiento-predial-titulos-baldios
  - levantamiento-planimetrico-altimetrico
---

La informalidad en la tenencia de la tierra rural en Colombia supera el 50% en vastas regiones del territorio nacional. Cientos de miles de familias campesinas y productores agropecuarios han trabajado la tierra durante generaciones sin contar con una escritura pública registrada, ocupando terrenos baldíos de la Nación. En el marco de la Reforma Rural Integral (Punto 1 del Acuerdo de Paz) y el Decreto Ley 902 de 2017, la Agencia Nacional de Tierras (ANT) lidera el Plan Masivo de Titulación de Baldíos a través del Fondo de Tierras y el Registro de Sujetos de Ordenamiento (RESO).

Para que la ANT adjudique un baldío y expida la resolución que servirá como título de propiedad registrable, se exige un levantamiento topográfico predial riguroso que cumpla con el modelo de datos **LADM-COL** (Land Administration Domain Model, perfil Colombia), georreferenciado en MAGNA-SIRGAS y validado contra restricciones ambientales y étnicas. El Consorcio PECVA ejecuta levantamientos prediales para solicitudes individuales y colectivas de adjudicación de tierras en todo el país.

---

## 1. Requisitos Técnicos y Restricciones Legales en Baldíos de la Nación

La titulación de un baldío no es automática y está sujeta a límites de orden público:
* **Extensión de la Unidad Agrícola Familiar (UAF)**: La ANT solo adjudica terrenos cuya extensión no supere el rango de la UAF establecido para cada municipio o zona homogénea (por ejemplo, entre 15 y 30 hectáreas en zonas andinas, o más de 500 hectáreas en sabanas del Vichada). Un error topográfico que sobrepase la UAF máxima puede anular el trámite.
* **Prohibición de Indivisibilidad y Acaparamiento**: La topografía debe demostrar que el predio no proviene de un fraccionamiento antieconómico ni hace parte de una concentración indebida de tierras públicas.
* **Exclusiones Geográficas y Ambientales**: El levantamiento debe contrastarse cartográficamente contra:
  * Sistema de Parques Nacionales Naturales (SPNN) y áreas protegidas del SINAP.
  * Zonas de Reserva Forestal de Ley 2ª de 1959 (salvo que cuente con sustracción previa).
  * Rondas hídricas de 30 metros en ríos, quebradas y humedales de uso público.
  * Territorios colectivos titulados a comunidades indígenas (Resguardos) o afrocolombianas (Consejos Comunitarios).

---

## 2. Metodología Topográfica bajo Estándar LADM-COL

El Consorcio PECVA sigue estrictamente las especificaciones técnicas dictadas por el IGAC y la ANT en sus manuales de barrido predial:

### Fase 1: Monumentación Geodésica y Enlace MAGNA-SIRGAS
* Colocación de mojones de concreto permanentes en los vértices principales del predio, asegurando su visibilidad para las diligencias de inspección ocular de los funcionarios de la ANT.
* Observaciones estáticas con receptores GNSS geodésicos multiconstelación de doble frecuencia, vinculadas a las estaciones de la red MAGNA-ECO del IGAC.
* Transformación matemática de coordenadas al sistema cartográfico único Origen Nacional (CTM12).

### Fase 2: Delimitación Concertada de Linderos
* Recorrido perimetral en compañía del solicitante y de los vecinos colindantes para fijar de mutuo acuerdo la ubicación exacta de las cercas y linderos naturales.
* Levantamiento de puntos con antena GNSS en modo RTK (Cinemático en Tiempo Real), con precisiones horizontales submétricas exigidas por la ANT (tolerancia menor a 50 cm en linderos identificables y menor a 1 metro en linderos naturales).
* Firma de actas de colindancia por parte de los vecinos en el mismo momento del levantamiento de campo.

### Fase 3: Estructuración de la Base de Datos LADM-COL
La ANT no acepta planos en papel o archivos CAD simples; exige una Geodatabase espacial estructurada bajo la norma ISO 19152 (modelo LADM-COL):
* Capas vectoriales de puntos de lindero, linderos físicos y polígono del terreno (`CR_Terreno`).
* Incorporación de atributos alfanuméricos: datos del ocupante, número de cédula, tiempo de posesión pacífica, uso actual del suelo (cultivos, pastos, bosques) y fuentes de agua.

---

## 3. Expediente Técnico para Radicación ante la ANT

PECVA entrega el paquete documental completo requerido para el expediente de adjudicación:
1. **Plano Predial Georreferenciado Oficial**: Incluyendo cuadro de coordenadas MAGNA-SIRGAS, distancias, rumbos, colindantes, detalles de vías de acceso y escala gráfica adecuada.
2. **Memoria Técnica y Descriptiva de Linderos**: Redactada conforme a los formatos oficiales de la Agencia Nacional de Tierras.
3. **Certificación de Aptitud Agropecuaria y No Afectación Ambiental**: Cruce geográfico formal que demuestra que el polígono levantado se encuentra fuera de áreas de reserva forestal protectora y parques nacionales.
4. **Archivo Digital GDB LADM-COL**: Validado mediante el software oficial de chequeo de la ANT para garantizar cero errores topológicos (sin solapes, huecos ni líneas no cerradas).

---

## 4. Equipamiento y Capacidad Operativa Rural

Para cubrir predios en zonas de difícil acceso como Guaviare, Caquetá, Arauca o Chocó, PECVA dispone de:
* **Receptores GNSS Trimble y Leica con tecnología satelital autónoma**: Capaces de calcular posiciones centimétricas sin cobertura de señal celular mediante correcciones de punto preciso (PPP / RTX).
* **Drones con Sensores Multiespectrales**: Para generar ortofotomosaicos que sirvan de prueba documental irrefutable de la explotación económica del predio (cultivos de yuca, plátano, cacao, ganado) exigida por la ley para la adjudicación.

---

## Preguntas Frecuentes

### ¿Quién paga el levantamiento topográfico para adjudicación de baldíos?
En los programas de barrido predial masivo del Estado, el levantamiento es financiado por la ANT y la cooperación internacional. Sin embargo, para campesinos y productores que tramitan su adjudicación mediante solicitud individual, el interesado debe contratar a un ingeniero topógrafo particular certificado como PECVA para elaborar el expediente técnico exigido por la ANT.

### ¿Se puede adjudicar un baldío si el levantamiento topográfico abarca un río o nacimiento?
No. Las rondas de nacimientos de agua (radio de 100 metros) y las márgenes de ríos y quebradas (faja de 30 metros) son bienes de uso público inalienables. El levantamiento de PECVA delimita y excluye automáticamente la ronda hídrica del polígono adjudicable para que la ANT no rechace la solicitud.

### ¿Qué es el código NUPRE que asigna la ANT?
El NUPRE (Número Predial Nacional) es el código único de identificación territorial asignado en el marco del Catastro Multipropósito. El levantamiento estructurado en LADM-COL permite que la ANT y el IGAC vinculen el predio adjudicado directamente al sistema registral de la Nación.

---

## Seguridad en la Propiedad Rural con Consorcio PECVA

En **Consorcio PECVA** somos especialistas en geodesia, catastro y normativa agraria colombiana. Le ayudamos a transformar su posesión rural en un título de propiedad firme, legal y debidamente inscrito ante la Agencia Nacional de Tierras y el Registro de Instrumentos Públicos.
