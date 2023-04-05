const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config();
const API_KEY = process.env.API_KEY;

const app = express();
app.use(cors());

// Routes + Controllers
app.get('/mortgagerate', (req, res) => {
    const seriesId = req.query.series_id;
    axios.get(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`)
        .then(response => res.send(response.data))
});

app.get('/retrieveaffordablestates', (req, res) => {
    const seriesId = req.query.series_id;
    axios.get(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`)
        .then(response => res.send(response.data))
});

app.listen(5000, () => {
    console.log('listening on port 5000');
})
