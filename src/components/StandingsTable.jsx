import { Link } from 'react-router-dom'
import { standings } from '../lib/stats.js'

export default function StandingsTable({ compact = false }) {
  const rows = standings()
  const cols = compact
    ? ['PJ', 'DIF', 'PTS']
    : ['PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PTS']

  return (
    <div className="notch-sm overflow-x-auto border border-line bg-panel">
      <table className="w-full min-w-[320px] text-sm">
        <thead>
          <tr className="display border-b border-line text-left text-xs tracking-widest text-smoke">
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Equipo</th>
            {cols.map((c) => (
              <th key={c} className={`px-2 py-2 text-center ${c === 'PTS' ? 'text-ember' : ''}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const vals = compact
              ? [r.pj, r.dif, r.pts]
              : [r.pj, r.pg, r.pe, r.pp, r.gf, r.gc, r.dif, r.pts]
            return (
              <tr key={r.equipo.id} className="border-b border-line/60 last:border-0">
                <td className="display px-3 py-2 text-smoke">{i + 1}</td>
                <td className="px-3 py-2">
                  <Link to={`/equipos/${r.equipo.id}`} className="flex items-center gap-2 hover:text-flare">
                    <span className="h-3 w-3 rotate-45" style={{ background: r.equipo.color }} aria-hidden />
                    <span className="display text-base">{r.equipo.nombre}</span>
                  </Link>
                </td>
                {vals.map((v, j) => (
                  <td
                    key={j}
                    className={`px-2 py-2 text-center tabular-nums ${
                      j === vals.length - 1 ? 'display text-lg text-flare' : 'text-bone'
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
