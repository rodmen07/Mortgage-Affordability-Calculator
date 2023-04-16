Background
==========

This project is an interactive demo for a home affordability calculator.
It is currently hosted on GitHub pages here: https://rodmen07.github.io/JavaScript-Project/

On the initial landing page, the user would select the different categories for their income (average of last 3-5 years), credit score range, monthly debts/obligations, and down payment available. The page would then display the different amounts that a prospective borrower would qualify for at various (Debt to Income) DTI categories, and then show which states in the US have average home prices within the borrower's affordability range.

**Functionality**
========================

In the home affordability calculator, users will be able to:

-   Complete a borrower profile by entering relevant financial information
-   View their affordability range based on the provided information.
-   View a list of US states with average home prices within the borrower's affordability range
-   View the average home price for a state within the generated list.
-   { Bonus *feature* } Adjust results based on Cost of Living adjustments.
-   { Bonus *feature* } Expand search to include major US cities.

In addition, this project will include:

-   README
    -   To-Do List
    -   Planned Future Developments

**Technologies, Libraries, APIs**
=================================

I reference Nerd Wallet's mortgage calculator for affordability formula:

[](https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford)<https://www.nerdwallet.com/mortgages/how-much-house-can-i-afford>

I source the data to find US states with average housing prices within the given range as well as average mortgage rates by using the FRED API from the Federal Reserve Bank of St. Louis:

[](https://fred.stlouisfed.org/docs/api/fred/)<https://fred.stlouisfed.org/docs/api/fred/>

Finally, I utilize the D3 library and HTML/CSS stylings to generate the visualizations.

[](https://d3js.org/)<https://d3js.org/>

**Technical Implementation**
==============
-   First feature: Generating the user's affordadablity range based on user provided data.
    -   The formula for calculating a user's affordability range is found by calculating the lower and upper threshold based on DTI:
    ```js
    // The following code calculates the user's 20% and 40% DTI once the user submits the form data.
    const submitBtn = document.getElementById("submit-btn");
    const dti20 = document.getElementById("user-20%-DTI");
    const dti40 = document.getElementById("user-40%-DTI");
    const seriesId = "MORTGAGE30US";
    const mainParagraph = document.getElementById("main-paragraph");
    const prompt1 = document.getElementById("user-prompt1");
    const prompt2 = document.getElementById("user-prompt2");
    const form = document.getElementsByTagName("form");
    const results = document.getElementById("results-paragraph");

    submitBtn.addEventListener("click", (event) => {
        // Formatting code here
        // Save user input values to variables
        const income = document.getElementById("income").value;
        const creditScore = document.querySelector('input[name="creditscore"]:checked').value;
        const debt = document.getElementById("debt").value;
        const downPayment = parseInt(document.getElementById("downpayment").value);

        async function getMortgageRate() {
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
            dti20.innerHTML = `The affordable mortgage amount at 20% DTI at rate of ${userMortgageRate}% is <br> $${dti20Result}.00`;
            const dti40Result = Math.floor(yearlyAmount40 * 30 * (50 - userMortgageRate) / 100) + downPayment;
            dti40.innerHTML = `The affordable mortgage amount at 40% DTI at rate of ${userMortgageRate}% is <br> $${dti40Result}.00`;
            document.addEventListener("keydown", () => {
                getStatesInRange(dti20Result, dti40Result);
            });
        })
        .catch((error) => {
            console.error(error);
        });
    });
    ```
-   Second feature: Generating a visualization of US states with median home prices within user's affordability range.
    -   ```js
        // The following code sends a request to the FRED API to find states with median home prices within the user's affordable mortgage range.
        // Reference arrays for state abbreviations and names included here.
        async function getStatesInRange(minPrice, maxPrice) {
            try {
                const promises = stateAbbreviations.map(async (state, index) => {
                const seriesId = `MEDLISPRI${state}`;
                const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`;
                const proxyUrl = `https://cor-proxy.onrender.com/?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl, {mode: 'cors'});
                const data = await response.json();
                const lastObservation = data.observations[data.observations.length - 1];
                const price = parseFloat(lastObservation.value);
                if (price >= minPrice && price <= maxPrice) {
                    const affordableState = {
                    abbreviation: state,
                    name: stateNames[index],
                    medianHomePrice: price
                    };
                    return affordableState;
                }
                });
                const affordableStates = await Promise.all(promises);
                const filteredAffordableStates = affordableStates.filter(affordableState => affordableState != undefined);
                const chart = BarChart(filteredAffordableStates, {
                x: d => d.abbreviation,
                y: d => d.medianHomePrice,
                xDomain: d3.groupSort(filteredAffordableStates, ([d]) => -d.medianHomePrice, d => d.abbreviation), // sort by descending medianHomePrice
                yFormat: "$.1s", // display y-axis values in thousands (e.g. 350000 as 350k)
                yLabel: "↑ Median Home Price",
                width : 960,
                height: 500,
                color: "steelblue"
                });
                const div = document.getElementById("div");
                const chartTitle = document.getElementById("chart-title");
                div.appendChild(chart);
                chartTitle.classList.add("visible2");
                chartTitle.classList.remove("hidden");
                div.classList.add("visible2");
                div.classList.remove("hidden");
            } catch (error) {
                console.error(error);
            }
        }
        ```


**FUTURE IMPLEMENTATION/TO-DOs**
=============
-   Implement mapping in visualization.
-   { Bonus *feature* } Adjust results based on Cost of Living adjustments.
-   { Bonus *feature* } Expand search to include major US cities.
-   [Bug/FIXED] Enter button generates additional visualizations of states within affordability range, creates additional fetch requests each time.
-   [Bug/FIXED] Submit button preventDefault() causes validations to overriden. Form is submittable with "enter" key within fields, bypassing required fields.

**Live Project**
----------------

-   [X] Includes links to your portfolio website, Github, and LinkedIn.
-   [X] Landing page/modal with obvious, clear instructions.
-   [X] Interactivity of some kind.
-   [X] Well styled, clean frontend.
-   [N/A] If it has music, the option to mute or stop it.

**Production README**
---------------------

-   [X] Link to live version.
-   [X] Instructions on how to play/interact with the project.
-   [X] List of technologies / libraries / APIs used.
-   [ ] Technical implementation details with (good-looking) code snippets.
-   [X] To-dos / future features.
-   [X] No **.DS_Store** files / debuggers / console.logs.
-   [*] Organized file structure, with **/src** and **/dist** directories. (Refactor for modularization, readability in progress)
