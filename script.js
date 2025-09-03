// Arrays und einfache Variablen (wie im Unterricht gelernt)
let images = [
    './assets/img/dark-mode-notes-app.png',
    './assets/img/light-mode-notes-app.png'
];

let imageTitles = [
    'Dark Mode Notes App',
    'Light Mode Notes App'
];

let currentImageIndex = 0;

// DOM-Referenzen holen (wie bei den Übungen)
let gallery = document.getElementById('gallery');
let overlay = document.getElementById('overlay');
let dialogImage = document.getElementById('dialogImage');
let imageTitle = document.getElementById('imageTitle');
let imageNumber = document.getElementById('imageNumber');

// Onload-Funktion (wie immer im Unterricht)
function onLoadFunction() {
    renderGallery();
    setupEventListeners();
}

// Template-Funktion (wie im Unterricht gelernt)
function getImageTemplate(index) {
    return `
        <div class="thumbnail" onclick="openDialog(${index})" onkeydown="handleThumbnailKeydown(event, ${index})" tabindex="0" role="button" aria-label="Öffne ${imageTitles[index]} in Vollansicht">
            <div class="thumbnail-image-container">
                <img src="${images[index]}" alt="${imageTitles[index]}">
            </div>
            <p>${imageTitles[index]}</p>
        </div>
    `;
}

function renderGallery() {
    let htmlContent = '';
    for (let i = 0; i < images.length; i++) {
        htmlContent += getImageTemplate(i);
    }
    gallery.innerHTML = htmlContent;
}

function openDialog(imageIndex) {
    currentImageIndex = imageIndex;
    updateDialogContent();
    overlay.classList.remove('hidden');
    
    // Fokus auf den Dialog setzen für Barrierefreiheit
    overlay.focus();
    
    // Body-Scroll verhindern
    document.body.style.overflow = 'hidden';
}

function closeDialog() {
    overlay.classList.add('hidden');
    
    // Body-Scroll wieder erlauben
    document.body.style.overflow = '';
    
    // Fokus zurück auf das Thumbnail setzen
    let thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails[currentImageIndex]) {
        thumbnails[currentImageIndex].focus();
    }
}

function updateDialogContent() {
    dialogImage.src = images[currentImageIndex];
    dialogImage.alt = imageTitles[currentImageIndex];
    imageTitle.innerHTML = imageTitles[currentImageIndex];
    imageNumber.innerHTML = (currentImageIndex + 1) + ' von ' + images.length;
}

function setupEventListeners() {
    // Schließen-Button
    document.getElementById('closeBtn').addEventListener('click', closeDialog);
    
    // Navigation
    document.getElementById('prevBtn').addEventListener('click', prevImage);
    document.getElementById('nextBtn').addEventListener('click', nextImage);
    
    // Klick außerhalb schließt Dialog
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            closeDialog();
        }
    });
    
    // Tastatur-Navigation für Barrierefreiheit
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

// Tastatur-Support für Thumbnails
function handleThumbnailKeydown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDialog(index);
    }
}

function nextImage() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex = currentImageIndex + 1;
    } else {
        currentImageIndex = 0; // Zurück zum ersten Bild
    }
    updateDialogContent();
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex = currentImageIndex - 1;
    } else {
        currentImageIndex = images.length - 1; // Zum letzten Bild
    }
    updateDialogContent();
}