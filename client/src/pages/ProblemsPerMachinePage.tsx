import { useEffect, useState } from "react";
import { ProblemPerMachine } from "../types";
import { Link, useParams } from "react-router-dom";
import { getProblemPerMachineList } from "../api";

export const ProblemsPerMachinePage = () => {
const [problems, setProblems] = useState<ProblemPerMachine[]>();
const {machine_type_id} = useParams<string>();
const [breadcrumbUrl, setBreadcrumbUrl] = useState<string>();

useEffect(() => {
  getProblemPerMachineList(machine_type_id as string)
  .then(data => {
    setProblems(data);
    setBreadcrumbUrl(`/machines/${machine_type_id}`)
  });
}, [])

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
            <a href={breadcrumbUrl}>MachineNameCHANGEME</a>
          </li>
        </ul>
      </div>
      {problems ? (
        <div>
          {problems.map((problem) => (
            <div className="inline-flex" key={problem.problemId}>
              <div className="card w-72 bg-base-100 m-5 shadow">
                <div className="card-body">
                  <h2 className="card-title">{problem.problemName}</h2>
                  <div className="card-actions justify-center">
                    <Link to={problem.problemId}>
                      <button className="btn btn-neutral">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>) : ( <h1> Loading ... </h1> )}
      </>);
};
