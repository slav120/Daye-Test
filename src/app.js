const express = require('express');
const app = express();
const tamponRoutes = require('./routes/tamponRoutes');

const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Welcome message at the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Tampon API');
  });

// Routes
app.use('/api', tamponRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
