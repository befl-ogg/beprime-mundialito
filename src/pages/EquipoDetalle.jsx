import { Link, useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import MatchRow from '../components/MatchRow.jsx'
import { teamById, playersOfTeam, sortByPosition, allMatches } from '../lib/stats.js'

export default function EquipoDetalle() {
  const { id } = useParams()
  const team = teamById(id)
  if (!team) {
    return <p className="text-smoke">Equipo no encontrado. <Link to="/equipos" className="text-ember">Volver</Link></p>
  }
  const roster = sortByPosition(playersOfTeam(id))
  const partidos = allMatches.filter((m) => m.local === id || m.visitante === id)

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <span className="h-10 w-10 rotate-45 rounded-sm" style={{ background: team.color }} aria-hidden />
        <h1 className="display text-4xl">{team.nombre}</h1>
      </header>

      <section>
        <SectionTitle>Plantilla</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {roster.map((p) => (
            <Link key={p.id} to={`/jugadores/${p.id}`} className="group">
              <img
                src={`img/thumbs/${p.id}.jpeg`}
                alt={`Carta de ${p.apodo}`}
                className="w-full rounded-lg transition-transform group-hover:scale-[1.03]"
                loading="lazy"
              />
              <p className="display mt-1 text-center text-sm text-smoke group-hover:text-bone">
                {p.posicion} · {p.media}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Partidos</SectionTitle>
        <div className="space-y-3">
          {partidos.map((m) => <MatchRow key={m.id} match={m} showGoles />)}
        </div>
      </section>
    </div>
  )
}
