import { useParams } from "react-router";
import { Suspense, use } from "react";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";
import { ErrorBoundary } from "react-error-boundary";

function CompanyItem({ getCompany }) {
  const company = use(getCompany);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>

      <h2 className="title is-5">Jobs at {company.name}</h2>

      <JobList jobs={company.jobs} />
    </div>
  );
}

export default function CompanyPage() {
  const { companyId } = useParams();

  return (
    <ErrorBoundary
      fallback={<div className="has-text-danger">Something went wrong</div>}
    >
      <Suspense fallback={<div>Loading company...</div>}>
        <CompanyItem getCompany={getCompany(companyId)} />
      </Suspense>
    </ErrorBoundary>
  );
}
