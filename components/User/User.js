import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Post from "../../elements/Post/Post";
import Loader from "../../elements/Loader/Loader";
import axios from "axios";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        setUserPosts(response.data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    if (id) {
      getUserPosts();
    }
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="userPosts__container">
        <h2 className="userPosts__title"> User Posts</h2>
        <ul>
          {userPosts.map((post) => {
            return <Post key={post.id} text={post.body} title={post.title} />;
          })}
        </ul>
      </div>
    </div>
  );
}
