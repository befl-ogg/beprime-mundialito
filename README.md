# Mundialito BEPRIME

SPA estática para dar seguimiento al torneo: tabla de posiciones, calendario,
resultados, goleo, equipos y cartas de jugadores. Sin backend: todo se deriva
de JSON estáticos e imágenes en el repo.

## Correr en local

```bash
npm install
npm run dev
```

## Actualizar datos después de cada jornada

**Solo se edita `src/data/matches.json`.** La tabla de posiciones y la tabla de
goleo se calculan automáticamente a partir de los partidos jugados.

Para registrar un resultado, en el partido correspondiente cambia:

```json
"jugado": true,
"marcador": { "local": 2, "visitante": 1 },
"goles": [
  { "jugador": "sifon", "cantidad": 2 },
  { "jugador": "quimin", "cantidad": 1 }
]
```

El campo `jugador` usa el `id` definido en `src/data/players.json`.

> ⚠️ La Jornada 1 trae **marcadores de ejemplo** para que veas la tabla y el
> goleo funcionando. Bórralos (pon `"jugado": false, "marcador": null, "goles": []`)
> antes de publicar.

## Otros datos editables

- `src/data/teams.json` — nombre, abreviatura y color de cada equipo.
- `src/data/players.json` — la asignación jugador → equipo (`"equipo"`) es
  **provisional**; ajústala a los equipos reales.
- `public/img/cards/{id}.jpeg` — carta en tamaño completo (vista de detalle).
- `public/img/thumbs/{id}.jpeg` — miniatura comprimida (grids y listas).

Si agregas un jugador nuevo, usa el mismo `id` para su entrada en el JSON y
para sus dos imágenes.

## Fases eliminatorias

`matches.json` ya soporta el campo `"fase"` (`"regular"`, `"semifinal"`,
`"final"`). Agrega los partidos de liguilla con jornadas 4+ cuando termine
el round-robin.

## Publicar

`npm run build` genera `dist/`. El router usa hash (`/#/tabla`) y las rutas de
assets son relativas, así que funciona tal cual en GitHub Pages, Netlify o
Vercel sin configuración extra.
