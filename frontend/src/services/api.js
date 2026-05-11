const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const AUTH_BASE =
  import.meta.env.VITE_AUTH_URL || "http://localhost:8000/api/auth";

export const getToken = () => localStorage.getItem("accessToken");
export const setToken = (token) => {
  localStorage.setItem("accessToken", token);
  try {
    window.dispatchEvent(new Event("authChange"));
  } catch (e) {
    /* noop */
  }
};
export const clearToken = () => {
  localStorage.removeItem("accessToken");
  try {
    window.dispatchEvent(new Event("authChange"));
  } catch (e) {
    /* noop */
  }
};

const buildHeaders = (extra = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...extra,
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const login = async (payload) => {
  const res = await fetch(`${AUTH_BASE}/login/`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "No se pudo iniciar sesión");
  }
  return data;
};

export const register = async (payload) => {
  const res = await fetch(`${AUTH_BASE}/register/`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = Object.values(data)[0] || "No se pudo registrar";
    throw new Error(message);
  }
  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch(`${AUTH_BASE}/me/`, {
    headers: buildHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "No se pudo obtener el usuario");
  }
  return data;
};

export const apiGet = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: buildHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Error al cargar datos");
  }
  return data;
};

export const apiPost = async (path, payload) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = Object.values(data)[0] || "Error al guardar";
    throw new Error(message);
  }
  return data;
};

export const apiPatch = async (path, payload) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = Object.values(data)[0] || "Error al actualizar";
    throw new Error(message);
  }
  return data;
};

export const apiDelete = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  if (!res.ok) {
    const data = await res.json();
    const message = data.detail || "Error al eliminar";
    throw new Error(message);
  }
};
