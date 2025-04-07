CREATE DATABASE tienda_online;
USE tienda_online;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    tipo ENUM('cliente', 'admin') DEFAULT 'cliente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255), 
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'enviado', 'entregado') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de detalles de pedidos
CREATE TABLE detalles_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);
