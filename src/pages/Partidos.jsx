import SectionTitle from '../components/SectionTitle.jsx'
import MatchRow from '../components/MatchRow.jsx'
import { matchesByJornada } from '../lib/stats.js'

export default function Partidos() {
  return (
    <div className="space-y-8">
      {matchesByJornada().map(([jornada, list]) => (
        <section key={jornada}>
          <SectionTitle>Jornada {jornada}</SectionTitle>
          <div className="space-y-3">
            {list.map((m) => <MatchRow key={m.id} match={m} showGoles />)}
          </div>
        </section>
      ))}
    </div>
  )
}
