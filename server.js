const express = require('express');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/speechify', async (req, res) => {
  // Your ChatGPT and Speechify API integration code will go here
  res.send('Speechify endpoint');
});

app.post('/gpt', async (req, res) => { 
  const inputText = req.body.inputText;

  try {

    if (inputText == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    let response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5
    });

    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
    
  
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('Backend server is running');
});
