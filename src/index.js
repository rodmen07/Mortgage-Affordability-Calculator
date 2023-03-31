// The following code will fade in the header element on start.
document.addEventListener("DOMContentLoaded", function() {
    var header = document.getElementsByTagName("header");
    header[0].classList.remove("hidden");
    header[0].classList.add("visible1");
  });

// The following code will render each line of the main paragraph element on start.
document.addEventListener("DOMContentLoaded", function() {
    var paragraph = document.getElementById("main-paragraph");
    var lines = paragraph.innerHTML.split("<br>");

    // Replace the paragraph content with the first line
    paragraph.innerHTML = lines[0];

    lines.slice(1).forEach(function(line, index) {
      var delay = 1000 * (index + 1);
      if (index === lines.length - 2) {
        // Adjust delay for last line to be proportional to its length
        delay += 1000 * (line.length / 20);
      }
      setTimeout(function() {
        paragraph.innerHTML += "<br>" + line;
        paragraph.style.opacity = "1"; // Show the paragraph after the first line
      }, delay);
    });
  });

// The following code creates an event listener for enter to transition the form element onto the page.
document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
      var form = document.getElementsByTagName("form");
      form[0].classList.add("visible2");
      form[0].classList.remove("hidden");
    }
  });

// The code below fetches data from the Federal Reserve Economic Data API and creates a bar chart using D3.js. This is a starting point for the actual visualization.
// const apiKey = 'your_fred_api_key';
// const minPrice = 200000;
// const maxPrice = 300000;

// fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=ATNHPIUS41860Q&api_key=${apiKey}&file_type=json&observation_start=2010-01-01&units=lin`)
//   .then(response => response.json())
//   .then(data => {
//     // Process the API response data here
//     const filteredData = data.observations.filter(obs => {
//       const value = parseFloat(obs.value);
//       return value >= minPrice && value <= maxPrice;
//     });
//     const cities = filteredData.map(obs => obs.realtime_start);

//     // Create a bar chart using D3
//     const margin = {top: 20, right: 20, bottom: 30, left: 40};
//     const width = 960 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     const x = d3.scaleBand()
//         .range([0, width])
//         .padding(0.1);
//     const y = d3.scaleLinear()
//         .range([height, 0]);

//     const svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//     x.domain(cities);
//     y.domain([0, d3.max(filteredData, d => parseFloat(d.value))]);

//     svg.selectAll(".bar")
//         .data(filteredData)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", d => x(d.realtime_start))
//         .attr("y", d => y(parseFloat(d.value)))
//         .attr("width", x.bandwidth())
//         .attr("height", d => height - y(parseFloat(d.value)));

//     svg.append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x));

//     svg.append("g")
//         .call(d3.axisLeft(y));

//   })
//   .catch(error => {
//     // Handle any errors here
//     console.error(error);
//   });
