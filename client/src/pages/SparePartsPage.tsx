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
      <h1>Spare Parts</h1>
      {spareParts ? (
        <SparePartTable spareParts={spareParts} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
