import * as d3 from "d3";

// The following code sends a request to the FRED API to find states with median home prices within the user's affordable mortgage range.
const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
const stateNames = ["Alabama",  "Alaska",  "Arizona",  "Arkansas",  "California",  "Colorado",  "Connecticut",  "Delaware",  "Florida",  "Georgia",  "Hawaii",  "Idaho",  "Illinois",  "Indiana",  "Iowa",  "Kansas",  "Kentucky",  "Louisiana",  "Maine",  "Maryland",  "Massachusetts",  "Michigan",  "Minnesota",  "Mississippi",  "Missouri",  "Montana",  "Nebraska",  "Nevada",  "New Hampshire",  "New Jersey",  "New Mexico",  "New York",  "North Carolina",  "North Dakota",  "Ohio",  "Oklahoma",  "Oregon",  "Pennsylvania",  "Rhode Island",  "South Carolina",  "South Dakota",  "Tennessee",  "Texas",  "Utah",  "Vermont",  "Virginia",  "Washington",  "West Virginia",  "Wisconsin",  "Wyoming"];

export default async function getStatesInRange(minPrice, maxPrice) {
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
      width : 1200,
      height: 400,
      color: "#15761d"
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
    marginLeft = 70, // the left margin, in pixels
    width, // the outer width of the chart, in pixels
    height, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // bar fill color
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
            .attr("y", 15)
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
