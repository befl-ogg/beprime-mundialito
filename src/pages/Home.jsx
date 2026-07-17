import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import MatchRow from '../components/MatchRow.jsx'
import StandingsTable from '../components/StandingsTable.jsx'
import { upcomingMatches, playedMatches, scorers } from '../lib/stats.js'

const VerTodo = ({ to }) => (
  <Link to={to} className="display text-sm tracking-widest text-ember hover:text-flare">
    Ver todo →
  </Link>
)

export default function Home() {
  const proximos = upcomingMatches().slice(0, 2)
  const ultimos = playedMatches().slice(0, 2)
  const goleo = scorers().slice(0, 3)

  return (
    <div className="space-y-8">
      <section>
        <SectionTitle action={<VerTodo to="/partidos" />}>Próxima jornada</SectionTitle>
        {proximos.length > 0 ? (
          <div className="space-y-3">
            {proximos.map((m) => <MatchRow key={m.id} match={m} />)}
          </div>
        ) : (
          <p className="notch-sm border border-line bg-panel px-4 py-6 text-center text-smoke">
            No hay partidos pendientes. Agrega la siguiente fase en <code>matches.json</code>.
          </p>
        )}
      </section>

      {ultimos.length > 0 && (
        <section>
          <SectionTitle action={<VerTodo to="/partidos" />}>Últimos resultados</SectionTitle>
          <div className="space-y-3">
            {ultimos.map((m) => <MatchRow key={m.id} match={m} showGoles />)}
          </div>
        </section>
      )}

      <section>
        <SectionTitle action={<VerTodo to="/tabla" />}>Tabla</SectionTitle>
        <StandingsTable compact />
      </section>

      {goleo.length > 0 && (
        <section>
          <SectionTitle>Goleo</SectionTitle>
          <ol className="notch-sm divide-y divide-line border border-line bg-panel">
            {goleo.map((s, i) => (
              <li key={s.jugador.id}>
                <Link
                  to={`/jugadores/${s.jugador.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-panel2"
                >
                  <span className="display w-6 text-xl text-smoke">{i + 1}</span>
                  <img
                    src={`img/thumbs/${s.jugador.id}.jpeg`}
                    alt=""
                    className="h-12 w-9 rounded object-cover object-top"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="display text-lg leading-tight">{s.jugador.apodo}</p>
                    <p className="truncate text-xs text-smoke">{s.jugador.nombre}</p>
                  </div>
                  <span className="display text-2xl text-flare">{s.goles}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
