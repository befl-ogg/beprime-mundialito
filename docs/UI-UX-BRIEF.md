# Brief de UI/UX — Mundialito BEPRIME

Documento de handoff para un agente especializado en mejorar la interfaz y la
experiencia de usuario. Describe el estado **actual** de la app, su sistema de
diseño, cada pantalla, la interacción entre componentes y las restricciones
técnicas a respetar.

---

## 1. Qué es el producto

SPA estática (sin backend) para seguir un torneo de fútbol amateur (**Mundialito
BEPRIME**). La identidad visual imita las **cartas coleccionables tipo FIFA
Ultimate Team**: cada jugador tiene una "carta" con foto, media y stats. La app
consume JSON estáticos e imágenes del repo; toda la lógica (tabla de posiciones,
goleo) se **deriva** de los partidos.

- **Idioma:** español (México). Todo el copy y los labels van en español.
- **Público:** jugadores del torneo y sus allegados, mayormente en **móvil**.
- **Objetivo UX:** consulta rápida y "presumible" — ver resultados, mi carta,
  la tabla y el goleo en segundos, con estética de videojuego.

---

## 2. Stack técnico y restricciones (importante para el agente)

- **React 18 + React Router 6** con `HashRouter` (rutas tipo `/#/tabla`).
- **Vite 5**, `base: './'` (todas las rutas de assets son **relativas**).
- **Tailwind CSS 4** vía `@tailwindcss/vite`. **No existe `tailwind.config.js`**;
  los tokens de tema se definen con `@theme` en `src/index.css`.
- **lucide-react** para iconografía.
- JavaScript puro (no TypeScript). Sin tests ni linter.
- Se despliega en **GitHub Pages** — no romper la relatividad de assets ni el
  esquema de rutas hash.

**Restricciones de diseño a respetar:**
- Las imágenes de cartas tienen **ratio vertical tipo carta** (`cards/{id}.jpeg`
  a tamaño completo, `thumbs/{id}.jpeg` como miniatura). Cualquier layout debe
  preservar ese aspecto y no deformarlas (`object-cover object-top`).
- No introducir dependencias pesadas sin justificación; el proyecto es liviano.
- Mantener accesibilidad ya presente (ver §6).

---

## 3. Sistema de diseño actual

### Paleta (tokens en `src/index.css` → `@theme`)
| Token | Hex | Uso |
|---|---|---|
| `pitch` | `#0b0b0c` | Fondo global (casi negro) |
| `panel` | `#151517` | Superficies / tarjetas |
| `panel2` | `#1b1b1e` | Superficie secundaria (marcadores, barras) |
| `line` | `#26262b` | Bordes y divisores |
| `ember` | `#f97d1c` | **Acento primario** (naranja brasa): activos, CTAs, PTS |
| `flare` | `#ffa24d` | Acento secundario (naranja claro): números destacados |
| `bone` | `#efeae0` | Texto principal (blanco hueso) |
| `smoke` | `#8e8e96` | Texto secundario / metadatos |

Tema **oscuro** de un solo modo. El acento naranja evoca "brasa/estadio".
Los colores por equipo vienen del dato (`teams.json → color`) y se usan como
punto/diamante identificador.

### Tipografía
- **Display:** `Barlow Condensed` (clase `.display`): mayúsculas, `800`,
  tracking amplio. Para todos los titulares, nombres, números.
- **Body:** `Barlow` para texto corrido.
- Las fuentes **sí se cargan** vía `<link>` a Google Fonts en `index.html`. El
  rediseño Stitch añade la variante **itálica 800** (titulares en cursiva), que
  se incorporó al `<link>`.

### Firma visual (motivos recurrentes)
- **`.notch` / `.notch-sm`:** `clip-path` que bisela las 8 esquinas → evoca el
  marco de una carta. Se usa en tarjetas, tablas y botones.
- **Diamante de color:** cuadrado rotado 45° con el color del equipo (`rotate-45`),
  usado como "escudo" abstracto en todos lados.
- **`.ember-glow`:** gradientes radiales naranjas muy sutiles en el fondo del
  layout (esquinas superior-derecha e inferior-izquierda).
- Acento de sección: barrita naranja vertical antes de cada `SectionTitle`.
- `tabular-nums` en marcadores y tabla para alinear cifras.
- Respeta `prefers-reduced-motion` (transiciones anuladas).

---

## 4. Navegación y estructura

`HashRouter` con layout persistente (`Layout.jsx`) que envuelve todas las rutas.

