export const verificarAdmin = (req, res, next) => {
    if (req.usuario.tipo !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
};
