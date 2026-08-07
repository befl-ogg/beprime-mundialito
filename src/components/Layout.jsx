import { NavLink, Outlet } from 'react-router-dom'
import { Home, BarChart3, Trophy, Shield, Users } from 'lucide-react'

const tabs = [
  { to: '/inicio', label: 'Inicio', icon: Home, end: true },
  { to: '/tabla', label: 'Tabla', icon: BarChart3 },
  { to: '/partidos', label: 'Partidos', icon: Trophy },
  { to: '/equipos', label: 'Equipos', icon: Shield },
  { to: '/jugadores', label: 'Jugadores', icon: Users },
]

function Tab({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-col md:flex-row items-center gap-1 md:gap-2 px-2 md:px-4 py-2 transition-transform active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember ${
          isActive ? 'text-primary' : 'text-smoke hover:text-ember'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} strokeWidth={isActive ? 2.6 : 2.2} aria-hidden />
          <span className="display text-xs md:text-base tracking-widest">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col ember-glow">
      <header className="sticky top-0 z-20 border-b border-line2 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4 md:justify-between">
          <NavLink to="/inicio" className="display text-2xl italic tracking-tighter text-primary">
            Mundialito<span className="text-flare"> BEPRIME</span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {tabs.map((t) => <Tab key={t.to} {...t} />)}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4">
        <div className="border-t border-line2 pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-center md:pb-8">
          <p className="text-sm text-smoke">
            Desarrollador{' '}
            <a
              href="https://instagram.com/lordb.acon"
              target="_blank"
              rel="noopener noreferrer"
              className="display italic text-primary transition-colors hover:text-ember"
            >
              @lordb.acon
            </a>
            <span className="mx-2 text-line2">·</span>
            Organizador{' '}
            <a
              href="https://instagram.com/beprime.gym"
              target="_blank"
              rel="noopener noreferrer"
              className="display italic text-primary transition-colors hover:text-ember"
            >
              @beprime.gym
            </a>
          </p>
          <p className="display mt-2 text-xs tracking-widest text-smoke">
            Update: Julio 2026 <span className="mx-1 text-line2">·</span> V 1.2
          </p>
        </div>
      </footer>

      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line2 bg-panel2/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-5">
          {tabs.map((t) => <Tab key={t.to} {...t} />)}
        </div>
      </nav>
    </div>
  )
}
