const container = document.getElementById("countryContainer");
let countriesData = [];

// Fetch country data
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,population")
    .then(response => response.json())
    .then(data => {
        countriesData = data;
        displayCountries(data);
    })
    .catch(error => console.log(error));

// Display countries
function displayCountries(countries) {
    container.innerHTML = "";

    countries.forEach(country => {

        // Extract currency safely
        let currency = "N/A";
        if (country.currencies) {
            currency = Object.values(country.currencies)
                .map(cur => cur.name)
                .join(", ");
        }

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${country.flags?.png}" alt="Flag">
            <h3>${country.name?.common}</h3>
            <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <button>View Details</button>
        `;

        // Event → open details page
        card.querySelector("button").addEventListener("click", () => {
            localStorage.setItem("countryDetails", JSON.stringify({
                name: country.name.common,
                capital: country.capital?.[0] || "N/A",
                population: country.population.toLocaleString(),
                currency: currency,
                flag: country.flags.png
            }));

            window.location.href = "details.html";
        });

        container.appendChild(card);
    });
}

// 🔍 SEARCH FUNCTION
function searchCountries() {
    const firstLetter = document.getElementById("firstLetter").value.toLowerCase();
    const capitalInput = document.getElementById("capitalSearch").value.toLowerCase();
    const populationInput = document.getElementById("populationSearch").value;

    const filteredCountries = countriesData.filter(country => {
        const name = country.name?.common?.toLowerCase() || "";
        const capital = country.capital?.[0]?.toLowerCase() || "";
        const population = country.population || 0;

        return (
            (firstLetter === "" || name.startsWith(firstLetter)) &&
            (capitalInput === "" || capital.includes(capitalInput)) &&
            (populationInput === "" || population <= Number(populationInput))
        );
    });

    displayCountries(filteredCountries);
}
