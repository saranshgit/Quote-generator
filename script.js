// import localQuotes from 'quotes.js';
const quoteContainer = document.getElementById('quoteContainer');
const quote_txt = document.getElementById('quote-txt');
const author = document.getElementById('author');
const twt_btn = document.getElementById('twt-btn');
const nxt_btn = document.getElementById('nxt-btn');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
let apiQuote = [];

function newQuote() {
    loading();
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]

    if (!quote.author) {
        author.textContent = 'Unknown';
    }
    else {
        author.textContent = quote.author;
    }

    if (quote.text.length > 50) {
        quote_txt.classList.add('long-quote');
    }
    else {
        quote_txt.classList.remove('long-quote');
    }
    quote_txt.textContent = quote.text;
    complete();
}
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    }
    catch (error) {

    }
}

function twtFun() {
    const twtUrl = `https://twitter.com/intent/tweet?text=${quote_txt.textContent} - ${author.textContent}`;
    window.open(twtUrl, '_blank');
}
twt_btn.addEventListener('click', twtFun);
nxt_btn.addEventListener('click', newQuote);
getQuote();
// newQuote();
// loading();
// complete();