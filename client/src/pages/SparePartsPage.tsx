import { useEffect, useState } from "react";
import { fetchSpareParts } from "../api";
import "../SparePartsPage.css";
import { SparePart } from "../types";
import { SparePartTable } from "../components/SparePartTable";

export const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>();

  useEffect(() => {
    fetchSpareParts().then((data) => setSpareParts(data));
  });

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
      {spareParts ? (
        <SparePartTable spareParts={spareParts} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
