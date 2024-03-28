import { useEffect, useState } from "react";
import { getInvStatus } from "../../api";
import { Link } from "react-router-dom";

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

      {repairQuantity && repairQuantity === 0 ? (
        <h1>
          There are currently no spare parts undergoing repair in the workshop
        </h1>
      ) : repairQuantity === 1 ? (
        <h1>
          There are currently {repairQuantity} spare part undergoing repair in
          the workshop
        </h1>
      ) : (
        <h1>
          There are currently {repairQuantity} spare parts undergoing repair in
          the workshop
        </h1>
      )}
      <div className="home__button-container">
        <Link to="machines" className="btn btn-wide m-5">
          Machines
        </Link>
        <Link to="spare-parts" className="btn btn-wide m-5">
          Spare Parts
        </Link>
      </div>
    </div>
  );
};
