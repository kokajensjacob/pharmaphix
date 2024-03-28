import { MouseEventHandler, useEffect, useState } from "react";
import { deductSparePartFromInventory, getProblemData } from "../api";
import { useParams } from "react-router-dom";

type ProblemData = {
  problemName: string;
  problemId: string;
  problemDescription: string;
  sparePartsNeeded: {
    sparePartName: string;
    sparePartId: string;
    quantityNeeded: number;
    quantityInStock: number;
  }[];
  toolsNeeded: {
    toolName: string;
  }[];
  instructions: string;
};

export type SparePartDeductReqDto = {
  sparePartId: string;
  amountToDeduct: number;
};

export const ProblemPage = () => {
  const [problemData, setProblemData] = useState<ProblemData>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { machine_type_id, problem_id } = useParams();

  useEffect(() => {
    getAndSetProblemData();
  }, []);

  const getAndSetProblemData = () => {
    getProblemData(machine_type_id!, problem_id!).then((data: ProblemData) => {
      setProblemData(data);
      setBtnDisabled(
        !data.sparePartsNeeded.every(
          (sp) => sp.quantityInStock >= sp.quantityNeeded
        )
      );
    });
  };

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const body: SparePartDeductReqDto[] = [];
    problemData!.sparePartsNeeded.forEach((sp) =>
      body.push({
        sparePartId: sp.sparePartId,
        amountToDeduct: sp.quantityNeeded,
      })
    );
    deductSparePartFromInventory(body).then(() => getAndSetProblemData());
    (document.getElementById("my_modal_1") as HTMLDialogElement).close();
  };

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Machines</a>
          </li>
          <li>
            <a href="/">MachineName</a>
          </li>
          <li>
            <a href={`/machines/:machine_id/${problemData?.problemId}`}>
              {problemData?.problemName}
            </a>
          </li>
        </ul>
      </div>
      <h3>problems</h3>
      {problemData && (
        <>
          <h1>{problemData.problemName}</h1>
          <p>{problemData.problemDescription}</p>
          <div className="inline-flex">
            <div className="card w-72 bg-base-100 m-5 shadow">
              <div className="card-body">
                <h2 className="card-title">Spare Parts Needed</h2>
                <ul>
                  {problemData.sparePartsNeeded
                    .sort((sp1, sp2) => {
                      let sp1compare = sp1.sparePartName.toUpperCase();
                      let sp2compare = sp2.sparePartName.toUpperCase();
                      return sp1compare < sp2compare
                        ? -1
                        : sp2compare < sp1compare
                        ? 1
                        : 0;
                    })
                    .map((sp) => (
                      <li key={sp.sparePartId}>
                        <div>{sp.sparePartName}</div>
                        <div>
                          {sp.quantityNeeded}/{sp.quantityInStock}
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="card-actions justify-end">
                  <button
                    className="btn"
                    onClick={() =>
                      (
                        document.getElementById(
                          "my_modal_1"
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                    disabled={btnDisabled}
                  >
                    Use
                  </button>
                </div>
              </div>
            </div>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <p className="py-4">
                  Are you sure you want to use the spare parts?
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn" onClick={handleOnClick}>
                      Yes
                    </button>
                    <button className="btn">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
            <div className="card w-72 bg-base-100 m-5 shadow">
              <div className="card-body">
                <h2 className="card-title">Tools</h2>
                <ul>
                  {problemData.toolsNeeded.map(({ toolName }) => (
                    <li key={toolName}>{toolName}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3>INSTRUCTIONS:</h3>
            <p>{problemData.instructions}</p>
          </div>
        </>
      )}
    </>
  );
};
