import React from "react";
import cn from "classnames";
const TableRow = ({ children, onClick, link }) => {
  return (
    <tr className={cn("table__row", { ["link"]: link })} onClick={onClick}>
      {children}
    </tr>
  );
};

export default TableRow;
