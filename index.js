const express = require('express');

const app = express();

app.post('/upload', (req, res) => {
  res.json({
    status: 'success',
  });
});

app.listen(4000, () => console.log('listening on port 4000'));
