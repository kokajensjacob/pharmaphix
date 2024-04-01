import { useEffect, useState } from "react";
import { fetchSpareParts } from "../api";
import "../SparePartsPage.css";
import { SparePart } from "../types";
import { SparePartTable } from "../components/SparePartTable";

export const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>();

  useEffect(() => {
    fetchSpareParts().then((data) => setSpareParts(data));
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
            <li>f</li>
            <li>d</li>
            <li>g</li>
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
