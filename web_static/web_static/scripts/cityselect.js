console.log("JavaScript file is linked correctly!");

document.addEventListener('DOMContentLoaded', () => {
    const selectCountries = document.querySelector('#countries');
    const selectStates = document.querySelector('#states');
    const selectCities = document.querySelector('#cities');

    // Fetch and populate countries
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            // Sort countries alphabetically
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            let countryOptions = "";
            data.forEach(country => {
                countryOptions += `
                <option value="${country.cca2}">${country.name.common}</option>`;
            });
            selectCountries.innerHTML = countryOptions;
        })
        .catch(err => console.error('Error fetching countries:', err));

    // Listen for country selection
    selectCountries.addEventListener('change', () => {
        const selectedCountry = selectCountries.value; // Country code (e.g., US, IN)

        // Fetch states using a hypothetical API
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "API_KEY");

        var requestOptions = {
         method: 'GET',
         headers: headers,
         redirect: 'follow'
        };

        fetch("https://api.countrystatecity.in/v1/countries/IN/cities", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
        fetch(`http://geodb-free-service.wirefreethought.com/v1/some/geodb/states?country=${selectedCountry}`)
            .then(res => res.json())
            .then(data => {
                let stateOptions = "";
                data.forEach(state => {
                    stateOptions += `<option value="${state.code}">${state.name}</option>`;
                });
                selectStates.innerHTML = stateOptions;
            })
            .catch(err => console.error('Error fetching states:', err));
    });

    // Listen for state selection
    selectStates.addEventListener('change', () => {
        const selectedState = selectStates.value; // State code

        // Fetch cities using a hypothetical API
        fetch(`https://api.example.com/cities?state=${selectedState}`)
            .then(res => res.json())
            .then(data => {
                let cityOptions = "";
                data.forEach(city => {
                    cityOptions += `<option value="${city.id}">${city.name}</option>`;
                });
                selectCities.innerHTML = cityOptions;
            })
            .catch(err => console.error('Error fetching cities:', err));
    });
});
