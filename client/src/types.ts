export type SparePart = {
  id: string;
  name: string;
  quantityInStock: number;
  optimalQuantity: number;
  quantityInRepair: number;
  cost: number;
  failureRate: number;
  repairTime: number;
};

export type ProblemData = {
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
  associatedMachineName: string;
};

export type SparePartDeductReqDto = {
  sparePartId: string;
  amountToDeduct: number;
};

export type ProblemPerMachine = {
  machineName: string;
  machineQuantity: number;
  problems: {
    problemId: string;
    problemName: string;
  }[];
};
