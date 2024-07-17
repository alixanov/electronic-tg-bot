import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import Cart from "./components/cart/Cart";
import { getData } from "./constants/db";

const courses = getData();
const telegram = window.Telegram.WebApp

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready()
  })

  const onAddItem = item => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map(c =>
        c.id === item.id
          ? { ...c, quantity: c.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id === item.id);

    if (existItem) {
      if (existItem.quantity === 1) {
        const newData = cartItems.filter(c => c.id !== existItem.id);
        setCartItems(newData);
      } else {
        const newData = cartItems.map(c =>
          c.id === existItem.id
            ? { ...c, quantity: c.quantity - 1 }
            : c
        );
        setCartItems(newData);
      }
    }
  };

  const onCheckOut = () => {
    telegram.MainButton.text = "Купить"
    telegram.MainButton.show()
  }

  return (
    <div>
      <h1 className="heading">Sammi kurslari</h1>
      <Cart cartItems={cartItems} onCheckOut={onCheckOut} />
      <div className='cards__container'>
        {
          courses.map((course) => (
            <Card
              key={course.id}
              course={course}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}

            />
          ))
        }
      </div>
    </div>
  );
}

export default App;