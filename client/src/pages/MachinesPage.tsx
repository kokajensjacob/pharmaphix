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
      <h1>Machines</h1>
      {machines ? (
        <ul>
          {machines.map((machine) => (
            <li key={machine.machineId}>
              <Link to={machine.machineId}>{machine.machineName}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
