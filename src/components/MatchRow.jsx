import { teamById, playerById, formatFecha } from '../lib/stats.js'

function Side({ team, align = 'left' }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <span className="h-3 w-3 shrink-0 rotate-45" style={{ background: team.color }} aria-hidden />
      <span className="display truncate text-lg text-bone">{team.nombre}</span>
    </div>
  )
}

export default function MatchRow({ match, showGoles = false }) {
  const local = teamById(match.local)
  const visitante = teamById(match.visitante)
  const played = match.jugado && match.marcador

  return (
    <article className="notch-sm border border-line bg-panel px-4 py-3">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Side team={local} />
        {played ? (
          <div className="display rounded bg-panel2 px-3 py-1 text-2xl tabular-nums text-flare">
            {match.marcador.local}<span className="mx-1 text-smoke">–</span>{match.marcador.visitante}
          </div>
        ) : (
          <div className="display px-2 text-sm tracking-widest text-smoke">VS</div>
        )}
        <Side team={visitante} align="right" />
      </div>
      <p className="mt-2 text-center text-xs text-smoke">
        {formatFecha(match.fecha)} · {match.hora} h
      </p>
      {showGoles && played && match.goles?.length > 0 && (
        <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-line pt-2 text-sm">
          {match.goles.map((g) => {
            const p = playerById(g.jugador)
            return (
              <li key={g.jugador} className="text-bone">
                <span className="mr-1 text-ember" aria-hidden>⚽</span>
                {p?.apodo ?? g.jugador}
                {g.cantidad > 1 && <span className="text-smoke"> ×{g.cantidad}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}
