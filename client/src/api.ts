export const getInvStatus = () => {
  return fetch(
    "https://pharmaphix-server.azurewebsites.net/api/inventoryStatus",
  )
    .then((resp) => resp.json())
    .then((data) => data.needToBeOrdered)
    .catch(() => console.error("failed to fetch"));
};

export const getProblemData = (machine_id: string, problem_id: string) => {
  return fetch(
    `https://pharmaphix-server.azurewebsites.net/api/machines/${machine_id}/problems/${problem_id}`,
  )
    .then((resp) => resp.json())
    .catch(() => console.error("failed to fetch problem data"));
};
