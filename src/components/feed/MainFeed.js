import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deletePost, deletePostLike, getPostLikes, getPosts, getUsersPostLikes, likePost } from "./postManager";
import "./post.css"

function MainFeed() {
    const [posts, setPosts] = useState([])
    const [postlikes, setPostLikes] = useState([])
    const [usersPostLikes, setUsersPostLikes] = useState([])
    const user = +localStorage.getItem("astronomer")
    const history = useHistory()

    useEffect(() => {
        getPosts().then(setPosts)
    },[])

    useEffect(() => {
        getUsersPostLikes(user).then(setUsersPostLikes)
    },[])

    function syncUsersPostLikes() {
        getUsersPostLikes(user).then(setUsersPostLikes)
    }
    
    function syncPosts() {
        getPosts().then(setPosts)
    }

    function postDeleteAuthorize(post) {
        if (post.user.id === user) {
            return true
        }
        return false
    }

    const didUserLike = usersPostLikes.find((postLike) => {
        if (postLike.user.id === user) {
            return true
        }
        return false
    }) 

    function handleLikePost(post) {

        function likeThePost() {
            const likeObj = {
                post: post.id,
                user: user
            }
            likePost(likeObj).then(() => {syncUsersPostLikes()})
        }

        function unlikeThePost() {
            deletePostLike(didUserLike.id).then(() => {syncUsersPostLikes()})
        }

        didUserLike
        ? unlikeThePost()
        : likeThePost()
    }

    return (
        <>
        <h2>Main feed</h2>

        <button onClick={() => {history.push("/newpost")}}>New Post</button>
        {
            posts.map((post) => {
                return <div className="post">
                <fieldset key={post.id} className="fullPost">
                    <Link className="postDetailsLink" to={`/posts/${post.id}`}> 
                    <div className="postSpacing">
                        <p>Posted by: {post.user?.user?.first_name} {post.user?.user?.last_name}</p>
                        <section className="caption__style">
                        <h4>Caption: </h4><p>{post.caption}</p></section>
                        <picture classname="postPicture"><img src={`http://localhost:8000${post.post_pic}`} alt="hello" className="postPicture" /></picture>
                        {/* <button onClick={() => {handleLikePost(post)}}>{
                            didUserLike
                            ? "Unlike"
                            : "Like"
                        }</button> */}
                        {/* {
                            postDeleteAuthorize(post)
                            ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                            </div>
                            : ""
                        } */}
                    </div>
                </Link><div className="buttons">
                    <button onClick={() => {handleLikePost(post)}}>{
                        didUserLike
                        ? "Unlike"
                        : "Like"
                    }</button>
                    {
                        postDeleteAuthorize(post)
                        ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                            </div>
                        : ""
                    }</div>
                </fieldset>
                </div>
            }).reverse()
        }

        </>
    )


}

export default MainFeed



