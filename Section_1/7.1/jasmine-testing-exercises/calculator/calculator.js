window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loanAmount = document.querySelector('#loan-amount');
  const loanYears = document.querySelector('#loan-years');
  const loanRate = document.querySelector('#loan-rate');
  loanAmount.value = '30000';
  loanYears.value = '5';
  loanRate.value = '9.3';
  calculateMonthlyPayment(getCurrentUIValues());
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  floatAmount = parseFloat(values.amount);
  floatYears = parseFloat(values.years);
  floatRate = parseFloat(values.rate);
  return ((floatAmount * floatRate / 1200) / (1 - (1 + floatRate / 1200) ** (-floatYears * 12))).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.querySelector('#monthly-payment');
  monthlyPayment.innerText = monthly;
}
