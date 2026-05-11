import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <main className="container-pad py-20">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 mt-3">Cargando perfil...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-pad py-20">
        <div className="mx-auto max-w-2xl card-lg bg-red-50 border-red-200">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-pad py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="section-title">Mi Perfil</h1>
          <p className="section-subtitle">Gestiona tu información personal</p>
        </div>

        <div className="card-lg">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Información de Usuario
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Usuario</label>
                <p className="text-slate-900 font-medium">{user?.username}</p>
              </div>
              <div>
                <label className="label">Email</label>
                <p className="text-slate-900 font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="label">Nombre</label>
                <p className="text-slate-900 font-medium">
                  {user?.first_name || "—"}
                </p>
              </div>
              <div>
                <label className="label">Apellido</label>
                <p className="text-slate-900 font-medium">
                  {user?.last_name || "—"}
                </p>
              </div>
            </div>
          </div>

          {user?.owner && (
            <>
              <div className="divider my-8"></div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Información de Contacto
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Teléfono</label>
                    <p className="text-slate-900 font-medium">
                      {user?.owner?.phone || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="label">Dirección</label>
                    <p className="text-slate-900 font-medium">
                      {user?.owner?.address || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
