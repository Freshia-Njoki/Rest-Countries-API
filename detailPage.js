document.addEventListener('DOMContentLoaded', () => {
    const countryDetail = document.getElementById('country-details');
    const backButton = document.getElementById('takeBack-button');
    const queryString = window.location.search;
    // console.log(queryString); //returns the part of the URL after ? the questionnMark
    const urlParams = new URLSearchParams(queryString);
    const countryCode = urlParams.get('country');

    const fetchCountryDetail = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const country = await response.json();
            displayCountryDetail(country[0]);
        } catch (error) {
            console.error('Error fetching country detail:', error);
        }
    };

    const displayCountryDetail = (country) => {
        // console.log(country);
        countryDetail.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div>
            <h1>${country.name.common}</h1>
            <p><strong>Native Name:</strong> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Top Level Domain:</strong> ${country.tld}</p>
            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Border Countries:</strong> ${country.borders ? country.borders.map(border => `<button class="border-button" data-code="${border}">${border}</button>`).join(' ') : 'N/A'}</p> </div>
        `;

        document.querySelectorAll('.border-button').forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = `detail.html?country=${button.dataset.code}`;
            });
        });
    };

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    fetchCountryDetail();
});
