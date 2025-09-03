// Grundlegende Variablen
let images = ["dark mode_notes app", "light mode_notes app"];
let currentImageIndex = 0;

// Dialog-Element holen
const dialog = document.getElementById("imageDialog");

// Dialog öffnen (Template-Funktion nutzen)
function openDialog(imageIndex) {
  currentImageIndex = imageIndex;
  updateDialogContent();
  dialog.showModal();
}

// Dialog schließen
function closeDialog() {
  dialog.close();
}

function renderGallery() {
  const container = document.querySelector(".gallery-container");
  container.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    const imageElement = createImageElement(i);
    container.appendChild(imageElement);
  }
}

// Template-Funktion (saubere Code-Struktur)
function createImageElement(index) {
  const div = document.createElement("div");
  div.className = "thumbnail";
  div.innerHTML = `<img src="${images[index]}" alt="Bild ${index + 1}">`;
  div.onclick = () => openDialog(index);
  return div;
}

// Navigation zwischen Bildern
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length; // Springt zurück zum ersten
  updateDialogContent();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateDialogContent();
}

// Klick außerhalb des Dialogs (wie im YouTube-Video gezeigt)
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
});
