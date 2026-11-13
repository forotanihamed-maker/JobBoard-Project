import { useState, useEffect } from "react";

function useFetch(url) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function load() {
      setState({ status: "loading", data: null, error: null });

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const json = await response.json();
        const jobs = Array.isArray(json?.data) ? json.data : [];

        setState({
          status: jobs.length === 0 ? "empty" : "success",
          data: jobs,
          error: null,
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        setState({ status: "error", data: null, error });
      }
    }

    load();

    return () => controller.abort();
  }, [url]);

  // اگر url وجود ندارد، همان‌جا idle برگردان
  return url ? state : { status: "idle", data: null, error: null };
}

export default useFetch;
