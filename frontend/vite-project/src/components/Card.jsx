import { useState } from "react";

function Card({
  post,
  deletePost,
  editPost,
}) {
  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(post.title);

  const [paragraph, setParagraph] =
    useState(post.paragraph);

  const saveChanges = () => {
    editPost(post._id, {
      title,
      paragraph,
    });

    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            value={paragraph}
            onChange={(e) =>
              setParagraph(
                e.target.value
              )
            }
          />

          <button
            className="save"
            onClick={saveChanges}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>

          <p>{post.paragraph}</p>

          <div className="btns">
            <button
              className="edit"
              onClick={() =>
                setEditing(true)
              }
            >
              Edit
            </button>

            <button
              className="delete"
              onClick={() =>
                deletePost(post._id)
              }
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;