import { useEffect, useState } from "react";
import { apiFetch } from "@/hooks/api";

export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/entries")
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  return { entries, loading, setEntries };
}
