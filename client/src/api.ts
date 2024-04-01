import { SparePartDeductReqDto } from "./types";

const BASE_URL = "https://pharmaphix-server.azurewebsites.net/api";

export const fetchMachines = async () => {
  return fetch(`${BASE_URL}/machines`)
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch machines"));
};

export async function fetchSpareParts() {
  return fetch(`${BASE_URL}/spare-parts`)
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch spare parts"));
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

export const getProblemPerMachineList = (machineId: string) => {
  return fetch(`${BASE_URL}/machines/${machineId}/problems`)
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem list data"));
}

export const getSparePartsInRepair = () => {
  return fetch(`${BASE_URL}/spare-parts/in-repair-list`)
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch spare parts in repair"))
}