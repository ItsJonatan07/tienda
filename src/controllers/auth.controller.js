// auth.controller.js
import prisma from '../../config/prisma.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// Puedes usar un .env para almacenar el secreto:
const SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';

// Función para crear un nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { nombre, email, password, direccion, telefono, tipo } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await argon2.hash(password);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        direccion,
        telefono,
        tipo,
      },
    });

    res.status(201).json({
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      direccion: nuevoUsuario.direccion,
      telefono: nuevoUsuario.telefono,
      tipo: nuevoUsuario.tipo,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar al usuario' });
  }
};

// Función para iniciar sesión de usuario
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const contraseñaValida = await argon2.verify(usuario.password, password);
    if (!contraseñaValida) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        tipo: usuario.tipo,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
      }
    });
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ error: 'Error al autenticar al usuario' });
  }
};
