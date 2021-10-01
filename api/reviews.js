import axios from 'axios';

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=86400');
    const result = await axios.get(
      'https://widget.trustpilot.com/trustbox-data/53aa8912dec7e10d38f59f36?businessUnitId=590b073c0000ff0005a1c9db&locale=en-GB&reviewLanguages=en&reviewStars=4%2C5&includeReviews=true&reviewsPerPage=15'
    );
    res.status(200).json(result.data);
  } catch (e) {
    res.status(403);
  }
};

module.exports = allowCors(handler);
