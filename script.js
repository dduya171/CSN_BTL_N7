var cart = [];

// Get all "add to cart" buttons
var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Add click event listeners to each "add to cart" button
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', addToCartClicked);
});

// Function to handle "add to cart" button click events
function addToCartClicked(event) {
    var button = event.target;
    var item = button.dataset.item;
    addItemToCart(item);
    animateCart();
}

// Function to add an item to the cart
function addItemToCart(item) {
    for (var i in cart) {
        if (cart[i].item === item) {
            cart[i].quantity++;
            showCart();
            return;
        }
    }
    var newItem = { item: item, quantity: 1 };
    cart.push(newItem);
    showCart();
}

// Function to remove an item from the cart
function removeItemFromCart(item) {
    for (var i in cart) {
        if (cart[i].item === item) {
            cart[i].quantity--;
            if (cart[i].quantity === 0) {
                cart.splice(i, 1);
            }
            showCart();
            return;
        }
    }
}

// Function to display the cart on the web page
function showCart() {
    var cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    var total = 0;
    for (var i in cart) {
        var item = cart[i];
        var itemTotal = item.quantity;
        total += itemTotal;
        cartDiv.innerHTML += '<div class="cart-item"><div class="cart-item-image"><img src="image/' + item.item + '.png"></div><div class="cart-item-details"><p>' + item.item + '</p><p>Quantity: ' + item.quantity + '</p><button class="remove-item" data-item="' + item.item + '">Remove</button></div></div>';
    }
    cartDiv.innerHTML += '<div class="cart-total">Total: ' + total + '</div>';
    var removeItemButtons = document.querySelectorAll('.remove-item');
    removeItemButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var item = event.target.dataset.item;
            removeItemFromCart(item);
            animateCart();
        });
    });
}

// Function to animate the cart icon
function animateCart() {
    var cartIcon = document.getElementById('cart-icon');
    cartIcon.classList.add('animate');
    setTimeout(function() {
        cartIcon.classList.remove('animate');
    }, 1000);
}

// Show the cart when the page loads
showCart();