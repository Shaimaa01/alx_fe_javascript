let quoteDisplay = document.getElementById("quoteDisplay");
let newQuote = document.getElementById("newQuote");
let newQuoteText = document.getElementById("newQuoteText");
let newQuoteCategory = document.getElementById("newQuoteCategory");

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    category: "Inspiration",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    category: "Success",
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    category: "Happiness",
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    category: "Mindfulness",
  },
  {
    text: "Be like water, my friend.",
    category: "Bruce Lee",
  },
  {
    text: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
    category: "Bruce Lee",
  },
  {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    category: "Albert Einstein",
  },
  {
    text: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
    category: "Albert Einstein",
  },
  {
    text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    category: "Albert Einstein",
  },
  {
    text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    category: "Bruce Lee",
  },
  {
    text: "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
    category: "Bill Gates",
  },
  {
    text: "Your time is limited, so don’t waste it living someone else’s life.",
    category: "Steve Jobs",
  },
  {
    text: "Try not to become a man of success, but rather try to become a man of value.",
    category: "Albert Einstein",
  },
  {
    text: "Don’t fear failure. Not failure, but low aim, is the crime. In great attempts, it is glorious even to fail.",
    category: "Bruce Lee",
  },
];

// show random quotes
function showRandomQuote() {
  let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
  let text = document.createElement("p");
  let category = document.createElement("p");
  text.innerHTML = `Text: ${randomQuotes.text}`;
  category.textContent = `Category: ${randomQuotes.category}`;
  quoteDisplay.appendChild(category);
  quoteDisplay.appendChild(text);
}

// call showRandomQuote()
newQuote.onclick = function () {
  showRandomQuote();
};

// user add quotes
function addQuote() {
  if (newQuoteText.value !== "" && newQuoteCategory.value !== "") {
    let text = document.createElement("p");
    let category = document.createElement("p");
    text.textContent = `Text: ${newQuoteText.value}`;
    category.textContent = `Category: ${newQuoteCategory.value}`;
    quoteDisplay.appendChild(category);
    quoteDisplay.appendChild(text);
    // clear input
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  }
}
