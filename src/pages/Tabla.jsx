import SectionTitle from '../components/SectionTitle.jsx'
import StandingsTable from '../components/StandingsTable.jsx'
import ScorerRow from '../components/ScorerRow.jsx'
import { scorers } from '../lib/stats.js'

export default function Tabla() {
  const goleo = scorers()
  return (
    <div className="space-y-10">
      <section>
        <SectionTitle>Tabla de posiciones</SectionTitle>
        <StandingsTable />
        <p className="mt-2 text-xs text-smoke">
          Criterios de desempate: puntos, diferencia de goles, goles a favor.
        </p>
      </section>

      <section>
        <SectionTitle>Tabla de goleo</SectionTitle>
        {goleo.length === 0 ? (
          <p className="notch-sm border border-line2 bg-panel2 px-4 py-6 text-center text-smoke">
            Aún no hay goles registrados.
          </p>
        ) : (
          <div className="space-y-3">
            {goleo.map((s, i) => <ScorerRow key={s.jugador.id} scorer={s} rank={i + 1} />)}
          </div>
        )}
      </section>
    </div>
  )
}
