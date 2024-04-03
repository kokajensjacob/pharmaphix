export type Machine = {
  machineId: string;
  machineName: string;
  machineQuantity: number;
};

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

export type SparePartGetResponseDto = {
  sparePart: SparePart;
  associatedMachine: Machine;
  associatedProblems: ProblemDto[];
};

type ProblemDto = {
  problemId: string;
  problemName: string;
};

export type SparePartDeductReqDto = {
  sparePartId: string;
  amountToDeduct: number;
};

export type ProblemPerMachine = {
  machineName: string;
  machineQuantity: number;
  problems: ProblemDto[];
};

export type SparePartsInRepair = {
  id: string;
  name: string;
  quantityInRepair: number;
  associatedMachineName: string;
};

export type SparePartPostRequest = {
  name: string;
  cost: number;
  failureRate: number;
  quantityInStock: number;
  repairTime: number;
  machineId: string;
};
