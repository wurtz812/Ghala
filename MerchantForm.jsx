import { useState } from 'react';
export default function MerchantForm() {
  const [name, setName] = useState('');
  const [method, setMethod] = useState('');

  const submit = async () => {
    await fetch('http://localhost:3000/merchant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, paymentMethod: method, config: {} })
    });
    alert('Merchant created');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Merchant Settings</h2>
      <input className="border p-2 mr-2" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input className="border p-2 mr-2" placeholder="Payment Method" onChange={e => setMethod(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={submit}>Save</button>
    </div>
  );
}