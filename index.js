const express = require('express');
const data = require('./data');
const app = express();
const cors = require('cors');
const router = require('./chat'); 

// Middleware
app.use(cors());
app.use(express.json());

// Project Route
app.get('/api/projects', (req, res) => {
    return res.send(data);
});

// Bot Route - Corrected Syntax
app.use('/api/bot', router);

app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});