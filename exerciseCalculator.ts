// Function calculateExercises calculates the average time of daily exercise hours
// and compares it to the target amount of daily hours.
// The first argument is the target value, and the following arguments are exercise hours.
// The daily exercise hours are given to the function as an array
// that contains the number of exercise hours for each day in the training period
//
// Command line example: npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
// returns
// { periodLength: 9,
// trainingDays: 6,
// success: false,
// rating: 2,
// ratingDescription: 'not too bad but could be better',
// target: 2,
// average: 1.7222222222222223 }

interface exerciseCalculatorValues {
  value1: number;
  value2: number[];
}

type trainingEvaluation = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type ExerciseResult = string;
type SuccessResult = boolean;
type RatingResult = number;
type RatingDescriptionResult = string;

const parseCommandLineArguments = (args: Array<string>): exerciseCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 50) throw new Error('Too many arguments');

  const argumentsAsNumbers = args.slice(2).map(n => Number(n))

  const argumentsAreValidNumbers = argumentsAsNumbers.every(function (argument) {
    return (!isNaN(argument));
  })

  if (argumentsAreValidNumbers) {
    const [first, ...rest] = argumentsAsNumbers
    return {
      value1: first,
      value2: rest
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const rateSuccess = (average: number, target: number): SuccessResult => {
  if (average >= target) {
    return true
  } else {
    return false
  }
}

const getRating = (average: number, target: number): RatingResult => {
  if (average >= target) {
    return 3;
  } else if (average >= target * 0.5) {
    return 2;
  } else {
    return 1;
  }
}

const getRatingDescription = (rating: number): RatingDescriptionResult => {
  switch (rating) {
    case 3:
      return 'Suberb!';
    case 2:
      return 'Not too bad but could be better';
    default:
      return 'Keep going!';
  }
}

const calculateExercises = (target: number, exercises: number[]): trainingEvaluation => {
  const periodLength = exercises.length
  const trainingDays = exercises.filter(n => n > 0).length
  const average = exercises.reduce((a, b) => a + b) / periodLength
  const success = rateSuccess(average, target)
  const rating = getRating(average, target)
  const ratingDescription = getRatingDescription(rating)

  const evaluation: trainingEvaluation = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

  return evaluation;
}

try {
  const { value1, value2 } = parseCommandLineArguments(process.argv);
  console.log(calculateExercises(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
