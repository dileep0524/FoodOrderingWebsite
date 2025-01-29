document.addEventListener("DOMContentLoaded", () => {
    updateCart();
    updateCartCount();
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    document.getElementById("cartCount").textContent = totalCount;
}

function updateCart(itemName, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    
    if (quantity > 0) {
        cart[itemName] = quantity;
    } else {
        delete cart[itemName];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(itemName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[itemName] = (cart[itemName] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCart();
    updateCartCount();
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let cartItemsList = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItemsList) return;

    cartItemsList.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach((item) => {
        let li = document.createElement("li");
        let price = getPrice(item);
        let quantity = cart[item];

        li.textContent = `${item} x ${quantity} - ₹${price * quantity}`;
        cartItemsList.appendChild(li);

        total += price * quantity;
    });

    if (cartTotal) cartTotal.textContent = total;
}

function getPrice(item) {
    const prices = {
        "Burger": 120,
        "Pizza": 250,
        "Sushi": 250,
        "Biryani": 250,
        "Dosa": 100,
        "Idly": 50,
        "Fried Chicken": 180,
        "Noodles": 150,
        "Pasta": 170
    };
    return prices[item] || 0;
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
    updateCartCount();
}

function checkout() {
    alert("Order placed successfully!");
    clearCart();
}
