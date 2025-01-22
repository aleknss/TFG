import React from "react";
import { HiHome, HiUser, HiOutlineRss } from "react-icons/hi";
import HeaderItem from "./HeaderItem";

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
      to: "/login",
    },
    {
      id: 3,
      name: "CONTROL",
      icon: HiOutlineRss,
      to: "/inventarios",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="flex items-center w-full h-24 ml-20 gap-20">
        <div className="flex gap-20">
          {menu.map((item) => (
            <HeaderItem
              name={item.name}
              Icon={item.icon}
              key={item.id}
              to={item.to}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Header;
