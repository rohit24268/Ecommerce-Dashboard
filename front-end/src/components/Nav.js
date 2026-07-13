import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Nav = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({auth.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav
