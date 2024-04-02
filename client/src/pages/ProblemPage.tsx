import { MouseEventHandler, useEffect, useState } from "react";
import { deductSparePartFromInventory, getProblemData } from "../api";
import { useParams } from "react-router-dom";
import { ProblemData, SparePartDeductReqDto } from "../types";
import { FetchError } from "../components/errors/FetchError";
import { PatchUserDialog } from "../components/PatchUserDialog";
import { Instructions } from "../components/Instructions";

export const ProblemPage = () => {
  const [problemData, setProblemData] = useState<ProblemData>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const { machine_type_id, problem_id } = useParams();
  const [showGetError, setShowGetError] = useState<boolean>(false);
  const [patchUserDialog, setPatchUserDialog] = useState<{
    showMessage: boolean;
    message: string;
  }>({ showMessage: false, message: "" });
  const [submitYesClicked, setSubmitYesClicked] = useState<boolean>(false);

  useEffect(() => {
    getAndSetProblemData();
  }, []);

  const getAndSetProblemData = () => {
    getProblemData(problem_id!)
      .then((data: ProblemData) => {
        setProblemData(data);
        setBtnDisabled(
          !data.sparePartsNeeded.every(
            (sp) => sp.quantityInStock >= sp.quantityNeeded
          )
        );
      })
      .catch(() => setShowGetError(true));
  };

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSubmitYesClicked(true);
    const body: SparePartDeductReqDto[] = [];
    problemData!.sparePartsNeeded.forEach((sp) =>
      body.push({
        sparePartId: sp.sparePartId,
        amountToDeduct: sp.quantityNeeded,
      })
    );
    deductSparePartFromInventory(body)
      .then((resp) => {
        switch (resp.status) {
          case 200:
            setPatchUserDialog({ showMessage: true, message: "Successful" });
            setTimeout(() => {
              setPatchUserDialog({ showMessage: false, message: "" });
              getAndSetProblemData();
              (
                document.getElementById("my_modal_1") as HTMLDialogElement
              ).close();
            }, 800);
            break;
          case 404:
            setPatchUserDialog({
              showMessage: true,
              message: "Spare Part not found",
            });
            break;
          case 400:
            setPatchUserDialog({
              showMessage: true,
              message: "Insufficient Inventory",
            });
            break;
          default:
            setPatchUserDialog({
              showMessage: true,
              message: "Unexpected error",
            });
        }
      })
      .then(() => setSubmitYesClicked(false))
      .catch(() => {
        setPatchUserDialog({
          showMessage: true,
          message: "Server not available at the moment. Try again.",
        });
        setSubmitYesClicked(false);
      });
  };

  return (
    <>
      {(showGetError || problemData) && (
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/machines">Machines</a>
            </li>
            <li>
              <a href={`/machines/${machine_type_id}`}>
                {problemData
                  ? problemData.associatedMachineName
                  : "<machine_name>"}
              </a>
            </li>
            <li>
              <a
                href={`/machines/${machine_type_id}/${problemData?.problemId}`}
              >
                {problemData ? problemData.problemName : "<problem_name>"}
              </a>
            </li>
          </ul>
        </div>
      )}
      {showGetError ? (
        <FetchError />
      ) : problemData ? (
        <>
          <div className="flex flex-row items-baseline justify-between ">
            <h1 className="text-4xl font-extrabold dark:text-white">
              {problemData.problemName}
            </h1>
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal()
              }
              disabled={btnDisabled}
            >
              Start Repair
            </button>
          </div>
          <p>{problemData.problemDescription}</p>
          <div className="flex flex-row justify-center">
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
              </div>
            </div>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <p className="py-4">
                  Are you sure you want to start the repair?
                </p>
                {submitYesClicked && !patchUserDialog.showMessage && (
                  <span>Loading...</span>
                )}
                {patchUserDialog.showMessage && (
                  <PatchUserDialog message={patchUserDialog.message} />
                )}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn" onClick={handleOnClick}>
                      Yes
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        patchUserDialog.showMessage && getAndSetProblemData()
                      }
                    >
                      Cancel
                    </button>
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
            <Instructions instructions={problemData.instructions.toString()} />
          </div>
        </>
      ) : (
        <h1> Loading ... </h1>
      )}
    </>
  );
};
