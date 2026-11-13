import { useEffect, useRef } from "react";

function htmlToText(html) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|h[1-6])>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function JobDetailsModal({ job, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const jobTypes = job.job_types ?? [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal__close"
          aria-label="Close details"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="job-modal-title" className="modal__title">
          {job.title}
        </h2>
        <p className="modal__company">{job.company_name}</p>
        <p className="modal__location">{job.location}</p>

        <div className="modal__meta">
          {jobTypes.map((type) => (
            <span key={type} className="badge">
              {type}
            </span>
          ))}
          <span className="badge badge--soft">
            {job.remote ? "Remote" : "On-site"}
          </span>
        </div>

        <div className="modal__description">{htmlToText(job.description)}</div>
      </div>
    </div>
  );
}

export default JobDetailsModal;
