import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../services/api'

const initialForm = {
  pet: '',
  vet_name: '',
  visit_date: '',
  diagnosis: '',
  treatment: '',
  notes: '',
}

export default function Histories() {
  const [histories, setHistories] = useState([])
  const [pets, setPets] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadAll = async () => {
    try {
      const [historiesData, petsData] = await Promise.all([
        apiGet('/clinical-histories/'),
        apiGet('/pets/'),
      ])
      setHistories(historiesData)
      setPets(petsData)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiPost('/clinical-histories/', {
        ...form,
        pet: Number(form.pet),
      })
      setForm(initialForm)
      loadAll()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container-pad py-14">
      <div>
        <p className="kicker">Historias clínicas</p>
        <h1 className="section-title">Seguimiento médico</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {histories.map((history) => (
            <div key={history.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold">{history.pet_name}</h3>
                  <p className="text-sm text-slate-500">{history.visit_date} · {history.vet_name}</p>
                </div>
                <span className="rounded-full bg-river/10 px-3 py-1 text-xs font-semibold text-river">Historial</span>
              </div>
              {history.diagnosis && <p className="mt-3 text-sm text-slate-600">Diagnóstico: {history.diagnosis}</p>}
              {history.treatment && <p className="mt-2 text-sm text-slate-600">Tratamiento: {history.treatment}</p>}
              {history.notes && <p className="mt-2 text-sm text-slate-500">{history.notes}</p>}
            </div>
          ))}
          {histories.length === 0 && <p className="text-sm text-slate-500">No hay historias registradas.</p>}
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-semibold">Registrar historia</h2>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="label">Mascota</label>
              <select className="input" name="pet" value={form.pet} onChange={handleChange} required>
                <option value="">Selecciona...</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>{pet.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Veterinario/a</label>
              <input className="input" name="vet_name" value={form.vet_name} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Fecha de visita</label>
              <input className="input" type="date" name="visit_date" value={form.visit_date} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Diagnóstico</label>
              <textarea className="input" name="diagnosis" value={form.diagnosis} onChange={handleChange} rows="3" />
            </div>
            <div>
              <label className="label">Tratamiento</label>
              <textarea className="input" name="treatment" value={form.treatment} onChange={handleChange} rows="3" />
            </div>
            <div>
              <label className="label">Notas</label>
              <textarea className="input" name="notes" value={form.notes} onChange={handleChange} rows="3" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar historia'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
