import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableCell from "./TableCell";

import cn from "classnames";

const Table = ({ customClass, children }) => {
  return <table className={cn("table", customClass)}>{children}</table>;
};
export default Table;

export { TableRow, TableHeadItem, TableHead, TableBody, TableCell };
