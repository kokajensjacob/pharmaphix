import { useEffect, useState } from "react";
import { ProblemPerMachine } from "../types";
import { Link, useParams } from "react-router-dom";
import { getProblemPerMachineList } from "../api";
import { FetchError } from "../components/errors/FetchError";
import { Loading } from "../components/Loading";

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
          <h1 className="text-4xl font-extrabold dark:text-white">
            {machineProblemsData.machineName}
          </h1>
          <h2>Quantity: {machineProblemsData.machineQuantity}</h2>
          <h1 className="text-xl font-extrabold dark:text-white my-2">
            Related problems:
          </h1>
          <div>
            {machineProblemsData.problems.map((problem) => (
              <div key={problem.problemId}>
                <div className="collapse collapse-close border border-base-200 bg-base-200 rounded-2xl">
                  <div className="flex flex-row justify-between items-baseline  collapse-title text-xl font-medium">
                    {problem.problemName}

                    <Link to={problem.problemId}>
                      <button className="btn btn-ghost">See Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
