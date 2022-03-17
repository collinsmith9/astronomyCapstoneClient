import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deletePost, getPosts } from "./postManager";

function MainFeed() {
    const [posts, setPosts] = useState([])
    const user = +localStorage.getItem("astronomer")
    const history = useHistory()

    useEffect(() => {
        getPosts().then(setPosts)
    },[])
    
    function syncPosts() {
        getPosts().then(setPosts)
    }

    function postDeleteAuthorize(post) {
        if (post.user.id === user) {
            return true
        }
        return false
    }


    return (
        <>
        <h2>Main feed</h2>

        <button onClick={() => {history.push("/newpost")}}>New Post</button>

        {
            posts.map((post) => {
                return <fieldset key={post.id}>
                    <div>
                        <p>Posted by: {post.user?.user?.first_name} {post.user?.user?.last_name}</p>
                        <h4>Caption: </h4><p>{post.caption}</p>
                        <div><img src={`http://localhost:8000${post.post_pic}`} alt="hello" /></div>
                        {
                            postDeleteAuthorize(post)
                            ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                            </div>
                            : ""
                        }
                    </div>
                </fieldset>
            })
        }

        </>
    )


}

export default MainFeed



