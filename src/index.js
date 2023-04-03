// The following code will fade in the header element on start.
document.addEventListener("DOMContentLoaded", function() {
  const header = document.getElementsByTagName("header");
  header[0].classList.remove("hidden");
  header[0].classList.add("visible1");
});

// The following code will fade in the main paragraph element on start with a delay.
document.addEventListener("DOMContentLoaded", function() {
  const paragraph = document.getElementById("main-paragraph");
  paragraph.classList.remove("hidden");
  paragraph.classList.add("visible2");
});
document.addEventListener("DOMContentLoaded", function() {
  const paragraph = document.getElementById("user-prompt1");
  paragraph.classList.remove("hidden");
  paragraph.classList.add("visible3");
});

// The following code creates an event listener for enter to transition the form element onto the page.
function handleEnterForm1(event) {
  if (event.code === "Enter") {
    const form = document.getElementsByTagName("form");
    form[0].classList.add("visible2");
    form[0].classList.remove("hidden");
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("keydown", handleEnterForm1);
});

// The following code calculates the user's 20% and 40% DTI once the user submits the form data.
document.addEventListener("DOMContentLoaded", () => {
  console.log("A proxy is used to bypass CORS restrictions. The proxy is https://cors-anywhere.herokuapp.com/");
  const submitBtn = document.getElementById("submit-btn");
  const dti20 = document.getElementById("user-20%-DTI");
  const dti40 = document.getElementById("user-40%-DTI");
  const apiKey = "cc485c86412c9dee7cd0370084ce6c59";
  const seriesId = "MORTGAGE30US";
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`;
  const mainParagraph = document.getElementById("main-paragraph");
  const prompt1 = document.getElementById("user-prompt1");
  const prompt2 = document.getElementById("user-prompt2");
  const form = document.getElementsByTagName("form");
  const results = document.getElementById("results-paragraph");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    mainParagraph.classList.remove("visible2");
    mainParagraph.classList.add("hidden");
    prompt1.classList.add("hidden");
    prompt1.classList.remove("visible3");
    prompt2.classList.remove("hidden");
    prompt2.classList.add("visible1");
    form[0].classList.add("hidden");
    form[0].classList.remove("visible2");
    results.classList.remove("hidden");
    results.classList.add("visible1");
    dti20.classList.remove("hidden");
    dti20.classList.add("visible1");
    dti40.classList.remove("hidden");
    dti40.classList.add("visible1");
    document.removeEventListener("keydown", handleEnterForm1);
    // Save user input values to variables
    const income = document.getElementById("income").value;
    const creditScore = document.querySelector('input[name="creditscore"]:checked').value;
    const debt = document.getElementById("debt").value;
    const downPayment = parseInt(document.getElementById("downpayment").value);


    function getMortgageRate() {
      return fetch(apiUrl, { mode: 'cors' })
        .then(response => {
          return response.json();
        })
        .then(data => {
          const latestValue = data.observations[0].value;
          const resultElement = document.getElementById("mortgage-rate");
          resultElement.innerHTML = `The current average mortgage rate is ${latestValue}%`;
          return latestValue;
        })
        .catch(error => {
          console.error(error);
        });
    };
    getMortgageRate().then((mortgageRate) => {
      const monthlyIncome = income / 12;
      const monthlyAmount20 = monthlyIncome * (0.2 - (debt / monthlyIncome));
      const yearlyAmount20 = monthlyAmount20 * 12;
      const monthlyAmount40 = monthlyIncome * (0.4 - (debt / monthlyIncome));
      const yearlyAmount40 = monthlyAmount40 * 12;

      let userMortgageRate = mortgageRate;
      if (creditScore === "excellent") {
        userMortgageRate = mortgageRate - 0.5;
      } else if (creditScore === "good") {
        userMortgageRate = mortgageRate - 0.25;
      } else if (creditScore === "average") {
        userMortgageRate = mortgageRate;
      } else if (creditScore === "poor") {
        userMortgageRate = mortgageRate + 0.25;
      }

      const dti20Result = Math.floor(yearlyAmount20 * 30 * (50 - userMortgageRate) / 100) + downPayment;
      dti20.innerHTML = `The affordable mortgage amount at 20% DTI is <br> $${dti20Result}.00`;
      const dti40Result = Math.floor(yearlyAmount40 * 30 * (50 - userMortgageRate) / 100) + downPayment;
      dti40.innerHTML = `The affordable mortgage amount at 40% DTI is <br> $${dti40Result}.00`;

      // The following code sends a request to the FRED API to find states with median home prices within the user's affordable mortgage range.
      function getStatesInRange(minPrice, maxPrice) {
        let seriesId = "ATNHPIUSST";
        let apiKey = "cc485c86412c9dee7cd0370084ce6c59";
        fetch(`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`)
          .then(response => response.json())
          .then(data => {
            // Filter data to get states with a median home price within the given range
            const filteredData = data.observations.filter(observation => {
              const price = Number(observation.value);
              return price >= minPrice && price <= maxPrice;
            });

            // Get unique list of states in filtered data
            const states = [...new Set(filteredData.map(observation => observation.geo_name))];

            console.log(states);
          })
          .catch(error => console.error(error));
      };

      document.addEventListener("keydown", getStatesInRange(dti20Result, dti40Result));
      }).catch((error) => {
        console.error(error);
      });
  });
});
