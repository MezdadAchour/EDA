// Définissez votre mot de passe ici
const adminPassword = "MezdadAchour";

// Récupérer une référence vers la base de données Firebase
const database = firebase.database();
const rendezVousRef = database.ref("rendezVous");
const commandesRef = database.ref("commandes"); // Assurez-vous que cette référence pointe vers le bon nœud

// Sélectionner le formulaire de connexion, le conteneur de la liste des rendez-vous et le conteneur de la liste des commandes
const loginForm = document.getElementById("login-form");
const rendezVousListContainer = document.getElementById(
  "rendez-vous-list-container"
);
const commandesContainer = document.getElementById("commandes-container");

// Fonction pour afficher un rendez-vous dans le tableau
function renderRendezVous(rendezVous, rendezVousId) {
  const rendezVousList = document.getElementById("rendez-vous-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${rendezVous.nom}</td>
    <td>${rendezVous.prenom}</td>
    <td>${rendezVous.telephone}</td>
    <td>${rendezVous.marque}</td>
    <td>${rendezVous.modele}</td>
    <td>${rendezVous.description}</td>
    <td>${rendezVous.date}</td>
    <td>${rendezVous.heure}</td>
    <td>${rendezVous.statut || "En cours"}</td>
    <td><button class="toggle-status" data-id="${rendezVousId}">Terminer</button></td>
  `;
  rendezVousList.appendChild(row);
}

// Fonction pour afficher une commande dans le tableau
function renderCommande(commande, commandeId) {
  const commandesList = document.getElementById("commandes-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${commande.nom}</td>
    <td>${commande.prenom}</td>
    <td>${commande.telephone}</td>
    <td>${commande.adresse}</td>
    <td>${commande.articles
      .map((produit) => `${produit.name} (x${produit.quantity})`)
      .join(", ")}</td>
    <td>${commande.total} DA</td>
    <td>${commande.statut || "En cours"}</td>
    <td><button class="toggle-status" data-id="${commandeId}">Terminer</button></td>
  `;
  commandesList.appendChild(row);
}

// Gérer la soumission du formulaire de connexion
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const passwordInput = document.getElementById("password");
  const enteredPassword = passwordInput.value;

  if (enteredPassword === adminPassword) {
    // Mot de passe correct, afficher la liste des rendez-vous et des commandes
    rendezVousListContainer.style.display = "block";
    commandesContainer.style.display = "block";
    loginForm.style.display = "none";

    // Récupérer les rendez-vous depuis Firebase et les afficher
    rendezVousRef.on("value", (snapshot) => {
      const rendezVousList = document.getElementById("rendez-vous-list");
      rendezVousList.innerHTML = ""; // Vider la liste avant de la remplir
      const rendezVous = snapshot.val() || {}; // Correction ici
      Object.entries(rendezVous).forEach(([rendezVousId, rendezVousData]) => {
        renderRendezVous(rendezVousData, rendezVousId);
      });
    });

    // Récupérer les commandes depuis Firebase et les afficher
    commandesRef.on("value", (snapshot) => {
      const commandesList = document.getElementById("commandes-list");
      commandesList.innerHTML = ""; // Vider la liste avant de la remplir
      const commandes = snapshot.val() || {}; // Correction ici
      Object.entries(commandes).forEach(([commandeId, commandeData]) => {
        renderCommande(commandeData, commandeId);
      });
    });
  } else {
    alert("Mot de passe incorrect");
  }
});

// Gérer le changement de statut des rendez-vous et des commandes
const rendezVousList = document.getElementById("rendez-vous-list");
const commandesList = document.getElementById("commandes-list");

function toggleStatus(id, ref) {
  const statusRef = ref.child(id).child("statut");
  statusRef.once("value", (snapshot) => {
    const currentStatus = snapshot.val() || "En cours";
    const newStatus = currentStatus === "En cours" ? "Terminé" : "En cours";
    statusRef.set(newStatus);
  });
}

rendezVousList.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle-status")) {
    const rendezVousId = event.target.getAttribute("data-id");
    toggleStatus(rendezVousId, rendezVousRef);
  }
});

commandesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle-status")) {
    const commandeId = event.target.getAttribute("data-id");
    toggleStatus(commandeId, commandesRef);
  }
});
