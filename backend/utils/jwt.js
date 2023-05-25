const jwt = require('jsonwebtoken');

module.exports.getJwtToken = (id) => jwt.sign({ id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
