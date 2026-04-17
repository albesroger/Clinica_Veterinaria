import { useEffect, useState } from 'react'
import { apiGet } from '../services/api'

export default function Owners() {
  const [owners, setOwners] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiGet('/owners/')
        setOwners(data)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [])

  return (
    <main className="container-pad py-14">
      <div>
        <p className="kicker">Dueños</p>
        <h1 className="section-title">Información del cliente</h1>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {owners.map((owner) => (
          <div key={owner.id} className="card">
            <h3 className="font-display text-xl font-semibold">{owner.first_name} {owner.last_name}</h3>
            <p className="text-sm text-slate-500">@{owner.username}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Email: {owner.email}</p>
              <p>Teléfono: {owner.phone || 'N/D'}</p>
              <p>Dirección: {owner.address || 'N/D'}</p>
              <p>Contacto emergencia: {owner.emergency_contact || 'N/D'}</p>
            </div>
            {owner.notes && <p className="mt-4 text-sm text-slate-500">{owner.notes}</p>}
          </div>
        ))}
        {owners.length === 0 && <p className="text-sm text-slate-500">Sin dueños registrados.</p>}
      </div>
    </main>
  )
}
