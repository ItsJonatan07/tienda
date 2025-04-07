const connection = require('../../config/db');

const Producto = {
    obtenerTodos: (callback) => {
        connection.query('SELECT * FROM productos', callback);
    },
    obtenerPorId: (id, callback) => {
        connection.query('SELECT * FROM productos WHERE id = ?', [id], callback);
    },
    crear: (datos, callback) => {
        connection.query('INSERT INTO productos SET ?', datos, callback);
    },
    actualizar: (id, datos, callback) => {
        connection.query('UPDATE productos SET ? WHERE id = ?', [datos, id], callback);
    },
    eliminar: (id, callback) => {
        connection.query('DELETE FROM productos WHERE id = ?', [id], callback);
    }
};

module.exports = Producto;
