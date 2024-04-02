import { SparePart } from "../types";

export const SparePartTable = ({ spareParts }: { spareParts: SparePart[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
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
          {spareParts.map((sp) => (
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
    </div>
  );
};
