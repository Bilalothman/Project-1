import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, subtotal } = useContext(CartContext);

  return (
    <div className="container mt-5" data-aos="fade-up">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty. <Link to="/menu">Browse menu</Link></div>
      ) : (
        <>
          <div className="list-group mb-3">
            {cart.map(item => (
              <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img src={item.image} width="80" height="60" className="rounded" alt={item.name} />
                  <div>
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted small">{item.description}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQty(item.id)}>-</button>
                  <div className="px-2">{item.qty}</div>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQty(item.id)}>+</button>
                  <div className="ms-3 fw-bold">{(item.price * item.qty).toFixed(2)} $</div>
                  <button className="btn btn-sm btn-danger ms-3" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button className="btn btn-outline-danger me-2" onClick={clearCart}>Clear Cart</button>
              <Link to="/menu" className="btn btn-outline-secondary">Continue Shopping</Link>
            </div>
            <div className="text-end">
              <div className="text-muted">Subtotal</div>
              <div className="fs-4 fw-bold">{subtotal.toFixed(2)} $</div>
              <Link to="/checkout" className="btn btn-warning mt-2">Proceed to Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}