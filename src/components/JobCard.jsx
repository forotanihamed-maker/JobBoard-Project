function stripHtml(html) {
  return html.replace(/<[^>]*>/g, " ");
}

function summarize(text, max = 120) {
  if (!text) return "";
  const clean = stripHtml(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

function JobCard({ job, onViewDetails }) {
  const jobTypes = job.job_types ?? [];

  return (
    <article className="job-card">
      <h2 className="job-card__title">{job.title}</h2>

      <p className="job-card__company">{job.company_name}</p>
      <p className="job-card__location">{job.location}</p>

      <div className="job-card__meta">
        {jobTypes.map((type) => (
          <span key={type} className="badge">
            {type}
          </span>
        ))}
        <span className="badge badge--soft">
          {job.remote ? "Remote" : "On-site"}
        </span>
      </div>

      <p className="job-card__summary">{summarize(job.description)}</p>

      <button
        type="button"
        className="btn-primary"
        onClick={() => onViewDetails?.(job)}
      >
        View Details
      </button>
    </article>
  );
}

export default JobCard;
