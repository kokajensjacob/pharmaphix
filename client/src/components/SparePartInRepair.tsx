import { MouseEventHandler, useRef, useState } from "react";
import { markSparePartAsRepaired } from "../api";
import { SparePartsInRepair } from "../types";
import { PatchUserDialog } from "./PatchUserDialog";
import { Loading } from "./Loading";

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
  const [submitYesClicked, setSubmitYesClicked] = useState<boolean>(false);

  const handleOnChange = (inputMaxLimit: number) => {
    if (
      inputElement.current?.valueAsNumber &&
      inputElement.current?.valueAsNumber > inputMaxLimit
    ) {
      setDisableFixBtn(true);
    } else {
      setDisableFixBtn(inputElement.current?.value === "0");
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSubmitYesClicked(true);
    markSparePartAsRepaired(sp.id, Number(inputElement.current!.value))
      .then((resp) => {
        switch (resp.status) {
          case 204:
            setUserDialog({ showMessage: true, message: "Successful" });
            setTimeout(() => {
              setUserDialog({ showMessage: false, message: "" });
              triggerRerenderOnParent();
              (
                document.getElementById(`modal_${sp.id}`) as HTMLDialogElement
              ).close();
            }, 800);
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
      })
      .then(() => setSubmitYesClicked(false))
      .catch(() => {
        setUserDialog({
          showMessage: true,
          message: "Server not available at the moment. Try again.",
        });
        setSubmitYesClicked(false);
      });
  };

  return (
    <li>
      <div className="flex flex-row items-baseline justify-around">
        <p> {sp.name}</p>
        <button
          className="btn btn-sm"
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
      </div>
      <dialog id={`modal_${sp.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{sp.name}</h3>
          <p className="py-4">Related Machine: {sp.associatedMachineName}</p>
          <p className="py-4">Quantity in repair: {sp.quantityInRepair}</p>
          {submitYesClicked && !userDialog.showMessage && <Loading />}
          {userDialog.showMessage && (
            <PatchUserDialog message={userDialog.message} />
          )}
          <div className="modal-action">
            <label htmlFor={`input_${sp.id}`}>Mark as fixed: </label>
            <input
              type="number"
              id={`input_${sp.id}`}
              min={0}
              max={sp.quantityInRepair}
              defaultValue={0}
              ref={inputElement}
              onChange={() => handleOnChange(sp.quantityInRepair)}
            />
            <form method="dialog">
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
