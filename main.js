import './style.css'

//https://api.meteo-concept.com/api/ephemeride/0?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e

// Charger les dates du localStorage
let datesImportantes = JSON.parse(localStorage.getItem('datesImportantes'));
            
// Vérifier si les dates sont disponibles
if (datesImportantes && Array.isArray(datesImportantes)) {
    // Trier les dates
    datesImportantes.sort((a, b) => new Date(a) - new Date(b));

    // Sauvegarder les dates triées dans le localStorage
    localStorage.setItem('datesImportantes', JSON.stringify(datesImportantes));
}

console.log(localStorage);

