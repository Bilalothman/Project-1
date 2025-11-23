import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function Cart() {
const { cart, removeFromCart } = useContext(CartContext);


const total = cart.reduce((sum, item) => sum + item.price, 0);


return (
<div className="container mt-5" data-aos="fade-up">
<h2>Your Cart</h2>
{cart.length === 0 ? (
<p>Your cart is empty.</p>
) : (
<>
<ul className="list-group mb-3">
{cart.map((item) => (
<li className="list-group-item d-flex justify-content-between" key={item.id}>
<span>{item.name}</span>
<span>${item.price}</span>
<button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
</li>
))}
</ul>
<h4>Total: ${total}</h4>
</>
)}
</div>
);
}