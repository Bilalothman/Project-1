import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e) {
    e.preventDefault();
    alert("Message sent (demo). Thank you!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="container mt-5" data-aos="fade-left">
      <h2>Contact</h2>
      <form onSubmit={submit} className="mt-3">
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="Message" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        <button className="btn btn-warning" type="submit">Send</button>
      </form>
    </div>
  );
}
