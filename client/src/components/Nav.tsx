import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/">
            <a className="btn btn-ghost text-xl">PharmaPhix</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Machines</a>
            </li>
            <li>
              <a>Spare Parts</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
