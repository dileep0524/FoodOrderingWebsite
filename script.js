// Increment Item Quantity
function increment(itemName) {
    const quantityElement = document.getElementById(itemName + "Quantity");
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;

    if (typeof Storage !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[itemName] = (cart[itemName] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Decrement Item Quantity
function decrement(itemName) {
    const quantityElement = document.getElementById(itemName + "Quantity");
    const currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 0) {
        quantityElement.textContent = currentQuantity - 1;

        if (typeof Storage !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("cart")) || {};
            if (cart[itemName] > 1) {
                cart[itemName] -= 1;
            } else {
                delete cart[itemName];
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}

// Update Quantities from Local Storage on Page Load
function updateQuantities() {
    if (typeof Storage !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        Object.keys(cart).forEach((itemName) => {
            const quantityElement = document.getElementById(itemName + "Quantity");
            if (quantityElement) {
                quantityElement.textContent = cart[itemName];
            }
        });
    }
}

updateQuantities();
