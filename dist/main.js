/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// The following code will fade in the header element on start.\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var header = document.getElementsByTagName(\"header\");\n  header[0].classList.remove(\"hidden\");\n  header[0].classList.add(\"visible1\");\n});\n\n// The following code will render each line of the main paragraph element on start.\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var paragraph = document.getElementById(\"main-paragraph\");\n  var lines = paragraph.innerHTML.split(\"<br>\");\n\n  // Replace the paragraph content with the first line\n  paragraph.innerHTML = lines[0];\n  lines.slice(1).forEach(function (line, index) {\n    var delay = 1000 * (index + 1);\n    if (index === lines.length - 2) {\n      // Adjust delay for last line to be proportional to its length\n      delay += 1000 * (line.length / 20);\n    }\n    setTimeout(function () {\n      paragraph.innerHTML += \"<br>\" + line;\n      paragraph.style.opacity = \"1\"; // Show the paragraph after the first line\n    }, delay);\n  });\n});\n\n// The following code creates an event listener for enter to transition the form element onto the page.\ndocument.addEventListener(\"keydown\", function (event) {\n  if (event.code === \"Enter\") {\n    var form = document.getElementsByTagName(\"form\");\n    form[0].classList.add(\"visible2\");\n    form[0].classList.remove(\"hidden\");\n  }\n});\n\n// The code below fetches data from the Federal Reserve Economic Data API and creates a bar chart using D3.js. This is a starting point for the actual visualization.\n// const apiKey = 'your_fred_api_key';\n// const minPrice = 200000;\n// const maxPrice = 300000;\n\n// fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=ATNHPIUS41860Q&api_key=${apiKey}&file_type=json&observation_start=2010-01-01&units=lin`)\n//   .then(response => response.json())\n//   .then(data => {\n//     // Process the API response data here\n//     const filteredData = data.observations.filter(obs => {\n//       const value = parseFloat(obs.value);\n//       return value >= minPrice && value <= maxPrice;\n//     });\n//     const cities = filteredData.map(obs => obs.realtime_start);\n\n//     // Create a bar chart using D3\n//     const margin = {top: 20, right: 20, bottom: 30, left: 40};\n//     const width = 960 - margin.left - margin.right;\n//     const height = 500 - margin.top - margin.bottom;\n\n//     const x = d3.scaleBand()\n//         .range([0, width])\n//         .padding(0.1);\n//     const y = d3.scaleLinear()\n//         .range([height, 0]);\n\n//     const svg = d3.select(\"body\").append(\"svg\")\n//         .attr(\"width\", width + margin.left + margin.right)\n//         .attr(\"height\", height + margin.top + margin.bottom)\n//       .append(\"g\")\n//         .attr(\"transform\", `translate(${margin.left},${margin.top})`);\n\n//     x.domain(cities);\n//     y.domain([0, d3.max(filteredData, d => parseFloat(d.value))]);\n\n//     svg.selectAll(\".bar\")\n//         .data(filteredData)\n//       .enter().append(\"rect\")\n//         .attr(\"class\", \"bar\")\n//         .attr(\"x\", d => x(d.realtime_start))\n//         .attr(\"y\", d => y(parseFloat(d.value)))\n//         .attr(\"width\", x.bandwidth())\n//         .attr(\"height\", d => height - y(parseFloat(d.value)));\n\n//     svg.append(\"g\")\n//         .attr(\"transform\", `translate(0,${height})`)\n//         .call(d3.axisBottom(x));\n\n//     svg.append(\"g\")\n//         .call(d3.axisLeft(y));\n\n//   })\n//   .catch(error => {\n//     // Handle any errors here\n//     console.error(error);\n//   });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoZWFkZXIiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcmFncmFwaCIsImdldEVsZW1lbnRCeUlkIiwibGluZXMiLCJpbm5lckhUTUwiLCJzcGxpdCIsInNsaWNlIiwiZm9yRWFjaCIsImxpbmUiLCJpbmRleCIsImRlbGF5IiwibGVuZ3RoIiwic2V0VGltZW91dCIsInN0eWxlIiwib3BhY2l0eSIsImV2ZW50IiwiY29kZSIsImZvcm0iXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHQtMS1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgZmFkZSBpbiB0aGUgaGVhZGVyIGVsZW1lbnQgb24gc3RhcnQuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpO1xyXG4gICAgaGVhZGVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBoZWFkZXJbMF0uY2xhc3NMaXN0LmFkZChcInZpc2libGUxXCIpO1xyXG4gIH0pO1xyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgcmVuZGVyIGVhY2ggbGluZSBvZiB0aGUgbWFpbiBwYXJhZ3JhcGggZWxlbWVudCBvbiBzdGFydC5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGFyYWdyYXBoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLXBhcmFncmFwaFwiKTtcclxuICAgIHZhciBsaW5lcyA9IHBhcmFncmFwaC5pbm5lckhUTUwuc3BsaXQoXCI8YnI+XCIpO1xyXG5cclxuICAgIC8vIFJlcGxhY2UgdGhlIHBhcmFncmFwaCBjb250ZW50IHdpdGggdGhlIGZpcnN0IGxpbmVcclxuICAgIHBhcmFncmFwaC5pbm5lckhUTUwgPSBsaW5lc1swXTtcclxuXHJcbiAgICBsaW5lcy5zbGljZSgxKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUsIGluZGV4KSB7XHJcbiAgICAgIHZhciBkZWxheSA9IDEwMDAgKiAoaW5kZXggKyAxKTtcclxuICAgICAgaWYgKGluZGV4ID09PSBsaW5lcy5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgLy8gQWRqdXN0IGRlbGF5IGZvciBsYXN0IGxpbmUgdG8gYmUgcHJvcG9ydGlvbmFsIHRvIGl0cyBsZW5ndGhcclxuICAgICAgICBkZWxheSArPSAxMDAwICogKGxpbmUubGVuZ3RoIC8gMjApO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFyYWdyYXBoLmlubmVySFRNTCArPSBcIjxicj5cIiArIGxpbmU7XHJcbiAgICAgICAgcGFyYWdyYXBoLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjsgLy8gU2hvdyB0aGUgcGFyYWdyYXBoIGFmdGVyIHRoZSBmaXJzdCBsaW5lXHJcbiAgICAgIH0sIGRlbGF5KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBjb2RlIGNyZWF0ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGVudGVyIHRvIHRyYW5zaXRpb24gdGhlIGZvcm0gZWxlbWVudCBvbnRvIHRoZSBwYWdlLlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9ybVwiKTtcclxuICAgICAgZm9ybVswXS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZTJcIik7XHJcbiAgICAgIGZvcm1bMF0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbi8vIFRoZSBjb2RlIGJlbG93IGZldGNoZXMgZGF0YSBmcm9tIHRoZSBGZWRlcmFsIFJlc2VydmUgRWNvbm9taWMgRGF0YSBBUEkgYW5kIGNyZWF0ZXMgYSBiYXIgY2hhcnQgdXNpbmcgRDMuanMuIFRoaXMgaXMgYSBzdGFydGluZyBwb2ludCBmb3IgdGhlIGFjdHVhbCB2aXN1YWxpemF0aW9uLlxyXG4vLyBjb25zdCBhcGlLZXkgPSAneW91cl9mcmVkX2FwaV9rZXknO1xyXG4vLyBjb25zdCBtaW5QcmljZSA9IDIwMDAwMDtcclxuLy8gY29uc3QgbWF4UHJpY2UgPSAzMDAwMDA7XHJcblxyXG4vLyBmZXRjaChgaHR0cHM6Ly9hcGkuc3Rsb3Vpc2ZlZC5vcmcvZnJlZC9zZXJpZXMvb2JzZXJ2YXRpb25zP3Nlcmllc19pZD1BVE5IUElVUzQxODYwUSZhcGlfa2V5PSR7YXBpS2V5fSZmaWxlX3R5cGU9anNvbiZvYnNlcnZhdGlvbl9zdGFydD0yMDEwLTAxLTAxJnVuaXRzPWxpbmApXHJcbi8vICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgIC50aGVuKGRhdGEgPT4ge1xyXG4vLyAgICAgLy8gUHJvY2VzcyB0aGUgQVBJIHJlc3BvbnNlIGRhdGEgaGVyZVxyXG4vLyAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5vYnNlcnZhdGlvbnMuZmlsdGVyKG9icyA9PiB7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChvYnMudmFsdWUpO1xyXG4vLyAgICAgICByZXR1cm4gdmFsdWUgPj0gbWluUHJpY2UgJiYgdmFsdWUgPD0gbWF4UHJpY2U7XHJcbi8vICAgICB9KTtcclxuLy8gICAgIGNvbnN0IGNpdGllcyA9IGZpbHRlcmVkRGF0YS5tYXAob2JzID0+IG9icy5yZWFsdGltZV9zdGFydCk7XHJcblxyXG4vLyAgICAgLy8gQ3JlYXRlIGEgYmFyIGNoYXJ0IHVzaW5nIEQzXHJcbi8vICAgICBjb25zdCBtYXJnaW4gPSB7dG9wOiAyMCwgcmlnaHQ6IDIwLCBib3R0b206IDMwLCBsZWZ0OiA0MH07XHJcbi8vICAgICBjb25zdCB3aWR0aCA9IDk2MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xyXG4vLyAgICAgY29uc3QgaGVpZ2h0ID0gNTAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XHJcblxyXG4vLyAgICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXHJcbi8vICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXHJcbi8vICAgICAgICAgLnBhZGRpbmcoMC4xKTtcclxuLy8gICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXHJcbi8vICAgICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbi8vICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJib2R5XCIpLmFwcGVuZChcInN2Z1wiKVxyXG4vLyAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuLy8gICAgICAgLmFwcGVuZChcImdcIilcclxuLy8gICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCR7bWFyZ2luLnRvcH0pYCk7XHJcblxyXG4vLyAgICAgeC5kb21haW4oY2l0aWVzKTtcclxuLy8gICAgIHkuZG9tYWluKFswLCBkMy5tYXgoZmlsdGVyZWREYXRhLCBkID0+IHBhcnNlRmxvYXQoZC52YWx1ZSkpXSk7XHJcblxyXG4vLyAgICAgc3ZnLnNlbGVjdEFsbChcIi5iYXJcIilcclxuLy8gICAgICAgICAuZGF0YShmaWx0ZXJlZERhdGEpXHJcbi8vICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcclxuLy8gICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYmFyXCIpXHJcbi8vICAgICAgICAgLmF0dHIoXCJ4XCIsIGQgPT4geChkLnJlYWx0aW1lX3N0YXJ0KSlcclxuLy8gICAgICAgICAuYXR0cihcInlcIiwgZCA9PiB5KHBhcnNlRmxvYXQoZC52YWx1ZSkpKVxyXG4vLyAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5iYW5kd2lkdGgoKSlcclxuLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCBkID0+IGhlaWdodCAtIHkocGFyc2VGbG9hdChkLnZhbHVlKSkpO1xyXG5cclxuLy8gICAgIHN2Zy5hcHBlbmQoXCJnXCIpXHJcbi8vICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCR7aGVpZ2h0fSlgKVxyXG4vLyAgICAgICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeCkpO1xyXG5cclxuLy8gICAgIHN2Zy5hcHBlbmQoXCJnXCIpXHJcbi8vICAgICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xyXG5cclxuLy8gICB9KVxyXG4vLyAgIC5jYXRjaChlcnJvciA9PiB7XHJcbi8vICAgICAvLyBIYW5kbGUgYW55IGVycm9ycyBoZXJlXHJcbi8vICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuLy8gICB9KTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBSUMsTUFBTSxHQUFHRixRQUFRLENBQUNHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztFQUNwREQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDRSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDcENILE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsU0FBUyxDQUFDRSxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3JDLENBQUMsQ0FBQzs7QUFFSjtBQUNBTixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBSU0sU0FBUyxHQUFHUCxRQUFRLENBQUNRLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUN6RCxJQUFJQyxLQUFLLEdBQUdGLFNBQVMsQ0FBQ0csU0FBUyxDQUFDQyxLQUFLLENBQUMsTUFBTSxDQUFDOztFQUU3QztFQUNBSixTQUFTLENBQUNHLFNBQVMsR0FBR0QsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUU5QkEsS0FBSyxDQUFDRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFTQyxJQUFJLEVBQUVDLEtBQUssRUFBRTtJQUMzQyxJQUFJQyxLQUFLLEdBQUcsSUFBSSxJQUFJRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUlBLEtBQUssS0FBS04sS0FBSyxDQUFDUSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQzlCO01BQ0FELEtBQUssSUFBSSxJQUFJLElBQUlGLElBQUksQ0FBQ0csTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNwQztJQUNBQyxVQUFVLENBQUMsWUFBVztNQUNwQlgsU0FBUyxDQUFDRyxTQUFTLElBQUksTUFBTSxHQUFHSSxJQUFJO01BQ3BDUCxTQUFTLENBQUNZLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsRUFBRUosS0FBSyxDQUFDO0VBQ1gsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVKO0FBQ0FoQixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFTb0IsS0FBSyxFQUFFO0VBQ2pELElBQUlBLEtBQUssQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtJQUMxQixJQUFJQyxJQUFJLEdBQUd2QixRQUFRLENBQUNHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztJQUNoRG9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ25CLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNqQ2lCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ25CLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUNwQztBQUNGLENBQUMsQ0FBQzs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LTEtcHJvamVjdC8uL3NyYy9pbmRleC5zY3NzPzk3NDUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;