const searchForm = document.getElementById('search-form');
const searchMessage = document.getElementById('search-message');

const destinationInput = document.getElementById('destination');
const guestsSelect = document.getElementById('guests');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const destination = destinationInput.value.trim();
    const guests = guestsSelect.value;

    const guestLabel = guests === '1' ? 'guest' : 'guests';

    searchMessage.textContent = 
    `Searching for ${guests} ${guestLabel} in ${destination}...`;
});