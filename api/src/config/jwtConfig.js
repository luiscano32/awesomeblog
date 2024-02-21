module.exports = {
  secret: process.env.JWT_SECRET,
  options: { expiresIn: '2h' } // tiempo de vida de token
};