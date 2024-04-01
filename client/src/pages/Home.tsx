import { useEffect, useState } from "react";
import { getInvStatus } from "../api";
import { Link } from "react-router-dom";

export const Home = () => {
  const [repairQuantity, setRepairQuantity] = useState();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    getInvStatus()
      .then((num) => setRepairQuantity(num))
      .catch(() => setShowError(true));
  }, []);

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
      {showError ? (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Server not available at the moment. Try again.</span>
        </div>
      ) : repairQuantity === undefined ? (
        <p>Loading...</p>
      ) : (
        repairQuantity === 0 ? (
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
            There are currently {repairQuantity} spare parts undergoing repair
            in the workshop
          </h1>
        )
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
