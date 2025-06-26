import { useEffect, useState } from 'react';
export default function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('http://localhost:3000/orders');
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Order List</h2>
      {orders.map(o => (
        <div key={o.id} className="border-b py-2">
          <strong>{o.product}</strong> - ${o.total} - <span className="text-sm">{o.status}</span> (Merchant: {o.Merchant?.name})
        </div>
      ))}
    </div>
  );
}