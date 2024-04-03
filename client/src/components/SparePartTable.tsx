import { Link } from "react-router-dom";
import { SparePart } from "../types";

export const SparePartTable = ({ spareParts }: { spareParts: SparePart[] }) => {
  return (
    <div className="overflow-x-auto my-5">
      <table className="table table-sm table-zebra">
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
                  <div className="badge badge-success gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Stock OK
                  </div>
                ) : sp.quantityInRepair + sp.quantityInStock >
                  sp.optimalQuantity ? (
                  <div className="badge badge-warning gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Overstocked
                  </div>
                ) : (
                  <div className="badge badge-error gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
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
