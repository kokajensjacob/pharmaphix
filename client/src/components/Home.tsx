import { useEffect, useState } from "react";

export const Home = () => {
  const [orderQuantity, setOrderQuantity] = useState<number>();

  useEffect(() => {
    fetch("https://pharmaphix-server.azurewebsites.net/api/inventoryStatus")
      .then((resp) => resp.json())
      .then((data) => setOrderQuantity(data.needToBeOrdered))
      .catch(() => console.error("failed to fetch"));
  }, []);
  return (
    <div>
      <h1>Spare parts inventory status</h1>
      {orderQuantity && orderQuantity > 0 && (
        <p>Order new ({orderQuantity}) </p>
      )}
    </div>
  );
};
