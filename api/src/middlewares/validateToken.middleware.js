const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    // obtención de token en header de solicitud http
    const token = req.headers.authorization?.split(' ')[1] || null;

    // valida la existencia de token extraído de cadena
    if (!token) {
        return res.status(403).send({
            status: 'error',
            message: 'token is invalid',
        });
    }

    try {

        // valida si el token es válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // se agrega datos de usuario decodificado al objeto de solicitud
        req.user_data = decoded;
        next();

    } catch (error) {
        return res.status(401).send({
            status: 'error',
            message: 'invalid token or expired'
        });
    }
};

module.exports = validateToken;