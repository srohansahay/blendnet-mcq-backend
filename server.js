const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// API endpoint to add a new question
app.post('/api/questions', (req, res) => {
  try {
    const { newQuestion } = req.body;
    const questionsData = JSON.parse(fs.readFileSync('../src/questionsdata.json', 'utf8'));
    questionsData.push(newQuestion);
    fs.writeFileSync('../src/questionsdata.json', JSON.stringify(questionsData));
    res.status(200).send('Question added successfully.');
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).send('An error occurred while adding the question.');
  }
});

app.delete('/api/questions/:id', (req, res) => {
 try {
   const { id } = req.params;
   const questionsData = JSON.parse(fs.readFileSync('../src/questionsdata.json', 'utf8'));
   const updatedQuestionsData = questionsData.filter((question) => question.id !== id);
   fs.writeFileSync('../src/questionsdata.json', JSON.stringify(updatedQuestionsData));
   res.status(200).send('Question deleted successfully.');
 } catch (error) {
   console.error('Error deleting question:', error);
   res.status(500).send('An error occurred while deleting the question.');
 }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



