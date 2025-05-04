import React, { useState } from "react";
import defaultAvatar from "../assets/images/anon.jpg";

export default function Avatar({ userId }) {
  const [failed, setFailed] = useState(false);
  const url = `${import.meta.env.VITE_API_BASE_URL}/img/avatar/${userId}?${Date.now()}`;

  if (failed) {
    return (
      <img
        src={defaultAvatar}
        alt="Avatar por defecto"
        className="rounded-md object-cover w-full h-full border border-gray-300"
      />
    );
  }

  return (
    <img
      src={url}
      alt="Avatar usuario"
      className="rounded-md object-cover w-full h-full border border-gray-300"
      onError={() => setFailed(true)}
    />
  );
}
