import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export const Navbar = () => {
  const count = useAppSelector((s) => s.analysis.list.length)

  return (
    <nav className="navbar">
      <span className="navbar-brand">Laboratorio Pokémon</span>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Pokédex
        </NavLink>
        <NavLink to="/analysis" className={({ isActive }) => isActive ? 'active' : ''}>
          Análisis {count > 0 && <span className="badge">{count}</span>}
        </NavLink>
      </div>
    </nav>
  )
}

