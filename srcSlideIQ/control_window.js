// Attendez que le DOM soit complètement chargé avant d'exécuter le script
window.addEventListener('DOMContentLoaded', async () => {
    // Récupération des éléments HTML

    // Les boutons pour activer les slide avant ou après 
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // les captures des slides actuelles et suivantes 
    const currentView = document.getElementById('currentView');
    const nextView = document.getElementById('nextView');

    // permet d'accèder directement à la slide souhaitée 
    const goToSlideButton = document.getElementById('goToSlideButton');

    // permet de lire les commentaires coté Master 
    const remarksNow = document.getElementById('remarksNow');
    const remarksNext = document.getElementById('remarksNext');

    // Fonction pour obtenir les remarques du slide en cours
    async function getRemarksForSlide(slideIndex) {
        try {
            var remarksDict = await window.pywebview.api.get_remarks();  // Accède à la variable exposée depuis Python
            var remarks = remarksDict[slideIndex];  // Remarques pour le slide souhaité
            console.log(remarksDict);
            console.log(remarks);
            return remarks;
        } catch (error) {
            console.error("Erreur lors de la récupération des remarques :", error);
            return [];  // Retourne une liste vide en cas d'erreur
        }
    }

    /**
     * Met à jour les remarques affichées pour la diapositive actuelle et la suivante.
     * 
     * Cette fonction est asynchrone car elle attend les données de l'API pywebview.
     * Elle récupère les remarques pour la diapositive actuelle et la suivante,
     * puis met à jour le contenu HTML des éléments `remarksNow` et `remarksNext`.
     * Chaque ligne de remarques est présentée comme un paragraphe distinct,
     * précédé d'un symbole "-".
     * 
     * @async
     * @function
     * @returns {Promise<void>} Rien
     */
    async function updateRemarks() {
        var currentSlideIndex = await window.pywebview.api.getCurrentIndex();
        var nextSlideIndex = currentSlideIndex + 1;

        console.log(currentSlideIndex);
        console.log(nextSlideIndex);

        var remarksNowContent = await getRemarksForSlide(currentSlideIndex);
        var remarksNextContent = await getRemarksForSlide(nextSlideIndex);

        // Crée un paragraphe pour chaque élément du tableau pour les remarques actuelles
        // et ajoute un symbole "-" devant chaque ligne
        var remarksNowParagraphs = remarksNowContent.map(line => `<p>- ${line}</p>`).join('');
        remarksNow.innerHTML = remarksNowParagraphs;

        // Crée un paragraphe pour chaque élément du tableau pour les remarques suivantes
        // et ajoute un symbole "-" devant chaque ligne
        var remarksNextParagraphs = remarksNextContent.map(line => `<p>- ${line}</p>`).join('');
        remarksNext.innerHTML = remarksNextParagraphs;
    }

    // Fonction pour simuler une pression de touche
    async function call_simulateKeyPress(keyCode) {
        try {
            await window.pywebview.api.simulateKeyPress(keyCode);
            // Après simulation, mettre à jour le contenu des iframes
            await Promise.all([call_getCurrentSlideContent(), call_getNextSlideContent()]);

            // Appelle la fonction d'actualisation des remarques
            updateRemarks();
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

    // Bouton pour envoyer un message à la fenêtre du slide
    document.getElementById('SendHTMLButton').addEventListener('click', () => {
        var msg = document.getElementById('inputMsg').value;
        window.pywebview.api.send_to_slide_window();
    });
});
