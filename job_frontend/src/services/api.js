const API_BASE_URL = "http://localhost:8086"; // Update the port to match your backend

export async function signUp(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function login(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function uploadResume(formData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/user/upload-resume`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
}

export async function fetchPreferences() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/user/preferences`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.json();
}
