# AGENTS.md

Guía para agentes de IA que trabajan en **Mundialito BEPRIME**.

## Qué es este proyecto

SPA estática (sin backend) para dar seguimiento a un torneo de fútbol: tabla de
posiciones, calendario/resultados, tabla de goleo, equipos y cartas de
jugadores estilo FIFA. **Todos los datos se derivan de JSON estáticos e
imágenes en el repo** — no hay base de datos ni API.

## Stack

- **React 18** + **React Router 6** (`HashRouter`, rutas tipo `/#/tabla`)
- **Vite 5** (`base: './'`, assets relativos → despliegue sin config en GitHub
  Pages / Netlify / Vercel)
- **Tailwind CSS 4** vía `@tailwindcss/vite` (tokens en `@theme`, no hay
  `tailwind.config`)
- **lucide-react** para íconos
- JavaScript puro (no TypeScript), ESM (`"type": "module"`)

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # genera dist/
npm run preview   # sirve el build
```

No hay tests, linter ni formatter configurados. No inventes scripts que no
existan en `package.json`.

## Estructura

```
src/
  main.jsx              # monta la app dentro de <HashRouter>
  App.jsx               # definición de rutas
  index.css             # @theme de Tailwind + clases utilitarias (.display, .notch)
  components/           # Layout, MatchRow, SectionTitle, StandingsTable
  lib/stats.js          # TODA la lógica derivada (standings, scorers, helpers)
  data/*.json           # fuente de verdad: matches, teams, players
  pages/                # una página por ruta
public/img/
  cards/{id}.jpeg       # carta tamaño completo (detalle)
  thumbs/{id}.jpeg      # miniatura (grids y listas)
```

## Reglas clave del dominio

- **La tabla de posiciones y la de goleo NO se editan a mano.** Se calculan en
  `src/lib/stats.js` (`standings()`, `scorers()`) a partir de `matches.json`.
  Si necesitas cambiar cómo se acumulan puntos/goles, edita ahí — nunca
  hardcodees resultados.
- **Registrar un resultado** = editar solo el partido en `src/data/matches.json`:
  `jugado: true`, `marcador: { local, visitante }`, y `goles: [{ jugador, cantidad }]`.
  El campo `jugador` referencia el `id` de `players.json`.
- **Puntos:** victoria 3, empate 1, derrota 0. Desempate: pts → diferencia de
  gol → goles a favor.
- **Fases:** `matches.json` soporta `fase: "regular" | "semifinal" | "final"`.

## Relaciones entre datos (mantener consistentes)

- `players[].equipo` debe ser un `id` válido de `teams.json`.
- `matches[].local` / `.visitante` deben ser `id`s válidos de `teams.json`.
- `goles[].jugador` debe ser un `id` válido de `players.json`.
- Un jugador nuevo requiere el **mismo `id`** en `players.json`, en
  `public/img/cards/{id}.jpeg` y en `public/img/thumbs/{id}.jpeg`.
- `players[].posicion` es `POR | DEF | MED | DEL` (orden usado por
  `sortByPosition`).

## Convenciones de código

- Componentes funcionales con `export default`; extensión `.jsx`.
- Estilos con clases utilitarias de Tailwind. Usa los **tokens de color del
  tema** (`ember`, `flare`, `bone`, `smoke`, `pitch`, `panel`, `line`) en vez de
  colores arbitrarios; están definidos en `src/index.css` bajo `@theme`.
- Tipografía: clase `.display` para titulares (Barlow Condensed, mayúsculas).
- La lógica derivada de datos vive en `lib/stats.js`, no en los componentes.
- Español para UI y comentarios, siguiendo el código existente.

## Al terminar un cambio

- Corre `npm run build` para verificar que compila (no hay CI ni tests).
- **No es un repositorio git** — no ejecutes comandos git salvo que el usuario
  lo pida explícitamente.
- Recuerda: la Jornada 1 en `matches.json` trae marcadores **de ejemplo**; no
  los tomes como datos reales.


## Organización de equipos

TeamName: Cachonditos FC 

Logo: cachonditos-logo.png

Equipo: 
- atzin.jpeg
- vazquez.jpeg
- mane.jpeg
- sifon.jpeg
- jarvism.jpeg
---

TeamName: FC INN

Logo: inn-logo.png

Equipo:
- rauliin.jpeg
- toriyama.jpeg
- ian.jpeg
- elkaiser.jpeg
- jorgin.jpeg
---

TeamName: Matha Gordaz

Logo: matha-logo.png

Equipo:
- pepin14.jpeg
- johan.jpeg
- carlitos.jpeg
- diegool.jpeg
- ceron.jpeg
---

TeamName: Fuckboys FC 

Logo: fuckboys-logo

Equipo:
- silla.jpeg
- alejandro.jpeg
- gutti.jpeg
- santana.jpeg
- quimin.jpeg
---

## FECHAS
LA PRIMERA JORNADA ES EL JUEVES 23 DE JULIO. 

PRIMER PARTIDO INICIA A LAS 7:30 ( FC INN VS DEPORTIVO MATHA G.)

SEGUNDO PARTIDO INICIA 8:30 (FUCKBOYS FC VS CACHONDITOS FC).

SEGUNDA JORNADA SERA EL MIERCOLES 29 DE JULIO.

PRIMER PARTIDO INICIA 7:30 (FUCKBOYS VS DEPORTIVO MATHA G.)

SEGUNDO PARTIDO 8:30 (FC INN VS CACHONDITOS)

## LUGAR 
Parque Deportivo 20 de Noviembre

https://maps.app.goo.gl/yk7qxKQMfiBj3PoB9?g_st=ic
