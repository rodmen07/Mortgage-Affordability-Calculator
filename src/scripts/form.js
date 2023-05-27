export function handleEnterForm1(event) {
  const form = document.querySelector("form");
  if (event.code === "Enter") {
    form.classList.add("visible2");
    form.classList.remove("hidden");
  }
  // JavaScript code to set initial values and update the number values dynamically with formatting
  const incomeInput = document.getElementById('income');
  const incomeValue = document.getElementById('income-value');
  const initialIncome = (parseFloat(incomeInput.min) + parseFloat(incomeInput.max)) / 2;
  incomeInput.value = initialIncome;
  incomeValue.textContent = formatCurrency(initialIncome);

  incomeInput.addEventListener('input', () => {
    const formattedValue = formatCurrency(incomeInput.value);
    incomeValue.textContent = formattedValue;
  });

  const debtInput = document.getElementById('debt');
  const debtValue = document.getElementById('debt-value');
  const initialDebt = (parseFloat(debtInput.min) + parseFloat(debtInput.max)) / 2;
  debtInput.value = initialDebt;
  debtValue.textContent = formatCurrency(initialDebt);

  debtInput.addEventListener('input', () => {
    const formattedValue = formatCurrency(debtInput.value);
    debtValue.textContent = formattedValue;
  });

  const downpaymentInput = document.getElementById('downpayment');
  const downpaymentValue = document.getElementById('downpayment-value');
  const initialDownpayment = (parseFloat(downpaymentInput.min) + parseFloat(downpaymentInput.max)) / 2;
  downpaymentInput.value = initialDownpayment;
  downpaymentValue.textContent = formatCurrency(initialDownpayment);

  downpaymentInput.addEventListener('input', () => {
    const formattedValue = formatCurrency(downpaymentInput.value);
    downpaymentValue.textContent = formattedValue;
  });
}

// Function to format the number as currency
function formatCurrency(number) {
  const formattedNumber = parseFloat(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formattedNumber;
}
