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
        data.sparePartsNeeded.every(
          (sp) => sp.quantityInStock < sp.quantityNeeded,
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
  };

  return (
    <>
      <h3>problems</h3>
      {problemData && (
        <>
          <h1>{problemData.problemName}</h1>
          <p>{problemData.problemDescription}</p>
          <div>
            <h3>Spare Parts Needed:</h3>
            <ul>
              {problemData.sparePartsNeeded.map((sp) => (
                <li key={sp.sparePartId}>
                  <div>{sp.sparePartName}</div>
                  <div>
                    {sp.quantityNeeded}/{sp.quantityInStock}
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleOnClick} disabled={btnDisabled}>
              Use
            </button>
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
