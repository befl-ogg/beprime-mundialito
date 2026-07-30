import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'
import PlayerImage from '../components/PlayerImage.jsx'
import { allPlayers } from '../lib/stats.js'

const POSICIONES = ['TODOS', 'POR', 'DEF', 'MED', 'DEL']

export default function Jugadores() {
  const [pos, setPos] = useState('TODOS')
  const list = allPlayers
    .filter((p) => pos === 'TODOS' || p.posicion === pos)
    .sort((a, b) => b.media - a.media)

  return (
    <div>
      <SectionTitle>Mercado de jugadores</SectionTitle>
      <div
        role="tablist"
        aria-label="Filtrar por posición"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {POSICIONES.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={pos === p}
            onClick={() => setPos(p)}
            className={`display notch-sm shrink-0 whitespace-nowrap px-5 py-1.5 text-sm tracking-widest transition-transform active:scale-95 ${
              pos === p
                ? 'bg-ember text-pitch'
                : 'border border-line2 bg-panel3 text-smoke hover:text-primary'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((p) => (
          <Link key={p.id} to={`/jugadores/${p.id}`} className="group">
            <PlayerImage
              id={p.id}
              equipoId={p.equipo}
              alt={`Carta de ${p.apodo}, ${p.posicion} media ${p.media}`}
              className="aspect-[4/5] w-full rounded-lg object-cover transition-transform group-hover:scale-[1.03]"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
