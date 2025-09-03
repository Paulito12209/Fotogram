// ===== GLOBALE VARIABLEN =====
let images = [
  './assets/img/dark-mode-notes-app.png',
  './assets/img/light-mode-notes-app.png'
];

let imageTitles = [
  'Dark Mode Notes App',
  'Light Mode Notes App'
];

let currentImageIndex = 0;

// ===== DOM REFERENZEN =====
let gallery = document.getElementById('gallery');
let overlay = document.getElementById('overlay');
let dialogImage = document.getElementById('dialogImage');
let imageTitle = document.getElementById('imageTitle');
let imageNumber = document.getElementById('imageNumber');

/**
 * Initialisiert die Fotogalerie beim Laden der Seite
 */
function onLoadFunction() {
  renderGallery();
  setupEventListeners();
}

/**
 * Erstellt HTML Template für ein einzelnes Thumbnail
 * @param {number} index - Index des Bildes im Array
 * @returns {string} HTML String für das Thumbnail
 */
function getImageTemplate(index) {
  return `
    <div class="thumbnail" 
         onclick="openDialog(${index})" 
         onkeydown="handleThumbnailKeydown(event, ${index})" 
         tabindex="0" 
         role="button" 
         aria-label="Öffne ${imageTitles[index]} in Vollansicht">
      <div class="thumbnail-image-container">
        <img src="${images[index]}" alt="${imageTitles[index]}">
      </div>
      <p>${imageTitles[index]}</p>
    </div>
  `;
}

/**
 * Rendert alle Bilder in die Galerie
 */
function renderGallery() {
  let htmlContent = '';
  
  for (let i = 0; i < images.length; i++) {
    htmlContent += getImageTemplate(i);
  }
  
  gallery.innerHTML = htmlContent;
}

/**
 * Öffnet das Dialog Fenster für ein bestimmtes Bild
 * @param {number} imageIndex - Index des zu öffnenden Bildes
 */
function openDialog(imageIndex) {
  currentImageIndex = imageIndex;
  updateDialogContent();
  overlay.classList.remove('hidden');
  overlay.focus();
  
  // Verhindert Scrollen im Hintergrund
  document.body.style.overflow = 'hidden';
}

/**
 * Schließt das Dialog Fenster
 */
function closeDialog() {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
  
  // Setzt Fokus zurück auf das entsprechende Thumbnail
  let thumbnails = document.querySelectorAll('.thumbnail');
  if (thumbnails[currentImageIndex]) {
    thumbnails[currentImageIndex].focus();
  }
}

/**
 * Aktualisiert den Inhalt des Dialog Fensters
 */
function updateDialogContent() {
  dialogImage.src = images[currentImageIndex];
  dialogImage.alt = imageTitles[currentImageIndex];
  imageTitle.innerHTML = imageTitles[currentImageIndex];
  imageNumber.innerHTML = (currentImageIndex + 1) + ' von ' + images.length;
}

/**
 * Richtet alle Event Listener ein
 */
function setupEventListeners() {
  // Schließ-Button
  document.getElementById('closeBtn').addEventListener('click', closeDialog);
  
  // Navigation Buttons
  document.getElementById('prevBtn').addEventListener('click', prevImage);
  document.getElementById('nextBtn').addEventListener('click', nextImage);
  
  // Klick außerhalb des Dialogs schließt ihn
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      closeDialog();
    }
  });
  
  // Tastatur Navigation
  document.addEventListener('keydown', function(event) {
    if (!overlay.classList.contains('hidden')) {
      if (event.key === 'Escape') {
        closeDialog();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    }
  });
}

/**
 * Behandelt Tastatureingaben für Thumbnails
 * @param {Event} event - Das Tastatur Event
 * @param {number} index - Index des Thumbnails
 */
function handleThumbnailKeydown(event, index) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDialog(index);
  }
}

/**
 * Wechselt zum nächsten Bild (mit Endlos-Loop)
 */
function nextImage() {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex = currentImageIndex + 1;
  } else {
    currentImageIndex = 0; // Zurück zum ersten Bild
  }
  updateDialogContent();
}

/**
 * Wechselt zum vorherigen Bild (mit Endlos-Loop)
 */
function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex = currentImageIndex - 1;
  } else {
    currentImageIndex = images.length - 1; // Zum letzten Bild
  }
  updateDialogContent();
}