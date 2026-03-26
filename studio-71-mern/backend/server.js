const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    family: 4
})
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
});

// 🧠 Schema
const orderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

// 🚀 Routes

// Test route
app.get("/", (req, res) => {
    res.send("Cloud Database Node: ONLINE 🚀");
});

// Create order
app.post("/api/order", async (req, res) => {
    try {
        console.log("📩 Incoming Data:", req.body);

        const { clientName, email, description } = req.body;

        if (!clientName || !email || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newOrder = new Order({
            clientName,
            email,
            description
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order saved successfully",
            data: savedOrder
        });

    } catch (error) {
        console.error("❌ Error saving order:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});
// 📄 Get single invoice
app.get("/api/invoice/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// 📦 Get all orders (optional but useful)
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false });
    }
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});