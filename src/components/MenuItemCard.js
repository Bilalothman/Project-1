import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function MenuItemCard({ item }) {
const { addToCart } = useContext(CartContext);


return (
<div className="col-md-4 mb-4" data-aos="fade-up">
<div className="card shadow-sm">
<img src={item.image} className="card-img-top" alt={item.name} />
<div className="card-body">
<h5 className="card-title">{item.name}</h5>
<p className="card-text">{item.description}</p>
<p className="fw-bold">${item.price}</p>
<button className="btn btn-primary" onClick={() => addToCart(item)}>
Add to Cart
</button>
</div>
</div>
</div>
);
}