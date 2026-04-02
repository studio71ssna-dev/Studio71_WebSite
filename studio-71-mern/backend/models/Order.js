const mongoose = require("mongoose");

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
    },
    amount: {
        type: Number,
        required: true,
        default: 5000 // Default placeholder. You can calculate this based on the description later!
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);