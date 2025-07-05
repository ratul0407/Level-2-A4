import { Link, NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="p-4 lg:py-8 lg:px-12 border-b-2 relative ">
      <div className="flex flex-col items-center gap-6 justify-between">
        <Link to="/">BookNerd</Link>
        <nav>
          <ul className="flex justify-between items-center gap-4 ">
            <li>
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  isActive ? "text-purple-500" : ""
                }
              >
                All Books
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-purple-500" : ""
                }
                to="/create-book"
              >
                Add Book
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-purple-500" : ""
                }
                to="/borrow-summary"
              >
                Borrow Summary
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
