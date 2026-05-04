export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-5">
      <div className="container-pad flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 Clínica Veterinaria de Quemado de Güines. Cuidado integral para
          tus mejores amigos.
        </p>
        <div className="flex items-center gap-6">
          <span>Urgencias 24/7</span>
          <span>contacto@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
