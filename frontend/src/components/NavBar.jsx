import { NavLink } from 'react-router-dom'
import { clearToken, getToken } from '../services/api'

const linkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? 'text-ink' : 'text-slate-500 hover:text-ink'}`

export default function NavBar() {
  const token = getToken()

  return (
    <header className="sticky top-0 z-30 bg-mist/80 backdrop-blur">
      <div className="container-pad flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-ink text-mist flex items-center justify-center font-display text-lg">VA</div>
          <div>
            <p className="font-display text-lg font-semibold">Aurora Vet</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">CLÍNICA</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Panel</NavLink>
          <NavLink to="/owners" className={linkClass}>Dueños</NavLink>
          <NavLink to="/pets" className={linkClass}>Mascotas</NavLink>
          <NavLink to="/appointments" className={linkClass}>Citas</NavLink>
          <NavLink to="/histories" className={linkClass}>Historias</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {token ? (
            <button
              className="btn btn-secondary"
              onClick={() => {
                clearToken()
                window.location.href = '/'
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-secondary">Entrar</NavLink>
              <NavLink to="/register" className="btn btn-primary">Crear cuenta</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
