import { useEffect, useState } from "react";

export function Loader() {
  const [error, setError] = useState(false);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        setError(true);
        resolve();
      }, 10000);
    });

    return () => {};
  }, []);

  return (
    <>
      {error ? (
        <p className="text-red-500">Error! Irgendwas ging nicht!</p>
      ) : (
        <span className="loading loading-bars loading-xl "></span>
      )}
    </>
  );
}
