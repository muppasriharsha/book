import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import ModifyPost from "./ModifyPost";
const DisplayAllPosts = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  // Initialize useRef
  const getTitle = useRef();
  const getContent = useRef();
  const getImage = useRef();

  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };
  const savePostImagetoState = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };
  const editPost = (id) => {
    setEditPostId(id);
    console.log(id);
    toggleModifyPostComponent();
  };
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        console.log([eachPost.id, editPostId]);
        return {
          ...eachPost,
          title: title || eachPost.title,
          image: image || eachPost.image,
          content: content || eachPost.content
        };
      }
      console.log(eachPost);
      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id, image }]);
    console.log(allPosts);
    setTitle("");
    setContent("");
    setImage("");
    getTitle.current.value = "";
    getContent.current.value = "";
    getImage.current.file = "";
    toggleCreateNewPost();
  };
  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          savePostImagetoState={savePostImagetoState}
          getTitle={getTitle}
          getContent={getContent}
          getImage={getImage}
          savePost={savePost}
          deletePost={deletePost}
        />
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });
    return (
      <ModifyPost
        title={post.title}
        content={post.content}
        image={post.image}
        updatePost={updatePost}
        savePostTitleToState={savePostTitleToState}
        savePostContentToState={savePostContentToState}
        savePostImagetoState={savePostImagetoState}
      />
    );
  }
  return (
    <>
      {!allPosts.length ? (
        <section className="no-post">
          <h1>No Post Found!</h1>
          <h3>There is nothing to see here.</h3>
          <br />
          <br />
          <section className="button-wrapper">
            <button onClick={toggleCreateNewPost} className="button">
              Create New
            </button>
          </section>
        </section>
      ) : (
        <div>
          <h1>All Posts</h1>
          <section className="all-post">
            {allPosts.map((eachPost) => {
              return (
                <Post
                  id={eachPost.id}
                  key={eachPost.id}
                  title={eachPost.title}
                  content={eachPost.content}
                  image={eachPost.image}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              );
            })}
            <section className="button-wrapper">
              <button onClick={toggleCreateNewPost} className="button">
                Create New
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
export default DisplayAllPosts;
