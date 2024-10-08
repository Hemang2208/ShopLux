document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    function loadCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                total += item.price;
                cartItemsDiv.innerHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
            });
        }
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    function checkout() {
        alert("Proceeding to checkout...");
        // Here you can add further checkout functionality
    }

    loadCart();
});
