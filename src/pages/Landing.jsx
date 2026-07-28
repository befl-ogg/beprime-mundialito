import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { teamById, playerById, upcomingMatches } from '../lib/stats.js'
import MatchRow from '../components/MatchRow.jsx'

const TEAM_STARS = [
  { teamId: 'fc-inn', playerId: 'rauliin', foto: 'raulinn-fcinn.jpeg' },
  { teamId: 'matha', playerId: 'pepin14', foto: 'pepin-matha.jpeg' },
  { teamId: 'cachonditos', playerId: 'sifon', foto: 'saif-cachondito.jpeg' },
  { teamId: 'fuckboys', playerId: 'quimin', foto: 'kim-fuckboys.jpeg' },
]

function TeamSlide({ star, containerRef }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const team = teamById(star.teamId)
  const player = playerById(star.playerId)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { root: containerRef.current, threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef])

  return (
    <section
      ref={ref}
      className="ember-glow relative flex h-dvh w-full snap-start snap-always flex-col items-center justify-center gap-5 overflow-hidden bg-pitch px-6 py-16 text-center"
    >
      <div
        className={`flex w-full max-w-sm flex-col items-center gap-5 transition-all duration-700 ease-out ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-6 w-1 bg-ember" aria-hidden />
          <h2 className="display text-3xl italic leading-none text-glow">{team.nombre}</h2>
        </div>

        <img
          src={`img/stars/${star.foto}`}
          alt={`${player.apodo}, jugador de ${team.nombre}`}
          className="edge-fade h-auto w-auto max-h-[52dvh] max-w-[300px] object-contain"
          loading="lazy"
        />

        <Link
          to={`/jugadores/${player.id}`}
          className="display text-xs tracking-widest text-smoke transition-colors hover:text-bone"
        >
          Jugador destacado · <span className="text-ember">{player.apodo}</span>
        </Link>

        <Link
          to={`/equipos/${team.id}`}
          className="display notch-sm mt-2 border border-line2 px-6 py-2.5 text-sm tracking-widest text-bone transition-colors hover:border-ember hover:text-ember"
        >
          Conoce al equipo →
        </Link>
      </div>
    </section>
  )
}

export default function Landing() {
  const containerRef = useRef(null)
  const proximo = upcomingMatches()[0]

  return (
    <div
      ref={containerRef}
      className="h-dvh snap-y snap-mandatory overflow-y-scroll bg-pitch text-bone"
    >
      {/* Header fijo */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-5 py-4">
        <span className="display text-xl italic tracking-widest text-ember">Mundialito</span>
        <Link
          to="/inicio"
          className="pointer-events-auto display text-sm tracking-widest text-smoke transition-colors hover:text-bone"
        >
          Entrar →
        </Link>
      </header>

      {/* Próximo partido */}
      {proximo && (
        <section className="relative flex h-dvh w-full snap-start snap-always flex-col items-center justify-center gap-6 bg-stadium px-6 text-center">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-6 w-1 bg-ember" aria-hidden />
            <h2 className="display text-2xl italic leading-none text-glow">Próximo partido</h2>
          </div>
          <div className="w-full max-w-sm">
            <MatchRow match={proximo} />
          </div>
          <Link
            to="/partidos"
            className="display text-sm tracking-widest text-ember transition-colors hover:text-flare"
          >
            Ver calendario completo →
          </Link>
        </section>
      )}

      {/* Slides de equipos */}
      {TEAM_STARS.map((star) => (
        <TeamSlide key={star.teamId} star={star} containerRef={containerRef} />
      ))}

      {/* Outro / CTA */}
      <section className="relative flex h-dvh w-full snap-start snap-always flex-col items-center justify-center bg-stadium px-6 text-center">
        <h2 className="display text-4xl italic leading-none text-glow sm:text-5xl">
          Que ruede<span className="block text-ember">el balón</span>
        </h2>
        <Link
          to="/inicio"
          className="display notch-sm mt-8 bg-ember px-8 py-3 text-lg tracking-widest text-pitch transition-transform active:scale-95"
        >
          Ver el torneo →
        </Link>
      </section>
    </div>
  )
}
