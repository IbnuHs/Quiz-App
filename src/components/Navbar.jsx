import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("isLogin"));
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };
  return (
    <div className="font-bicount py-3 shadow px-5 flex items-center justify-between md:px-8">
      <h3 className="font-semibold lg:text-[18px] capitalize">
        Hello, {user.username}
      </h3>
      <button
        type="button"
        onClick={onLogout}
        className="font-semibold px-4 text-[15px] py-1 hover:shadow rounded-md lg:text-text-[18px] transition-all">
        Logout
      </button>
    </div>
  );
};
