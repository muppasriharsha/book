import React from "react";

const Post = ({ title, content, image, editPost, id, deletePost }) => {
  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-content"> {content}</p>
        <img src={image} alt="" />
        <button className="button" onClick={() => editPost(id)}>
          Edit
        </button>
        <button className="button" onClick={() => deletePost(id)}>
          Delete
        </button>
      </section>
    </>
  );
};
export default Post;
