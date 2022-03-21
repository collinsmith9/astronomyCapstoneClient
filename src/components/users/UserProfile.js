import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { deletePost, deletePostLike, getPosts, getUsersPostLikes, getUsersPosts, likePost } from "../feed/postManager";
import { followUser, getUser, getUserFollows, unfollowUser } from "./userManager";

function UserProfile() {
    const [usersPosts, setUsersPosts] = useState([])
    const [theUser, setTheUser] = useState({})
    const [usersFollows, setUsersFollows] = useState([])
    const {userId} = useParams()
    const user = +localStorage.getItem("astronomer")
    const [usersPostLikes, setUsersPostLikes] = useState([])

    console.log(theUser)
    useEffect(() => {
        getUsersPosts(userId).then(setUsersPosts)
    },[])

    useEffect(() => {
        getUser(userId).then(setTheUser)
    },[])

    useEffect(() => {
        getUserFollows(userId).then(setUsersFollows)
    },[])

    function loggedInUserCheck() {
        if (user === theUser.id) {
            return true
        }
        return false
    }

    function syncUsersPostLikes() {
        getUsersPostLikes(user).then(setUsersPostLikes)
    }
    
    function syncPosts() {
        getUsersPosts(userId).then(setUsersPosts)
    }

    function syncUsersFollows() {
        getUserFollows(theUser.id).then(setUsersFollows)
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

    const followCheck = usersFollows.find((followObj) => {
        if (followObj.follower.id === user) {
            return true
        }
        return false
    })

    function handleFollow() {

        function followTheUser() {
            const followObj = {
                follower: user,
                person_followed: theUser?.id
            }
            followUser(followObj).then(() => {syncUsersFollows()})
        }

        function unfollowTheUser() {
            unfollowUser(followCheck.id).then(() => {syncUsersFollows()})
        }

        followCheck
        ? unfollowTheUser()
        : followTheUser()


    }



    return (
        <>
        <fieldset>
        <h1>{theUser.user?.first_name} {theUser.user?.last_name}'s profile</h1>
        {
            loggedInUserCheck()
            ? <button>Edit Bio</button>
            : <button onClick={() => {
                handleFollow()
            }}>{
                followCheck
                ? "Unfollow"
                : "Follow"
            }</button>
        }
        <p>{theUser.bio}</p>
        {/* <button>Future Follow Button</button> */}
        </fieldset>

        {
            usersPosts.map((post) => {
                return <div>
                <fieldset key={post.id}>
                    <Link className="postDetailsLink" to={`/posts/${post.id}`}> 
                    <div>
                        <p>Posted by: {post.user?.user?.first_name} {post.user?.user?.last_name}</p>
                        <h4>Caption: </h4><p>{post.caption}</p>
                        <div><img src={`http://localhost:8000${post.post_pic}`} alt="hello" /></div>
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
                </Link>
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
                    }
                </fieldset>
                </div>
            }).reverse()
        }

        </>
    )
}

export default UserProfile;