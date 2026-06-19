import { useState } from "react";

function Form({ addPost }) {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] =
    useState("");

  const handleSubmit = () => {
    if (!title || !paragraph) {
      alert("Fill all fields");
      return;
    }

    addPost({
      title,
      paragraph,
    });

    setTitle("");
    setParagraph("");
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter Heading"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Enter Paragraph"
        value={paragraph}
        onChange={(e) =>
          setParagraph(e.target.value)
        }
      ></textarea>

      <button onClick={handleSubmit}>
        Add Card
      </button>
    </div>
  );
}

export default Form;