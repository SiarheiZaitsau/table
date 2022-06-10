import React from "react";
import cn from "classnames";

export default function Input({ type, placeholder, onChange, className }) {
  return (
    <input
      className={cn(className, "input")}
      placeholder={placeholder}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
