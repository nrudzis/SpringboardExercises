
it('should calculate the monthly rate correctly', function () {
  values = {
    amount: 10000.3,
    years: 3.4,
    rate: 5.2
  }
  expect(calculateMonthlyPayment(values)).toBeCloseTo(268, 0);
});


it("should return a result with 2 decimal places", function() {
  values = {
    amount: 20000,
    years: 4,
    rate: 6.7
  }
  const monthly = calculateMonthlyPayment(values).split('.');
  expect(monthly[1].length).toBe(2);
});

/// etc
