import { FormEvent, useState } from "react";
import { Machine, SparePartPostRequest } from "../types";
import { postNewSparePart } from "../api";
import { PatchUserDialog } from "./PatchUserDialog";

type NewSparePartFormEvent = FormEvent<HTMLFormElement> & {
  target: {
    sparePartName: { value: string };
    sparePartCost: { value: string };
    failAmount: { value: string };
    failDivisor: { value: "week" | "month" | "year" };
    sparePartInStock: { value: string };
    sparePartRepairTime: { value: string };
    associatedMachineId: { value: string };
  };
};

export const AddSparePartForm = ({ machines }: { machines: Machine[] }) => {
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [userDialog, setUserDialog] = useState<{
    showMessage: boolean;
    message: string;
  }>({ showMessage: false, message: "" });
  const [createdSparePart, setCreatedSparePart] = useState<{
    id: string;
    optimalQuantity: number;
  }>();

  function resetUserDialog() {
    setUserDialog({ showMessage: false, message: "" });
  }

  function displayUserDialog(message: string, duration: number) {
    setUserDialog({ showMessage: true, message: message });
    setTimeout(() => {
      resetUserDialog();
    }, duration);
  }

  function handleOnSubmit(e: NewSparePartFormEvent) {
    e.preventDefault();
    setDisableForm(true);
    const request: SparePartPostRequest = {
      name: e.target.sparePartName.value,
      cost: Number(e.target.sparePartCost.value),
      failureRate: getFailureRate(
        Number(e.target.failAmount.value),
        e.target.failDivisor.value,
      ),
      quantityInStock: Number(e.target.sparePartInStock.value),
      repairTime: Number(e.target.sparePartRepairTime.value),
      machineId: e.target.associatedMachineId.value,
    };

    async function handle201(resp: Response) {
      const data = await resp.json();
      setCreatedSparePart(data);
      (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
    }

    postNewSparePart(request)
      .then((resp) => {
        switch (resp.status) {
          case 201:
            handle201(resp);
            break;
          case 400:
            displayUserDialog(
              "Spare part was not created because the request was bad",
              5000,
            );
            break;
          case 404:
            displayUserDialog(
              "Couldn't find the associated machine in the database. It might have been recently deleted by another user. Try reloading the page",
              10000,
            );
            break;
          case 409:
            displayUserDialog(
              "That spare part already exists in the database!",
              5000,
            );
            break;
          default:
            displayUserDialog("Something unexpected happened", 5000);
        }
      })
      .then(() => setDisableForm(false))
      .catch(() => {
        displayUserDialog("Server unavailable. Try again later", 3000);
        setDisableForm(false);
      });
  }

  function getFailureRate(amount: number, timeUnit: "week" | "month" | "year") {
    let mult;
    switch (timeUnit) {
      case "year":
        mult = 1;
        break;
      case "month":
        mult = 12;
        break;
      case "week":
        mult = 52;
        break;
    }
    return amount * mult;
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="sparePartName" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Spare part name *</span>
          </div>
        </label>
        <input
          type="text"
          name="sparePartName"
          id="sparePartName"
          disabled={disableForm}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="sparePartCost" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Purchase cost per spare part *</span>
          </div>
        </label>
        <input
          type="text"
          id="sparePartCost"
          placeholder="1194.99"
          disabled={disableForm}
          className="input input-bordered w-full max-w-xs"
        />
        <label
          htmlFor="sparePartFailureRate"
          className="form-control w-full max-w-xs"
        >
          <div className="label">
            <span className="label-text">
              How often does the spare part need replacing? (on average) *
            </span>
          </div>
        </label>
        <div id="sparePartFailureRate">
          <input
            type="number"
            name=""
            id="failAmount"
            defaultValue={1}
            min={1}
            disabled={disableForm}
          />
          /
          <select defaultValue="month" id="failDivisor" disabled={disableForm}>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>
        <label
          htmlFor="sparePartInStock"
          className="form-control w-full max-w-xs"
        >
          <div className="label">
            <span className="label-text">How many are in stock right now?</span>
          </div>
        </label>
        <input
          type="number"
          name="sparePartInStock"
          id="sparePartInStock"
          disabled={disableForm}
        />
        <label
          htmlFor="sparePartRepairTime"
          className="form-control w-full max-w-xs"
        >
          <div className="label">
            <span className="label-text">
              Enter average repair time of spare part:
            </span>
          </div>
        </label>
        <input
          type="number"
          name="sparePartRepairTime"
          id="sparePartRepairTime"
          disabled={disableForm}
        />{" "}
        years
        <fieldset disabled={disableForm}>
          <legend className="label-text">
            Select the associated machine from the list below
          </legend>
          {machines.map(({ machineId, machineName }) => (
            <label className="label cursor-pointer" key={machineId}>
              <span className="label-text">{machineName}</span>
              <input
                type="radio"
                name="associatedMachineId"
                value={machineId}
                className="radio checked:bg-blue-500"
              />
            </label>
          ))}
        </fieldset>
        <input type="submit" className="btn" value="Add new spare part" />
      </form>
      {userDialog.showMessage && (
        <PatchUserDialog message={userDialog.message} />
      )}
      {createdSparePart && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Spare part created successfully
            </h3>
            <p className="py-4">ID: {createdSparePart.id}</p>
            <p className="py-4 bold">
              Calculated optimal quantity
              {/* based on the purchase cost of the
              part itself and the associated machine, and the average repair
      time and the breakage frequancy of the part is*/}
              : {createdSparePart.optimalQuantity}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
