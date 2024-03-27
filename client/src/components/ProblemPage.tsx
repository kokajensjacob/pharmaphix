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
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { machine_type_id, problem_id } = useParams();

  useEffect(() => {
    getAndSetProblemData();
  }, []);

  const getAndSetProblemData = () => {
    getProblemData(machine_type_id!, problem_id!).then((data: ProblemData) => {
      setProblemData(data);
      setBtnDisabled(
        !data.sparePartsNeeded.every(
          (sp) => sp.quantityInStock >= sp.quantityNeeded,
        ),
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
      }),
    );
    deductSparePartFromInventory(body).then(() => getAndSetProblemData());
    setShowDialog(false);
  };

  return (
    <>
      <ul className="breadcrumb">
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
      <h3>problems</h3>
      {problemData && (
        <>
          <h1>{problemData.problemName}</h1>
          <p>{problemData.problemDescription}</p>
          <div>
            <h3>Spare Parts Needed:</h3>
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
            <button onClick={() => setShowDialog(true)} disabled={btnDisabled}>
              Use
            </button>
            {showDialog && (
              <div>
                <p>Are you sure you want to use the spare parts?</p>
                <button onClick={handleOnClick}>OK</button>
                <button onClick={() => setShowDialog(false)}>Cancel</button>
              </div>
            )}
            <ul>
              <h3>Tools</h3>
              {problemData.toolsNeeded.map(({ toolName }) => (
                <li key={toolName}>{toolName}</li>
              ))}
            </ul>
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
