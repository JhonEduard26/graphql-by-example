import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: async (_, { id }) => {
      const job = await getJob(id);

      if (!job) throw notFoundError(`Job with id ${id} not found`);

      return job;
    },
    company: async (_, { id }) => {
      const company = await getCompany(id);

      if (!company) throw notFoundError(`Company with id ${id} not found`);

      return company;
    },
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => job.createdAt.split("T")[0],
  },
};

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
