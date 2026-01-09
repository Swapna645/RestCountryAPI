const detailsDiv = document.getElementById("details");
const country = JSON.parse(localStorage.getItem("countryDetails"));

detailsDiv.innerHTML = `
    <img src="${country.flag}">
    <h2>${country.name}</h2>
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Currency:</b> ${country.currency}</p>
    <button onclick="window.history.back()">Go Back</button>
`;
