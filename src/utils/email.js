import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const enviarRecibo = async (email, total) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Confirmación de pago",
        text: `Tu pago de $${total} ha sido recibido. ¡Gracias por tu compra!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Recibo enviado a", email);
    } catch (error) {
        console.error("⚠️ Error enviando recibo:", error.message);
    }
};
