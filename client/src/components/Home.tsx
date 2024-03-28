import { useEffect, useState } from "react";
import { getInvStatus } from "../api";

export const Home = () => {
  const [repairQuantity, setRepairQuantity] = useState();

  useEffect(() => {
    getInvStatus().then((num) => setRepairQuantity(num));
  }, []);

  return (
    <div>
      <ul className="text-sm breadcrumbs">
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <h1>Spare parts inventory status</h1>
      {repairQuantity && (
        <p>
          There are currently ({repairQuantity}) spare parts undergoing repair
          in the workshop
        </p>
      )}
    </div>
  );
};
