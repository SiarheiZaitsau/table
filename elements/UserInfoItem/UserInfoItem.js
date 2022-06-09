import React from "react";
import styles from "./UserInfoItem.module.scss";

export default function UserInfoItem({ attributeName, text }) {
  return (
    <li className={styles.users__attributeItem}>
      <p className={styles.users__attributeName}>{attributeName}:</p>
      <p> {text}</p>
    </li>
  );
}
