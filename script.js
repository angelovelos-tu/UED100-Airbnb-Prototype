const searchForm = document.getElementById('search-form');
const searchMessage = document.getElementById('search-message');

const destinationInput = document.getElementById('destination');
const guestsSelect = document.getElementById('guests');

const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

//prevent users from choosing dates in the past 
const today = new Date().toISOString().split('T')[0];
checkinInput.setAttribute('min', today);
checkoutInput.setAttribute('min', today);

//make sure the checkout date is always after the checkin date
checkinInput.addEventListener('change', function() {
    if (checkinInput.value) {
       const checkinDate = new Date(checkinInput.value);

       checkinDate.setDate(checkinDate.getDate() + 1);

       const minCheckoutDate = 
        checkinDate.toISOString().split('T')[0];

        checkoutInput.min = minCheckoutDate;
    
        if (checkoutInput.value && 
            checkoutInput.value < minCheckoutDate)
            {
            checkoutInput.value = '';
        }
    }
});

// Display a message when the search form is submitted
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const destination = destinationInput.value.trim();

    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;

    const guests = guestsSelect.value;

    const guestLabel = guests === '1' ? 'guest' : 'guests';

    searchMessage.textContent = 
    `Searching for ${guests} ${guestLabel} in ${destination} from ${checkin} to ${checkout}...`;
});


// contact form elements
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactName = document.getElementById('contact-name');
const contactEmail = contactForm.querySelector('input[type="email"]');
const contactMessage = contactForm.querySelector('textarea');

// Send users back to the search form when they select a property

const bookButtons = document.querySelectorAll('.property-card button');

bookButtons.forEach(function(button) {

    button.addEventListener('click', function() {

        const propertyName = button.dataset.property;

        searchMessage.textContent =

            `${propertyName} selected. Choose your dates and guests above.`;

        searchForm.scrollIntoView({ behavior: 'smooth' });

        destinationInput.focus();

    });

});

// Validate the contact form inputs and display a confirmation message when the form is submitted
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = contactName.value.trim();
    const email = contactEmail ? contactEmail.value.trim() : '';
    const message = contactMessage ? contactMessage.value.trim() : '';

    // make sure the user has entered a name 
    if (name === '') {
        contactStatus.textContent = 'Please enter your name.';
        contactName.focus();
        return;
    }

    //check that the email address is valid
    if (contactEmail && (email === '' || !contactEmail.checkValidity())) {
        contactStatus.textContent = 'Please enter a valid email address.';
        contactEmail.focus();
        return;
    }

    // make sure the message is not empty 
    if (contactMessage && message === '') {
        contactStatus.textContent = 'Please enter a message.';
        contactMessage.focus();
        return;
    }

    // show confirmation once all fields are valid
    contactStatus.textContent = 
    `Thank you for your message, ${name}! We will get back to you soon.`;
    
    // reset the form
    contactForm.reset();
});