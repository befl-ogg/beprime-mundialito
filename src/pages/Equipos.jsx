import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import { allTeams, playersOfTeam, standings } from '../lib/stats.js'

export default function Equipos() {
  const table = standings()
  const rankById = Object.fromEntries(table.map((r, i) => [r.equipo.id, i + 1]))
  const teams = [...allTeams].sort((a, b) => (rankById[a.id] ?? 99) - (rankById[b.id] ?? 99))

  return (
    <div>
      <SectionTitle>Equipos del torneo</SectionTitle>
      <div className="space-y-4">
        {teams.map((t) => {
          const roster = playersOfTeam(t.id)
          const rank = rankById[t.id]
          return (
            <Link
              key={t.id}
              to={`/equipos/${t.id}`}
              className="notch block border border-line2 bg-panel2 p-5 ember-glow transition-all hover:border-ember active:scale-[0.99]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  {rank && (
                    <span className={`display text-xs tracking-widest ${rank === 1 ? 'text-ember' : 'text-smoke'}`}>
                      Posición: {rank}º
                    </span>
                  )}
                  <h3 className="display flex items-center gap-2.5 text-3xl italic leading-tight">
                    <span className="h-5 w-5 shrink-0 rotate-45 border border-line2" style={{ background: t.color }} aria-hidden />
                    {t.nombre}
                  </h3>
                </div>
                <div className="shrink-0 text-right">
                  <span className="display block text-3xl italic text-flare">{roster.length}</span>
                  <span className="display text-[10px] tracking-widest text-smoke">Plantilla</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {roster.slice(0, 8).map((p) => (
                  <img
                    key={p.id}
                    src={`img/thumbs/${p.id}.jpeg`}
                    alt={p.apodo}
                    className="h-16 w-11 rounded border border-line2 object-cover object-top"
                    loading="lazy"
                  />
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
