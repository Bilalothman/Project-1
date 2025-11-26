import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-warning">Jo3an W Bas</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu">Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>

          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-warning me-2" to="/cart">
              Cart <span className="badge bg-warning text-dark ms-2">{count}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}