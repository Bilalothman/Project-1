import MenuItemCard from "../components/MenuItemCard";


const MENU_ITEMS = [
{
id: 1,
name: "Classic Burger",
price: 8,
description: "Juicy beef burger with cheddar, lettuce, and tomato.",
image: "https://www.recipetocook.co.uk/wp-content/uploads/2024/02/beef-burger-recipe.jpg"
},
{
id: 2,
name: "Pepperoni Pizza",
price: 12,
description: "Stone‑baked pizza loaded with pepperoni & cheese.",
image: "https://c8.alamy.com/comp/2R3C826/a-thin-crust-pepperoni-pizza-with-a-slice-lifted-and-cheese-stretching-2R3C826.jpg"
},
];


export default function Menu() {
return (
<div className="container mt-5">
<h2 className="text-center mb-4" data-aos="zoom-in">Our Menu</h2>
<div className="row">
{MENU_ITEMS.map((item) => (
<MenuItemCard key={item.id} item={item} />
))}
</div>
</div>
);
}