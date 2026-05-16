import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";

const initialForm = {
  name: "",
  species: "dog",
  breed: "",
  sex: "unknown",
  birth_date: "",
  weight_kg: "",
  notes: "",
};

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [histories, setHistories] = useState([]);
  const [expandedPetId, setExpandedPetId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadPets = async () => {
    try {
      const [petsData, historiesData] = await Promise.all([
        apiGet("/pets/"),
        apiGet("/clinical-histories/"),
      ]);
      setPets(petsData);
      setHistories(historiesData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiPost("/pets/", {
        ...form,
        weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
        birth_date: form.birth_date || null,
      });
      setForm(initialForm);
      loadPets();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async () => {
    if (!petToDelete) return;
    try {
      setDeleteLoading(true);
      setError("");
      await apiDelete(`/pets/${petToDelete.id}/`);
      loadPets();
      setPetToDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getPetHistories = (petId) =>
    histories.filter((history) => history.pet === petId);

  return (
    <main className="container-pad py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">Mascotas</p>
          <h1 className="section-title">Ficha clínica por mascota</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {pets.map((pet) => (
            <div key={pet.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {pet.species} · {pet.breed || "Sin raza"} · {pet.sex}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
                    {pet.owner_name}
                  </span>
                  <button
                    onClick={() => setPetToDelete(pet)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded px-2 py-1 text-sm font-medium transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-slate-500 md:grid-cols-3">
                <p>Peso: {pet.weight_kg || "N/D"} kg</p>
                <p>Nacimiento: {pet.birth_date || "N/D"}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedPetId((current) =>
                      current === pet.id ? null : pet.id,
                    )
                  }
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {expandedPetId === pet.id
                    ? "Ocultar historia clínica"
                    : "Ver historia clínica"}
                </button>
              </div>
              {expandedPetId === pet.id && (
                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <h4 className="font-display text-lg font-semibold">
                    Historia clínica
                  </h4>
                  <div className="mt-3 space-y-3">
                    {getPetHistories(pet.id).length > 0 ? (
                      getPetHistories(pet.id).map((history) => (
                        <div
                          key={history.id}
                          className="rounded-xl bg-white p-3 shadow-sm"
                        >
                          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm font-semibold text-slate-800">
                              {history.visit_date}
                            </p>
                            <p className="text-xs text-slate-500">
                              {history.vet_name}
                            </p>
                          </div>
                          {history.diagnosis && (
                            <p className="mt-2 text-sm text-slate-600">
                              Diagnóstico: {history.diagnosis}
                            </p>
                          )}
                          {history.treatment && (
                            <p className="mt-2 text-sm text-slate-600">
                              Tratamiento: {history.treatment}
                            </p>
                          )}
                          {history.notes && (
                            <p className="mt-2 text-sm text-slate-500">
                              {history.notes}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Esta mascota aún no tiene historia clínica registrada.
                      </p>
                    )}
                  </div>
                </div>
              )}
              {pet.notes && (
                <p className="mt-4 text-sm text-slate-600">{pet.notes}</p>
              )}
            </div>
          ))}
          {pets.length === 0 && (
            <p className="text-sm text-slate-500">
              Aún no hay mascotas registradas.
            </p>
          )}
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-semibold">
            Agregar mascota
          </h2>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="label">Nombre</label>
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Especie</label>
              <select
                className="input"
                name="species"
                value={form.species}
                onChange={handleChange}
              >
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="bird">Ave</option>
                <option value="rabbit">Conejo</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label className="label">Raza</label>
              <input
                className="input"
                name="breed"
                value={form.breed}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Sexo</label>
              <select
                className="input"
                name="sex"
                value={form.sex}
                onChange={handleChange}
              >
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>
            <div>
              <label className="label">Fecha de nacimiento</label>
              <input
                className="input"
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Peso (kg)</label>
              <input
                className="input"
                type="number"
                step="0.01"
                name="weight_kg"
                value={form.weight_kg}
                onChange={handleChange}
              />
            </div>
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
              {loading ? "Guardando..." : "Guardar mascota"}
            </button>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(petToDelete)}
        title="Eliminar mascota"
        message={
          petToDelete
            ? `Esta acción eliminará a ${petToDelete.name} de tus registros.`
            : ""
        }
        confirmText="Sí, eliminar"
        cancelText="No, volver"
        onConfirm={handleDeletePet}
        onClose={() => setPetToDelete(null)}
        loading={deleteLoading}
      />
    </main>
  );
}
