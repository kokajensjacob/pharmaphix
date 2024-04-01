import { useRef, useState } from "react";
import { markSparePartAsRepaired } from "../api";
import { SparePartsInRepair } from "../types";

type SparePartInRepairProps = {
  sp: SparePartsInRepair;
  triggerRerenderOnParent: () => void;
};

export const SparePartInRepair = ({
  sp,
  triggerRerenderOnParent,
}: SparePartInRepairProps) => {
  const [disableFixBtn, setDisableFixBtn] = useState<boolean>(true);
  const inputElement = useRef<HTMLInputElement>(null);
  const [userDialog, setUserDialog] = useState<{
    showMessage: boolean;
    message: string;
  }>({ showMessage: false, message: "" });

  const handleOnChange = () => {
    setDisableFixBtn(inputElement.current?.value === "0");
  };

  const handleClick = () => {
    markSparePartAsRepaired(sp.id, Number(inputElement.current!.value)).then(
      (resp) => {
        switch (resp.status) {
          case 204:
            triggerRerenderOnParent();
            break;
          case 400:
            setUserDialog({
              showMessage: true,
              message:
                "Invalid amount (Someone else could have marked this spare part as fixed)",
            });
            break;
          case 404:
            setUserDialog({
              showMessage: true,
              message: "Spare Part not found",
            });
            break;
          default:
            setUserDialog({
              showMessage: true,
              message: "Unexpected error",
            });
        }
      }
    );
  };

  return (
    <li>
      <p> {sp.name}</p>
      <button
        className="btn"
        onClick={() => {
          inputElement.current!.value = "0";
          setDisableFixBtn(true);

          (
            document.getElementById(`modal_${sp.id}`) as HTMLDialogElement
          ).showModal();
        }}
      >
        Details
      </button>
      <dialog id={`modal_${sp.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{sp.name}</h3>
          <p className="py-4">Related Machine: {sp.associatedMachineName}</p>
          <p className="py-4">Quantity in repair: {sp.quantityInRepair}</p>
          <div className="modal-action">
            <form method="dialog">
              <label htmlFor={`input_${sp.id}`}>Mark as fixed: </label>
              <input
                type="number"
                id={`input_${sp.id}`}
                min={0}
                max={sp.quantityInRepair}
                defaultValue={0}
                ref={inputElement}
                onChange={handleOnChange}
              />
              <button
                className="btn"
                disabled={disableFixBtn}
                onClick={handleClick}
              >
                Mark as Fixed
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </li>
  );
};
