import { renderHeader } from "./scripts/header.js";
import { handleEnterForm1 } from "./scripts/form.js";
import * as d3 from "d3";

// The following code will fade in the header element on start.
renderHeader();

// The following code creates an event listener for enter to transition the form element onto the page.
document.addEventListener("keydown", handleEnterForm1);

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

    // http://localhost:5000/mortgagerate?series_id=${seriesId}
    //`https://cor-proxy.onrender.com/?url=https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json`, { mode: 'cors' }
  //  function getMortgageRate() {
    // This makes the local version work:
    // return fetch(`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`)
    //     .then(response => response.json())
    //     .then(data => {
    //       const latestValue = data.observations[0].value;
    //       const resultElement = document.getElementById("mortgage-rate");
    //       resultElement.innerHTML = `The current average mortgage rate is ${latestValue}%`;
    //       return latestValue;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // };

    // https://cor-proxy.onrender.com/?url=${encodeURIComponent(url)}
  // This is the render version:
  //   const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`;
  //   const proxyUrl = `http://localhost:5000/?url=${encodeURIComponent(url)}`;
  //   return fetch(proxyUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       const latestValue = data.observations[0].value;
  //       const resultElement = document.getElementById("mortgage-rate");
  //       resultElement.innerHTML = `The current average mortgage rate is ${latestValue}%`;
  //       return latestValue;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
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
    }).catch((error) => {
      console.error(error);
  });
});

// The following code sends a request to the FRED API to find states with median home prices within the user's affordable mortgage range.
const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
const stateNames = ["Alabama",  "Alaska",  "Arizona",  "Arkansas",  "California",  "Colorado",  "Connecticut",  "Delaware",  "Florida",  "Georgia",  "Hawaii",  "Idaho",  "Illinois",  "Indiana",  "Iowa",  "Kansas",  "Kentucky",  "Louisiana",  "Maine",  "Maryland",  "Massachusetts",  "Michigan",  "Minnesota",  "Mississippi",  "Missouri",  "Montana",  "Nebraska",  "Nevada",  "New Hampshire",  "New Jersey",  "New Mexico",  "New York",  "North Carolina",  "North Dakota",  "Ohio",  "Oklahoma",  "Oregon",  "Pennsylvania",  "Rhode Island",  "South Carolina",  "South Dakota",  "Tennessee",  "Texas",  "Utah",  "Vermont",  "Virginia",  "Washington",  "West Virginia",  "Wisconsin",  "Wyoming"];

async function getStatesInRange(minPrice, maxPrice) {
  try {
    const promises = stateAbbreviations.map(async (state, index) => {
      const seriesId = `MEDLISPRI${state}`;
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`;
      const proxyUrl = `https://cor-proxy.onrender.com/?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl, {mode: 'cors'});
      // `https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=cc485c86412c9dee7cd0370084ce6c59&file_type=json`
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




  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/sortable-bar-chart
  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/bar-chart
  function BarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // bar fill color
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = i => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const bar = svg.append("g")
        .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth());

    if (title) bar.append("title")
        .text(title);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    return svg.node();
  }
