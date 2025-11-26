import React, { useContext, useMemo, useState } from "react";
import { MenuContext } from "../context/MenuContext";
import MenuCard from "../components/MenuItemCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Menu() {
  const { menuItems } = useContext(MenuContext);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => Array.from(new Set(menuItems.map(m => m.category))), [menuItems]);

  const filtered = menuItems.filter(item => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" data-aos="zoom-in">Our Menu</h2>

      <CategoryFilter categories={categories} category={category} setCategory={setCategory} query={query} setQuery={setQuery} />

      <div className="row">
        {filtered.map(item => (
          <div className="col-md-4 mb-4" key={item.id}>
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}