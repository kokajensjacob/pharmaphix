import { Link, NavLink, useLocation } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="navbar bg-base-300 grid grid-cols-3">
      <div className="flex w-1/3">
        <Link to="/" className="text-xl font-bold ml-5">
          PharmaPhix
        </Link>
      </div>
      {useLocation().pathname !== "/" && (
        <div className="flex w-full justify-center">
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
      )}
      <div className="flex flex-row-reverse w-full col-start-3 col-end-3">
        <div className=" dropdown dropdown-end mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
