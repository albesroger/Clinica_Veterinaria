export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container-pad">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-xs">
                CQ
              </div>
              <span className="font-semibold text-slate-900">
                Clínica de Quemado
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Cuidado integral para tus mejores amigos veterinarios.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Urgencias 24/7</li>
              <li>contacto@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">
              Enlaces
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-slate-600 hover:text-blue-600">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/pets" className="text-slate-600 hover:text-blue-600">
                  Mascotas
                </a>
              </li>
              <li>
                <a
                  href="/appointments"
                  className="text-slate-600 hover:text-blue-600"
                >
                  Citas
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600 text-center">
            © 2026 Clínica Veterinaria de Quemado. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
