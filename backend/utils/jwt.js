const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./utils');

module.exports.getJwtToken = (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
