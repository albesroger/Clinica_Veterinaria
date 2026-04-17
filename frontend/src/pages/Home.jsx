import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="bg-hero-pattern">
        <div className="container-pad grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="kicker">Gestión inteligente</p>
            <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
              Una clínica conectada con cada mascota y su familia
            </h1>
            <p className="text-lg text-slate-600">
              Administra tus mascotas, agenda tus citas y lleva tus historias
              clínicas con un flujo claro y seguro.
            </p>
            <div className="flex flex-wrap gap-4">
              <NavLink to="/register" className="btn btn-primary">
                Crear cuenta
              </NavLink>
              <NavLink to="/dashboard" className="btn btn-secondary">
                Ver panel
              </NavLink>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <div>
                <p className="font-semibold text-ink">+120</p>
                <p>Mascotas activas</p>
              </div>
              <div>
                <p className="font-semibold text-ink">98%</p>
                <p>Satisfacción</p>
              </div>
              <div>
                <p className="font-semibold text-ink">24/7</p>
                <p>Seguimiento</p>
              </div>
            </div>
          </div>
          <div className="gradient-panel">
            <div className="space-y-4">
              <div className="card">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Cita activa
                </p>
                <p className="mt-3 text-xl font-semibold">Vacunación de Luna</p>
                <p className="text-sm text-slate-500">Hoy · 5:30 PM</p>
              </div>
              <div className="card">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Historial clínico
                </p>
                <p className="mt-3 text-xl font-semibold">
                  Chispa · Control renal
                </p>
                <p className="text-sm text-slate-500">
                  Última visita: 14/01/2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Todo en un mismo lugar</p>
            <h2 className="section-title">¿Qué puedes hacer en nuestra web?</h2>
          </div>
          <p className="max-w-xl text-slate-500">
            Desde tu registro, hasta la evolución clínica de tus mascotas.
            Organiza cada etapa con trazabilidad y rapidez.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Tu Información",
              text: "Registro y perfil de dueños con datos de contacto siempre actualizados.",
            },
            {
              title: "Tus Mascotas",
              text: "Ficha completa por especie, antecedentes y notas veterinarias.",
            },
            {
              title: "Sus Citas",
              text: "Agenda dinámica con estados y recordatorios internos.",
            },
            {
              title: "Sus Historias",
              text: "Seguimiento clínico con diagnósticos, tratamientos y observaciones.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-pad pb-20">
        <div className="grid gap-8 rounded-[32px] bg-ink px-10 py-12 text-mist md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="kicker text-dune">Flujo en 3 pasos</p>
            <h2 className="font-display text-3xl font-semibold">
              Del registro al diagnóstico sin fricción
            </h2>
            <p className="text-slate-200">
              Crea tu cuenta, agrega tus mascotas y agenda sus citas en
              segundos. La historia clínica vive conectada a cada visita.
            </p>
            <NavLink
              to="/register"
              className="btn bg-dune text-ink hover:bg-white"
            >
              Empezar ahora
            </NavLink>
          </div>
          <div className="space-y-4">
            {[
              "1. Registro de clientes y dueños en un perfil unificado.",
              "2. Alta de mascotas con datos médicos y vacunas.",
              "3. Agenda de citas y actualizaciones clínicas posteriores.",
            ].map((text) => (
              <div
                key={text}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
