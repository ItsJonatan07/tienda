export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo salió mal, por favor intente más tarde.',
    });
};
