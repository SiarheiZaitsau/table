import React from "react";

export default function Post({ title, text }) {
  return (
    <li className="post">
      <h3 className="post__title">Title: {title} </h3>
      <p className="post__text"> Text:{text} </p>
    </li>
  );
}
