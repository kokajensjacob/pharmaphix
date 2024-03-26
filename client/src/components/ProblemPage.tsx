import { useEffect, useState } from "react";
import { getProblemData } from "../api";
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

export const ProblemPage = () => {
  const [problemData, setProblemData] = useState<ProblemData>();
  const { machine_type_id, problem_id } = useParams();

  useEffect(() => {
    getProblemData(machine_type_id!, problem_id!).then((data) =>
      setProblemData(data),
    );
  }, []);

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
            <button>Use</button>
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
