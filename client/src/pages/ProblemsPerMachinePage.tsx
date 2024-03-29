import { useEffect, useState } from "react";
import { ProblemPerMachine } from "../types";
import { Link, useParams } from "react-router-dom";
import { getProblemPerMachineList } from "../api";

export const ProblemsPerMachinePage = () => {
  const [machineProblemsData, setMachineProblemsData] =
    useState<ProblemPerMachine>();
  const { machine_type_id } = useParams<string>();
  const [breadcrumbUrl, setBreadcrumbUrl] = useState<string>();

  useEffect(() => {
    getProblemPerMachineList(machine_type_id as string).then((data) => {
      setMachineProblemsData(data);
      setBreadcrumbUrl(`/machines/${machine_type_id}`);
    });
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
      {machineProblemsData ? (
        <>
          <h1>{machineProblemsData.machineName}</h1>
          <h2>Quantity: {machineProblemsData.machineQuantity}</h2>
          <h1>Related problems:</h1>
          <div>
            {machineProblemsData.problems.map((problem) => (
              <div className="inline-flex" key={problem.problemId}>
                <div className="card w-72 bg-base-100 m-5 shadow">
                  <div className="card-body">
                    <h2 className="card-title">{problem.problemName}</h2>
                    <div className="card-actions justify-center">
                      <Link to={problem.problemId}>
                        <button className="btn btn-neutral">See Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1> Loading ... </h1>
      )}
    </>
  );
};
