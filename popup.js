// this code calls heroku service 
//const SERVER_BASE_URL = "https://chatbot-speechify-extension.herokuapp.com/";
const SERVER_BASE_URL = "http://localhost:3000";

async function chatWithGPT(prompt) {
  const response = await fetch(`${SERVER_BASE_URL}/gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });
  
  console.log(response)
  const data = await response.json();
  return data;
}

async function textToSpeech(text) {
  const response = await fetch(`${SERVER_BASE_URL}/speechify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  const data = await response.json();
  return data.url;
}

document.getElementById("sendButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const responseText = await chatWithGPT(userInput);
  document.getElementById("responseContainer").innerHTML = responseText;

  const speechUrl = await textToSpeech(responseText);
  const audio = new Audio(speechUrl);
  audio.play();
});

