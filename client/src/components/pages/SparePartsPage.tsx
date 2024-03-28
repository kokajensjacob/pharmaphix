import { useEffect, useState } from "react";
import { fetchSpareParts } from "../../api";
import "../../SparePartsPage.css";

type SparePart = {
  id: string;
  name: string;
  quantityInStock: number;
  optimalQuantity: number;
  quantityInRepair: number;
  cost: number;
  failureRate: number;
  repairTime: number;
};

export const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>();

  useEffect(() => {
    setTimeout(() => {
      fetchSpareParts().then((data) => setSpareParts(data));
    }, 3000);
  });

  return (
    <>
      <h1>Spare Parts</h1>
      {spareParts ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>In Stock</th>
              <th>In workshop</th>
              <th>Optimal Quantity</th>
              <th>Purchase Cost</th>
              <th>Failure rate (per year)</th>
              <th>Repair time (years)</th>
            </tr>
          </thead>
          <tbody>
            {spareParts?.map((sp) => (
              <tr key={sp.id}>
                <td>{sp.name}</td>
                <td>{sp.quantityInStock}</td>
                <td>{sp.quantityInRepair}</td>
                <td>{sp.optimalQuantity}</td>
                <td>{sp.cost}</td>
                <td>{sp.failureRate}</td>
                <td>{sp.repairTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
