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

  const { isAuthenticated, logout } = useAuth();


  const menuItemsToDisplay = isAuthenticated
  ? menu
  : menu.filter(item => item.name === "HOME");


  const handleLogout = () => {
    logout();
  };


  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="flex items-center w-full h-24 ml-20 gap-20">
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
          { isAuthenticated ? (
            <>
            <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>  
            <Link to="/login">Login</Link>
            </>
          )
                    }
        </div>
      </nav>
    </div>
  );
}

export default Header;
