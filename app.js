const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const mssg = document.querySelector(".msg");
const lastUpdated = document.getElementById("last-updated");
// Update exchange rate when page loads
window.addEventListener("load", () => {
    updateExchangeRate();
});
// Add currencies to dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOptn = document.createElement("option");
        newOptn.innerText = currCode;
        newOptn.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOptn.selected = true;
        }
        else if (select.name === "to" && currCode === "INR") {
            newOptn.selected = true;
        }
        select.append(newOptn);
    }
    // Update flag when currency changes
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
// Update currency flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
// Convert when button is clicked
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
// Get exchange rate from Frankfurter API
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // If amount is empty or less than 1
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let from = fromCurr.value;
    let to = toCurr.value;
    try {
        // Frankfurter API
        const URL = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Frankfurter API response:", data);
        // Get exchange rate
        let rate = data.rate;
        // Calculate converted amount
        let finalAmt = amtVal * rate;
        // Display result
        mssg.innerText =
            `${amtVal} ${from} = ${finalAmt.toFixed(2)} ${to}`;
        // Display last updated date
        if (lastUpdated) {
            lastUpdated.innerText =
                `Last updated: ${formatDate(data.date)}`;
        }
    } catch (error) {
        console.error("Exchange rate error:", error);
        mssg.innerText =
            "Unable to fetch exchange rate.";
        if (lastUpdated) {
            lastUpdated.innerText =
                "Last updated: Unable to fetch";
        }
    }
};
// Format API date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
// Dark mode
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});