**Rutas:**
| Ruta | Pantalla |
|---|---|
| `/` | Home (resumen) |
| `/tabla` | Tabla de posiciones + goleo |
| `/partidos` | Calendario/resultados por jornada |
| `/equipos` | Grid de equipos |
| `/equipos/:id` | Detalle de equipo (plantilla + partidos) |
| `/jugadores` | Grid de jugadores con filtro por posición |
| `/jugadores/:id` | Detalle de jugador (carta grande + stats) |
| `*` | Cae a Home |

**Navegación (`Layout.jsx`):**
- **Desktop (`md+`):** header sticky con logo a la izquierda y nav horizontal a
  la derecha (Inicio, Tabla, Partidos, Equipos, Jugadores), cada uno con icono
  lucide + label.
- **Móvil:** header sticky solo con logo + **tab bar inferior fija** de 5
  columnas (respeta `safe-area-inset-bottom`). Estado activo en `ember`.
- Ancho máximo de contenido: `max-w-5xl`, padding lateral `px-4`.

---

## 5. Pantallas en detalle

### Home (`/`)
Tres secciones apiladas (`space-y-8`):
1. **Próxima jornada** — hasta 2 próximos partidos (`MatchRow`) + link "Ver todo →".
2. **Últimos resultados** — hasta 2 partidos jugados.
3. **Goleo** (top 3) y probablemente tabla compacta (usa `StandingsTable` y `scorers`).
- Estado vacío: mensaje en tarjeta cuando no hay partidos pendientes.

### Tabla (`/tabla`)
- **Tabla de posiciones** (`StandingsTable`, versión completa: PJ, PG, PE, PP,
  GF, GC, DIF, PTS). Columna PTS resaltada en `ember`/`flare`. Filas enlazan al
  detalle del equipo. Scroll horizontal en móvil (`overflow-x-auto`,
  `min-w-[320px]`).
- Nota de criterios de desempate.
- **Tabla de goleo:** lista ordenada (posición, apodo, posición del jugador,
  goles en `flare`). Cada fila enlaza al jugador. Estado vacío contemplado.

### Partidos (`/partidos`)
- Secciones por **jornada** (`matchesByJornada`), cada una con sus `MatchRow`
  (`showGoles` activo → muestra anotadores). Soporta fases eliminatorias vía
  campo `fase` en el dato.

### Equipos (`/equipos`)
- Grid 1→2 columnas. Cada tarjeta (`.notch`): diamante de color + nombre +
  conteo de jugadores + fila de miniaturas superpuestas (`-space-x-2`).
- Hover: borde cambia a `ember/60`.

### Detalle de equipo (`/equipos/:id`)
- Header con diamante grande + nombre.
- **Plantilla:** grid de cartas (thumbs) 2→5 columnas, ordenada por posición
  (POR→DEF→MED→DEL), con `posición · media` debajo. Hover: leve zoom (`scale-1.03`).
- **Partidos** del equipo (`MatchRow` con goles).
- Manejo de equipo no encontrado.

### Jugadores (`/jugadores`)
- **Filtro por posición:** tablist (TODOS/POR/DEF/MED/DEL) con botones estilo
  chip (`.notch-sm`); activo en fondo `ember` texto `pitch`.
- Grid de cartas (thumbs) 2→5 columnas, ordenado por **media desc**.
- `role="tablist"`/`aria-selected` ya implementados.

### Detalle de jugador (`/jugadores/:id`)
- Layout 2 columnas en `md+` (carta grande a la izq., datos a la der.), apilado
  en móvil.
- **Carta completa** (`cards/{id}.jpeg`).
- Header: arquetipo (en `ember`), apodo enorme, nombre real, frase (si existe).
- **Ficha** (`dl`): equipo (enlace), posición, media, edad, pie, goles en torneo.
- **Stats:** 6 barras de progreso (RIT, TIR, PAS, REG, DEF, FIS) sobre escala
  0–99, relleno `ember`. `StatBar` con `role="img"` + `aria-label`.
- Manejo de jugador no encontrado.

---

## 6. Componentes reutilizables

- **`Layout`** — shell (header + nav desktop + tab bar móvil + `<Outlet/>`).
- **`SectionTitle`** — título de sección con barrita `ember` y `action` opcional.
- **`MatchRow`** — fila de partido: dos equipos (diamante + nombre), marcador o
  "VS", fecha/hora, y opcionalmente lista de goleadores. Grid `1fr auto 1fr`.
- **`StandingsTable`** — tabla de posiciones, prop `compact` (3 cols vs 8 cols).

