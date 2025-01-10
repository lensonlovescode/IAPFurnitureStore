console.log("JavaScript file is linked correctly!");

const cartItems = document.querySelectorAll('.cart-item');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const shippingEl = document.getElementById('shipping');
const discountEl = document.getElementById('discount');
const input = document.getElementById('cardNumber');
let shippingCost = 100;
let discount = 25;

function updateTotals() {
  let subtotal = 0;
  cartItems.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').value);
    const itemTotal = price * quantity;
    item.querySelector('.item-total').textContent = `$${itemTotal.toFixed(2)}`;
    subtotal += itemTotal;
  });
  shippingEl.textContent = `$${shippingCost.toFixed(2)}`;
  discountEl.textContent = `-$${discount.toFixed(2)}`;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  const total = subtotal + shippingCost - discount;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

cartItems.forEach(item => {
  const decreaseBtn = item.querySelector('.decrease');
  const increaseBtn = item.querySelector('.increase');
  const quantityInput = item.querySelector('.quantity');

  decreaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      updateTotals();
    }
  });

  increaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateTotals();
  });

  quantityInput.addEventListener('input', () => {
    if (quantityInput.value < 1) {
      quantityInput.value = 1;
    }
    updateTotals();
  });
});

document.querySelector('#modify-shipping').addEventListener('input', (event) => {
    shippingCost = parseFloat(event.target.value) || 0;
    updateTotals();
  });
  document.querySelector('#modify-discount').addEventListener('input', (event) => {
    discount = parseFloat(event.target.value) || 0;
    updateTotals();
  });
updateTotals();


input.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  let formattedValue = '';

  // Add dashes every 4 characters
  for (let i = 0; i < value.length; i += 4) {
    formattedValue += value.slice(i, i + 4) + (i + 4 < value.length ? '-' : '');
  }

  e.target.value = formattedValue; // Update the input value
});