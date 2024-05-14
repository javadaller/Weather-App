export function handleInputChange(event) {
    const inputValue = event.target.value;
    updateSuggestions(inputValue);
}

// Liste de villes
const cities = ['Charleroi', 'Paris', 'London', 'New York', 'Berlin', 'Madrid', 'Rome', 'Tokyo', 'Sydney', 'Moscow'];

function filterCities(inputValue) {
    return cities.filter(city => city.toLowerCase().startsWith(inputValue.toLowerCase()));
}

function updateSuggestions(inputValue) {
    const suggestions = filterCities(inputValue);
    const suggestionList = document.querySelector('#suggestionList');

    suggestionList.innerHTML = '';

    suggestions.forEach(city => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = city;
        suggestionList.appendChild(suggestionItem);
    });
}