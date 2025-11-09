import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProfile = async (getToken) => {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/profile/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Fehler beim Laden des Profils: ${res.status}`);
  return res.json();
};

export const saveProfile = async (profileData, getToken) => {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/profile/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Fehler beim Speichern: ${res.status}`);
  return res.json();
};
