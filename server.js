const express = require('express');
const cors = require('cors');

const {OpenAIApi,Configuration }= require('openai');
const configuration = new Configuration({
  apiKey: process.env.key,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors())
app.use(express.json())
app.post('/', async (req, res) => {
  try {
const {message} = req.body;
   const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${message}`,
  max_tokens: 3000,
  temperature: 0.5,
});
   res.status(200).send({
      message: response.data.choices[0].text
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error || 'New Error');
  }
})
app.listen(1000, () => console.log('AI server started '));
