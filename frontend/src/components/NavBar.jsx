import { NavLink } from "react-router-dom";
import { clearToken, getToken, getCurrentUser } from "../services/api";
import { useEffect, useState } from "react";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`;

export default function NavBar() {
  const [token, setToken] = useState(getToken());
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const handler = () => setToken(getToken());
    window.addEventListener("authChange", handler);
    return () => window.removeEventListener("authChange", handler);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const user = await getCurrentUser();
          setIsStaff(user.is_staff);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      } else {
        setIsStaff(false);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
      <div className="container-pad flex items-center justify-between py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm">
            CQ
          </div>
          <div>
            <p className="font-semibold text-slate-900">Clínica de Quemado</p>
            <p className="text-xs text-slate-500">Sistema veterinario</p>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          {isStaff && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Panel
              </NavLink>
              <NavLink to="/owners" className={linkClass}>
                Clientes
              </NavLink>
            </>
          )}
          <NavLink to="/pets" className={linkClass}>
            Mascotas
          </NavLink>
          <NavLink to="/appointments" className={linkClass}>
            Citas
          </NavLink>
          {isStaff && (
            <NavLink to="/histories" className={linkClass}>
              Historias
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              {!isStaff && (
                <NavLink to="/profile" className="btn btn-ghost">
                  Perfil
                </NavLink>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  clearToken();
                  window.location.href = "/";
                }}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-ghost">
                Entrar
              </NavLink>
              <NavLink to="/register" className="btn btn-primary">
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
