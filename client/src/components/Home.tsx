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

      {repairQuantity && (
        <h1>
          There are currently {repairQuantity} spare parts undergoing repair in
          the workshop
        </h1>
      )}
      <div className="home__button-container">
        <button className="btn btn-wide m-5">Machines</button>
        <button className="btn btn-wide m-5">Spare Parts</button>
      </div>
    </div>
  );
};
