import { Link } from 'react-router-dom'
import { teamById } from '../lib/stats.js'

export default function ScorerRow({ scorer, rank }) {
  const { jugador, goles } = scorer
  const team = teamById(jugador.equipo)
  const top = rank === 1

  return (
    <Link
      to={`/jugadores/${jugador.id}`}
      className={`notch-sm flex items-center justify-between gap-3 border bg-panel2 p-3.5 pr-4 transition-transform active:scale-[0.98] ${
        top ? 'border-l-2 border-line2 border-l-ember ember-glow' : 'border-line2'
      }`}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <span className={`display w-8 shrink-0 text-center text-4xl italic leading-none ${top ? 'text-ember' : 'text-smoke/30'}`}>
          {String(rank).padStart(2, '0')}
        </span>
        <img
          src={`img/thumbs/${jugador.id}.jpeg`}
          alt=""
          className="h-12 w-9 shrink-0 rounded object-cover object-top"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="display truncate text-xl italic leading-tight">{jugador.apodo}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="display bg-panel4 px-1.5 text-[11px] tracking-wide text-primary">{jugador.posicion}</span>
            {team && <span className="display truncate text-xs tracking-widest text-smoke">{team.nombre}</span>}
          </div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="display text-3xl italic leading-none text-flare">{goles}</div>
        <div className="display text-[9px] tracking-widest text-primary">GOLES</div>
      </div>
    </Link>
  )
}
