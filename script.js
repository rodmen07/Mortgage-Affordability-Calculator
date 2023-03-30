const apiKey = 'your_fred_api_key';
const minPrice = 200000;
const maxPrice = 300000;

// fetch request to a proxy server, proxy server makes the request to the FRED API
fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=ATNHPIUS41860Q&api_key=${apiKey}&file_type=json&observation_start=2010-01-01&units=lin`)
  .then(response => response.json())
  .then(data => {
    // Process the API response data here
    const filteredData = data.observations.filter(obs => {
      const value = parseFloat(obs.value);
      return value >= minPrice && value <= maxPrice;
    });
    const cities = filteredData.map(obs => obs.realtime_start);
    console.log(cities);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });
