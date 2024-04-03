import { Link } from "react-router-dom";

export const RelatedProblem = ({
  problem,
}: {
  problem: { problemId: string; problemName: string };
}) => {
  return (
    <Link to={problem.problemId}>
      <div className="my-5">
        <div className="collapse collapse-close border border-base-200 bg-base-200 rounded-1xl">
          <div className="flex flex-row justify-between items-baseline  collapse-title text-xl font-medium">
            {problem.problemName}
          </div>
        </div>
      </div>
    </Link>
  );
};
