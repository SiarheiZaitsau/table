import React from "react";
import cn from "classnames";

const TableCell = ({ data, isCentered }) => {
  return <td className={cn({ ["centeredText"]: isCentered })}>{data}</td>;
};

export default TableCell;
