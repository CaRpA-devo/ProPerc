export async function apiFetch(path, options = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("clerk_token") : null;

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error("Fehler beim Abrufen");
  return res.json();
}