**Modelo de datos que consumen (`src/lib/stats.js`):**
`standings()`, `scorers()`, `playedMatches()`, `upcomingMatches()`,
`matchesByJornada()`, `teamById`, `playerById`, `playersOfTeam`,
`sortByPosition`, `formatFecha`. El agente **no debe** cambiar la firma de estos
helpers; solo consumirlos.

---

## 7. Accesibilidad (estado actual — mantener/mejorar)

Ya implementado: `aria-hidden` en elementos decorativos, `aria-label` en navs y
barras de stats, `focus-visible` con outline `ember`, `role="tablist"` en el
filtro, `prefers-reduced-motion`, `loading="lazy"` en imágenes, alt descriptivos.

A vigilar: contraste de `smoke` (#8e8e96) sobre `panel` en textos pequeños;
tamaño de tap targets en la tab bar móvil; foco visible en cartas-enlace.

---

## 8. Oportunidades de mejora sugeridas (no exhaustivas)

Para orientar al agente; puede proponer más:
1. **Titulares en itálica 800** (variante añadida) — refuerzo del look FUT.
2. **Jerarquía y densidad en móvil** — la app es mobile-first; revisar espaciados,
   tamaños de marcador y legibilidad de la tabla con scroll horizontal.
3. **Estados vacíos y de carga** más ricos (hay algunos textos, faltan otros).
4. **Realce del "momento carta"** — micro-interacciones al abrir el detalle del
   jugador (respetando `prefers-reduced-motion`), brillo/holograma sutil.
5. **Diferenciación visual de fases** (regular vs semifinal/final) en Partidos.
6. **Indicadores en la tabla** (zona de clasificación/eliminación, forma reciente).
7. **Consistencia del sistema** — unificar radios (`.notch` vs `rounded-lg` en
   cartas), tamaños tipográficos y uso de `ember` vs `flare`.
8. **Feedback de interacción** — hover/active/focus coherentes en todos los
   elementos clicables (tarjetas de equipo, filas, chips).

---

## 9. Cómo correr para inspeccionar

```bash
npm install
npm run dev      # http://localhost:5173
```

---

## 10. Referencia visual — diseños Stitch (fuente de verdad)

Los 7 screens generados en Google Stitch viven en `docs/stitch/<screen>/`
(cada carpeta con `index.html` = HTML+Tailwind y `screenshot` = captura). Son la
**fuente de verdad visual** del rediseño implementado en el código.

| Screen | Carpeta | Ruta app |
|---|---|---|
| Inicio | `docs/stitch/inicio/` | `/` |
| Tabla + Goleo | `docs/stitch/tabla/` | `/tabla` |
| Partidos | `docs/stitch/partidos/` | `/partidos` |
| Equipos | `docs/stitch/equipos/` | `/equipos` |
| Detalle de Equipo | `docs/stitch/equipo-detalle/` | `/equipos/:id` |
| Jugadores | `docs/stitch/jugadores/` | `/jugadores` |
| Jugador | `docs/stitch/jugador/` | `/jugadores/:id` |

### Tokens extraídos de Stitch (paleta Material cálida)
- `primary` **#ffb68b** (durazno) — wordmark, nav activa, nombre de jugador, "GRL".
- `primary-container` / `ember` **#f97d1c** — barras de acento, PTS, números grandes, bordes activos.
- `flare` **#ffdbc8** — números destacados (marcadores, goles).
- `on-surface` **#e5e2e3** — texto principal.
- `on-surface-variant` **#dec1b0** — texto secundario cálido (reemplaza el `smoke` frío).
- `surface` **#131314**, `surface-container` **#201f20**, `-low` **#1c1b1c**,
  `-high` **#2a2a2b**, `-highest` **#353436**.
- `outline-variant` **#574236** — bordes cálidos.
- Fondo `pitch` **#0b0b0c**.

### Firmas visuales del rediseño
- Titulares **uppercase itálica 800** (Barlow Condensed), con barrita `ember` a la izquierda.
- **Diamantes** (cuadrado rotado 45°) con el color del equipo como escudo.
- Contenedores con **notch** (esquinas biseladas) + **ember-glow** sutil.
- Cartas de jugador con **badge de media** sobreimpuesto y corte de esquina FUT.
- Barras de stats segmentadas con relleno `ember`.
- Micro-interacción `active:scale` en elementos clicables (respeta `prefers-reduced-motion`).

> Nota de adaptación: Stitch exporta HTML plano con Material Symbols y datos de
> ejemplo. En el código se adaptó a **React + Tailwind 4** reusando los helpers de
> `stats.js`, manteniendo **lucide-react** para iconos y los datos reales de los JSON.
La Jornada 1 trae marcadores de ejemplo, útil para ver tabla y goleo poblados.
