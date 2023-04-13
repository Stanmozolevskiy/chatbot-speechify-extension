const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/speechify', async (req, res) => {
  // Your ChatGPT and Speechify API integration code will go here
  res.send('Speechify endpoint');
});

app.post('/gpt', async (req, res) => {
  // Your ChatGPT and Speechify API integration code will go here
  console.log("this is the test", req);
  res.send('GPT endpoint');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('Backend server is running');
});