
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    // Add any future JavaScript functionality here
});


//  motorcycle tours 
const viewDetailsButtons = document.querySelectorAll('.view-details');

viewDetailsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
    button.textContent = button.textContent === 'View Details' ? 'Hide Details' : 'View Details';

    // Replace this with actual customer experience data
    if (details.style.display === 'block') {
      details.innerHTML = '<h2>Customer Experience</h2><p>The land of Monpa’s and mountains Tawang- is the blessed valley of North East. And of course, you can’t reach easily to a place where happiness is hidden in sacred spaces. Anything beautiful that the name suggests could not possible to attain so easily and only the people with a thirsty mind and adventurous zeal can attain it.</p>';
    }
  });
});




// Booking Page

// Initialize cart and form data from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const discount = 10; // Discount percentage

// Form and button elements
const findBikeBtn = document.getElementById('findBikeBtn');
const bikeList = document.getElementById('bikeList');
const cartSummary = document.getElementById('cartSummary');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutFormElement = document.getElementById('checkout');
const cartItemsDiv = document.getElementById('cartItems');

// Load form data from local storage if available
function loadFormData() {
 const formData = JSON.parse(localStorage.getItem('formData')) || {};
 document.getElementById('name').value = formData.name || '';
 document.getElementById('address').value = formData.address || '';
 document.getElementById('phone').value = formData.phone || '';
 document.getElementById('email').value = formData.email || '';
 document.getElementById('paymentMethod').value = formData.paymentMethod || '';
}

function saveFormData() {
 const formData = {
     name: document.getElementById('name').value,
     address: document.getElementById('address').value,
     phone: document.getElementById('phone').value,
     email: document.getElementById('email').value,
     paymentMethod: document.getElementById('paymentMethod').value
 };
 localStorage.setItem('formData', JSON.stringify(formData));
}

// Event Listeners
document.getElementById('city').addEventListener('change', validateForm);
document.getElementById('bookDate').addEventListener('change', validateForm);
document.getElementById('dropOffDate').addEventListener('change', validateForm);
findBikeBtn.addEventListener('click', displayBikes);
proceedToCheckoutBtn.addEventListener('click', showCheckoutForm);
checkoutFormElement.addEventListener('submit', handleCheckoutFormSubmit);

// Validate the form to enable/disable the "Find Bike" button
function validateForm() {
 const city = document.getElementById('city').value;
 const bookDate = document.getElementById('bookDate').value;
 const dropOffDate = document.getElementById('dropOffDate').value;
 findBikeBtn.disabled = !city || !bookDate || !dropOffDate;
}

// Display bikes based on collection
const bikeCollection = [
 { id: 1, name: 'Bike 1', price: 1000, img: 'img/findbikes/bike1.jpeg' },
 { id: 2, name: 'Bike 2', price: 1200, img: 'img/findbikes/bike2.jpeg' },
 { id: 3, name: 'Bike 3', price: 1500, img: 'img/findbikes/bike3.jpeg' },
 { id: 4, name: 'Bike 4', price: 1800, img: 'img/findbikes/bike4.jpeg' },
 { id: 5, name: 'Bike 5', price: 2000, img: 'img/findbikes/bike5.jpeg' },
 { id: 6, name: 'Bike 6', price: 2200, img: 'img/findbikes/bike6.jpeg' },
 { id: 7, name: 'Bike 7', price: 2500, img: 'img/findbikes/bike7.jpeg' },
 { id: 8, name: 'Bike 8', price: 2700, img: 'img/findbikes/bike8.jpeg' },
 { id: 9, name: 'Bike 9', price: 3000, img: 'img/findbikes/bike9.jpeg' },
 { id: 10, name: 'Bike 10', price: 3300, img: 'img/findbikes/bike10.jpeg' },
 { id: 11, name: 'Bike 11', price: 3500, img: 'img/findbikes/bike11.jpeg' },
 { id: 12, name: 'Bike 12', price: 4000, img: 'img/findbikes/bike12.jpeg' }
];

// Display bikes when "Find Bike" button is clicked
function displayBikes() {
 bikeList.innerHTML = '';
 bikeCollection.forEach(bike => {
     const bikeItem = document.createElement('div');
     bikeItem.classList.add('bike-item');
     bikeItem.innerHTML = `
         <img src="${bike.img}" alt="${bike.name}">
         <h3>${bike.name}</h3>
         <p>Price: ${bike.price} INR</p>
         <button class="btn btn-add-to-cart" onclick="addToCart(${bike.id})">Add to Cart</button>
     `;
     bikeList.appendChild(bikeItem);
 });
 bikeList.style.display = 'flex';
}

// Add a bike to the cart
function addToCart(bikeId) {
 const bike = bikeCollection.find(b => b.id === bikeId);
 if (bike) {
     cart.push(bike);
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartSummary();
 }
}

// Remove a bike from the cart
function removeFromCart(index) {
 cart.splice(index, 1);
 localStorage.setItem('cart', JSON.stringify(cart));
 updateCartSummary();
}

// Update the cart summary
function updateCartSummary() {
 cartItemsDiv.innerHTML = '';
 const totalAmount = cart.reduce((total, bike) => total + bike.price, 0);
 const discountAmount = (totalAmount * discount) / 100;
 const finalAmount = totalAmount - discountAmount;

 cart.forEach((bike, index) => {
     const cartItem = document.createElement('div');
     cartItem.classList.add('cart-item');
     cartItem.innerHTML = `
         <span>${bike.name} - ${bike.price} INR</span>
         <button class="btn" onclick="removeFromCart(${index})">Remove</button>
     `;
     cartItemsDiv.appendChild(cartItem);
 });

 document.getElementById('totalAmount').textContent = finalAmount;
 document.getElementById('discount').textContent = discount;
 cartSummary.style.display = 'block';
}

// Show the checkout form
function showCheckoutForm() {
 loadFormData();
 checkoutForm.style.display = 'block';
}

// Handle checkout form submission
function handleCheckoutFormSubmit(e) {
 e.preventDefault();
 
 // Check if payment method is selected
 const paymentMethod = document.getElementById('paymentMethod').value;
 if (!paymentMethod) {
     alert('Please select a payment method before proceeding.');
     return;
 }

 saveFormData(); // Save form data before submission
 const name = document.getElementById('name').value;
 const address = document.getElementById('address').value;
 const phone = document.getElementById('phone').value;
 const email = document.getElementById('email').value;
 const orderId = 'ORD-' + new Date().getTime();

 // Simulate sending order confirmation email
 sendOrderConfirmationEmail(name, email, orderId);

 // Clear local storage and cart
 //localStorage.removeItem('cart');
 //localStorage.removeItem('formData');
// cart = [];
 updateCartSummary();

 alert(`Order Confirmed! Your Order ID is ${orderId}. Payment Method: ${paymentMethod}.`);

 // Hide checkout form and cart summary
 checkoutForm.style.display = 'none';
 cartSummary.style.display = 'none';
}

// Simulate sending an order confirmation email
function sendOrderConfirmationEmail(name, email, orderId) {
 console.log(`Sending order confirmation email to ${email} with Order ID: ${orderId}`);
}

// Initialize cart summary and load form data if there's data in local storage
if (cart.length) {
 updateCartSummary();
}
loadFormData();


