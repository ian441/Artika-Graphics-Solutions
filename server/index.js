const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
// allow frontend origin (adjust as needed)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// your routes
// app.use('/api', apiRouter);

// central error handler to avoid silent 500s
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal server error', message: err && err.message ? err.message : undefined });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));