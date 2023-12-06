const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
// const fetch = require('node-fetch');
// Replace this line
// const fetch = require('node-fetch');
// with this line
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-2',
        prompt: prompt,
        n: 1,
        size: '256x256',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate image. OpenAI API response: ${await response.text()}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
