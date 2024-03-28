import { useEffect, useState } from "react";
import { fetchMachines } from "../../api";
import { Link } from "react-router-dom";

type Machine = {
  machineId: string;
  machineName: string;
};

export const MachinesPage = () => {
  const [machines, setMachines] = useState<Machine[]>();

  useEffect(() => {
    setTimeout(() => {
      fetchMachines().then((data: Machine[]) => setMachines(data));
    }, 3000);
  });

  return (
    <>
      <h1>Machines</h1>
      {machines ? (
        machines.map((machine) => (
          <>
            <Link to={machine.machineId} key={machine.machineId}>
              {machine.machineName}
            </Link>
            <br />
          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
