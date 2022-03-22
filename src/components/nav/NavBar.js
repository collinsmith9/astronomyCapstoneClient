import React from "react"
import { Link } from "react-router-dom"
// import "./NavBar.css"


function NavBar() {
    const admin = +localStorage.getItem("admin")
    const user = +localStorage.getItem("astronomer")
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Event Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to={`/userprofile/${user}`}>My Profile</Link>
            </li>
            {
                !! JSON.parse(localStorage.getItem('isStaff')) === true
                ? <li className="navbar__item active">
                    <Link className="navbar__link" to="/eventapproval">Event Approval</Link>
                </li>
                : ""

            }
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
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