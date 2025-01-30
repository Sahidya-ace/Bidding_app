document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadTopBidders();
});

function addProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let imageUrl = document.getElementById("productImage").value;

    if (!name || !price || !imageUrl) {
        alert("Please enter all product details.");
        return;
    }

    let product = { name, price, imageUrl, bids: [] };
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";

    loadProducts();
}

function loadProducts() {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";

    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    products.forEach((product, index) => {
        let productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <img src="${product.imageUrl}" alt="${product.name}">
            <button onclick="openBidForm(${index})">Bid</button>
        `;
        productList.appendChild(productDiv);
    });
}

function openBidForm(productIndex) {
    let name = prompt("Enter your name:");
    let bidAmount = prompt("Enter your bid amount:");

    if (!name || !bidAmount || isNaN(bidAmount)) {
        alert("Invalid bid details!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products[productIndex];

    product.bids.push({ name, bidAmount: parseInt(bidAmount) });

    localStorage.setItem("products", JSON.stringify(products));
    updateTopBidders();
}

function updateTopBidders() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let allBids = [];

    products.forEach(product => {
        product.bids.forEach(bid => {
            allBids.push(bid);
        });
    });

    allBids.sort((a, b) => b.bidAmount - a.bidAmount);

    localStorage.setItem("topBidders", JSON.stringify(allBids));
    loadTopBidders();
}

function loadTopBidders() {
    let topBiddersDiv = document.getElementById("topBidders");
    topBiddersDiv.innerHTML = "";

    let topBidders = JSON.parse(localStorage.getItem("topBidders")) || [];

    topBidders.forEach((bid, index) => {
        let bidDiv = document.createElement("div");
        bidDiv.className = "product";
        bidDiv.innerHTML = `<p><strong>${bid.name}</strong>: ₹${bid.bidAmount}</p>`;
        topBiddersDiv.appendChild(bidDiv);
    });
}

// Save Data (Already auto-saves but extra option)
function saveData() {
    alert("Your auction data is saved successfully!");
}

// Reset Everything (Clears products & bids)
function resetData() {
    if (confirm("Are you sure you want to reset everything?")) {
        localStorage.removeItem("products");
        localStorage.removeItem("topBidders");
        loadProducts();
        loadTopBidders();
        alert("Auction data has been reset!");
    }
}
