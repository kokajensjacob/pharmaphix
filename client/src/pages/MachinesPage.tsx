import { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { Link } from "react-router-dom";
import { FetchError } from "../components/errors/FetchError";
import { Machine } from "../types";
import { Loading } from "../components/Loading";

export const MachinesPage = () => {
  const [machines, setMachines] = useState<Machine[]>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    fetchMachines()
      .then((data: Machine[]) => setMachines(data))
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
        </ul>
      </div>
      {showError ? (
        <FetchError />
      ) : machines ? (
        <>
          <h1 className="text-xl font-medium m-5">Machines</h1>
          {machines.sort((m1, m2) => {
              let m1compare = m1.machineName.toUpperCase();
              let m2compare = m2.machineName.toUpperCase();
              return m1compare < m2compare ? -1 : m2compare < m1compare ? 1 : 0;
            }).map((machine) => (
            <div key={machine.machineId} className="inline-flex">
              <div className="card w-72 h-72 bg-base-100 m-5 shadow">
                <div className="card-body">
                  <h2 className="card-title">{machine.machineName}</h2>
                  <p>Quantity: {machine.machineQuantity}</p>
                  <div className="card-actions justify-center">
                    <Link to={machine.machineId}>
                      <button className="btn">Related Problems</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
