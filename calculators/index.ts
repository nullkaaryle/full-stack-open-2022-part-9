import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
  console.log(req.body);
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters are missing' });
  }

  if (isNaN(target) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: 'parameters are not numbers' });
  }

  if (target < 0 || target > 24 || daily_exercises.length === 0 || daily_exercises.some(n => n < 0)) {
    res.status(400).send({ error: 'parameters are malformatted' });
  }

  const result = calculateExercises(target, daily_exercises);
  res.send(result);
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: 'parameters missing' });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (height <= 0 || height > 300
    || weight <= 0 || weight > 300
    || isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(height, weight);
  res.send(result);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
