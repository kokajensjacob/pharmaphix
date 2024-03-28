import { SparePartDeductReqDto } from "./pages/ProblemPage";

const BASE_URL = "https://pharmaphix-server.azurewebsites.net/api";

export const fetchMachines = async () => {
  // return fetch(`${BASE_URL}/machines`)
  //   .then((resp) => resp.json())
  //   .catch(() => console.error("failed to fetch machines"));

  return [
    { machineId: "1", machineName: "Pill Press" },
    { machineId: "2", machineName: "Another Machine" },
    { machineId: "3", machineName: "Yet Another Machine" },
  ];
};

export async function fetchSpareParts() {
  // return fetch(`${BASE_URL}/spare-parts`)
  //   .then((resp) => resp.json())
  //   .catch(() => console.error("failed to fetch spare parts"));

  return [
    {
      id: "1",
      name: "Laser X10",
      quantityInStock: 5,
      optimalQuantity: 5,
      quantityInRepair: 1,
      cost: 10000,
      failureRate: 4,
      repairTime: 0.5,
    },
    {
      id: "2",
      name: "Robotic Arm JK123PF3",
      quantityInStock: 1,
      optimalQuantity: 1,
      quantityInRepair: 0,
      cost: 1000000,
      failureRate: 0.25,
      repairTime: 0.5,
    },
  ];
}

export const getInvStatus = () => {
  return fetch(`${BASE_URL}/spare-parts/in-repair`)
    .then((resp) => resp.json())
    .then((data) => data.unitsInRepair)
    .catch(() => console.error("failed to fetch"));
};

export const getProblemData = (problem_id: string) => {
  return fetch(`${BASE_URL}/problems/${problem_id}`)
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem data"));
};

export const deductSparePartFromInventory = (body: SparePartDeductReqDto[]) => {
  return fetch(`${BASE_URL}/spare-parts`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem data"));
};
