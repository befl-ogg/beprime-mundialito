import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import { allPlayers } from '../lib/stats.js'

const POSICIONES = ['TODOS', 'POR', 'DEF', 'MED', 'DEL']

export default function Jugadores() {
  const [pos, setPos] = useState('TODOS')
  const list = allPlayers
    .filter((p) => pos === 'TODOS' || p.posicion === pos)
    .sort((a, b) => b.media - a.media)

  return (
    <div>
      <SectionTitle>Jugadores</SectionTitle>
      <div role="tablist" aria-label="Filtrar por posición" className="mb-4 flex flex-wrap gap-2">
        {POSICIONES.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={pos === p}
            onClick={() => setPos(p)}
            className={`display notch-sm px-3 py-1 text-sm tracking-widest transition-colors ${
              pos === p ? 'bg-ember text-pitch' : 'bg-panel text-smoke hover:text-bone'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((p) => (
          <Link key={p.id} to={`/jugadores/${p.id}`} className="group">
            <img
              src={`img/thumbs/${p.id}.jpeg`}
              alt={`Carta de ${p.apodo}, ${p.posicion} media ${p.media}`}
              className="w-full rounded-lg transition-transform group-hover:scale-[1.03]"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
