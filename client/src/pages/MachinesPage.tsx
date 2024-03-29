import { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { Link } from "react-router-dom";

type Machine = {
  machineId: string;
  machineName: string;
};

export const MachinesPage = () => {
  const [machines, setMachines] = useState<Machine[]>();

  useEffect(() => {
    fetchMachines().then((data: Machine[]) => setMachines(data));
  });

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
        </ul>
      </div>
      <h1>Machines</h1>
      {machines ? (
        <>
          {machines.map((machine) => (
            <div className="inline-flex">
              <div className="card w-72 bg-base-100 m-5 shadow">
                <div className="card-body">
                  <h2 className="card-title">{machine.machineName}</h2>
                  <div className="card-actions justify-center">
                    <Link to={machine.machineId}>
                      <button className="btn btn-neutral">
                        Related Problems
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
