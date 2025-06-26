import { useState, useEffect } from 'react';
export default function OrderForm() {
  const [product, setProduct] = useState('');
  const [total, setTotal] = useState(0);
  const [merchantId, setMerchantId] = useState('');
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/merchants')
      .then(res => res.json())
      .then(setMerchants);
  }, []);

  const submit = async () => {
    await fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, total, MerchantId: merchantId })
    });
    alert('Order placed');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Place Order</h2>
      <input className="border p-2 mr-2" placeholder="Product" onChange={e => setProduct(e.target.value)} />
      <input type="number" className="border p-2 mr-2" placeholder="Total" onChange={e => setTotal(parseFloat(e.target.value))} />
      <select className="border p-2 mr-2" onChange={e => setMerchantId(e.target.value)}>
        <option>Select Merchant</option>
        {merchants.map(m => <option value={m.id} key={m.id}>{m.name}</option>)}
      </select>
      <button className="bg-green-500 text-white p-2" onClick={submit}>Order</button>
    </div>
  );
}