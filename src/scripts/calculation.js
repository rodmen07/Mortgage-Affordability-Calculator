import { handleEnterForm1 } from "./form";
import getStatesInRange from "./visualization";

const dti20 = document.getElementById("user-20%-DTI");
const dti40 = document.getElementById("user-40%-DTI");
const prompt2 = document.getElementById("user-prompt2");

export default function calculateDTIRange(){
    const mainParagraph = document.getElementById("main-paragraph");
    const prompt1 = document.getElementById("user-prompt1");
    const form = document.querySelector("form");
    const formNote = document.getElementById("form-note");
    const results = document.getElementById("results-paragraph");
    const removeVisible2 = [mainParagraph, form];
    const addHidden = [mainParagraph, prompt1, form, formNote];
    const showElements = [prompt2, results, dti20, dti40];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        removeVisible2.forEach(element => {
            element.classList.remove("visible2");
        });
        addHidden.forEach(element => {
            element.classList.add("hidden");
        });
        showElements.forEach(element => {
            element.classList.remove("hidden");
            element.classList.add("visible1")
        });
        prompt1.classList.remove("visible3");

        document.removeEventListener("keydown", handleEnterForm1);
        // Save user input values to variables
        const income = document.getElementById("income").value;
        const creditScore = document.querySelector('input[name="creditscore"]:checked').value;
        const debt = document.getElementById("debt").value;
        const downPayment = parseInt(document.getElementById("downpayment").value);

        getMortgageRate().then(mortgageRate => {
            calculateMortgageAmounts(mortgageRate, income, creditScore, debt, downPayment)
          })
        .catch((error) => {
          console.error(error);
        });
    });
}

async function getMortgageRate() {
    const seriesId = "MORTGAGE30US";
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`;
    const proxyUrl = `https://cor-proxy.onrender.com/?url=${encodeURIComponent(url)}`;
    try {
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const latestValue = data.observations[0].value;
      const resultElement = document.getElementById("mortgage-rate");
      resultElement.innerHTML = `The current average mortgage rate is ${latestValue}%`;
      return latestValue;
    } catch (error) {
      console.error(error);
    }
  };

function calculateMortgageAmounts(mortgageRate, income, creditScore, debt, downPayment) {
  const reset_button = document.getElementById("reset-button");
  const monthlyIncome = income / 12;
  const monthlyAmount20 = monthlyIncome * (0.2 - (debt / monthlyIncome));
  const yearlyAmount20 = monthlyAmount20 * 12;
  const monthlyAmount40 = monthlyIncome * (0.4 - (debt / monthlyIncome));
  const yearlyAmount40 = monthlyAmount40 * 12;
  let userMortgageRate = mortgageRate;
  if (creditScore === "excellent") {
    userMortgageRate = parseFloat(mortgageRate) - 0.5;
  } else if (creditScore === "good") {
    userMortgageRate = parseFloat(mortgageRate) - 0.25;
  } else if (creditScore === "average") {
    userMortgageRate = parseFloat(mortgageRate);
  } else if (creditScore === "poor") {
    userMortgageRate = parseFloat(mortgageRate) + 0.25;
  }
  const dti20Result = Math.floor(yearlyAmount20 * 30 * (50 - userMortgageRate) / 100) + downPayment;
  dti20.innerHTML = `The affordable mortgage amount at 20% DTI at rate of ${userMortgageRate}% is <br> $${dti20Result.toLocaleString()}.00`;
  const dti40Result = Math.floor(yearlyAmount40 * 30 * (50 - userMortgageRate) / 100) + downPayment;
  dti40.innerHTML = `The affordable mortgage amount at 40% DTI at rate of ${userMortgageRate}% is <br> $${dti40Result.toLocaleString()}.00`;
  document.addEventListener("keydown", handleEnterForm2);
  function handleEnterForm2(event) {
      if (event.code === "Enter") {
        getStatesInRange(dti20Result, dti40Result);
        document.removeEventListener("keydown", handleEnterForm2);
        prompt2.classList.add("hidden");
        prompt2.classList.remove("visible1");
        reset_button.classList.add("visible3");
        reset_button.classList.remove("hidden");
        reset_button.addEventListener('click', () => {
          location.reload(); // Trigger page refresh
        });
      }
  }
}
