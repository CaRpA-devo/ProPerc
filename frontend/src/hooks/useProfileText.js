import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "profile:text";
const DEFAULTS = {
  bio: "",
  location: "",
  job: "",
  hobbies: "",
};

export function useProfileText() {
  const [values, setValues] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  // Laden bei Mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setValues({ ...DEFAULTS, ...parsed });
      }
    } catch {}
    setLoaded(true);
  }, []);

  const handleChange = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  };

  const reset = () => {
    setValues(DEFAULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
  };

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(DEFAULTS);
  }, [values]);

  return { values, handleChange, save, reset, loaded, isDirty };
}
