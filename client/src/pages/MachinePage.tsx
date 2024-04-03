import { useEffect, useState } from "react";
import { ProblemPerMachine } from "../types";
import { useParams } from "react-router-dom";
import { getProblemPerMachineList } from "../api";
import { FetchError } from "../components/errors/FetchError";
import { Loading } from "../components/Loading";
import { RelatedProblem } from "../components/RelatedProblem";
import { NoRelatedProblems } from "../components/NoRelatedProblems";

export const MachinePage = () => {
  const [machineProblemsData, setMachineProblemsData] =
    useState<ProblemPerMachine>();
  const { machine_type_id } = useParams<string>();
  const [breadcrumbUrl, setBreadcrumbUrl] = useState<string>();
  const [userDialog, setUserDialog] = useState<{
    showError: boolean;
    message: string;
  }>({ showError: false, message: "" });

  useEffect(() => {
    getProblemPerMachineList(machine_type_id as string)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            resp.json().then((data) => {
              setMachineProblemsData(data);
              setBreadcrumbUrl(`/machines/${machine_type_id}`);
            });
            break;
          case 404: setUserDialog({showError: true, message: "404 - Couldn't find machine"});
            break;
          default: setUserDialog({showError: true, message: `Unexpected error: ${resp.status}`});
        }
      })
      .catch(() => setUserDialog({showError: true, message: "Server unavailable"}));
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
      {userDialog.showError ? (
        <FetchError msg={userDialog.message}/>
      ) : machineProblemsData ? (
        <>
          <h1 className="text-4xl font-extrabold mt-5">
            {machineProblemsData.machineName}
          </h1>
          <h2>Quantity: {machineProblemsData.machineQuantity}</h2>
          <h2>Cost: ${machineProblemsData.machineCost.toLocaleString()}</h2>
          <h1 className="text-xl font-extrabold my-8">Related problems:</h1>
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
                  <RelatedProblem key={problem.problemId} problem={problem} />
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
