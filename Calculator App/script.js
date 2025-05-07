// Calculator variables
let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Get display element
const display = document.getElementById("display");

// Function to update display
function updateDisplay() {
  display.textContent = displayValue;
}

// Handle digit clicks
const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
  digit.addEventListener("click", (event) => {
    const digitValue = event.target.textContent;

    if (waitingForSecondOperand) {
      displayValue = digitValue;
      waitingForSecondOperand = false;
    } else {
      // If display shows '0', replace it with the clicked digit
      displayValue =
        displayValue === "0" ? digitValue : displayValue + digitValue;
    }

    updateDisplay();
  });
});

// Handle operator clicks
const operators = document.querySelectorAll(".operator");
operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (event) => {
    const currentOperator = event.target.textContent;

    // If there's already a first operand and an operator,
    // we need to perform the calculation before setting a new operator
    if (
      firstOperand !== null &&
      operator !== null &&
      !waitingForSecondOperand
    ) {
      const result = calculate();
      displayValue = String(result);
      firstOperand = result;
    } else {
      firstOperand = parseFloat(displayValue);
    }

    waitingForSecondOperand = true;
    operator = currentOperator;
    updateDisplay();
  });
});

// Handle equal button click
document.getElementById("equal").addEventListener("click", () => {
  if (firstOperand === null || operator === null) {
    return;
  }

  const result = calculate();
  displayValue = String(result);
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = true;
  updateDisplay();
});

// Handle clear button click
document.getElementById("clear").addEventListener("click", () => {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
});

// Calculate function
function calculate() {
  const secondOperand = parseFloat(displayValue);
  let result = 0;

  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "×":
      result = firstOperand * secondOperand;
      break;
    case "÷":
      result = firstOperand / secondOperand;
      break;
    default:
      return secondOperand;
  }

  return result;
}

// Initialize display
updateDisplay();
