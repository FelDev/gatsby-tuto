import React, { useState } from 'react';

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we stick the state in here; globally
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
