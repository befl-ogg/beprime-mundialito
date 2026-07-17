import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import MatchRow from '../components/MatchRow.jsx'
import StandingsTable from '../components/StandingsTable.jsx'
import ScorerRow from '../components/ScorerRow.jsx'
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
    <div className="space-y-10">
      <section>
        <SectionTitle action={<VerTodo to="/partidos" />}>Próxima jornada</SectionTitle>
        {proximos.length > 0 ? (
          <div className="space-y-3">
            {proximos.map((m) => <MatchRow key={m.id} match={m} />)}
          </div>
        ) : (
          <p className="notch-sm border border-line2 bg-panel2 px-4 py-6 text-center text-smoke">
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
          <SectionTitle action={<VerTodo to="/tabla" />}>Goleo</SectionTitle>
          <div className="space-y-3">
            {goleo.map((s, i) => <ScorerRow key={s.jugador.id} scorer={s} rank={i + 1} />)}
          </div>
        </section>
      )}
    </div>
  )
}
