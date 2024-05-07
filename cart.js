
// cart.js
let cartItems = [];

function addToCart(product) {
  const item = cartItems.find(item => item.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  let total = 0;

  cartItems.forEach(item => {
    const { id, name, price, quantity } = item;
    const itemTotal = price * quantity;
    total += itemTotal;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <img src="./assets/images/product-${id}.jpg" alt="${name}">
      <div class="item-info">
        <h4>${name}</h4>
        <p>Prix : ${price.toFixed(2)} €</p>
        <p>Quantité : <input type="number" value="${quantity}" min="1" onchange="updateQuantity(${id}, this.value)"></p>
        <p>Sous-total : ${itemTotal.toFixed(2)} €</p>
        <button onclick="removeFromCart(${id})">Supprimer</button>
      </div>
    `;

    cartItemsElement.appendChild(cartItemElement);
  });

  const totalElement = document.getElementById('cart-total');
  totalElement.textContent = `Total : ${total.toFixed(2)} €`;
}

function updateQuantity(productId, newQuantity) {
  const item = cartItems.find(item => item.id === productId);
  if (item) {
    item.quantity = parseInt(newQuantity);
    updateCart();
  }
}

