import React from "react";
import { Link } from "react-router-dom";

function HeaderItem({ name, Icon, to }) {
  return (
    <Link to={to}>
      <div className="flex items-center hover:cursor-pointer gap-3">
        <Icon className="w-8 h-8" />
        <h2 className="hidden md:block">{name}</h2>
      </div>
    </Link>
  );
}

export default HeaderItem;
