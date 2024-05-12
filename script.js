// aparition.js
window.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".col-3");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  categories.forEach(function (category) {
    observer.observe(category);
  });
});

// toggleMenu.js
function menutoggle() {
  const menuItems = document.getElementById("menuItems");

  if (menuItems) {
    menuItems.classList.toggle("active");
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}

// panier
const cartIcon = document.querySelector(".cart-icon");
const cartDrawer = document.querySelector(".cart-drawer");

cartIcon.addEventListener("click", () => {
  cartDrawer.classList.toggle("open");
});

// Code existant pour gérer le panier
const addToCartBtn = document.getElementById("add-to-cart");
const cartItems = document.getElementById("cart-items");
const cartTableBody = document.getElementById("cart-tablebody");
const subtotalElem = document.getElementById("subtotal");
const cartCountElem = document.querySelector(".cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  renderCartItems();
  renderCartTable();
  updateSubtotal();
  updateCartCount();
  saveCartToLocalStorage();
}

function renderCartItems() {
  let itemsHTML = "";
  if (cart.length > 0) {
    itemsHTML = `Dans le panier (${cart.length}) : ${cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join(", ")}`;
  } else {
    itemsHTML = "Panier vide";
  }
  cartItems.innerHTML = itemsHTML;
}

function renderCartTable() {
  let tableHTML = "";

  cart.forEach((item, index) => {
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price} DA</td>
        <td>${item.qty}</td>
        <td>${item.price * item.qty} DA</td>
        <td><button class="remove-item suppicn" data-index="${index}"><i class="fa fa-trash"></i></button></td>
      </tr>
    `;
  });

  cartTableBody.innerHTML = tableHTML;
}
function updateSubtotal() {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  subtotalElem.textContent = total.toFixed(2);
}

function updateCartCount() {
  cartCountElem.textContent = cart.length;
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Gérer l'ajout d'un élément au panier
addToCartBtn.addEventListener("click", () => {
  const qty = parseInt(document.getElementById("qty").value);
  const itemData = {
    id: addToCartBtn.dataset.id,
    name: addToCartBtn.dataset.name,
    price: parseFloat(addToCartBtn.dataset.price),
    qty,
  };

  const existingItemIndex = cart.findIndex((item) => item.id === itemData.id);
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].qty += qty;
  } else {
    cart.push(itemData);
  }

  updateCart();
});

// Gérer la suppression d'un élément du panier
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    updateCart();
  }
});

updateCart();
