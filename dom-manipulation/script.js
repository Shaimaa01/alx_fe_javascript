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
    displaySavedQuotes(); // Refresh quotes display
    // Update category dropdown if new category is introduced
    populateCategories();
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

// Populate Categories Dynamically:
const categoryFilter = document.getElementById("categoryFilter");
function populateCategories() {
  const categories = new Set(quotes.map((quote) => quote.category));
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
populateCategories();

//Filter Quotes Based on Selected Category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  quoteDisplay.innerHTML = ""; // Clear previous quotes

  const filteredQuotes = quotes.filter(
    (quote) => selectedCategory === "all" || quote.category === selectedCategory
  );

  filteredQuotes.forEach((quote) => {
    let all = document.createElement("div");
    let text = document.createElement("p");
    let category = document.createElement("p");

    text.textContent = `Text: ${quote.text}`;
    category.textContent = `Category: ${quote.category}`;

    all.appendChild(text);
    all.appendChild(category);
    quoteDisplay.appendChild(all);
  });
  // Save the selected filter to local storage
  localStorage.setItem("selectedCategory", selectedCategory);
}

categoryFilter.addEventListener("change", filterQuotes);

// Populate Categories and Restore Last Selected Filter:
function populateCategories() {
  const categories = new Set(
    arrayOfChoosenQuotes.map((quote) => quote.category)
  );
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from local storage
  const lastSelectedCategory = localStorage.getItem("selectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Apply the filter on page load
  }
}

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from the server periodically (every 30 seconds)
setInterval(syncWithServer, 30000); // Sync every 30 seconds

// Function to fetch quotes from the server
async function fetchServerQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const serverQuotes = await response.json();

    // Assume the server response contains relevant quote structure
    return serverQuotes.map((quote) => ({
      text: quote.body,
      category: "General", // Simulated category for mock data
    }));
  } catch (error) {
    console.error("Failed to fetch server quotes:", error);
    return []; // Return an empty array to avoid breaking the sync process
  }
}

// Function to sync local quotes with the server
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();
  const localQuotes = arrayOfChoosenQuotes || []; // Ensure localQuotes is initialized

  // Merge server quotes, giving priority to server data
  const mergedQuotes = [...serverQuotes, ...localQuotes].reduce(
    (acc, quote) => {
      const exists = acc.find((q) => q.text === quote.text);
      if (!exists) acc.push(quote); // Add only if the quote doesn't exist
      return acc;
    },
    []
  );

  // Update local storage or your application's state with merged quotes
  updateLocalQuotes(mergedQuotes);
  console.log("Quotes synced successfully:", mergedQuotes);
}

// Example function to update local storage or state
function updateLocalQuotes(quotes) {
  arrayOfChoosenQuotes = quotes; // Update the in-memory variable
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Optional: Update localStorage
}
