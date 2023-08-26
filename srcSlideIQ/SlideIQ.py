import webview
import os

# Obtenir le répertoire courant
current_directory = os.getcwd()

# Obtenir le répertoire parent
parent_directory = os.path.dirname(current_directory)

# Construire le chemin du sous-répertoire "Slides"
slide_directory = os.path.join(parent_directory, "Slides")

# Liste tous les fichiers du sous-répertoire "Slides"
try:
    all_slide_files = os.listdir(slide_directory)
except FileNotFoundError:
    print("Le sous-répertoire 'Slides' n'a pas été trouvé.")
    exit(1)  # Quitte le script si le dossier "Slides" n'est pas trouvé

# Filtrer pour n'avoir que les fichiers .html
html_files = [f for f in all_slide_files if f.endswith('.html')]

# Prendre le premier fichier HTML (si disponible)
if html_files:
    # Construire le chemin complet du premier fichier HTML trouvé
    path_presentation = os.path.join(slide_directory, html_files[0])
else:
    print("Aucun fichier HTML trouvé dans le sous-répertoire 'Slides'.")
    exit(1)  # Quitte le script

path_control = os.path.join(current_directory,"control_window.html")
print(path_control)

def create_windows(path_presentation, path_control):
    window_2 = webview.create_window('Master', url=path_control, width=800, height=600)
    window_1 = webview.create_window('Slide', url=path_presentation, width=800, height=600)

    return window_1, window_2

def expose_functions(window_1, window_2):

    def send_to_goToSlide_window(slide):
        window_1.evaluate_js(f"goToSlide({slide});")

    def send_to_slide_window(message):
        window_1.evaluate_js(f"messageReceived('{message}')")

    def send_to_master_window(message):
        window_2.evaluate_js(f"messageReceived('{message}')")

    window_1.expose(send_to_master_window)
    window_2.expose(send_to_slide_window)

    # Vos fonctions actuelles ici
    def simulateKeyPress(key: str):
        window_1.evaluate_js(f"simulateKeyPress({key});")

    def currentSlide():
        return window_1.evaluate_js("getCurrentSlideContent();")

    def nextSlide():
        return window_1.evaluate_js("getNextSlideContent();")

    window_2.expose(simulateKeyPress)
    window_2.expose(currentSlide)
    window_2.expose(nextSlide)
    window_2.expose(send_to_goToSlide_window)

def open_windows():
    window_1, window_2 = create_windows(path_presentation,path_control)
    expose_functions(window_1, window_2)
    #debug=True   
    webview.start()

if __name__ == "__main__":
    open_windows()
