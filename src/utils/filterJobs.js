// Keeps jobs whose title contains every word of `term` (any order, any case).
// An empty term keeps all jobs.
export function filterJobsByTitle(jobs, term) {
  const words = term.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return jobs;

  return jobs.filter((job) => {
    const title = (job.title ?? "").toLowerCase();
    return words.every((word) => title.includes(word));
  });
}
