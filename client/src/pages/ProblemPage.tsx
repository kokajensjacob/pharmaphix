import { MouseEventHandler, useEffect, useState } from "react";
import { deductSparePartFromInventory, getProblemData } from "../api";
import { useParams } from "react-router-dom";
import { ProblemData, SparePartDeductReqDto } from "../types";
import { FetchError } from "../components/errors/FetchError";
import { PatchUserDialog } from "../components/PatchUserDialog";
import { Loading } from "../components/Loading";
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
            <h1 className="text-4xl font-extrabold dark:text-white mt-5">
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
          <h2 className="text-xl">Problem description: </h2>
          <p className="mb-5">{problemData.problemDescription}</p>
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
                        {sp.quantityNeeded > sp.quantityInStock ? (
                          <>
                            <div className="flex">
                              <div>{sp.sparePartName}</div>
                              <span className="badge badge-lg ml-4 rounded-lg bg-red-400">
                                {sp.quantityNeeded}/{sp.quantityInStock}
                              </span>
                            </div>
                            <div className="flex flex-column badge badge-error badge-outline mt-2">
                              Out of stock
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex">
                              <div>{sp.sparePartName}</div>
                              <span className="badge badge-lg ml-4 rounded-lg bg-green-400">
                                {sp.quantityNeeded}/{sp.quantityInStock}
                              </span>
                            </div>
                            <div className="flex flex-column badge badge-success badge-outline mt-2">
                              In Stock
                            </div>
                          </>
                        )}
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
                  <Loading />
                )}
                {patchUserDialog.showMessage && (
                  <PatchUserDialog message={patchUserDialog.message} />
                )}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn mx-1" onClick={handleOnClick}>
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
                  {problemData.toolsNeeded
                    .sort((t1, t2) => {
                      let t1compare = t1.toolName.toUpperCase();
                      let t2compare = t2.toolName.toUpperCase();
                      return t1compare < t2compare
                        ? -1
                        : t2compare < t1compare
                        ? 1
                        : 0;
                    })
                    .map(({ toolName }) => (
                      <li key={toolName}>{toolName}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold dark:text-white my-8">
              Instructions:
            </h3>
            <Instructions instructions={problemData.instructions.toString()} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
