import React, { useEffect, useState } from 'react';
import { getPosts, deletePost, updatePost} from '../services/postService';
import PostForm from './postFrom';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null); 

    useEffect(() => {
        console.log('Load Posts');
        getPosts()
          .then((result) => {
            setPosts(result.data)

          })
          .catch((err) => {
            console.error(err);
          });
    }, []);

    const handleDelete = (id) => {

       deletePost(id)
          .then((result) => {
            setPosts(posts.filter((post) => post.id !== id));
          })
          .catch((err) => {
            console.error(err);
          });

    }

    const startEdit = (post) => {
        setEditPost(post);
        

    }
    return (
        <div>
            <h1>Posts</h1>
             <PostForm posts={posts} setPosts={setPosts} editPost={editPost} setEditPost={setEditPost} />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>

                        <button onClick={() => startEdit(post)}>Edit</button> 
                        <button onClick={() => handleDelete(post.id)}>Delete</button>   
                    </li>
                ))}
            </ul>
        </div>
    );

}

