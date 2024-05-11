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

// panier.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartDrawer = document.querySelector(".cart-drawer");
    const closeCartBtn = document.querySelector(".close-cart");
    const cartItems = document.querySelector(".cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartCount = document.querySelector(".cart-count");

    let cart = [];

    // Fonction pour ajouter un élément au panier
    function addToCart(item, quantity = 1) {
      const existingItem = cart.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...item, quantity });
      }

      updateCart();
    }

    // Fonction pour mettre à jour le panier
    function updateCart() {
      const cartItemsContainer = document.getElementById("cart-items");
      if (cartItemsContainer) {
        // Supprimer tous les éléments enfants existants
        while (cartItemsContainer.firstChild) {
          cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }

        cart.forEach((item) => {
          const existingItemElement = cartItemsContainer.querySelector(
            `.cart-item[data-item-id="${item.id}"]`
          );

          if (existingItemElement) {
            // Mettre à jour la quantité de l'élément existant
            const itemPrice = existingItemElement.querySelector(
              ".cart-item-details p:last-child"
            );
            itemPrice.textContent = `${item.price} DA x ${item.quantity}`;
          } else {
            // Créer un nouvel élément pour cet article
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.setAttribute("data-item-id", item.id);

            const itemImage = document.createElement("img");
            itemImage.src = item.image;
            itemElement.appendChild(itemImage);

            const itemDetails = document.createElement("div");
            itemDetails.classList.add("cart-item-details");

            const itemName = document.createElement("p");
            itemName.textContent = item.name;
            itemDetails.appendChild(itemName);

            const itemPrice = document.createElement("p");
            itemPrice.textContent = `${item.price} DA x ${item.quantity}`;
            itemDetails.appendChild(itemPrice);

            itemElement.appendChild(itemDetails);
            cartItemsContainer.appendChild(itemElement);
          }
        });

        updateTotalPrice();
      }
    }

    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      cartTotalPrice.textContent = `${totalPrice} DA`;
      cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    }

    // Fonction pour ouvrir le tiroir du panier
    function openCartDrawer() {
      cartDrawer.classList.add("open");
    }

    // Fonction pour fermer le tiroir du panier
    function closeCartDrawer() {
      cartDrawer.classList.remove("open");
    }

    // Événements
    cartIcon.addEventListener("click", openCartDrawer);
    closeCartBtn.addEventListener("click", closeCartDrawer);

    // Exemple d'ajout d'un élément au panier
    addToCart(
      {
        id: 1,
        name: "EMU-pro 8",
        price: 25000,
        image: "./assets/images/piece/emu1.png",
      },
      1
    );
  });
})();

// toggleMenu.js
function menutoggle() {
  const menuItems = document.getElementById("menuItems");

  if (menuItems) {
    menuItems.classList.toggle("active");
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}
