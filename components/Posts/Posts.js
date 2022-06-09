import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../elements/Table/Table";
import Pagination from "../../elements/Pagination/Pagination";
import Loader from "../../elements/Loader/Loader";
import Input from "../../elements/Input/Input";

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
  const [postTitleQuery, setPostTitleQuery] = useState("");
  const [postBodyQuery, setPostBodyQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
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
  useEffect(() => {
    let filtered = [...posts];
    filtered = posts
      .filter(
        (post) =>
          post.body.toLowerCase().indexOf(postBodyQuery.toLowerCase()) !== -1
      )
      .filter(
        (post) =>
          post.title.toLowerCase().indexOf(postTitleQuery.toLowerCase()) !== -1
      );
    setFilteredPosts(filtered);
  }, [postTitleQuery, postBodyQuery, posts]);
  if (isLoading) {
    return <Loader />;
  }
  const searchByText = (string) => {
    setPostBodyQuery(string);
  };
  const searchByTitle = (string) => {
    setPostTitleQuery(string);
  };
  return (
    <div className="container">
      <div className="posts">
        <div className="posts__inputContainer">
          <Input
            onChange={searchByTitle}
            placeholder="Title search"
            className="posts__searchInput"
          />
          <Input
            onChange={searchByText}
            placeholder="Text search"
            className="posts__searchInput"
          />
        </div>
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
            {filteredPosts.map((data) => {
              return (
                <TableRow key={data.id} post={data}>
                  <TableCell data={data.userId.toString()} isCentered={true} />
                  <TableCell data={data.title} />
                  <TableCell data={data.body} />
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
