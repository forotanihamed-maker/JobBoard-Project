import { useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { filterJobsByTitle } from "../utils/filterJobs";
import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";

const BASE_URL = "https://www.arbeitnow.com/api/job-board-api";
const MAX_VISIBLE_JOBS = 100;
const DEBOUNCE_MS = 400;

function buildUrl(term) {
  const params = new URLSearchParams({ page: "1" });
  if (term) params.set("search", term);
  return `${BASE_URL}?${params}`;
}

function Jobs({ searchTerm }) {
  // Wait until the user stops typing before fetching / filtering.
  const debouncedTerm = useDebounce(searchTerm.trim(), DEBOUNCE_MS);

  const { status, data, error } = useFetch(buildUrl(debouncedTerm));
  const [selectedJob, setSelectedJob] = useState(null);

  const handleClose = useCallback(() => setSelectedJob(null), []);

  // Derived from data + term, so it is computed here instead of stored in state.
  // Filter first, then limit: otherwise only the first jobs would be searchable.
  const visibleJobs =
    status === "success"
      ? filterJobsByTitle(data, debouncedTerm).slice(0, MAX_VISIBLE_JOBS)
      : [];

  const isEmpty =
    status === "empty" || (status === "success" && visibleJobs.length === 0);

  return (
    <main className="main">
      {status === "loading" && <p className="state">Loading jobs...</p>}
      {status === "error" && (
        <p className="state state--error">
          Something went wrong: {error?.message}
        </p>
      )}
      {isEmpty && <p className="state">No jobs found.</p>}
      {visibleJobs.length > 0 && (
        <ul className="job-list">
          {visibleJobs.map((job) => (
            <li key={job.slug}>
              <JobCard job={job} onViewDetails={setSelectedJob} />
            </li>
          ))}
        </ul>
      )}

      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={handleClose} />
      )}
    </main>
  );
}

export default Jobs;
