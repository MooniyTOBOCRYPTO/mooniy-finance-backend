const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const CLIENT_ID = process.env.ML_CLIENT_ID;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const REDIRECT_URI = process.env.ML_REDIRECT_URI;

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'No code provided' });
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);
    const response = await axios.post(
      'https://api.mercadolibre.com/oauth/token',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message, details: error.response?.data || null });
  }
});

app.get('/api/:path(*)', async (req, res) => {
  const token = req.headers['authorization'];
  const query = new URLSearchParams(req.query).toString();
  const mlUrl = `https://api.mercadolibre.com/${req.params.path}${query ? '?' + query : ''}`;
  try {
    const response = await axios.get(mlUrl, {
      headers: { 'Authorization': token }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

app.get('/ordenes', async (req, res) => {
  const token = req.headers['authorization'];
  const { seller, desde } = req.query;
  let todasLasOrdenes = [];
  let offset = 0;
  const limit = 50;
  let total = null;
  try {
    while (true) {
      const url = `https://api.mercadolibre.com/orders/search?seller=${seller}&order.date_created.from=${desde}&order.status=paid&sort=date_desc&limit=${limit}&offset=${offset}`;
      const response = await axios.get(url, { headers: { 'Authorization': token } });
      const data = response.data;
      if (total === null) total = data.paging?.total || 0;
      const ordenes = data.results || [];
      todasLasOrdenes = todasLasOrdenes.concat(ordenes);
      offset += limit;
      if (offset >= total || ordenes.length === 0 || offset >= 500) break;
    }
    res.json({ results: todasLasOrdenes, total: todasLasOrdenes.length });
  } catch (error) {
    res.status(500).json({ error: error.message, details: error.response?.data || null });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
