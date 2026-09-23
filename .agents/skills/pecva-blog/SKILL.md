---
name: pecva-blog
description: Guía y estándares técnicos obligatorios para la creación de blogs optimizados para SEO en PECVA Topografía (topografiapecva.com). Cubre metadatos, Schema.org FAQPage, extensión (1000-1200 palabras), tono técnico accesible, FAQs en acordeón, imágenes hiperrealistas optimizadas y flujo de despliegue en VPS.
---

# Skill: Estándares de Creación y Optimización de Blogs PECVA Topografía

Esta skill define el protocolo estandarizado para planificar, redactar, ilustrar y publicar artículos de blog en la plataforma Next.js de **Consorcio PECVA** (`topografiapecva.com`). Debe seguirse rigurosamente cada vez que se creen o actualicen blogs.

---

## 1. Criterios de Contenido y Longitud

* **Extensión Mínima Obligatoria**: Entre **1.000 y 1.200 palabras** por artículo. No generar resúmenes cortos; cada post debe ser una guía técnica completa y exhaustiva.
* **Estilo de Escritura**:
  * Profesional y con autoridad técnica en ingeniería y topografía, pero con lenguaje claro y accesible para clientes (constructores, arquitectos, abogados, propietarios rurales).
  * Evitar rodeos o relleno; cada párrafo debe aportar valor práctico, normativo o procedimental.
  * Ejemplos situacionales contextualizados en Colombia (normas IGAC, INVIAS, NSR-10, Curadurías Urbanas, RAS-2000, CREG, etc.).
* **Estructura del Artículo**:
  1. Introducción persuasiva identificando la necesidad técnica o legal y el impacto de los errores topográficos.
  2. 3 a 4 secciones `##` con subtítulos `###`, detallando metodología, instrumentación (GNSS RTK, estaciones robotizadas, drones, ecosondas), tolerancias milimétricas y entregables.
  3. Listas estructuradas y tablas comparativas cuando aplique.
  4. Sección `## Preguntas Frecuentes` con 3 a 5 preguntas de alta intención de búsqueda.
  5. Llamado a la acción (CTA) final destacando la experiencia y solvencia de **Consorcio PECVA** con enlace o invitación a cotización por WhatsApp.

---

## 2. Optimización SEO y Metadatos

### Frontmatter YAML
```yaml
---
title: "Título SEO optimizado con palabra clave principal (55-65 caracteres)"
excerpt: "Resumen persuasivo de 140 a 160 caracteres con llamada a la acción."
category: "Obras Civiles | Infraestructura | Hidráulica | Energía y Minería | Catastro y Legal | Tecnología Avanzada"
author: "Equipo PECVA"
publishedAt: "AAAA-MM-DD"
readTime: "7 min"
image: "/images/blog/<slug>.png"
seoDescription: "Meta descripción con palabra clave al inicio, propuesta de valor y llamada a la acción."
keywords:
  - palabra clave principal
  - termino semantico secundario
  - servicio topografico especifico
  - topografia en colombia
  - pecva topografia
relatedServiceSlugs:
  - slug-de-servicio-1
  - slug-de-servicio-2
---
```

### Marcado Estructurado (Schema.org)
* **BlogPosting**: Título, descripción, autoría (Consorcio PECVA), fecha y URL canónica.
* **FAQPage**: El componente extrae automáticamente las preguntas (`###`) y respuestas (`<p>`) de la sección `## Preguntas Frecuentes` para generar el marcado JSON-LD `@type: FAQPage`, permitiendo que Google muestre resultados enriquecidos (rich snippets con acordeón) en las SERPs.
* **OpenGraph y Twitter Card**: Etiquetas `og:image`, `og:title`, `twitter:card: summary_large_image` para asegurar previsualizaciones atractivas en redes sociales y WhatsApp.

---

## 3. FAQs en Acordeón Interactivo

* La plantilla de renderizado detecta el encabezado `## Preguntas Frecuentes`.
* Cada pregunta `###` se convierte en un elemento de acordeón colapsable con diseño sobrio y moderno usando `@radix-ui/react-accordion`.
* Mejora drásticamente la experiencia de usuario (UX) en dispositivos móviles, reduce la tasa de rebote y maximiza el tiempo de permanencia.

---

## 4. Estándares de Imágenes Hiperrealistas y Optimización Web

* **Unicidad**: Cero imágenes duplicadas o reutilizadas. Cada artículo debe contar con una fotografía o render hiperrealista original que represente fielmente la temática.
* **Proporción y Dimensiones**: Relación **16:9** horizontal estándar (**1200 x 675 píxeles**), ideal para banners de cabecera y tarjetas de previsualización (OG/Twitter).
* **Peso y Compresión**:
  * Las imágenes deben optimizarse para que pesen **menos de 200 KB** (idealmente entre 70 KB y 150 KB).
  * Si se procesan con Python (PIL) o sharp, guardar con compresión optimizada (`optimize=True`, calidad 80-85%) en formato PNG o WebP.
  * El nombre de archivo debe coincidir con el slug: `public/images/blog/<slug>.png`.

---

## 5. Política de No Repetición y Contenido Fresco

* Antes de crear un artículo, verificar los artículos existentes en `content/blog/` para no repetir temas exactos.
* Se pueden abordar áreas complementarias (por ejemplo, en lugar de "topografía para vías" en general, abordar "control de peraltes y curvas de transición en carreteras de montaña" o "auscultación de túneles viales").

---

## 6. Procedimiento de Publicación y Despliegue en Producción

1. **Validación Local**:
   * Comprobar que todos los artículos tienen su respectiva imagen existente en `public/images/blog/`.
   * Ejecutar compilación de producción:
     ```bash
     npx next build
     ```
   * Asegurarse de que todas las rutas estáticas se generen sin errores.
2. **Control de Versiones (Git)**:
   * Añadir cambios y commitear con mensaje descriptivo (`feat(blog): ...`).
   * Subir al repositorio oficial en GitHub:
     ```bash
     git push origin main
     ```
3. **Despliegue en el VPS (Hostinger / 2.24.104.66)**:
   * Conectar por SSH y ejecutar el script de despliegue:
     ```bash
     ssh -i ~/.ssh/id_ed25519_cristoferscalante_gmail root@2.24.104.66 "bash /opt/pecva-topography/deploy.hostinger.sh main"
     ```
   * Verificar estado del contenedor Docker (`topography-web-hostinger`) y probar el endpoint de salud:
     ```bash
     curl http://127.0.0.1:3002/api/health
     ```
