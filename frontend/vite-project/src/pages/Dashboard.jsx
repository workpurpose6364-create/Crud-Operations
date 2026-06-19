import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Form from "../components/Form";
import Card from "../components/Card";

import "../App.css";

function Dashboard() {
  const [posts, setPosts] =
    useState([]);

  const API =
    "http://localhost:5000/api/notes";

  const token =
    localStorage.getItem(
      "token"
    );

  const username =
    localStorage.getItem(
      "username"
    );

  const fetchNotes =
    async () => {
      try {
        const res =
          await axios.get(
            API,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (!token) {
      window.location =
        "/login";
      return;
    }

    fetchNotes();
  }, []);

  const addPost =
    async (post) => {
      try {
        await axios.post(
          API,
          post,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    };

  const deletePost =
    async (id) => {
      try {
        await axios.delete(
          `${API}/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    };

  const editPost =
    async (
      id,
      newData
    ) => {
      try {
        await axios.put(
          `${API}/${id}`,
          newData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "username"
    );

    window.location =
      "/login";
  };

  return (
    <div className="app">
      <h1>
        Welcome {username}
      </h1>

  

      <Form
        addPost={addPost}
      />

      <div className="cards">
        {posts.map((post) => (
          <Card
            key={post._id}
            post={post}
            deletePost={
              deletePost
            }
            editPost={
              editPost
            }
          />
        ))}
      </div>
          <button
        onClick={logout} id="logout"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;