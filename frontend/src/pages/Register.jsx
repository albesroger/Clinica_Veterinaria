import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container-pad py-16">
      <div className="mx-auto max-w-2xl card">
        <h1 className="font-display text-2xl font-semibold">Crear cuenta</h1>
        <p className="text-sm text-slate-500">Registra tus datos para administrar tus mascotas.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="label">Usuario</label>
            <input className="input" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="label">Nombre</label>
            <input className="input" name="first_name" value={form.first_name} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Apellido</label>
            <input className="input" name="last_name" value={form.last_name} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Teléfono</label>
            <input className="input" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Dirección</label>
            <input className="input" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Contraseña</label>
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
          <button className="btn btn-primary md:col-span-2" disabled={loading}>
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </main>
  )
}
