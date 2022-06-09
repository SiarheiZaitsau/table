import React from "react";
import cn from "classnames";
import styles from "./Input.module.scss";
export default function Input({ type, placeholder, onChange, className }) {
  return (
    <input
      className={cn(className, styles.input)}
      placeholder={placeholder}
      type="type"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
