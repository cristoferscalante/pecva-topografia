# PECVA Topografía - Directrices de Desarrollo y Contenido

## Protocolo Obligatorio para Creación y Edición de Blogs
Siempre que el usuario solicite crear o editar artículos de blog para PECVA Topografía (`topografiapecva.com`), es obligatorio seguir la skill:
👉 [`.agents/skills/pecva-blog/SKILL.md`](.agents/skills/pecva-blog/SKILL.md)

### Requisitos Principales:
1. **Extensión**: Mínimo 1.000 a 1.200 palabras por artículo.
2. **SEO & Schema**: Títulos, meta-descripciones y slugs optimizados. Schema `BlogPosting` y `FAQPage` integrados.
3. **FAQs en Acordeón**: Sección `## Preguntas Frecuentes` con preguntas `###` que se renderizan automáticamente en acordeón interactivo.
4. **Tono**: Riguroso técnicamente (normativa colombiana, tolerancias, equipos) pero redactado en lenguaje accesible y amigable.
5. **Imágenes**: 100% únicas, hiperrealistas, proporción 16:9 (1200x675), optimizadas para la web (< 200 KB).
6. **Despliegue**: Build local (`npx next build`), push a `origin main` y ejecución de despliegue en el VPS (`deploy.hostinger.sh main`).
7. **Fecha de Publicación (`publishedAt`)**: DEBE ser exactamente igual a la fecha real del día del push/publicación (`AAAA-MM-DD`). Queda estrictamente prohibido colocar fechas futuras o de días que aún no han pasado.
