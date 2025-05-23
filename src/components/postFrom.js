 import { useEffect, useState } from "react";
import { createPost,updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts, 
  editPost, 
  setEditPost 
}) {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState(""); 

    useEffect(() => {
      if(editPost) {
        setTitle(editPost.title);
        setBody(editPost.body);
      }else {
        setTitle("");
        setBody("");
      }

    },[editPost])

    const handleSubmit =   (e) => {
        e.preventDefault();
        if(editPost){

          editingPost();

        } else {

          addPost();

        }
        setTitle("");
        setBody("");
    }
    
    const editingPost = () => {

      updatePost(editPost.id, {title, body})
            .then((response) => {
              setPosts(posts.map(post => (post.id === editPost.id ? response.data : post))); 
          })
          .catch((err) => {
            console.error(err);
          });
    }
       const addPost =  () => {
            createPost({title, body})
            .then((response) => {
              setPosts([...posts,response.data]); 
          })
          .catch((err) => {
            console.error(err);
          });
        }

    return (
       <form onSubmit={handleSubmit}>
        <div>
            title
        </div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <div>
         Body
        </div>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <div>
             <button type="submit">{editPost? "Ediit Post" : "Add Post"}</button>
        </div>
       
       </form>
    )
}