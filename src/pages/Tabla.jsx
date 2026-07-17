import SectionTitle from '../components/SectionTitle.jsx'
import StandingsTable from '../components/StandingsTable.jsx'
import { scorers } from '../lib/stats.js'
import { Link } from 'react-router-dom'

export default function Tabla() {
  const goleo = scorers()
  return (
    <div className="space-y-8">
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
          <p className="notch-sm border border-line bg-panel px-4 py-6 text-center text-smoke">
            Aún no hay goles registrados.
          </p>
        ) : (
          <ol className="notch-sm divide-y divide-line border border-line bg-panel">
            {goleo.map((s, i) => (
              <li key={s.jugador.id}>
                <Link
                  to={`/jugadores/${s.jugador.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-panel2"
                >
                  <span className="display w-6 text-lg text-smoke">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <span className="display text-lg">{s.jugador.apodo}</span>
                    <span className="ml-2 text-xs text-smoke">{s.jugador.posicion}</span>
                  </div>
                  <span className="display text-xl text-flare">{s.goles}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}
