import { FormEvent, useRef, useState } from "react";
import { SparePart } from "../types";
import { setInStockForSparePart } from "../api";
import { PatchUserDialog } from "./PatchUserDialog";

type SparePartEditEvent = FormEvent<HTMLFormElement> & {
  target: { inStock: { value: string } };
};

export const SparePartDetailsFormTable = ({
  sparePart,
}: {
  sparePart: SparePart;
}) => {
  const [editDisabled, setEditDisabled] = useState<boolean>(true);
  const [userDialog, setUserDialog] = useState<{
    showMessage: boolean;
    message: string;
  }>({ showMessage: false, message: "" });
  const [inStock, setInStock] = useState<number>(sparePart.quantityInStock);
  const inStockInput = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: SparePartEditEvent) => {
    e.preventDefault();
    const requestBody = {
      setStock: Number(e.target.inStock.value),
    };
    setInStockForSparePart(sparePart.id, requestBody)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            setUserDialog({ showMessage: true, message: "Successful" });
            resp.json().then((data) => {
              sparePart = data;
              setInStock(sparePart.quantityInStock);
              setEditDisabled(true);
              setTimeout(() => {
                setUserDialog({ showMessage: false, message: "" });
              }, 800);
            });
            break;
          case 400:
            setUserDialog({
              showMessage: true,
              message: "Error: stock must be greater than 0",
            });
            setTimeout(() => {
              setUserDialog({ showMessage: false, message: "" });
            }, 5000);
            break;
          case 404:
            setUserDialog({
              showMessage: true,
              message: "Could not find spare part",
            });
            setTimeout(() => {
              setUserDialog({ showMessage: false, message: "" });
            }, 5000);
            break;
          default:
            setUserDialog({
              showMessage: true,
              message: "Error: Server returned something unexpected",
            });
            setTimeout(() => {
              setUserDialog({ showMessage: false, message: "" });
            }, 5000);
        }
      })
      .catch(() => {
        setUserDialog({
          showMessage: true,
          message: "Server unavailabale. Try again later",
        });
        setTimeout(() => {
          setUserDialog({ showMessage: false, message: "" });
        }, 5000);
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {editDisabled ? (
        <button
          onClick={() => {
            setEditDisabled(false);
          }}
        >
          Edit stock
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setEditDisabled(true);
              inStockInput.current!.value = inStock.toString();
            }}
          >
            Cancel
          </button>
          <input type="submit" value="Update" />
        </>
      )}
      {userDialog.showMessage && (
        <PatchUserDialog message={userDialog.message} />
      )}
      <table>
        <tbody>
          <tr>
            <th>In Stock</th>
            <td>
              <input
                type="number"
                ref={inStockInput}
                disabled={editDisabled}
                id="inStock"
                defaultValue={sparePart.quantityInStock}
                min="0"
              />
            </td>
          </tr>
          <tr>
            <th>In Repair</th>
            <td>
              <input
                type="number"
                disabled
                value={sparePart.quantityInRepair}
              />
            </td>
          </tr>
          <tr>
            <th>Optimal Quantity</th>
            <td>
              <input type="number" disabled value={sparePart.optimalQuantity} />
            </td>
          </tr>
          <tr>
            <th>Cost (USD)</th>
            <td>
              <input type="number" disabled value={sparePart.cost} />
            </td>
          </tr>
          <tr>
            <th>Failure rate (times/year)</th>
            <td>
              <input type="number" disabled value={sparePart.failureRate} />
            </td>
          </tr>
          <tr>
            <th>Repair time (years)</th>
            <td>
              <input type="number" disabled value={sparePart.repairTime} />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
