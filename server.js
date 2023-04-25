const express = require('express');
const cors = require('cors');

const {OpenAIApi,Configuration }= require('openai');
// const bodyParser = require('body-parser');
const configuration = new Configuration({
    // organization:"org-i16GdI3biVetsydNnhzCYRLs",
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  try {
const {message} = req.body;
console.log(message)
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
    res.status(500).send(error || 'New Error');
  }
})

app.listen(5000, () => console.log('AI server started '));