let quoteDisplay = document.getElementById("quoteDisplay");
let newQuote = document.getElementById("newQuote");
let newQuoteText;
let newQuoteCategory;
let arrayOfChoosenQuotes = [];
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

// Check and Load Saved Quotes from localStorage
if (localStorage.getItem("quotes")) {
  arrayOfChoosenQuotes = JSON.parse(localStorage.getItem("quotes"));
  displaySavedQuotes(); // Display saved quotes on page load
}

// show random quotes
function showRandomQuote() {
  let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
  let all = document.createElement("div");
  let text = document.createElement("p");
  let category = document.createElement("p");
  text.innerHTML = `Text: ${randomQuotes.text}`;
  category.textContent = `Category: ${randomQuotes.category}`;
  all.appendChild(text);
  all.appendChild(category);
  quoteDisplay.appendChild(all);
  // updata data in localstorage
  arrayOfChoosenQuotes.push(randomQuotes);
  addDataToLocalStorage();
}

// call showRandomQuote()
newQuote.addEventListener("click", function () {
  showRandomQuote();
});

// user add quotes
function addQuote() {
  if (newQuoteText.value !== "" && newQuoteCategory.value !== "") {
    let newQuoteObj = {
      text: newQuoteText.value,
      category: newQuoteCategory.value,
    };
    let all = document.createElement("div");
    let text = document.createElement("p");
    let category = document.createElement("p");
    text.textContent = `Text: ${newQuoteText.value}`;
    category.textContent = `Category: ${newQuoteCategory.value}`;
    all.appendChild(text);
    all.appendChild(category);
    quoteDisplay.appendChild(all);
    // updata data in localstorage
    arrayOfChoosenQuotes.push(newQuoteObj);
    addDataToLocalStorage();
    // clear input
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  }
}

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  newQuoteText = document.createElement("input");
  newQuoteText.id = "newQuoteText";
  newQuoteText.type = "text";
  newQuoteText.placeholder = "Enter a new quote";

  newQuoteCategory = document.createElement("input");
  newQuoteCategory.id = "newQuoteCategory";
  newQuoteCategory.type = "text";
  newQuoteCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(newQuoteText);
  formDiv.appendChild(newQuoteCategory);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

createAddQuoteForm();

// 2. Display Saved Quotes Function
function displaySavedQuotes() {
  arrayOfChoosenQuotes.forEach((quote) => {
    let all = document.createElement("div");
    let text = document.createElement("p");
    let category = document.createElement("p");

    text.textContent = `Text: ${quote.text}`;
    category.textContent = `Category: ${quote.category}`;

    all.appendChild(text);
    all.appendChild(category);
    quoteDisplay.appendChild(all);
  });
}

// add data to localStorage
function addDataToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(arrayOfChoosenQuotes));
}

// 1. JSON Export Functionality
document
  .getElementById("exportQuotes")
  .addEventListener("click", exportToJsonFile);

function exportToJsonFile() {
  const jsonString = JSON.stringify(arrayOfChoosenQuotes, null, 2); // Convert to formatted JSON
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json"; // File name for download
  a.click();

  URL.revokeObjectURL(url); // Clean up the URL object
}

// 2. JSON Import Functionality
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format. Please upload a valid JSON file.");
        return;
      }

      // Update the quotes array and save to localStorage
      arrayOfChoosenQuotes.push(...importedQuotes);
      addDataToLocalStorage(); // Save to localStorage

      displaySavedQuotes(); // Refresh the displayed quotes
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Error reading file: " + error.message);
    }
  };

  fileReader.readAsText(event.target.files[0]);
}
