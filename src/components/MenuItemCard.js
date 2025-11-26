import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function MenuItemCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  return (
    <div className="card h-100 menu-card" data-aos="fade-up">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="text-muted small">{item.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <div className="card-price">{item.price.toFixed(2)} $</div>
          </div>
          <div className="d-flex align-items-center">
            <input className="form-control form-control-sm me-2 qty-input" type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
            <button className="btn btn-warning btn-sm" onClick={() => { addToCart(item, qty); setQty(1); }}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}