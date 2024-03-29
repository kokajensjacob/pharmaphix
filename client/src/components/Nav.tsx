import { Link, NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            PharmaPhix
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/machines"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <div>Machines</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/spare-parts"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <div>Spare Parts</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
