import { useEffect, useState } from "react";
import { getInvStatus, getSparePartsDeviation } from "../api";
import { Link } from "react-router-dom";
import { FetchError } from "../components/errors/FetchError";

export const Home = () => {
  const [repairQuantity, setRepairQuantity] = useState();
  const [deviation, setDeviation] = useState<{
    overstocked: { spareParts: number; sparePartUnits: number };
    understocked: { spareParts: number; sparePartUnits: number };
  }>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    getInvStatus()
      .then((num) => setRepairQuantity(num))
      .catch(() => setShowError(true));
    getSparePartsDeviation()
      .then((data) => setDeviation(data))
      .catch(() => setShowError(true));
  }, []);

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
      {showError ? (
        <FetchError />
      ) : repairQuantity === undefined || deviation === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            There are {deviation.overstocked.spareParts} spare parts overstocked
            (for a total of {deviation.overstocked.sparePartUnits} units)
          </p>
          <p>
            There are {deviation.understocked.spareParts} spare parts
            understocked (for a total of {deviation.understocked.sparePartUnits}{" "}
            units)
          </p>
          {repairQuantity === 0 ? (
            <h1>
              There are currently no spare parts undergoing repair in the
              workshop
            </h1>
          ) : repairQuantity === 1 ? (
            <h1>
              There is currently 1 spare part undergoing repair in the workshop
            </h1>
          ) : (
            <h1>
              There are currently {repairQuantity} spare parts undergoing repair
              in the workshop
            </h1>
          )}
        </>
      )}
      <div className="home__button-container">
        <Link to="machines" className="btn btn-wide m-5">
          Machines
        </Link>
        <Link to="spare-parts" className="btn btn-wide m-5">
          Spare Parts
        </Link>
      </div>
    </div>
  );
};
