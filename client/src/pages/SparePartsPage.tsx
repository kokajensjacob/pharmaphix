import { useEffect, useState } from "react";
import { fetchSpareParts, getSparePartsInRepair } from "../api";
import "../SparePartsPage.css";
import { SparePart, SparePartsInRepair } from "../types";
import { SparePartTable } from "../components/SparePartTable";
import { SparePartInRepair } from "../components/SparePartInRepair";

export const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>();
  const [sparePartsInRepair, setSparePartsInRepair] =
    useState<SparePartsInRepair[]>();
  const [trigger, setTrigger] = useState<boolean>(true);

  useEffect(() => {
    fetchSpareParts().then((data) => setSpareParts(data));
    getSparePartsInRepair().then((data) => setSparePartsInRepair(data));
  }, [trigger]);

  const triggerRerenderOnParent = () => {
    setTrigger(!trigger);
  }

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
      <h1>Spare Parts</h1>
      <div className="collapse collapse-arrow">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          Ongoing Repairs
        </div>
        <div className="collapse-content">
          <ul>
            {sparePartsInRepair?.map((sp) => (
              <SparePartInRepair key={sp.id} sp={sp} triggerRerenderOnParent={triggerRerenderOnParent} />
            ))}
          </ul>
        </div>
      </div>

      {spareParts ? (
        <SparePartTable spareParts={spareParts} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
