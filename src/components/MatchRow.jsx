import { teamById, playerById, formatFecha } from '../lib/stats.js'

function Side({ team, align = 'left' }) {
  return (
    <div className={`flex min-w-0 items-center gap-2.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <span className="h-3.5 w-3.5 shrink-0 rotate-45 border border-line2" style={{ background: team.color }} aria-hidden />
      <span className="display truncate text-lg uppercase tracking-wide text-smoke">{team.nombre}</span>
    </div>
  )
}

export default function MatchRow({ match, showGoles = false }) {
  const local = teamById(match.local)
  const visitante = teamById(match.visitante)
  const played = match.jugado && match.marcador

  return (
    <article className={`notch-sm border bg-panel2 px-4 py-3.5 transition-transform active:scale-[0.99] ${
      played ? 'border-l-2 border-line2 border-l-ember ember-glow' : 'border-line2'
    }`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Side team={local} />
        {played ? (
          <div className="notch-sm flex items-center gap-2 bg-panel4 px-3 py-1">
            <span className="display text-2xl tabular-nums text-flare">{match.marcador.local}</span>
            <span className="display text-[11px] italic text-smoke">FINAL</span>
            <span className="display text-2xl tabular-nums text-flare">{match.marcador.visitante}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center px-2">
            <span className="display text-lg text-ember">VS</span>
            <span className="mt-0.5 text-[10px] uppercase text-smoke">{formatFecha(match.fecha)} · {match.hora}</span>
          </div>
        )}
        <Side team={visitante} align="right" />
      </div>
      {played && (
        <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-smoke">
          {formatFecha(match.fecha)} · {match.hora} h
        </p>
      )}
      {showGoles && played && match.goles?.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-line pt-2.5 text-sm">
          {match.goles.map((g) => {
            const p = playerById(g.jugador)
            return (
              <li key={g.jugador} className="text-smoke">
                <span className="mr-1 text-ember" aria-hidden>⚽</span>
                {p?.apodo ?? g.jugador}
                {g.cantidad > 1 && <span className="text-smoke/70"> ×{g.cantidad}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}
