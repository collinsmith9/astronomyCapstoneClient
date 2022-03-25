import React from "react"
import { Link } from "react-router-dom"
// import "./NavBar.css"


function NavBar() {
    const admin = +localStorage.getItem("admin")
    const user = +localStorage.getItem("astronomer")
    return (
        <ul className="navbar">
            <li className="navbar-item active">
                <Link className="navbar-item" to="/">Feed</Link>
            </li>
            <li className="navbar-item active">
                <Link className="navbar-item" to="/events">Event Feed</Link>
            </li>
            <li className="navbar-item active">
                <Link className="navbar-item" to={`/userprofile/${user}`}>My Profile</Link>
            </li>
            {
                !! JSON.parse(localStorage.getItem('isStaff')) === true
                ? <li className="navbar-item active">
                    <Link className="navbar-item" to="/eventapproval">Event Approval</Link>
                </li>
                : ""

            }
            <li className="navbar-item active">
                <Link className="navbar-item" to="#"
                onClick={
                    () => {
                        localStorage.clear()
                    }
                }>Logout</Link>
            </li>
        </ul>
    )
}

export default NavBar;