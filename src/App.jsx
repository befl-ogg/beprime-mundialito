import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Tabla from './pages/Tabla.jsx'
import Partidos from './pages/Partidos.jsx'
import Equipos from './pages/Equipos.jsx'
import EquipoDetalle from './pages/EquipoDetalle.jsx'
import Jugadores from './pages/Jugadores.jsx'
import JugadorDetalle from './pages/JugadorDetalle.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tabla" element={<Tabla />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/equipos/:id" element={<EquipoDetalle />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugadores/:id" element={<JugadorDetalle />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
