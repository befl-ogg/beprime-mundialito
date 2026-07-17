import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import { allTeams, playersOfTeam } from '../lib/stats.js'

export default function Equipos() {
  return (
    <div>
      <SectionTitle>Equipos</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {allTeams.map((t) => {
          const roster = playersOfTeam(t.id)
          return (
            <Link
              key={t.id}
              to={`/equipos/${t.id}`}
              className="notch border border-line bg-panel p-4 transition-colors hover:border-ember/60"
            >
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rotate-45 rounded-sm" style={{ background: t.color }} aria-hidden />
                <div>
                  <p className="display text-2xl leading-none">{t.nombre}</p>
                  <p className="text-xs text-smoke">{roster.length} jugadores</p>
                </div>
              </div>
              <div className="mt-3 flex -space-x-2">
                {roster.map((p) => (
                  <img
                    key={p.id}
                    src={`img/thumbs/${p.id}.jpeg`}
                    alt={p.apodo}
                    className="h-14 w-10 rounded border border-line object-cover object-top"
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
