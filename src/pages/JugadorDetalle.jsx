import { Link, useParams } from 'react-router-dom'
import PlayerImage from '../components/PlayerImage.jsx'
import { playerById, teamById, scorers } from '../lib/stats.js'

const STAT_LABELS = { rit: 'Ritmo', tir: 'Tiro', pas: 'Pase', reg: 'Regate', def: 'Defensa', fis: 'Físico' }

function StatBar({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="flex items-end justify-between">
        <span className="display text-sm tracking-widest text-smoke">{label}</span>
        <span className="display text-lg text-ember">{value}</span>
      </div>
      <div className="h-2 bg-panel4" role="img" aria-label={`${label}: ${value} de 99`}>
        <div className="h-full bg-ember" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function InfoCell({ label, value, accent = false }) {
  return (
    <div className="notch-sm border-l-2 border-line2 border-l-ember/40 bg-panel px-4 py-3">
      <p className="display text-[10px] tracking-widest text-smoke">{label}</p>
      <p className={`display text-xl italic ${accent ? 'text-flare' : ''}`}>{value}</p>
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
    <div className="grid gap-8 md:grid-cols-[minmax(0,360px)_1fr]">
      <div className="notch-corner mx-auto w-full max-w-[360px] overflow-hidden ember-glow-tr">
        <PlayerImage
          id={p.id}
          equipoId={p.equipo}
          variant="card"
          alt={`Carta de ${p.apodo}`}
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      <div className="space-y-8">
        <header>
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-block h-5 w-1 bg-ember" aria-hidden />
            <p className="display text-xs tracking-[0.25em] text-smoke">Perfil de élite</p>
          </div>
          <div className="flex items-end justify-between gap-3">
            <h1 className="display text-5xl italic leading-none text-primary">{p.apodo}</h1>
            <div className="shrink-0 text-right">
              <span className="display text-4xl italic leading-none text-primary">{p.media}</span>
              <p className="display text-[10px] tracking-widest text-smoke">GRL</p>
            </div>
          </div>
          <p className="mt-1 text-smoke">{p.nombre}</p>
          <p className="display text-xs italic tracking-wide text-flare">{p.arquetipo}</p>
          {p.frase && <p className="mt-2 italic text-bone/70">“{p.frase}”</p>}
        </header>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block h-5 w-1 bg-ember" aria-hidden />
            <h2 className="display text-sm tracking-[0.2em] text-smoke">Atributos clave</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {Object.entries(p.stats).map(([k, v]) => (
              <StatBar key={k} label={STAT_LABELS[k] ?? k} value={v} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <InfoCell label="Equipo" value={
            team ? <Link to={`/equipos/${team.id}`} className="text-flare hover:text-ember">{team.nombre}</Link> : '—'
          } />
          <InfoCell label="Posición" value={p.posicion} />
          <InfoCell label="Edad" value={`${p.edad} años`} />
          <InfoCell label="Pie hábil" value={p.pie} />
          <InfoCell label="Goles" value={goles} accent />
          <InfoCell label="Torneo" value="Apertura" />
        </section>
      </div>
    </div>
  )
}
