const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('sqlite::memory:');

const Merchant = sequelize.define('Merchant', {
  name: DataTypes.STRING,
  paymentMethod: DataTypes.STRING,
  config: DataTypes.JSON
});

const Order = sequelize.define('Order', {
  product: DataTypes.STRING,
  total: DataTypes.FLOAT,
  status: DataTypes.STRING
});

Merchant.hasMany(Order);
Order.belongsTo(Merchant);

app.post('/merchant', async (req, res) => {
  const merchant = await Merchant.create(req.body);
  res.json(merchant);
});

app.get('/merchants', async (req, res) => {
  const merchants = await Merchant.findAll();
  res.json(merchants);
});

app.post('/order', async (req, res) => {
  const order = await Order.create({ ...req.body, status: 'pending' });
  res.json(order);

  setTimeout(async () => {
    order.status = 'paid';
    await order.save();
    console.log(`Order ${order.id} marked as paid.`);
  }, 5000);
});

app.get('/orders', async (req, res) => {
  const orders = await Order.findAll({ include: Merchant });
  res.json(orders);
});

sequelize.sync().then(() => app.listen(3000, () => console.log('Backend running on http://localhost:3000')));