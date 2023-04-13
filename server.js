const express = require('express');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const openai = require('openai');
const openaiApiKey = process.env.OPENAI_API_KEY;


openai.apiKey = openaiApiKey;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/speechify', async (req, res) => {
  // Your ChatGPT and Speechify API integration code will go here
  res.send('Speechify endpoint');
});

app.post('/gpt', async (req, res) => { 
  const inputText = req.body.inputText;

  try{
    // Call the ChatGPT API with the input text
    const chatGptResponse = await openai.completions.create({
      engine: 'davinci-codex',
      prompt: inputText,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    // Extract the generated text from the response
    const chatGptOutput = chatGptResponse.choices[0].text.trim();  
    console.log(chatGptOutput)

  } catch (error){
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request');
  }
  
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('Backend server is running');
});