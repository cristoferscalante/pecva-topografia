# Despliegue en Hostinger VPS con Docker

## 1. Qué se agregó al proyecto

- `Dockerfile`: construye la app de Next.js para producción.
- `docker-compose.yml`: levanta el contenedor en el puerto `3000`.
- `docker-compose.private.yml`: deja el contenedor expuesto solo dentro del servidor.
- `docker-compose.hostinger.yml`: despliegue para un VPS donde el puerto `3000` ya esta ocupado, publica en `3002`.
- `docker-compose.hostinger.private.yml`: igual que el anterior, pero solo escucha en `127.0.0.1:3002`.
- `app/api/health/route.ts`: endpoint de salud para monitoreo.
- `next.config.mjs`: usa `output: 'standalone'` para una imagen más ligera.

## 2. Opción A: desplegar desde el Administrador de Docker de Hostinger

Si Hostinger te deja subir un proyecto Docker/Compose:

1. Sube este proyecto a tu VPS.
2. Entra a `Administrador de Docker`.
3. Pulsa `Componer`.
4. Crea un proyecto nuevo con este repositorio o pegando el contenido del compose.
5. Usa `docker-compose.yml` si quieres acceso público y el puerto `3000` esta libre.
6. Usa `docker-compose.private.yml` si quieres que quede privado para VPN/proxy interno y el puerto `3000` esta libre.
7. Usa `docker-compose.hostinger.yml` si tu VPS ya tiene otra app en `3000`.
8. Usa `docker-compose.hostinger.private.yml` si tu VPS ya tiene otra app en `3000` y este proyecto ira solo por VPN/proxy interno.

Si luego activas Traefik en Hostinger, podrás apuntar un dominio o subdominio al contenedor y tener HTTPS.

## 3. Opción B: desplegar por terminal en la VPS

Dentro de la VPS:

```bash
cd /ruta/de/topography-website-design
docker compose up -d --build
```

Modo privado:

```bash
cd /ruta/de/topography-website-design
docker compose -f docker-compose.private.yml up -d --build
```

Modo Hostinger con puerto alterno:

```bash
cd /ruta/de/topography-website-design
docker compose -f docker-compose.hostinger.yml up -d --build
```

Modo Hostinger privado con puerto alterno:

```bash
cd /ruta/de/topography-website-design
docker compose -f docker-compose.hostinger.private.yml up -d --build
```

Para revisar:

```bash
docker compose ps
docker compose logs -f
curl http://127.0.0.1:3000/api/health
```

## 4. Publicarlo con dominio en Hostinger

Tienes dos caminos:

### Camino 1: con Traefik de Hostinger

- Activa Traefik desde el panel.
- Asocia tu dominio o subdominio al servicio Docker.
- Deja que Traefik maneje HTTPS.

### Camino 2: con proxy inverso manual

Puedes usar Nginx o Caddy en la VPS y redirigir al puerto `3000`.

## 5. Dejarlo solo para VPN o red privada

Si quieres que el proyecto no quede público:

- No abras el puerto `3000` hacia Internet.
- Haz que el contenedor escuche solo de forma interna.
- Publica el sitio mediante la IP privada de la VPS o a través de tu VPN.
- Si usas Nginx/Traefik, limita acceso por IP privada o por la interfaz de la VPN.

Ejemplo de publicación solo local en Docker Compose:

```yaml
ports:
  - "127.0.0.1:3000:3000"
```

Con eso el contenedor responde solo dentro del servidor, y luego lo expones por VPN o proxy interno.

## 6. Recomendación práctica

Si tu objetivo es:

- `Público con dominio`: usa Traefik o, si estas probando en un VPS donde `3000` ya esta ocupado, usa `docker-compose.hostinger.yml`.
- `Privado por VPN`: usa `docker-compose.private.yml` si `3000` esta libre, o `docker-compose.hostinger.private.yml` si ya esta ocupado.

## 7. Siguiente paso recomendado en tu VPS

1. Subir este proyecto.
2. Ejecutar `docker compose up -d --build`.
3. Verificar `http://TU_IP_VPS:3000`.
4. Decidir si irá público con dominio o privado solo por VPN.
