import { useState, useEffect } from "react";

// Returns `value` only after it has stopped changing for `delay` ms.
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
