import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, customer, total, paymentMethod, paymentStatus } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      customer,
      total,
      paymentMethod,
      paymentStatus,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};