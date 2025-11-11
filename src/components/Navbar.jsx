import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const Navbar = () => {
  const { user, signOutUser,loading } = useContext(AuthContext);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("user logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-books"}>All Books</NavLink>
      </li>
      <li>
        <NavLink to={"/add-book"}>Add Book</NavLink>
      </li>
      <li>
        <NavLink to={"/my-books"}>My Books</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl text-accent">
          Book <span className="text-warning">Heaven</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {
        loading
        ?
        <div className="navbar-end"><Spinner></Spinner></div>
          :
        <div className="navbar-end flex gap-2">
        {user ? (
          <div className="dropdown dropdown-hover dropdown-end">
            <img src={user.photoURL} tabIndex={0} role="button" className="m-1 rounded-full max-w-10">
            </img>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
            >
              <li>
                <p className="font-semibold">User: {user.displayName}</p>
              </li>
              <li>
                <button
                onClick={handleLogOut}
                className="btn btn-accent text-white font-semibold"
              >
                Log Out
              </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to={"/login"}
              className="btn btn-accent text-white font-semibold"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="btn btn-warning text-white font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>
      }
    </div>
  );
};

export default Navbar;
