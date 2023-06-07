import React, { useState } from 'react';

import './index.css';

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function Header() {
  // const style = {
  //   color: 'red',
  //   fontSize: '48px',
  //   textTransform: 'uppercase',
  // };

  return (
    <header className='header '>
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu({ menuMaint }) {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  menuMaint(numPizzas);

  return (
    <main className='menu'>
      {numPizzas > 0 ? (
        <>
          <h2>Our Menu</h2>
          <p>
            Authentic Italian cuisine. Six creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className='pizzas'>
            {pizzas.map((pizza) => {
              return <Pizza pizzaObj={pizza} key={pizza.name} />;
            })}
          </ul>
        </>
      ) : (
        <p>Menu Maintenance In Progress, Come Back Soon! :)</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer({ isMenuMaint }) {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (!isOpen) {
  //   return (
  //     <div className='order'>
  //       <h1>OPEN NOW</h1>
  //       <p>Open Until {closeHour}, Visit or Order online.</p>
  //       <button className='btn'>Order</button>
  //     </div>
  //   );
  // }

  return (
    <footer className='footer'>
      {isOpen && isMenuMaint ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        isMenuMaint && (
          <div className='order'>
            <h1>CURRENTLY CLOSED</h1>
            <p>
              We will be open soon! (Hours: {openHour}:00 - {closeHour}:00)
            </p>
          </div>
        )
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className='order'>
      <h1>OPEN NOW</h1>
      <p>
        Open from {openHour}:00 to {closeHour}:00, Visit or Order online.
      </p>
      <button className='btn'>Order</button>
    </div>
  );
}

function App() {
  const [menuFooter, setMenuFooter] = useState(true);

  const menuMaint = (menuLength) => {
    setMenuFooter(menuLength > 0);
  };

  return (
    <div className='container'>
      <Header />
      <Menu menuMaint={menuMaint} />
      <Footer isMenuMaint={menuFooter} />
    </div>
  );
}

export default App;
