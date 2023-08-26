# SlideIQ 🎓🎥 Version alpha 2023.08.26

## 📝 Description

**SlideIQ** est un outil innovant qui modernise la façon dont vous gérez vos présentations HTML. Construit avec Python et la puissante bibliothèque `webview`, il offre deux interfaces distinctes : une pour la présentation et l'autre pour son contrôle. Imaginez ça comme votre PowerPoint du 21e siècle, mais en mieux.

## 🛠 Installation

1. **Python 3.x** : Assurez-vous d'avoir une version de Python 3.x installée sur votre système.
   ```
   python --version
   ```
2. **Webview** : Installez la bibliothèque `webview` via pip.
   ```
   pip install pywebview
   ```

## 🚀 Utilisation

1. **Fichiers de Présentation** : Placez votre fichier HTML de présentation dans le répertoire `Slides`.
   
2. **Démarrage** : Double-cliquez sur `StartSlideIQ.bat` ou exécutez le script Python dans votre terminal :
   ```
   python SlideIQ.py
   ```

3. **Interface Utilisateur** : Deux fenêtres s'ouvriront — une pour les diapositives et une autre pour leur contrôle.

📂 **Arborescence du Projet** :

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
Navigation Entre Diapositives : Les boutons de l'interface de contrôle permettent une navigation fluide entre les diapositives.

Communication Intuitive : Envoyez des messages ou des commandes à la fenêtre de diapositives directement depuis l'interface de contrôle.

## 🛠 Développements Futurs
-🔄 **Chargement Dynamique** : Ajout d'une fonctionnalité pour charger différentes présentations sans avoir à redémarrer l'application.

-🎙 **Reconnaissance Vocale** : Intégration d'un contrôle vocal pour une expérience utilisateur encore plus immersive.

-💬 **Messages Intégrés** : La prochaine mise à jour prévoit la possibilité d'envoyer des messages de la fenêtre de contrôle à la fenêtre de diapositives.

-🔦 **Laser Virtuel** : Intégration d'une fonctionnalité de pointeur laser pour mieux orienter l'audience.

- 🖊 **Interaction au Stylet** : Possibilité d'annoter les diapositives directement via un stylet.

- 📝 **Commentaires selon les Slides** : Vous pouvez ajouter des commentaires spécifiques à chaque slide dans un fichier Markdown.
  Ceux-ci seront affichés dans la fenêtre de contrôle pour faciliter la présentation.

## 📜 Auteurs

- **Helder Costa Lopes**

## 📚 Licence

Ce projet est sous licence MIT. Pour plus d'informations, consultez le fichier [LICENSE.md](LICENSE.md).
