export const getInvStatus = () => {
  return fetch(
    "https://pharmaphix-server.azurewebsites.net/api/inventoryStatus",
  )
    .then((resp) => resp.json())
    .then((data) => data.needToBeOrdered)
    .catch(() => console.error("failed to fetch"));
};
