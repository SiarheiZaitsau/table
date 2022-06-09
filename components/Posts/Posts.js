import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../elements/Table/Table";
import Pagination from "../../elements/Pagination/Pagination";
import Loader from "../../elements/Loader/Loader";
import { getHighlightedText } from "../../helpers/index";
import {
  TableRow,
  TableHeadItem,
  TableHead,
  TableBody,
  TableCell,
} from "../../elements/Table/Table";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(null);
  const [sortedField, setSortedField] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const numberOfPages = 10;
  const tableHead = ["userId", "title", "body"];

  const sortByFieldName = (fieldName) => {
    const sorted = [];
    setSortedField(fieldName);
    if (fieldName === sortedField && isSorted) {
      sorted = posts.sort((a, b) => {
        return a[fieldName].toString().toLowerCase() >
          b[fieldName].toString().toLowerCase()
          ? -1
          : 1;
      });
      setIsSorted(false);
    } else {
      sorted = posts.sort((a, b) => {
        return a[fieldName].toString().toLowerCase() <
          b[fieldName].toString().toLowerCase()
          ? -1
          : 1;
      });
      setIsSorted(true);
    }

    setPosts([...sorted]);
    return;
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          (currentPage - 1) * itemsPerPage
        }&_end=${currentPage * itemsPerPage}`
      );
      setPosts(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="posts">
        <Table theadData={tableHead} tbodyData={posts}>
          <TableHead>
            <TableRow>
              {tableHead.map((h) => {
                return (
                  <TableHeadItem
                    sort={sortByFieldName}
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
            {posts.map((data) => {
              return (
                <TableRow key={data.id} post={data}>
                  <TableCell
                    data={getHighlightedText(
                      data.userId.toString(),
                      searchQuery
                    )}
                    isCentered={true}
                  />
                  <TableCell
                    data={getHighlightedText(data.title, searchQuery)}
                  />
                  <TableCell
                    data={getHighlightedText(data.body, searchQuery)}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          changePage={setCurrentPage}
        />
      </div>
    </div>
  );
}
