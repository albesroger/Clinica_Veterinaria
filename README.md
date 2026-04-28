# Clínica Veterinaria - Full Stack (React + Tailwind + Django)

Este proyecto incluye un backend en Django (API REST) y un frontend en React con TailwindCSS.

## Estructura

- `backend/` API Django (auth, mascotas, dueños, citas, historias clínicas)
- `frontend/` UI React + Tailwind

## Backend (Django)

1. Crear entorno virtual e instalar dependencias:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

2. Migraciones y superusuario:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

3. Iniciar servidor:

```bash
python manage.py runserver
```

### Endpoints principales

- `POST /api/auth/register/` registro
- `POST /api/auth/login/` login (JWT)
- `GET /api/pets/` mascotas
- `GET /api/appointments/` citas
- `GET /api/clinical-histories/` historias

## Frontend (React)

1. Instalar dependencias:

```bash
cd frontend
npm install
```

2. Iniciar:

```bash
npm run dev
```

### Variables de entorno

- `VITE_API_URL` (por defecto `http://localhost:8000/api`)
- `VITE_AUTH_URL` (por defecto `http://localhost:8000/api/auth`)

## Nota

La UI consume la API con JWT. Registra un usuario, inicia sesión y empieza a crear mascotas, citas e historias clínicas.
