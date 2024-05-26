document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            // console.log(countries);
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const displayCountries = (countries) => {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryElement = document.createElement('div');
            countryElement.classList.add('country');
            console.log(country);
            countryElement.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
                <div class="country-info">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
            `;
            countryElement.addEventListener('click', () => {
                window.location.href = `detailPage.html?country=${country.cca3}`; //
            });
            countriesContainer.appendChild(countryElement);
        });
    };

    const filterCountries = async () => {
        let query = 'https://restcountries.com/v3.1/all';
        // console.log(`query/region/europe`);
        const region = regionFilter.value;
        if (region) {
            query = `https://restcountries.com/v3.1/region/${region}`;
        }
        try {
            const response = await fetch(query);
            const countries = await response.json();
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCountries = countries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm)
            );
            displayCountries(filteredCountries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const toggleDarkMode = () => {
        body.classList.toggle('light-mode');
        const elementsToToggle = document.querySelectorAll('header, #takeBack-button, #region-filter, .country, .border-button');
        elementsToToggle.forEach(element => element.classList.toggle('light-mode'));
    };

    darkModeToggle.addEventListener('change', toggleDarkMode);

    searchInput.addEventListener('input', filterCountries);
    regionFilter.addEventListener('change', filterCountries);

    fetchCountries();
});
