import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";


export default function Navbar() {
const { cart } = useContext(CartContext);


return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container">
<Link className="navbar-brand" to="/">Jo3an W Bas</Link>


<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
<span className="navbar-toggler-icon"></span>
</button>


<div className="collapse navbar-collapse" id="navMenu">
<ul className="navbar-nav ms-auto">
<li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
<li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
<li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
<li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
<li className="nav-item">
<Link className="nav-link" to="/cart">
Cart ({cart.length})
</Link>
</li>
</ul>
</div>
</div>
</nav>
);
}