import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Nav = () => {

    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate('/');
    }

    return (
        <div>
            {auth?<ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                
                <li><Link onClick={logout} to='/signup'>Logout({JSON.parse(auth).user.name})</Link></li>
            </ul>
            : <ul className="nav-ul nav-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            }
        </div>
    )
}

export default Nav