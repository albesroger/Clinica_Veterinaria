import { useEffect, useState } from 'react'
import { apiGet, getToken } from '../services/api'
import { NavLink } from 'react-router-dom'

export default function Dashboard() {
  const [stats, setStats] = useState({ pets: 0, appointments: 0, histories: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!getToken()) {
        return
      }
      try {
        const [pets, appointments, histories] = await Promise.all([
          apiGet('/pets/'),
          apiGet('/appointments/'),
          apiGet('/clinical-histories/'),
        ])
        setStats({
          pets: pets.length || 0,
          appointments: appointments.length || 0,
          histories: histories.length || 0,
        })
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [])

  return (
    <main className="container-pad py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">Panel general</p>
          <h1 className="section-title">Tu clínica en un vistazo</h1>
        </div>
        <NavLink to="/appointments" className="btn btn-primary">Agendar cita</NavLink>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-500">Mascotas activas</p>
          <p className="mt-2 text-3xl font-semibold">{stats.pets}</p>
          <p className="mt-2 text-xs text-slate-400">Registros en tu perfil</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Citas programadas</p>
          <p className="mt-2 text-3xl font-semibold">{stats.appointments}</p>
          <p className="mt-2 text-xs text-slate-400">Incluye próximas y confirmadas</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Historias clínicas</p>
          <p className="mt-2 text-3xl font-semibold">{stats.histories}</p>
          <p className="mt-2 text-xs text-slate-400">Seguimientos disponibles</p>
        </div>
      </div>
      {!getToken() && (
        <div className="mt-10 card">
          <p className="text-sm text-slate-600">
            Inicia sesión para ver métricas reales de tus mascotas y citas.
          </p>
          <NavLink to="/login" className="btn btn-secondary mt-4">Entrar</NavLink>
        </div>
      )}
    </main>
  )
}
