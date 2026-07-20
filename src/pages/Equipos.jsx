import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import { allTeams, playersOfTeam, standings } from '../lib/stats.js'
import liga from '../data/liga.json'

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
                    <TeamCrest team={t} size={36} />
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

      <section className="mt-10">
        <SectionTitle>Sede</SectionTitle>
        <a
          href={liga.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="notch flex items-center gap-4 border border-line2 bg-panel2 p-5 ember-glow transition-all hover:border-ember active:scale-[0.99]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember">
            <MapPin size={24} strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="display text-xl italic leading-tight">{liga.sede}</p>
            <p className="display text-xs tracking-widest text-smoke">Ver en Google Maps →</p>
          </div>
        </a>
      </section>
    </div>
  )
}
