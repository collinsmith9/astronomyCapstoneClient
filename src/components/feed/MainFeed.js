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
        if (post.user.id === user || JSON.parse(localStorage.getItem("isStaff")) === true) {
            return true
        }
        return false
    }

    
    function handleLikePost(post) {

        const didUserLike = usersPostLikes.find((postLike) => {
            if (postLike.post.id === post.id) {
                return true
            }
            return false
        }) 

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
                return <div className="fullPost">
                <fieldset key={post.id} className="post">
                        <p>Posted by:<Link to={`/userprofile/${post.user?.id}`}> {post.user?.user?.first_name} {post.user?.user?.last_name}</Link></p>
                    <Link className="postDetailsLink" to={`/posts/${post.id}`}> 
                    <div>
                        {/* <h4>Caption: </h4> */}
                        <p className="caption__style">Caption: {post.caption}</p>
                        <div><img className="postPicture" src={`http://localhost:8000${post.post_pic}`} alt="hello" /></div>
                        <p>Categories:</p>
                        {
                            post.categories?.map((cat) => {
                                return <p>{cat.category}</p>
                            })
                        }
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
                </Link><div className="buttons"><div >
                    <button onClick={() => {handleLikePost(post)}}>{
                        usersPostLikes.find((postLike) => {
                            if (postLike.post.id === post.id) {
                                return true
                            }
                            return false
                        })
                        ? "Unlike"
                        : "Like"
                    }</button>
                    <button onClick={() => {history.push(`/posts/${post.id}`)}}>Comment</button>

                    {
                        postDeleteAuthorize(post)
                        ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                                <button onClick={() => {history.push(`/edit/posts/${post.id}`)}}>Edit Post</button>
                            </div>
                        : ""
                    }</div></div>
                </fieldset>
                </div>
            }).reverse()
        }

        </>
    )


}

export default MainFeed



