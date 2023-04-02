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
function handleEnterForm(event) {
    if (event.code === "Enter") {
        const form = document.getElementsByTagName("form");
        form[0].classList.add("visible2");
        form[0].classList.remove("hidden");
    }
}
document.addEventListener("keydown", handleEnterForm);

// The following code creates an event listener for the submit button to save the user input and transition the form element off the page.
document.addEventListener("DOMContentLoaded", () => {
    const prompt1 = document.getElementById("user-prompt1");
    const prompt2 = document.getElementById("user-prompt2");
    const form = document.getElementById("user-form");
    const submitBtn = document.getElementById("submit-btn");
    const results = document.getElementById("results-paragraph");
    const dti20 = document.getElementById("user-20%-DTI");
    const dti40 = document.getElementById("user-40%-DTI");


    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Save user input values to variables
        const income = document.getElementById("income").value;
        const creditScore = document.querySelector('input[name="creditscore"]:checked').value;
        const debt = document.getElementById("debt").value;
        const downPayment = document.getElementById("downpayment").value;
        const mainParagraph = document.getElementById("main-paragraph");

        mainParagraph.classList.remove("visible2");
        mainParagraph.classList.add("hidden");
        prompt1.classList.add("hidden");
        prompt1.classList.remove("visible3");
        prompt2.classList.remove("hidden");
        prompt2.classList.add("visible1");
        form.classList.add("hidden");
        form.classList.remove("visible2");
        results.classList.remove("hidden");
        results.classList.add("visible1");
        dti20.classList.remove("hidden");
        dti20.classList.add("visible1");
        dti40.classList.remove("hidden");
        dti40.classList.add("visible1");
        document.removeEventListener("keydown", handleEnterForm);
  });
});


// FRED API key
const apiKey = "cc485c86412c9dee7cd0370084ce6c59";

// FRED series ID for average 30-year fixed mortgage rate
const seriesId = "MORTGAGE30US";

// URL for FRED API endpoint
const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`;

// Function to retrieve data from FRED API and process it
async function getMortgageRate() {
  try {
    // Retrieve data from FRED API
    const response = await fetch( apiUrl, { mode: 'cors' });
    console.log(response);
    const data = await response.json();

    // Get the most recent observation value
    const latestValue = data.observations[0].value;

    // Return the latest 30-year fixed mortgage rate
    const resultElement = document.getElementById("mortgage-rate");
    resultElement.innerHTML = `The current average mortgage rate is ${latestValue}%`;
    return latestValue;
  } catch (error) {
    console.error(error);
  }
}

// Call the function and log the result to the console
getMortgageRate().then((result) => {
  console.log(`The current average 30-year fixed mortgage rate is ${result}%`);
});
