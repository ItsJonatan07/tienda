import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword
            }
        });

        res.json({ mensaje: "Usuario registrado", usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

        const esValido = bcrypt.compareSync(password, usuario.password);
        if (!esValido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ mensaje: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
