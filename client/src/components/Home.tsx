import { useEffect, useState } from "react";
import { getInvStatus } from "../api";

export const Home = () => {
  // const orderQuantity = useLoaderData() as number;
  const [orderQuantity, setOrderQuantity] = useState();

  useEffect(() => {
    getInvStatus().then((num) => setOrderQuantity(num));
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
