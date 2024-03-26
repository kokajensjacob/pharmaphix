const BASE_URL = "https://pharmaphix-server.azurewebsites.net/api"

export const getInvStatus = () => {
  return fetch(
    `${BASE_URL}/inventoryStatus`,
  )
    .then((resp) => resp.json())
    .then((data) => data.needToBeOrdered)
    .catch(() => console.error("failed to fetch"));
};

export const getProblemData = (machine_id: string, problem_id: string) => {
  return fetch(
    `${BASE_URL}/machines/${machine_id}/problems/${problem_id}`,
  )
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem data"));
};

export const deductSparePartFromInventory = (spare_part_id: string, amountToDeduct: number) => {
  return fetch(
    `${BASE_URL}/spare-parts/${spare_part_id}?amountToDeduct=${amountToDeduct}`,{
      method: "PATCH"
    }
  )
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem data"));
}
