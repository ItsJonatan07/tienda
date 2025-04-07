import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { enviarRecibo } from '../utils/email.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const crearPago = async (req, res) => {
    try {
        const { productos, email } = req.body;

        // Crear line items para Stripe
        const lineItems = productos.map(producto => ({
            price_data: {
                currency: "usd",
                product_data: { name: producto.nombre },
                unit_amount: Math.round(producto.precio * 100), // Stripe usa centavos
            },
            quantity: producto.cantidad
        }));

        // Crear sesión de pago
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/pago-exitoso`,
            cancel_url: `${process.env.FRONTEND_URL}/carrito`,
            customer_email: email
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const webhookPago = express.Router();

webhookPago.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const firma = req.headers['stripe-signature'];

    try {
        const evento = stripe.webhooks.constructEvent(req.body, firma, process.env.STRIPE_WEBHOOK_SECRET);

        if (evento.type === 'checkout.session.completed') {
            const session = evento.data.object;
            console.log(`✅ Pago confirmado para ${session.customer_email}`);

            // Guardar pago en la base de datos (opcional)
            // Enviar email de confirmación (siguiente paso)
        }

        res.json({ received: true });
    } catch (error) {
        console.error("⚠️ Webhook error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

webhookPago.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const firma = req.headers['stripe-signature'];

    try {
        const evento = stripe.webhooks.constructEvent(req.body, firma, process.env.STRIPE_WEBHOOK_SECRET);

        if (evento.type === 'checkout.session.completed') {
            const session = evento.data.object;
            await enviarRecibo(session.customer_email, session.amount_total / 100);
        }

        res.json({ received: true });
    } catch (error) {
        console.error("⚠️ Webhook error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});
