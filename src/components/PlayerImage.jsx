import { useState } from 'react'
import { User } from 'lucide-react'
import { teamById } from '../lib/stats.js'

/**
 * Carta/foto de jugador: muestra img/{thumbs|cards}/{id}.jpeg y, si falta
 * o falla la carga (jugador nuevo sin foto todavía), cae a un genérico
 * con el color del equipo en vez de romper el layout.
 */
export default function PlayerImage({ id, equipoId, variant = 'thumb', alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  const team = teamById(equipoId)

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        style={team ? { background: `${team.color}26` } : undefined}
        className={`flex items-center justify-center border border-line2 bg-panel4 ${className}`}
      >
        <User className="h-1/3 w-1/3 text-smoke" strokeWidth={1.5} aria-hidden />
      </span>
    )
  }

  return (
    <img
      src={`img/${variant === 'card' ? 'cards' : 'thumbs'}/${id}.jpeg`}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
