// import { useState } from "react";
import React   from "react";

export default function PostForm({posts, setPosts}) {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState(""); 

    return (
        <h1> Create a post</h1>
    )
}