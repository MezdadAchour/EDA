const cartIcon = document.querySelector('.cart-icon');
const cartDrawer = document.querySelector('.cart-drawer');
const closeCartBtn = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.querySelector('.cart-count');

let cart = [];
let totalPrice = 0;

// Fonction pour ajouter un élément au panier
function addToCart(item) {
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
}

// Fonction pour mettre à jour le panier
function updateCart() {
  cartItems.innerHTML = '';
  totalPrice = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemElement.appendChild(itemImage);

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('cart-item-details');

    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    itemDetails.appendChild(itemName);

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `${item.price} DA x ${item.quantity}`;
    itemDetails.appendChild(itemPrice);

    itemElement.appendChild(itemDetails);
    cartItems.appendChild(itemElement);

    totalPrice += item.price * item.quantity;
  });

  cartTotalPrice.textContent = `${totalPrice} DA`;
  cartCount.textContent = cart.length;
}

// Fonction pour ouvrir le tiroir du panier
function openCartDrawer() {
  cartDrawer.classList.add('open');
}

// Fonction pour fermer le tiroir du panier
function closeCartDrawer() {
  cartDrawer.classList.remove('open');
}

// Événements
cartIcon.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);

// Exemple d'ajout d'un élément au panier
addToCart({
  id: 1,
  name: 'EMU-pro 8',
  price: 25000,
  image: 'emu-pro-8.jpg',
});