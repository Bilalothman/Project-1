import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useContext(CartContext);
  const [info, setInfo] = useState({ name: "", phone: "", address: "" });
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!info.name || !info.phone || !info.address) return alert("Please fill delivery details.");
    if (cart.length === 0) return alert("Cart is empty.");

    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      info,
      total: subtotal,
      createdAt: new Date().toISOString(),
      status: "Received"
    };

    // For demo we store orders in localStorage
    const orders = JSON.parse(localStorage.getItem("ros_orders") || "[]");
    orders.push(order);
    localStorage.setItem("ros_orders", JSON.stringify(orders));

    clearCart();
    alert(`Order placed! ID: ${order.id}`);
    navigate("/");
  }

  return (
    <div className="container mt-5" data-aos="fade-up">
      <h2>Checkout</h2>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submit}>
            <input className="form-control mb-2" placeholder="Full name" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Phone" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
            <input className="form-control mb-2" placeholder="Address" value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />
            <button className="btn btn-warning mt-2" type="submit">Place Order</button>
          </form>
        </div>

        <div className="col-md-6">
          <h5>Order Summary</h5>
          <ul className="list-group">
            {cart.map(i => (
              <li key={i.id} className="list-group-item d-flex justify-content-between">
                <span>{i.qty} x {i.name}</span>
                <span>{(i.qty * i.price).toFixed(2)} $</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>{subtotal.toFixed(2)} $</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}