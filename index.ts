import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (height <= 0 || height > 300
    || weight <= 0 || weight > 300
    || !req.query.height || !req.query.weight
    || isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(height, weight)
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
