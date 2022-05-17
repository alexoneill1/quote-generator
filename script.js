const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// let apiQuotes = []; 

// show loading spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading spinner
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote() {
    showLoadingSpinner();
    // pick a random quote from array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // check if author field is blank and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length and determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    // set quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


// Get Quotes from an API
// We are going to use an Async request using try and except

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        // the following const will not be defined until we fetch (and data exists)
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open up in a new, blank window
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuotes();
// newQuote();
// loading();
