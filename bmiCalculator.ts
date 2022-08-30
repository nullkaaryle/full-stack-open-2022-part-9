// Function calculateBmi calculates a BMI
// based on a given height (in centimeters) and weight (in kilograms)
// and then returns a message that suits the results.


type BmiNumericalResult = number;
type BmiTextualResult = string;
type bmiObject = {
  weight: number;
  height: number;
  bmi: string;
}

const bmiNumerical = (height: number, weight: number): BmiNumericalResult => {
  return weight / ((height / 100) ^ 2);
}

const bmiTextual = (bmiNumerical: number): BmiTextualResult => {
  if (bmiNumerical > 25) {
    return 'Overweight';
  } else if (bmiNumerical < 18.5) {
    return 'Underweight';
  } else {
    return 'Normal (healthy weight)';
  }
}

export const calculateBmi = (height: number, weight: number): bmiObject => {

  const bmiInfo: bmiObject = {
    weight,
    height,
    bmi: bmiTextual(bmiNumerical(height, weight))
  }

  return bmiInfo;
}
