import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuItems] = useState([
    {
      id: 1,
      name: "Juicy Beef Burger",
      price: 8.99,
      category: "Burgers",
      image:
        "https://www.recipetocook.co.uk/wp-content/uploads/2024/02/beef-burger-recipe.jpg",
      description: "Grilled beef patty with melted cheese, lettuce & tomato."
    },
    {
      id: 2,
      name: "Double Cheese Burger",
      price: 10.49,
      category: "Burgers",
      image:
        "https://recipes.net/wp-content/uploads/2024/04/what-is-mcdonalds-double-cheeseburger-1713280918.jpg",
      description: "Two patties, double cheese, special sauce."
    },
    {
      id: 3,
      name: "Cheesy Pepperoni Pizza",
      price: 12.99,
      category: "Pizza",
      image:
        "https://media.gettyimages.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=1024x1024&w=gi&k=20&c=Yt4zd5cbWoZxxrqyBOOkk6PMuqqRu4_MT9oPusqqGoA=",
      description: "Thin crust with mozzarella and spicy pepperoni."
    },
    {
      id: 4,
      name: "Margherita Pizza",
      price: 11.0,
      category: "Pizza",
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza.jpg",
      description: "Tomato, fresh basil, buffalo mozzarella."
    },
    {
      id: 5,
      name: "Italian Creamy Pasta",
      price: 9.99,
      category: "Pasta",
      image:
        "https://anitalianinmykitchen.com/wp-content/uploads/2018/04/creamy-p-salad-pic-1-of-1-683x1024.jpg",
      description: "Creamy Alfredo style pasta with parmesan."
    },
    {
      id: 6,
      name: "Spicy Arrabiata Pasta",
      price: 10.5,
      category: "Pasta",
      image:
        "https://www.barefootfarmbyron.com/wp-content/uploads/2023/09/delicious-arrabiata-sauce-pasta-recipe-easy-spicy-and-flavorful.jpg",
      description: "Tomato sauce with chili flakes and garlic."
    },
    {
      id: 7,
      name: "Fresh Orange Juice",
      price: 3.5,
      category: "Drinks",
      image:
        "https://jooinn.com/images/fresh-orange-juice-4.jpg",
      description: "Squeezed fresh orange juice."
    },
    {
      id: 8,
      name: "Chocolate Cake Slice",
      price: 4.99,
      category: "Desserts",
      image:
        "https://bakewithzoha.com/wp-content/uploads/2023/01/chocolate-cake-slice-side.jpg",
      description: "Rich chocolate cake with ganache."
    }
  ]);

  return (
    <MenuContext.Provider value={{ menuItems }}>
      {children}
    </MenuContext.Provider>
  );
}