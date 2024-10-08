document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Diamond Ring", price: 499.99, img: "Index/Images/Product_Diamond_Ring.jpg" },
        { id: 2, name: "Rolex Timex Watch", price: 399.99, img: "Index/Images/Pruduct_RolexTimex_Watch.jpg" },
        { id: 3, name: "Nike Shoes", price: 199.99, img: "Index/Images/Product_Nike_Shoes.jpg" },
        { id: 4, name: "Panda Neck Chain", price: 259.99, img: "Index/Images/Product_Panda_Chain.jpg" }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    function displayProducts() {
        const productGrid = document.querySelector(".product-grid");
        productGrid.innerHTML = ""; // Clear existing products

        products.forEach(product => {
            const productDiv = document.createElement("article");
            productDiv.className = "product-item"; 
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}" height="300" width="300">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <label for="size${product.id}">Size:</label>
                <select id="size${product.id}">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                <label for="color${product.id}">Color:</label>
                <select id="color${product.id}">
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
                <button class="more-details" onclick="toggleDetails('details${product.id}')">More Details</button>
                <div class="details" id="details${product.id}" style="display:none;">
                    <p>Additional information about ${product.name}.</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productDiv);
        });
    }

    window.toggleDetails = function (detailId) {
        const details = document.getElementById(detailId);
        details.style.display = details.style.display === "block" ? "none" : "block";
    };

    window.addToCart = function (productName, productPrice) {
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} has been added to your cart for $${productPrice.toFixed(2)}`);
    };

    function updateCartCount() {
        document.getElementById('cart-count').innerText = cart.length;
    }

    document.getElementById("cart-button").addEventListener("click", loadCart);

    function loadCart() {
        const cartContainer = document.getElementById('cart-container');
        const cartItemsDiv = document.getElementById('cart-items');
        const totalElement = document.getElementById('total');
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                total += item.price;
                cartItemsDiv.innerHTML += `
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <button onclick="removeFromCart('${item.name}')" class="remove-button">Remove</button>
                    </div>`;
            });
        }
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
        cartContainer.style.display = 'block'; // Show cart container
    }

    window.removeFromCart = function (productName) {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    };

    // Initial display
    displayProducts();
});