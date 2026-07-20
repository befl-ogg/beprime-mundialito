import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const TEAMS = [
  { nombre: 'Deportivo Matha Ghordaz', img: 'matha' },
  { nombre: 'Cachonditos FC', img: 'cachonditos' },
  { nombre: 'FC Inn', img: 'fcinn' },
  { nombre: 'Fuckboys FC', img: 'fuckboys' },
]

function TeamSlide({ team, containerRef }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

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
      className="relative flex h-dvh w-full snap-start snap-always items-center justify-center bg-pitch px-4 py-16"
    >
      <img
        src={`img/landing/slide-${team.img}.jpg`}
        alt={`Presentación del equipo ${team.nombre}`}
        className={`mx-auto h-auto w-auto max-h-[82dvh] max-w-[440px] rounded-lg object-contain shadow-2xl shadow-black/60 transition-all duration-700 ease-out ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        loading="lazy"
      />
    </section>
  )
}

export default function Landing() {
  const containerRef = useRef(null)

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

      {/* Hero */}
      <section className="relative flex h-dvh w-full snap-start snap-always flex-col items-center justify-center overflow-hidden bg-stadium px-6 text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="img/landing/hero-bg.jpg" alt="" className="h-full w-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-pitch via-transparent to-pitch" />

        <div className="relative z-20 flex w-full flex-col items-center pt-12">
          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-smoke">BE PRIME PRESENTA</p>
          <h1 className="display text-5xl italic leading-none text-glow sm:text-6xl">
            Presentación
            <span className="mt-1 block text-6xl text-ember sm:text-7xl">de Equipos</span>
          </h1>
          <div className="mt-5 border-x-2 border-ember bg-white/10 px-6 py-1 backdrop-blur-md">
            <p className="display text-lg italic tracking-widest">
              Mundialito <span className="text-ember">BEPRIME</span>
            </p>
          </div>

          <Link
            to="/equipos"
            className="display mt-10 text-sm tracking-widest text-ember transition-colors hover:text-flare"
          >
            × Conoce a los equipos ×
          </Link>
        </div>

        {/* Pie del hero */}
        <div className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-smoke">
            Fuerza • Disciplina • Comunidad • Pasión
          </p>
          <ChevronDown className="animate-bounce text-ember" size={24} aria-hidden />
        </div>
      </section>

      {/* Slides de equipos */}
      {TEAMS.map((t) => (
        <TeamSlide key={t.img} team={t} containerRef={containerRef} />
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
