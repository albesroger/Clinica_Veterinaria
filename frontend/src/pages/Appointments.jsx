import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPatch, getCurrentUser } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";

const initialForm = {
  pet: "",
  scheduled_at: "",
  reason: "",
  status: "scheduled",
  notes: "",
};

const appointmentStatusLabels = {
  scheduled: "Agendada",
  confirmed: "Confirmada",
  completed: "Completada",
  canceled: "Cancelada",
};

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [isStaff, setIsStaff] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const loadAll = async () => {
    try {
      const [appointmentsData, petsData, userData] = await Promise.all([
        apiGet("/appointments/"),
        apiGet("/pets/"),
        getCurrentUser(),
      ]);
      setAppointments(appointmentsData);
      setPets(petsData);
      setIsStaff(Boolean(userData?.is_staff));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        scheduled_at: form.scheduled_at,
        reason: form.reason,
        notes: form.notes,
        pet: Number(form.pet),
      };
      if (isStaff) {
        payload.status = form.status;
      }
      await apiPost("/appointments/", payload);
      setForm(initialForm);
      loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel || !isStaff) return;
    try {
      setCancelLoading(true);
      setError("");
      await apiPatch(`/appointments/${appointmentToCancel.id}/`, {
        status: "canceled",
      });
      loadAll();
      setAppointmentToCancel(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <main className="container-pad py-14">
      <div>
        <p className="kicker">Citas</p>
        <h1 className="section-title">Agenda clínica</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {appointment.pet_name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {new Date(appointment.scheduled_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
                    {appointmentStatusLabels[appointment.status] ??
                      appointment.status}
                  </span>
                  {isStaff &&
                    appointment.status !== "canceled" &&
                    appointment.status !== "completed" && (
                      <button
                        onClick={() => setAppointmentToCancel(appointment)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded px-2 py-1 text-sm font-medium transition"
                      >
                        Cancelar
                      </button>
                    )}
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {appointment.reason}
              </p>
              {appointment.notes && (
                <p className="mt-2 text-sm text-slate-500">
                  {appointment.notes}
                </p>
              )}
            </div>
          ))}
          {appointments.length === 0 && (
            <p className="text-sm text-slate-500">No hay citas programadas.</p>
          )}
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-semibold">Agendar cita</h2>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="label">Mascota</label>
              <select
                className="input"
                name="pet"
                value={form.pet}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Fecha y hora</label>
              <input
                className="input"
                type="datetime-local"
                name="scheduled_at"
                value={form.scheduled_at}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Motivo</label>
              <input
                className="input"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
              />
            </div>
            {isStaff && (
              <div>
                <label className="label">Estado</label>
                <select
                  className="input"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="scheduled">Agendada</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="completed">Completada</option>
                  <option value="canceled">Cancelada</option>
                </select>
              </div>
            )}
            <div>
              <label className="label">Notas</label>
              <textarea
                className="input"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cita"}
            </button>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(appointmentToCancel)}
        title="Cancelar cita"
        message={
          appointmentToCancel
            ? `Se cancelará la cita de ${appointmentToCancel.pet_name} programada para ${new Date(appointmentToCancel.scheduled_at).toLocaleString()}.`
            : ""
        }
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
        onConfirm={handleCancelAppointment}
        onClose={() => setAppointmentToCancel(null)}
        loading={cancelLoading}
      />
    </main>
  );
}
