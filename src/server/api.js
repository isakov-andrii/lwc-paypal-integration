// Simple Express server setup to serve for local testing/dev API server
// const compression = require('compression');
// const helmet = require('helmet');
// const express = require('express');
import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// import paypal from "paypal-rest-sdk";
import * as paypal from "./paypal-api.js";

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.post('/api/testing', (req, res) => {
    // PaymentPage();
    // console.log('Request: ' + req.body);
    res.send('Response from server!!!');
    // res.send(create_payment_json);
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await paypal.createOrder();
        res.json(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
