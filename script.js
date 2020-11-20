const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function complete() {
    quoteContainer.hidden=false;
    loader.hidden = true;
}  
function newQuote() {
    loading();
const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
if(quote.text.length>120) {
    quoteText.classList.add('long-quote');
}else {
    quoteText.classList.remove('long-quote');
}
quoteText.textContent = quote.text; 
complete(); 
}
//Get Quote From API
async function getQuotes() {
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    }catch(error){
       
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
// on load
getQuotes();