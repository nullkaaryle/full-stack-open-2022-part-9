// Function calculateBmi calculates a BMI
// based on a given height (in centimeters) and weight (in kilograms)
// and then returns a message that suits the results.
//
// Command line example: npm run calculateBmi 180 91
// returns "Overweight"

interface bmiCalculatorValues {
  value1: number;
  value2: number;
}

type Result = string;

const parseArguments = (args: Array<string>): bmiCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number): Result => {
  const calculatedBmi = weight / ((height / 100) ^ 2)

  switch (true) {
    case calculatedBmi > 25:
      return 'Overweight';
    case calculatedBmi < 18.5:
      return 'Underweight';
    default:
      return 'Normal (healthy weight)';
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
