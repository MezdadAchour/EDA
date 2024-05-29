// Récupérer une référence vers la base de données Firebase
const database = firebase.database();

// Sélectionner le formulaire
const formElement = document.querySelector('form');

// Gérer la soumission du formulaire
formElement.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs du formulaire
  const nom = formElement.querySelector('#nom').value;
  const prenom = formElement.querySelector('#prenom').value;
  const telephone = formElement.querySelector('#telephone').value;
  const marque = formElement.querySelector('#marque').value;
  const modele = formElement.querySelector('#modele').value;
  const description = formElement.querySelector('#description').value;
  const date = formElement.querySelector('#date').value;
  const heure = formElement.querySelector('#heure').value;

  // Créer un nouvel objet avec les données du formulaire
  const rendezVous = {
    nom,
    prenom,
    telephone,
    marque,
    modele,
    description,
    date,
    heure
  };

  // Envoyer les données vers Firebase
  database.ref('rendezVous').push(rendezVous, (error) => {
    if (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    } else {
      console.log('Données envoyées avec succès');
      // Réinitialiser le formulaire après l'envoi réussi
      formElement.reset();
    }
  });
});