import { useRef, useState } from "react";
import { SparePartsInRepair } from "../types";

export const SparePartInRepair = ({ sp }: { sp: SparePartsInRepair }) => {
  const [disableFixBtn, setDisableFixBtn] = useState<boolean>(true);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleOnChange = () => {
    setDisableFixBtn(inputElement.current?.value === "0");
  };

  return (
    <>
      <li key={sp.id}>
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
      </li>
      <dialog id={`modal_${sp.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{sp.name}</h3>
          <p className="py-4">Related Machine: {sp.associatedMachineName}</p>
          <p className="py-4">Quantity in repair: {sp.quantityInRepair}</p>
          <div className="modal-action">
            <form method="dialog">
              <input
                type="number"
                min={0}
                max={sp.quantityInRepair}
                defaultValue={0}
                ref={inputElement}
                onChange={handleOnChange}
              />
              <button className="btn" disabled={disableFixBtn}>
                Mark as Fixed
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
