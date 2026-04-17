import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setToken } from '../services/api'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
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
      const data = await login(form)
      setToken(data.access)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container-pad py-16">
      <div className="mx-auto max-w-lg card">
        <h1 className="font-display text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-slate-500">Accede a tu panel clínico.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">Usuario</label>
            <input className="input" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div>
            <label className="label">Contraseña</label>
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
