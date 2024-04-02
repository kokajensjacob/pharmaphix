import { useEffect, useState } from "react";
import { fetchSpareParts, getSparePartsInRepair } from "../api";
import { SparePart, SparePartsInRepair } from "../types";
import { SparePartTable } from "../components/SparePartTable";
import { SparePartInRepair } from "../components/SparePartInRepair";
import { FetchError } from "../components/errors/FetchError";
import { Link } from "react-router-dom";

export const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>();
  const [sparePartsInRepair, setSparePartsInRepair] =
    useState<SparePartsInRepair[]>();
  const [trigger, setTrigger] = useState<boolean>(true);
  const [showGetError, setShowGetError] = useState<boolean>(false);

  useEffect(() => {
    fetchSpareParts()
      .then((data) => setSpareParts(data))
      .catch(() => setShowGetError(true));

    getSparePartsInRepair()
      .then((data) => setSparePartsInRepair(data))
      .catch(() => setShowGetError(true));
  }, [trigger]);

  const triggerRerenderOnParent = () => {
    setTrigger(!trigger);
  };

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
        </ul>
      </div>
      {showGetError ? (
        <FetchError />
      ) : (
        <>
          <h1>Spare Parts</h1>
          <div className="flex flex-row">
            <div className="collapse collapse-plus w-6/12">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-xl font-medium">
                Ongoing Repairs
              </div>
              <div className="collapse-content">
                <ul>
                  {sparePartsInRepair?.map((sp) => (
                    <SparePartInRepair
                      key={sp.id}
                      sp={sp}
                      triggerRerenderOnParent={triggerRerenderOnParent}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <Link to="/spare-parts/add-new">
              <button className="btn ml-60">Add spare part</button>
            </Link>
          </div>
          {spareParts ? (
            <SparePartTable spareParts={spareParts} />
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};
