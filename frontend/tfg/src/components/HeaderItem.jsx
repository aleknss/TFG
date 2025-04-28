import React from "react";
import { NavLink } from "react-router-dom";

function HeaderItem({ name, Icon, to }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 hover:cursor-pointer hover:text-secondary-color
       ${isActive ? "text-primary-color" : "text-black"}`
      }
    >
      <div className="flex items-center hover:cursor-pointer gap-3">
        <Icon className="w-8 h-8" />
        <h2 className="hidden md:block">{name}</h2>
      </div>
    </NavLink>
  );
}

export default HeaderItem;
