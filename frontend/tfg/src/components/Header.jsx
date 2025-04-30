import React from "react";
import { HiHome, HiUser, HiOutlineRss } from "react-icons/hi";
import HeaderItem from "./HeaderItem";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const menu = [
    {
      id: 1,
      name: "HOME",
      icon: HiHome,
      to: "/",
    },
    {
      id: 2,
      name: "CUENTA",
      icon: HiUser,
      to: "/cuenta",
    },
    {
      id: 3,
      name: "CONTROL",
      icon: HiOutlineRss,
      to: "/inventarios",
    },
  ];

  const { isAuthenticated, user, isLoading } = useAuth();

  const menuItemsToDisplay = isAuthenticated
    ? menu
    : menu.filter((item) => item.name === "HOME");

  return (
    <div className="sticky top-0 z-50 bg-white max-w-full shadow-md">
      <nav className="flex w-full h-24 px-20 justify-between box-border items-center">
        <div className="flex gap-20">
          {menuItemsToDisplay.map((item) => (
            <HeaderItem
              name={item.name}
              Icon={item.icon}
              key={item.id}
              to={item.to}
            />
          ))}
        </div>
        <div>
          {isAuthenticated && user ? (
            <>
              <p className="font-montserrat font-semibold text-primary-color select-none">
                {user.username}
              </p>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary-color text-xl font-montserrat font-semibold text-white px-6 py-2 rounded-md hover:bg-secondary-color transition-colors duration-300 ease-in-out"
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
