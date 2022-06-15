import React, { useEffect, useState } from "react";
import Input from "../../elements/Input/Input";
import Table from "../../elements/Table/Table";
import { fetchUsers } from "../../redux/slices/users";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersLoading } from "../../redux/selectors/users";
import { useRouter } from "next/router";
import Loader from "../../elements/Loader/Loader";

import { getHighlightedText, sortByFieldName } from "../../helpers/index";
import {
  TableRow,
  TableHeadItem,
  TableHead,
  TableBody,
  TableCell,
} from "../../elements/Table/Table";
const tableHead = ["name", "username", "email", "phone", "website", "city"];

export default function HomeContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [isSorted, setIsSorted] = useState(null);
  const resData = useSelector(getUsers);
  const loading = useSelector(getUsersLoading);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const rowClick = (id, name) => {
    router.push({ pathname: `${id}` });
  };
  useEffect(() => {
    const filteredData = resData.filter((user) => {
      return Object.values(user)
        .join(" ")
        .toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase());
    });
    setUsers(filteredData);
  }, [searchQuery, resData]);

  const sortUsers = (fieldName) => {
    const { newIsSorted, sorted } = sortByFieldName(
      fieldName,
      users,
      sortedField,
      isSorted
    );
    setSortedField(fieldName);
    setIsSorted(newIsSorted);
    setUsers([...sorted]);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="users">
        <Input
          className="users__searchInput"
          type="search"
          placeholder="Your Search"
          onChange={setSearchQuery}
        />
        <Table
          highlighting={searchQuery}
          theadData={tableHead}
          tbodyData={users}
        >
          <TableHead>
            <TableRow>
              {tableHead.map((h) => {
                return (
                  <TableHeadItem
                    sort={sortUsers}
                    sortedField={sortedField}
                    isSorted={isSorted}
                    key={h}
                    item={h}
                  />
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((data) => {
              return (
                <TableRow
                  onClick={() => {
                    rowClick(data.id);
                  }}
                  link={`${data.id}`}
                  key={data.id}
                  user={data}
                >
                  <TableCell
                    data={getHighlightedText(data.name, searchQuery)}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.username, searchQuery)}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.email, searchQuery)}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.phone, searchQuery)}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.website, searchQuery)}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.city, searchQuery)}
                    isCentered={true}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
