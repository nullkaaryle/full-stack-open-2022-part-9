// Function calculateExercises calculates the average time of daily exercise hours
// and compares it to the target amount of daily hours.
// The first parameter is the target value.
// The second parameter given to the function is an array
// that contains the number of exercise hours for each day in the training period


type trainingEvaluation = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

type SuccessResult = boolean;
type RatingResult = number;
type RatingDescriptionResult = string;


const rateSuccess = (average: number, target: number): SuccessResult => {
  if (average >= target) {
    return true;
  } else {
    return false;
  }
};

const getRating = (average: number, target: number): RatingResult => {
  if (average >= target) {
    return 3;
  } else if (average >= target * 0.5) {
    return 2;
  } else {
    return 1;
  }
};

const getRatingDescription = (rating: number): RatingDescriptionResult => {
  switch (rating) {
    case 3:
      return 'Suberb!';
    case 2:
      return 'Not too bad but could be better';
    default:
      return 'Keep going!';
  }
};

export const calculateExercises = (target: number, exercises: number[]): trainingEvaluation => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(n => n > 0).length;
  const average = exercises.reduce((a, b) => a + b) / periodLength;
  const success = rateSuccess(average, target);
  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

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
};

