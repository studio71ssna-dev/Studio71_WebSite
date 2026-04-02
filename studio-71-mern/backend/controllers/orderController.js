const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/order
const createOrder = async (req, res) => {
    try {
        const { clientName, email, description } = req.body;

        if (!clientName || !email || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Generate a mock price for the invoice (e.g., between 5,000 and 20,000 BDT)
        // You can replace this with actual pricing logic later!
        const calculatedAmount = Math.floor(Math.random() * 15000) + 5000;

        const newOrder = await Order.create({
            clientName,
            email,
            description,
            amount: calculatedAmount
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