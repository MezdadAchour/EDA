// Définissez votre mot de passe ici
const adminPassword = 'MezdadAchour';

// Récupérer une référence vers la base de données Firebase
const database = firebase.database();
const rendezVousRef = database.ref('rendezVous');

// Sélectionner le formulaire de connexion et le conteneur de la liste des rendez-vous
const loginForm = document.getElementById('login-form');
const rendezVousListContainer = document.getElementById('rendez-vous-list-container');

// Fonction pour afficher un rendez-vous dans le tableau
function renderRendezVous(rendezVous, rendezVousId) {
  const rendezVousList = document.getElementById('rendez-vous-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${rendezVous.nom}</td>
    <td>${rendezVous.prenom}</td>
    <td>${rendezVous.telephone}</td>
    <td>${rendezVous.marque}</td>
    <td>${rendezVous.modele}</td>
    <td>${rendezVous.description}</td>
    <td>${rendezVous.date}</td>
    <td>${rendezVous.heure}</td>
  `;
  rendezVousList.appendChild(row);
}

// Gérer la soumission du formulaire de connexion
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const passwordInput = document.getElementById('password');
  const enteredPassword = passwordInput.value;

  if (enteredPassword === adminPassword) {
    // Mot de passe correct, afficher la liste des rendez-vous
    rendezVousListContainer.style.display = 'block';
    loginForm.style.display = 'none';

    // Récupérer les rendez-vous depuis Firebase et les afficher
    rendezVousRef.on('value', (snapshot) => {
      const rendezVousList = document.getElementById('rendez-vous-list');
      rendezVousList.innerHTML = '';

      const rendezVous = snapshot.val();
      for (const rendezVousId in rendezVous) {
        renderRendezVous(rendezVous[rendezVousId], rendezVousId);
      }
    });
  } else {
    alert('Mot de passe incorrect');
  }
});