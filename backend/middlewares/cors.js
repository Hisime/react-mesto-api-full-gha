const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://hisime.mesto.nomoredomains.monster',
  'localhost:3000'
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}