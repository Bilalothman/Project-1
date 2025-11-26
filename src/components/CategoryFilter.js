import React from "react";

export default function CategoryFilter({ categories, category, setCategory, query, setQuery }) {
  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <div className="btn-group" role="group" aria-label="categories">
        {["All", ...categories].map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`btn btn-sm ${category === c ? "btn-warning" : "btn-outline-secondary"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="ms-auto d-flex">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search menu..." className="form-control form-control-sm" />
      </div>
    </div>
  );
}