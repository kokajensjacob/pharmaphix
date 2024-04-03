import { Link } from "react-router-dom";
import { SparePart } from "../types";

export const SparePartTable = ({ spareParts }: { spareParts: SparePart[] }) => {
  return (
    <div className="overflow-x-auto my-5 flex justify-center">
      <table className="table table-sm table-zebra max-w-5xl ">
        <thead>
          <tr>
            <th>Name</th>
            <th>In Stock</th>
            <th>In Repair</th>
            <th>Optimal Quantity</th>
            <th>Inventory Status</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sp) => (
            <tr key={sp.id}>
              <td>
                <Link className="underline hover:text-blue-800" to={`${sp.id}`}>
                  {sp.name}
                </Link>
              </td>
              <td>{sp.quantityInStock}</td>
              <td>{sp.quantityInRepair}</td>
              <td>{sp.optimalQuantity}</td>
              <td>
                {sp.quantityInRepair + sp.quantityInStock ===
                sp.optimalQuantity ? (
                  <div className="badge badge-success gap-2 w-36">Stock OK</div>
                ) : sp.quantityInRepair + sp.quantityInStock >
                  sp.optimalQuantity ? (
                  <div className="badge badge-warning gap-2 w-36">
                    Overstocked
                  </div>
                ) : (
                  <div className="badge badge-error gap-2 w-36">
                    Understocked
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
