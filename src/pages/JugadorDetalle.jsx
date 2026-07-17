import { Link, useParams } from 'react-router-dom'
import { playerById, teamById, scorers } from '../lib/stats.js'

const STAT_LABELS = { rit: 'RIT', tir: 'TIR', pas: 'PAS', reg: 'REG', def: 'DEF', fis: 'FIS' }

function StatBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="display tracking-widest text-smoke">{label}</span>
        <span className="display text-flare">{value}</span>
      </div>
      <div className="mt-1 h-1.5 rounded bg-panel2" role="img" aria-label={`${label}: ${value} de 99`}>
        <div className="h-full rounded bg-ember" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function JugadorDetalle() {
  const { id } = useParams()
  const p = playerById(id)
  if (!p) {
    return <p className="text-smoke">Jugador no encontrado. <Link to="/jugadores" className="text-ember">Volver</Link></p>
  }
  const team = teamById(p.equipo)
  const goles = scorers().find((s) => s.jugador.id === id)?.goles ?? 0

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,380px)_1fr]">
      <img
        src={`img/cards/${p.id}.jpeg`}
        alt={`Carta de ${p.apodo}`}
        className="mx-auto w-full max-w-[380px] rounded-xl"
      />

      <div className="space-y-6">
        <header>
          <p className="display text-sm tracking-[0.3em] text-ember">{p.arquetipo}</p>
          <h1 className="display text-5xl leading-none">{p.apodo}</h1>
          <p className="mt-1 text-smoke">{p.nombre}</p>
          {p.frase && <p className="mt-2 italic text-bone/80">“{p.frase}”</p>}
        </header>

        <dl className="notch-sm grid grid-cols-2 gap-x-4 gap-y-2 border border-line bg-panel p-4 text-sm sm:grid-cols-3">
          <div><dt className="text-smoke">Equipo</dt><dd>
            {team ? (
              <Link to={`/equipos/${team.id}`} className="display text-lg text-flare hover:text-ember">{team.nombre}</Link>
            ) : '—'}
          </dd></div>
          <div><dt className="text-smoke">Posición</dt><dd className="display text-lg">{p.posicion}</dd></div>
          <div><dt className="text-smoke">Media</dt><dd className="display text-lg text-flare">{p.media}</dd></div>
          <div><dt className="text-smoke">Edad</dt><dd className="display text-lg">{p.edad}</dd></div>
          <div><dt className="text-smoke">Pie</dt><dd className="display text-lg">{p.pie}</dd></div>
          <div><dt className="text-smoke">Goles en el torneo</dt><dd className="display text-lg text-flare">{goles}</dd></div>
        </dl>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {Object.entries(p.stats).map(([k, v]) => (
            <StatBar key={k} label={STAT_LABELS[k] ?? k} value={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
