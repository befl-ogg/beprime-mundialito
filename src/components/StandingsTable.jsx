import { Link } from 'react-router-dom'
import { standings } from '../lib/stats.js'

export default function StandingsTable({ compact = false }) {
  const rows = standings()
  const cols = compact
    ? ['PJ', 'DIF', 'PTS']
    : ['PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PTS']

  return (
    <div className="notch-sm overflow-x-auto border border-line2 bg-panel2 ember-glow">
      <table className="w-full min-w-[320px] text-sm">
        <thead>
          <tr className="display bg-panel3 text-left text-xs tracking-widest text-smoke">
            <th className="px-3 py-2.5">POS</th>
            <th className="px-3 py-2.5">Equipo</th>
            {cols.map((c) => (
              <th key={c} className={`px-2 py-2.5 text-center ${c === 'PTS' ? 'text-ember' : ''}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="display">
          {rows.map((r, i) => {
            const vals = compact
              ? [r.pj, r.dif, r.pts]
              : [r.pj, r.pg, r.pe, r.pp, r.gf, r.gc, r.dif, r.pts]
            return (
              <tr key={r.equipo.id} className="border-b border-line/60 transition-colors last:border-0 hover:bg-panel3/60">
                <td className={`px-3 py-2.5 text-lg tabular-nums ${i === 0 ? 'text-ember' : 'text-smoke'}`}>
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td className="px-3 py-2.5">
                  <Link to={`/equipos/${r.equipo.id}`} className="flex items-center gap-2.5 hover:text-flare">
                    <span className="h-4 w-4 shrink-0 rotate-45 border border-line2" style={{ background: r.equipo.color }} aria-hidden />
                    <span className="truncate text-base">{r.equipo.nombre}</span>
                  </Link>
                </td>
                {vals.map((v, j) => {
                  const isPts = j === vals.length - 1
                  return (
                    <td
                      key={j}
                      className={`px-2 py-2.5 text-center tabular-nums ${
                        isPts ? 'bg-ember/10 text-lg text-ember' : 'text-smoke'
                      }`}
                    >
                      {v}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
