// Attendez que le DOM soit complètement chargé avant d'exécuter le script
window.addEventListener('DOMContentLoaded', async () => {
    // Récupération des éléments HTML
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentView = document.getElementById('currentView');
    const nextView = document.getElementById('nextView');
    const goToSlideButton = document.getElementById('goToSlideButton');

    // Fonction pour simuler une pression de touche
    async function call_simulateKeyPress(keyCode) {
        try {
            await window.pywebview.api.simulateKeyPress(keyCode);
            // Après simulation, mettre à jour le contenu des iframes
            await Promise.all([call_getCurrentSlideContent(), call_getNextSlideContent()]);
        } catch (error) {
            console.error("Erreur lors de la simulation de la touche :", error);
        }
    }

    // Ajout des écouteurs d'événements pour les boutons de navigation
    prevButton.addEventListener('click', () => call_simulateKeyPress(37));
    nextButton.addEventListener('click', () => call_simulateKeyPress(39));

    // Fonction pour aller à un slide spécifique
    function call_goToSlide() {
        const slideNum = parseInt(document.getElementById('slideNumberInput').value);
        if (!isNaN(slideNum)) {
            window.pywebview.api.send_to_goToSlide_window(slideNum);
        } else {
            console.error('Invalid slide number');
        }
    }
    goToSlideButton.addEventListener('click', call_goToSlide);

    // Fonction pour obtenir le contenu du slide actuel
    async function call_getCurrentSlideContent() {
        try {
            currentView.srcdoc = await window.pywebview.api.currentSlide();
        } catch (error) {
            console.error("Erreur lors de la récupération du contenu du slide actuel :", error);
        }
    }

    // Fonction pour obtenir le contenu du prochain slide
    async function call_getNextSlideContent() {
        try {
            nextView.srcdoc = await window.pywebview.api.nextSlide();
        } catch (error) {
            console.error("Erreur lors de la récupération du contenu du prochain slide :", error);
        }
    }

    // Bouton test pour envoyer un message à la fenêtre du slide
    document.getElementById('SendHTMLButton').addEventListener('click', () => {
        var msg = document.getElementById('inputMsg').value;
        window.pywebview.api.send_to_slide_window();
    });
});
