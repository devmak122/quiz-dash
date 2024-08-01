const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`dashboard Backend listening at http://localhost:${port}`);
});
