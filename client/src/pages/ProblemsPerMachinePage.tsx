import { useEffect, useState } from "react";
import { ProblemPerMachine } from "../types";
import { Link, useParams } from "react-router-dom";
import { getProblemPerMachineList } from "../api";
import { FetchError } from "../components/errors/FetchError";
import { Loading } from "../components/Loading";
import { RelatedProblem } from "../components/RelatedProblem";
import { NoRelatedProblems } from "../components/NoRelatedProblems";

export const ProblemsPerMachinePage = () => {
  const [machineProblemsData, setMachineProblemsData] =
    useState<ProblemPerMachine>();
  const { machine_type_id } = useParams<string>();
  const [breadcrumbUrl, setBreadcrumbUrl] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    getProblemPerMachineList(machine_type_id as string)
      .then((data) => {
        setMachineProblemsData(data);
        setBreadcrumbUrl(`/machines/${machine_type_id}`);
      })
      .catch(() => setShowError(true));
  }, []);

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/machines">Machines</a>
          </li>
          <li>
            <a href={breadcrumbUrl}>
              {machineProblemsData
                ? machineProblemsData.machineName
                : "<machine_name>"}
            </a>
          </li>
        </ul>
      </div>
      {showError ? (
        <FetchError />
      ) : machineProblemsData ? (
        <>
          <h1 className="text-4xl font-extrabold dark:text-white mt-5">
            {machineProblemsData.machineName}
          </h1>
          <h2>Quantity: {machineProblemsData.machineQuantity}</h2>
          <h1 className="text-xl font-extrabold dark:text-white my-8">
            Related problems:
          </h1>
          {machineProblemsData.problems.length === 0 ? (
            <NoRelatedProblems />
          ) : (
            <div>
              {machineProblemsData.problems
                .sort((p1, p2) => {
                  let p1compare = p1.problemName.toUpperCase();
                  let p2compare = p2.problemName.toUpperCase();
                  return p1compare < p2compare
                    ? -1
                    : p2compare < p1compare
                    ? 1
                    : 0;
                })
                .map((problem) => (
                  <RelatedProblem problem={problem} />
                ))}
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
