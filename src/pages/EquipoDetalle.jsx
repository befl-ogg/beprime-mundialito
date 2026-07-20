import { Link, useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import MatchRow from '../components/MatchRow.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import { teamById, playersOfTeam, sortByPosition, allMatches, standings } from '../lib/stats.js'

export default function EquipoDetalle() {
  const { id } = useParams()
  const team = teamById(id)
  if (!team) {
    return <p className="text-smoke">Equipo no encontrado. <Link to="/equipos" className="text-ember">Volver</Link></p>
  }
  const roster = sortByPosition(playersOfTeam(id))
  const partidos = allMatches.filter((m) => m.local === id || m.visitante === id)
  const table = standings()
  const idx = table.findIndex((r) => r.equipo.id === id)
  const row = table[idx]
  const rank = idx >= 0 ? idx + 1 : null

  return (
    <div className="space-y-10">
      <header className="flex flex-col items-center text-center">
        <TeamCrest team={team} size={112} className="mb-4" />
        <h1 className="display text-4xl italic md:text-5xl">{team.nombre}</h1>
        {row && (
          <dl className="notch mt-6 grid w-full max-w-md grid-cols-3 border border-line2 bg-panel2 p-4 ember-glow">
            <div className="flex flex-col items-center">
              <dt className="display text-[10px] tracking-widest text-smoke">Posición</dt>
              <dd className="display text-2xl italic text-ember">{rank}º</dd>
            </div>
            <div className="flex flex-col items-center border-x border-line">
              <dt className="display text-[10px] tracking-widest text-smoke">Jugados</dt>
              <dd className="display text-2xl italic">{row.pj}</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="display text-[10px] tracking-widest text-smoke">Puntos</dt>
              <dd className="display text-2xl italic text-flare">{row.pts}</dd>
            </div>
          </dl>
        )}
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
              <p className="display mt-1.5 text-center text-sm tracking-wide text-smoke group-hover:text-primary">
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
