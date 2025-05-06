import { Suspense, use } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../lib/graphql/queries";

function HomeList({ getJobs }) {
  const jobs = use(getJobs);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeList getJobs={getJobs()} />
    </Suspense>
  );
}
