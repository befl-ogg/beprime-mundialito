---
proyecto: "Mundialito BEPRIME"
framework: AIDAS
version: "0.3"
tipo: fullstack
modo: documentacion-retroactiva
stack: "React 18 + React Router 6 (HashRouter) + Vite 5 + Tailwind CSS 4, JS ESM, sin backend"
fase-actual: discovery
ultimo-session-log: "2026-07-25-gitignore-aidas"
tags: [aidas, agents]
---

# AGENTS.md — Mundialito BEPRIME

> Constitución del proyecto. Lo primero que se lee en cada sesión.
> Al iniciar: leer este archivo + el último session log en `docs/sessions/`.
>
> Este proyecto fue documentado retroactivamente con AIDAS (modo Arqueología):
> `docs/` se generó a partir del código existente. Los artefactos marcados como
> `draft`/`[pendiente]` requieren validación humana antes de usarse como fuente
> de verdad.

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
  components/           # Layout, MatchRow, ScorerRow, SectionTitle, StandingsTable, TeamCrest
  lib/stats.js          # TODA la lógica derivada (standings, scorers, helpers)
  data/*.json           # fuente de verdad: matches, teams, players, liga
  pages/                # una página por ruta
public/img/
  cards/{id}.jpeg       # carta tamaño completo (detalle)
  thumbs/{id}.jpeg      # miniatura (grids y listas)
  logos/                # logos de equipos
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
  Hoy solo hay datos de la fase `regular`.

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
  tema** (`ember`, `flare`, `bone`, `smoke`, `pitch`, `panel`, `line`,
  `primary`) en vez de colores arbitrarios; están definidos en `src/index.css`
  bajo `@theme`.
- Tipografía: clase `.display` para titulares (Barlow Condensed, mayúsculas).
- La lógica derivada de datos vive en `lib/stats.js`, no en los componentes.
- Español para UI y comentarios, siguiendo el código existente.

## Al terminar un cambio

- Corre `npm run build` para verificar que compila (no hay CI ni tests).
- Este proyecto **sí** es un repositorio git; realiza commits solo cuando el
  usuario lo pida explícitamente.

---

## Framework AIDAS

AIDAS v0.3 — referencia completa: [[docs/AIDAS]]

## Documentación (docs/)

- `docs/sessions/` — continuidad entre sesiones
- `docs/inception/` — project-brief, scope (aprobado), stakeholders, assumptions
- `docs/discovery/` — personas, stories (implementadas + backlog), RFs, RNF
- `docs/architecture/` — tech-stack, system-diagram, data-model, ADRs
- `docs/specs/` — specs SDD por feature (pendiente; usar `/new-spec`)
- `docs/shipment/` — checklist, runbook, monitor (pendiente)
- `docs/UI-UX-BRIEF.md` y `docs/stitch/` — material de diseño previo (preexistente)

## Skills disponibles

Los skills viven en `.agent-skills/` (fuente de verdad). Claude Code los
descubre vía symlink en `.claude/skills/`. Invocar con `/nombre`:
`/inception`, `/new-story`, `/new-spec`, `/review-spec`, `/gen-tasks`, `/close-session`.

## Reglas AIDAS

1. Leer el último session log al iniciar cada sesión.
2. No implementar sin spec aprobada en `docs/specs/`.
3. Orden de construcción: datos (JSON) → lógica derivada (`lib/stats.js`) → UI → verificación.
4. Decisiones importantes → ADR en `docs/architecture/adr/`.
5. Cerrar con el skill `close-session` antes de parar.
6. Nada se asume — si no está en la spec o el dato, preguntar.

## Estado de la documentación retroactiva

- `docs/inception/`    → completo (draft; scope aprobado)
- `docs/discovery/`    → completo (draft — validar personas y stories)
- `docs/architecture/` → completo (draft — ADRs retroactivos)
- `docs/specs/`        → pendiente (construir por feature con `/new-spec`)
- `docs/shipment/`     → pendiente

## Estado actual

- **Fase:** Discovery (documentación retroactiva)
- **Último session log:** [[docs/sessions/2026-07-25-gitignore-aidas]]
- **Próximo paso:** validar documentación `draft`/`[pendiente]`; decidir npm vs pnpm
- **Preguntas abiertas:** métricas de éxito, npm vs pnpm, hosting, semifinal/final
- **Nota git:** AIDAS (AGENTS.md, docs AIDAS, `.agent-skills/`, `.claude/`) está
  gitignored — fuente de verdad **local**, no versionada. Cambios sin commitear.

## Links

- [[docs/sessions/_index]]
- [[docs/inception/project-brief]]
- [[docs/discovery/stories/_index]]
- [[docs/AIDAS]]
