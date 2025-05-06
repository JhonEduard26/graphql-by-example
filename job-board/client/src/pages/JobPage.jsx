import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { Suspense, use } from "react";
import { getJob } from "../lib/graphql/queries";

function JobPageItem({ getJob }) {
  const job = use(getJob);

  return (
    <div>
      <h1 className="title is-2">{job.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(job.date, "long")}
        </div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default function JobPage() {
  const { jobId } = useParams();

  return (
    <Suspense fallback={<div>Loading job...</div>}>
      <JobPageItem getJob={getJob(jobId)} />
    </Suspense>
  );
}
