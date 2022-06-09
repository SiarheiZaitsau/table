import React from "react";
import Link from "next/link";
import cn from "classnames";
export default function Header() {
  return (
    <div className="header">
      <div className={cn("container", "header__container")}>
        <ul className="header__navigationList">
          <li className="header__navigationItem">
            <Link href="/">
              <a className="link">Home</a>
            </Link>
          </li>
          <li className="header__navigationItem">
            <Link href="/posts">
              <a className="link">Posts </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
