import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableCell from "./TableCell";

import cn from "classnames";

const Table = ({ className, children }) => {
  return <table className={cn("table", className)}>{children}</table>;
};
export default Table;

export { TableRow, TableHeadItem, TableHead, TableBody, TableCell };
