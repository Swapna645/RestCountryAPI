const container = document.getElementById("countryContainer");

// Fetch country data
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,population")
    .then(response => response.json())
    .then(data => displayCountries(data))
    .catch(error => console.log(error));

function displayCountries(countries) {
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
            <img src="${country.flags.png}" alt="Flag">
            <h3>${country.name.common}</h3>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
            
            <button>View Details</button>
        `;

        // Event handling → new page
        card.querySelector("button").addEventListener("click", () => {
            localStorage.setItem("countryDetails", JSON.stringify({
                name: country.name.common,
                capital: country.capital ? country.capital[0] : "N/A",
                population: country.population,
                currency: currency,
                flag: country.flags.png
            }));

            window.location.href = "details.html";
        });

        container.appendChild(card);
    });
}
