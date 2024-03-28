import { useEffect, useState } from "react";
import { getInvStatus } from "../api";

export const Home = () => {
  const [orderQuantity, setOrderQuantity] = useState();

  useEffect(() => {
    getInvStatus().then((num) => setOrderQuantity(num));
  }, []);

  return (
    <div>
      <ul className="text-sm breadcrumbs">
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <h1>Spare parts inventory status</h1>
      {orderQuantity && orderQuantity > 0 && (
        <p>
          There are currently ({orderQuantity}) spare parts undergoing repair in
          the workshop
        </p>
      )}
    </div>
  );
};
