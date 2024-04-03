import { useEffect, useState } from "react";
import { getInvStatus, getSparePartsDeviation } from "../api";
import { Link } from "react-router-dom";
import { FetchError } from "../components/errors/FetchError";
import { Loading } from "../components/Loading";

export const Home = () => {
  const [repairQuantity, setRepairQuantity] = useState<{unitsInRepair: number, sparePartsInRepair: number}>();
  const [deviation, setDeviation] = useState<{
    overstocked: { spareParts: number; sparePartUnits: number };
    understocked: { spareParts: number; sparePartUnits: number };
  }>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    getInvStatus()
      .then((data) => setRepairQuantity(data))
      .catch(() => setShowError(true));
    getSparePartsDeviation()
      .then((data) => setDeviation(data))
      .catch(() => setShowError(true));
  }, []);

  return (
    <div className="flex justify-center my-20">
      <div className="flex-column">
        {showError ? (
          <FetchError />
        ) : repairQuantity === undefined || deviation === undefined ? (
          <Loading />
        ) : (
          <>
          <h1 className="text-xl font-extrabold my-5">Spare parts inventory status</h1>
          <div className="stats stats-vertical lg:stats-horizontal shadow rounded-md h-48 min-w-full grid-cols-3">
            <div className="stat w-1/3">
              <div className="stat-title">overstocked</div>
              <div className="stat-value text-yellow-400">
                {deviation.overstocked.spareParts}
              </div>

              <div className="stat-desc">
                {deviation.overstocked.sparePartUnits} units in total
              </div>
            </div>
            <div className="stat w-1/3">
              <div className="stat-title">understocked</div>
              <div className="stat-value text-rose-500">
                {deviation.understocked.spareParts}{" "}
              </div>
              <div className="stat-desc">
                {deviation.understocked.sparePartUnits} units in total
              </div>
            </div>

            {repairQuantity.sparePartsInRepair === 1 ? (
              <div className="stat w-1/3">
                <div className="stat-title">in repair</div>
                <div className="stat-value">1</div>
                <div className="stat-desc">{repairQuantity.unitsInRepair} unit in total</div>
              </div>
            ) : (
              <div className="stat w-1/3">
                <div className="stat-title">in repair</div>
                <div className="stat-value">{repairQuantity.sparePartsInRepair}</div>
                <div className="stat-desc">{repairQuantity.unitsInRepair} units in total</div>
              </div>
            )}
          </div>
          </>
        )}

        <div className="my-5">
          <Link to="machines" className="btn btn-wide m-5">
            Machines
          </Link>
          <Link to="spare-parts" className="btn btn-wide m-5">
            Spare Parts
          </Link>
        </div>
      </div>
    </div>
  );
};
