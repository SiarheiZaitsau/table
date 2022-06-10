import React from "react";
import Link from "next/link";
import cn from "classnames";
export default function Header() {
  return (
    <div className="header">
      <div className={cn("container")}>
        <ul className="navigation">
          <li className="navigation__item">
            <Link href="/">
              <a className="link">Home</a>
            </Link>
          </li>
          <li className="navigation__item">
            <Link href="/posts">
              <a className="link">Posts </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
