const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const START_TIME = Date.now();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── GET /health ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  const uptimeMs = Date.now() - START_TIME;
  const uptimeSec = Math.floor(uptimeMs / 1000);

  res.json({
    status: 'ok',
    service: 'jm-api-demo',
    version: '1.0.0',
    uptime_seconds: uptimeSec,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// ── POST /transform ──────────────────────────────────────────────────────────
// Accepts any JSON object, returns it normalized: keys snake_cased,
// string values trimmed, nulls stripped, timestamps converted to ISO.
app.post('/transform', (req, res) => {
  const input = req.body;

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return res.status(400).json({ error: 'Request body must be a JSON object.' });
  }

  function toSnakeCase(str) {
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/[-\s]+/g, '_')
      .toLowerCase()
      .replace(/^_/, '');
  }

  function transformValue(val) {
    if (val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      const trimmed = val.trim();
      // Detect ISO-ish date strings and normalize
      const dateTest = new Date(trimmed);
      if (!isNaN(dateTest) && trimmed.length > 6) {
        return dateTest.toISOString();
      }
      return trimmed || undefined;
    }
    if (typeof val === 'object' && !Array.isArray(val)) return transformObject(val);
    if (Array.isArray(val)) return val.map(transformValue).filter(v => v !== undefined);
    return val;
  }

  function transformObject(obj) {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      const newKey = toSnakeCase(key);
      const newVal = transformValue(val);
      if (newVal !== undefined) result[newKey] = newVal;
    }
    return result;
  }

  const output = transformObject(input);

  res.json({
    input_field_count: Object.keys(input).length,
    output_field_count: Object.keys(output).length,
    nulls_stripped: Object.keys(input).length - Object.keys(output).length,
    transformed: output
  });
});

// ── GET /webhook/simulate ────────────────────────────────────────────────────
// Returns a realistic webhook event payload (Salesforce-flavored).
app.get('/webhook/simulate', (req, res) => {
  const eventTypes = ['opportunity.updated', 'contact.created', 'account.merged', 'case.escalated'];
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  res.json({
    id: `evt_${Math.random().toString(36).slice(2, 11)}`,
    type,
    created_at: new Date().toISOString(),
    retry_count: 0,
    source: 'salesforce-crm',
    payload: {
      object: type.split('.')[0],
      record_id: `00Q${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      changed_fields: ['stage', 'amount', 'close_date'].slice(0, Math.floor(Math.random() * 3) + 1),
      actor: {
        user_id: `usr_${Math.random().toString(36).slice(2, 9)}`,
        email: 'ae@acme-corp.com'
      }
    },
    delivery: {
      target_url: 'https://your-integration.example.com/webhooks',
      hmac_sha256: `sha256=${Math.random().toString(36).repeat(3).slice(0, 64)}`
    }
  });
});

// ── POST /auth/token ─────────────────────────────────────────────────────────
// Accepts { client_id, client_secret } or { username, password }.
// Returns a mock signed JWT with realistic claims.
app.post('/auth/token', (req, res) => {
  const { client_id, client_secret, username, password, grant_type } = req.body || {};

  const grantType = grant_type || (username ? 'password' : 'client_credentials');

  if (grantType === 'client_credentials' && (!client_id || !client_secret)) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'client_id and client_secret are required for client_credentials grant.'
    });
  }
  if (grantType === 'password' && (!username || !password)) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'username and password are required for password grant.'
    });
  }

  // Build a realistic (but unsigned/mock) JWT
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: 'demo-key-1' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: 'https://auth.jm-api-demo.onrender.com',
    sub: client_id || username || 'demo-user',
    aud: 'https://jm-api-demo.onrender.com',
    iat: now,
    exp: now + 3600,
    jti: Math.random().toString(36).slice(2, 11),
    scope: 'read write',
    grant_type: grantType
  };
  const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
  const sig = Buffer.from('demo-signature-not-cryptographically-valid').toString('base64url');

  res.json({
    access_token: `${header}.${payload}.${sig}`,
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'read write',
    _note: 'Demo token only — not cryptographically signed.'
  });
});

// ── Fallback ─────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', available_endpoints: [
    'GET  /health',
    'POST /transform',
    'GET  /webhook/simulate',
    'POST /auth/token'
  ]});
});

app.listen(PORT, () => {
  console.log(`jm-api-demo running on port ${PORT}`);
});
