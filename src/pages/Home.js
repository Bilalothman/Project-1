import React from "react";

export default function Home() {
  return (
    <div className="hero" >
      <div className="container" data-aos="fade-down">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">Order delicious food in minutes</h1>
            <p className="lead text-muted">Fast ordering, clear UI, responsive and mobile friendly.</p>
            <a href="/menu" className="btn btn-warning btn-lg">View Menu</a>
          </div>
          <div className="col-md-6" data-aos="zoom-in">
            <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" className="img-fluid rounded shadow" alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}