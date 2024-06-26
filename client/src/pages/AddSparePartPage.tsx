import { useEffect, useState } from "react";
import { AddSparePartForm } from "../components/AddSparePartForm";
import { Machine } from "../types";
import { fetchMachines } from "../api";
import { FetchError } from "../components/errors/FetchError";
import { Loading } from "../components/Loading";

export const AddSparePartPage = () => {
  const [machines, setMachines] = useState<Machine[]>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    fetchMachines()
      .then((data) => setMachines(data))
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
            <a href="/spare-parts">Spare Parts</a>
          </li>
          <li>
            <a href="/spare-parts/add-new">Add new spare part</a>
          </li>
        </ul>
      </div>
      {showError ? (
        <FetchError msg={"Server not available at the moment. Try again later"}/>
      ) : machines ? (
        <div className="flex justify-center">
          <AddSparePartForm machines={machines} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
