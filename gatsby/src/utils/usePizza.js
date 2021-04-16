import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things
  function removeFromOrder(index) {
    setOrder([
      // everything before + everything after what we want to remove
      ...order.slice(0, index),
      ...order.slice(index + 1),
    ]);
  }
  // 4. Submit this to serverless functions
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
