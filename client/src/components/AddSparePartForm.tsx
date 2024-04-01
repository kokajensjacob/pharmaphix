import { useEffect, useState } from "react";
import { Machine } from "../types";
import { fetchMachines } from "../api";

export const AddSparePartForm = () => {
  const [machines, setMachines] = useState<Machine[]>();

  useEffect(() => {
    fetchMachines().then((data) => setMachines(data));
  });

  return (
    <>
      {machines ? (
        <form>
          <label
            htmlFor="sparePartName"
            className="form-control w-full max-w-xs"
          >
            <div className="label">
              <span className="label-text">Spare part name *</span>
            </div>
          </label>
          <input
            type="text"
            name="sparePartName"
            id="sparePartName"
            className="input input-bordered w-full max-w-xs"
          />
          <label
            htmlFor="sparePartCost"
            className="form-control w-full max-w-xs"
          >
            <div className="label">
              <span className="label-text">Purchase cost per spare part *</span>
            </div>
          </label>
          <input
            type="text"
            id="sparePartCost"
            placeholder="1194.99"
            className="input input-bordered w-full max-w-xs"
          />
          <label
            htmlFor="sparePartFailureRate"
            className="form-control w-full max-w-xs"
          >
            <div className="label">
              <span className="label-text">
                How often does he spare part need replacing? (on average) *
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
            />
            /
            <select defaultValue="month" id="failDivisor">
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </div>
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
          />{" "}
          years
          <fieldset>
            <legend className="label-text">
              Select the associated machine
            </legend>
            {machines?.map(({ machineId, machineName }) => (
              <label className="label cursor-pointer" key={machineId}>
                <span className="label-text">{machineName}</span>
                <input
                  type="radio"
                  name="radio-10"
                  value={machineId}
                  className="radio checked:bg-blue-500"
                />
              </label>
            ))}
          </fieldset>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
