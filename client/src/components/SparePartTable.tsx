import { SparePart } from "../types";

export const SparePartTable = ({ spareParts }: { spareParts: SparePart[] }) => {
  return (
    <div className="overflow-x-auto my-5">
      <table className="table table-sm table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>In Stock</th>
            <th>In workshop</th>
            <th>Optimal Quantity</th>
            <th>Purchase Cost</th>
            <th>Failure rate (per year)</th>
            <th>Repair time (years)</th>
            <th>Inventory Status</th>
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
