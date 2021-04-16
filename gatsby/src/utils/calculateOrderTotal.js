import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // loop over items in order and calculate
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((pizz) => pizz.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}
