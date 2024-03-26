import { useLoaderData } from "react-router-dom";

export const Home = () => {
  const orderQuantity = useLoaderData() as number;

  return (
    <div>
      <h1>Spare parts inventory status</h1>
      {orderQuantity && orderQuantity > 0 && (
        <p>Order new ({orderQuantity}) </p>
      )}
    </div>
  );
};
