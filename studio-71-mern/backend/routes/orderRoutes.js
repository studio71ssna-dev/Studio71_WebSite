const express = require("express");
const router = express.Router();
const { createOrder, getInvoice, getOrders } = require("../controllers/orderController");

router.post("/order", createOrder);
router.get("/invoice/:id", getInvoice);
router.get("/orders", getOrders);

module.exports = router;