import matches from '../data/matches.json'
import teams from '../data/teams.json'
import players from '../data/players.json'

export const allMatches = matches
export const allTeams = teams
export const allPlayers = players

export const teamById = (id) => teams.find((t) => t.id === id)
export const playerById = (id) => players.find((p) => p.id === id)
export const playersOfTeam = (teamId) =>
  players.filter((p) => p.equipo === teamId)

const POS_ORDER = { POR: 0, DEF: 1, MED: 2, DEL: 3 }
export const sortByPosition = (list) =>
  [...list].sort((a, b) => (POS_ORDER[a.posicion] ?? 9) - (POS_ORDER[b.posicion] ?? 9))

/** Tabla de posiciones derivada únicamente de matches.json */
export function standings() {
  const rows = Object.fromEntries(
    teams.map((t) => [t.id, { equipo: t, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 }])
  )
  for (const m of matches) {
    if (!m.jugado || !m.marcador) continue
    const L = rows[m.local]
    const V = rows[m.visitante]
    if (!L || !V) continue
    L.pj++; V.pj++
    L.gf += m.marcador.local; L.gc += m.marcador.visitante
    V.gf += m.marcador.visitante; V.gc += m.marcador.local
    if (m.marcador.local > m.marcador.visitante) { L.pg++; V.pp++ }
    else if (m.marcador.local < m.marcador.visitante) { V.pg++; L.pp++ }
    else { L.pe++; V.pe++ }
  }
  return Object.values(rows)
    .map((r) => ({ ...r, dif: r.gf - r.gc, pts: r.pg * 3 + r.pe }))
    .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf)
}

/** Tabla de goleo derivada de los goles registrados por partido */
export function scorers() {
  const tally = {}
  for (const m of matches) {
    if (!m.jugado) continue
    for (const g of m.goles ?? []) {
      tally[g.jugador] = (tally[g.jugador] ?? 0) + g.cantidad
    }
  }
  return Object.entries(tally)
    .map(([id, goles]) => ({ jugador: playerById(id), goles }))
    .filter((s) => s.jugador)
    .sort((a, b) => b.goles - a.goles || b.jugador.media - a.media)
}

export const playedMatches = () =>
  matches.filter((m) => m.jugado).sort((a, b) => b.fecha.localeCompare(a.fecha))

export const upcomingMatches = () =>
  matches.filter((m) => !m.jugado).sort((a, b) => a.fecha.localeCompare(b.fecha))

export const matchesByJornada = () => {
  const map = new Map()
  for (const m of matches) {
    if (!map.has(m.jornada)) map.set(m.jornada, [])
    map.get(m.jornada).push(m)
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0])
}

export function formatFecha(iso) {
  const [y, mo, d] = iso.split('-').map(Number)
  return new Date(y, mo - 1, d).toLocaleDateString('es-MX', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}
