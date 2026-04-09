const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/order
const createOrder = async (req, res) => {
    try {
        // Now accepting 'amount' from the frontend!
        const { clientName, email, description, amount } = req.body;

        if (!clientName || !email || !description || !amount) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newOrder = await Order.create({
            clientName,
            email,
            description,
            amount // Use the exact tier amount passed from the React form
        });

        res.status(201).json({ success: true, message: "Order saved successfully", data: newOrder });
    } catch (error) {
        console.error("❌ Error saving order:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// @desc    Get a single invoice by ID
// @route   GET /api/invoice/:id
const getInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Invoice not found" });
        }

        // FIXED: Now wrapped in { success: true, data: ... }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { createOrder, getInvoice, getOrders };