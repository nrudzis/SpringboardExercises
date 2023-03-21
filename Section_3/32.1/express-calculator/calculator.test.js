const OPERATIONS = require('./calculator');

describe('test calculator', () => {

  test('should return the mean of a comma-separated string of numbers', () => {
    const mean1 = OPERATIONS.meanCalc('9,3,5,8,1');
    const mean2 = OPERATIONS.meanCalc('45,-5,344.1,0,1.8,0.25,67.1,-89.7');
    expect(mean1).toEqual(5.2);
    expect(mean2).toBeCloseTo(45.44);
  });

  test('should return the median of a comma-separated string of numbers', () => {
    const median1 = OPERATIONS.medianCalc('9,3,5,8,1');
    const median2 = OPERATIONS.medianCalc('45,-5,344.1,0,1.8,0.25,67.1,-89.7');
    expect(median1).toEqual(5);
    expect(median2).toBeCloseTo(1.025, 3);
  });

  test('should return the mode of a comma-separated string of numbers', () => {
    const mode1 = OPERATIONS.modeCalc('9,3,5,9,1');
    const mode2 = OPERATIONS.modeCalc('0.25,-5,1.8,0.25,1.8,0.25,67.1,-89.7');
    expect(mode1).toEqual(9);
    expect(mode2).toBeCloseTo(0.25);
  });

});
