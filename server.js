const express = require('express');
const pool = require('./db');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/score', async (req, res) => {
  const { player_name, score } = req.body;
  console.log('Received score submission:', { player_name, score });

  try {
    await pool.query(
      'INSERT INTO public.player_score (player_name, score) VALUES ($1, $2)',
      [player_name, score]
    );
    res.status(200).json({ message: 'Score saved!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 