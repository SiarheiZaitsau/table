import React, { useState } from "react";

import ArrowImg from "../../assets/images/dropdown.svg";
import cn from "classnames";
const TableHeadItem = ({ item, sort, sortedField, isSorted }) => {
  return (
    <th className="table__headItem" onClick={() => sort(item)} title={item}>
      <div className="table__headContent">
        {item}
        <ArrowImg
          className={cn("table__headIcon", {
            ["table__headIcon-rotated"]: sortedField === item && isSorted,
          })}
        />
      </div>
    </th>
  );
};

export default TableHeadItem;
