# SlideIQ 🎓🎥 Version alpha 2023.08.26

## 📝 Description

Bienvenue dans l'univers de **SlideIQ**, un outil révolutionnaire qui donne une nouvelle dimension à la gestion de vos présentations HTML. Développé avec passion en Python, en utilisant la bibliothèque puissante `webview`, SlideIQ propose deux interfaces distinctes : une dédiée à la présentation et l'autre à son contrôle. Imaginez-le comme votre complice du 21e siècle pour des présentations mémorables et engageantes.

## 🛠 Installation

1. **Python 3.x** : Assurez-vous d'avoir Python 3.x installé sur votre système.
   ```
   python --version
   ```
2. **Webview** : Installez la bibliothèque `webview` via pip.
   ```
   pip install pywebview
   ```

## 🚀 Utilisation

1. **Fichiers de Présentation** : Placez vos fichiers HTML de présentation dans le dossier `Slides`.

2. **Démarrage** : Lancez SlideIQ en double-cliquant sur `StartSlideIQ.bat` ou en exécutant le script Python dans votre terminal :
   ```
   python SlideIQ.py
   ```

3. **Interface Utilisateur** : Ouvrez deux fenêtres — une pour afficher les diapositives et l'autre pour les contrôler.

4. **Fonctions JavaScript cruciales** :
Voici les fonctions JavaScript que vous devez absolument intégrer dans le fichier JS de vos diapositives HTML. Elles sont essentielles pour permettre l'interaction fluide entre la fenêtre de contrôle et la fenêtre des diapositives. En leur absence, le fonctionnement sera compromis.

```javascript
//#region : Connexion avec Python
function simulerAppuiTouche(codeTouche) {
  var event = new KeyboardEvent('keydown', { 'keyCode': codeTouche, 'which': codeTouche });
  document.dispatchEvent(event);
}

function obtenirContenuDiapositiveActuelle() {
  var diapositiveActuelle = slideShow.slides[slideShow.currentSlide];
  return diapositiveActuelle.innerHTML;
}

function obtenirContenuDiapositiveSuivante() {
  if (slideShow.currentSlide + 1 < slideShow.slides.length) {
    var diapositiveSuivante = slideShow.slides[slideShow.currentSlide + 1];
    return diapositiveSuivante.innerHTML;
  }
  return "";
}

function messageRecu(message) {
  alert("Message reçu : " + message);
}
//#endregion
```

📂 **Structure du Projet** :

```plaintext
StartSlideIQ.bat
├── Slides
│   ├── 1.Fondamentaux.html
│   ├── css
│   │   └── style.css
│   ├── images
│   ├── js
│   │   └── script.js
│   └── videos
└── srcSlideIQ
    ├── control_window.css
    ├── control_window.html
    ├── control_window.js
    ├── remarks.md
    └── SlideIQ.py
```

## 🌟 Fonctionnalités
Navigation Simplifiée : Les boutons de contrôle facilitent la navigation entre les diapositives.

Communication Intuitive : Envoyez des messages ou des commandes à la fenêtre des diapositives directement depuis l'interface de contrôle.

## 🛠 Perspectives d'Évolution
-🔄 **Chargement Dynamique** : Ajout d'une fonctionnalité pour basculer entre différentes présentations sans redémarrer l'application.

-🎙 **Reconnaissance Vocale** : Intégration d'une commande vocale pour une immersion totale.

-💬 **Messages Intégrés** : Prochaine mise à jour : possibilité d'envoyer des messages de contrôle aux diapositives.

-🔦 **Pointeur Laser Virtuel** : Un pointeur laser virtuel pour guider l'attention.

-🖊 **Interaction au Stylet** : Annotation directe des diapositives avec un stylet.

-📝 **Commentaires par Diapositive** : Ajout de commentaires spécifiques à chaque diapositive via un fichier Markdown. Visibles dans la fenêtre de contrôle pour une présentation fluide.

## 📜 Auteur

- **Helder Costa Lopes**

## 📚 Licence

Ce projet est distribué sous licence MIT. Pour plus de détails, consultez le fichier [LICENSE.md](LICENSE.md).