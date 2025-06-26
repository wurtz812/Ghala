import React from 'react';
import MerchantForm from './components/MerchantForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Ghala Simulation</h1>
      <MerchantForm />
      <OrderForm />
      <OrderList />
    </div>
  );
}

export default App;