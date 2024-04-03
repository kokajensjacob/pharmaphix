import { Link, NavLink, useLocation } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="navbar bg-base-300 grid-cols-3">
      <div className="flex w-1/3">
        <Link to="/" className="btn btn-ghost text-xl">
          PharmaPhix
        </Link>
      </div>
      {useLocation().pathname !== "/" ? (
        <div className="flex w-1/3 justify-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/machines"
                className={({ isActive, isPending }) =>
                  isPending ? "pending mr-3" : isActive ? "active mr-3" : ""
                }
              >
                <div>Machines</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/spare-parts"
                className={({ isActive, isPending }) =>
                  isPending ? "pending ml-3" : isActive ? "active ml-3" : ""
                }
              >
                <div>Spare Parts</div>
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
