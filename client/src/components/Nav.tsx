import { Link } from "react-router-dom";

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
              <div>Machines</div>
            </li>
            <li>
              <div>Spare Parts</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
