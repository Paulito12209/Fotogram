// Arrays und einfache Variablen (wie im Unterricht gelernt)
let images = ['images/bild1.jpg', 'images/bild2.jpg'];
let imageTitles = ['Erstes Bild', 'Zweites Bild'];
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
        <div class="thumbnail" onclick="openDialog(${index})">
            <img src="${images[index]}" alt="${imageTitles[index]}">
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
}

function closeDialog() {
    overlay.classList.add('hidden');
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