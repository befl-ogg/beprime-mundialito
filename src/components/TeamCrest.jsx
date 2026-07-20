import { useState } from 'react'

/**
 * Escudo del equipo: muestra el logo (img/logos/…) y, si falta o falla la carga,
 * cae al diamante de color del equipo.
 */
export default function TeamCrest({ team, size = 40, className = '' }) {
  const [failed, setFailed] = useState(false)
  const px = `${size}px`

  if (team.logo && !failed) {
    return (
      <img
        src={team.logo}
        alt={`Escudo de ${team.nombre}`}
        style={{ width: px, height: px }}
        className={`shrink-0 object-contain ${className}`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span
      style={{ width: size * 0.55, height: size * 0.55, background: team.color }}
      className={`shrink-0 rotate-45 border border-line2 ${className}`}
      aria-hidden
    />
  )
}
