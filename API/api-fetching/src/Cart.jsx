import { useState } from "react";

function Cart() {
  const products = ["Apple", "Banana", "Orange","PineApple"];
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p}>
            {p} <button onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h3>Cart: {cart.length} items</h3>
      <ul>{cart.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

export default Cart;