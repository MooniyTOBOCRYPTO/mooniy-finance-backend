const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.ML_CLIENT_ID;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const REDIRECT_URI = process.env.ML_REDIRECT_URI;
const DASHBOARD_URL = 'https://mooniytobocrypto.github.io/mooniy-dashboard';

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

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

    const { access_token, user_id } = response.data;
    res.redirect(`${DASHBOARD_URL}?token=${access_token}&user_id=${user_id}`);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || null
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
