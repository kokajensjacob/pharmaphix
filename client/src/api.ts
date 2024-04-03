import { SparePartDeductReqDto, SparePartPostRequest } from "./types";

const BASE_URL = "https://pharmaphix-server.azurewebsites.net/api";

export const fetchMachines = async () => {
  return fetch(`${BASE_URL}/machines`).then((resp) => resp.json());
};

export const fetchSparePart = (id: string) => {
  return fetch(`${BASE_URL}/spare-parts/${id}`);
};

export async function fetchSpareParts() {
  return fetch(`${BASE_URL}/spare-parts`).then((resp) => resp.json());
}

export const getInvStatus = () => {
  return fetch(`${BASE_URL}/spare-parts/in-repair`)
    .then((resp) => resp.json())
};

export const getSparePartsDeviation = () => {
  return fetch(`${BASE_URL}/spare-parts/optimalQuantityDeviation`).then(
    (resp) => resp.json(),
  );
};

export const getProblemData = (problem_id: string) => {
  return fetch(`${BASE_URL}/problems/${problem_id}`).then((resp) =>
    resp.json(),
  );
};

export const deductSparePartFromInventory = (body: SparePartDeductReqDto[]) => {
  return fetch(`${BASE_URL}/spare-parts`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const setInStockForSparePart = (
  id: string,
  body: { setStock: number },
) => {
  return fetch(`${BASE_URL}/spare-parts/${id}/setStock`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getProblemPerMachineList = (machineId: string) => {
  return fetch(`${BASE_URL}/machines/${machineId}/problems`).then((resp) =>
    resp.json(),
  );
};

export const getSparePartsInRepair = () => {
  return fetch(`${BASE_URL}/spare-parts/in-repair-list`).then((resp) =>
    resp.json(),
  );
};

export const markSparePartAsRepaired = (
  sparePartId: string,
  quantityToRepair: number,
) => {
  return fetch(`${BASE_URL}/spare-parts/${sparePartId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantityToRepair: quantityToRepair }),
  });
};

export function postNewSparePart(body: SparePartPostRequest) {
  return fetch(`${BASE_URL}/spare-parts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
