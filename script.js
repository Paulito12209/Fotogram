// == ARRAYS ==
let images = [
  "./assets/gallary/Polar Bear.png",
  "./assets/gallary/Tiger.png",
  "./assets/gallary/Eagle.png",
  "./assets/gallary/Gorilla.png",
  "./assets/gallary/White Tiger.png",
  "./assets/gallary/Brown Bear.png",
  "./assets/gallary/Lion.png",
  "./assets/gallary/Black Panther.png",
  "./assets/gallary/Rhinoceros.png",
  "./assets/gallary/Big Horse.png",
  "./assets/gallary/Elephant.png",
  "./assets/gallary/Urang Utan.png",
];

let imagesTitles = [
  "Polarbär am Meer",
  "Sibirischen Tiger",
  "Fliegender Adler",
  "Gorilla im Djungel",
  "Weißer Tiger",
  "Brauner Bär",
  "Löwe in der Sahara",
  "Schwarzer Panther",
  "Nashorn in der Sahara",
  "Pferd an den Bergen",
  "Elefant in der Wüste",
  "Orangener Utan",
];

let i = 0;

// === RENDER FUNKTIONEN ===
function renderGallary() {
  let ImageRef = document.getElementById("gallery-content");
  ImageRef.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    ImageRef.innerHTML += getImage(i);
  }
}

// === TEMPLATE FUNKTIONEN ===
function getImage(i) {
  return `
    <div class="rotating-gradient-border">
      <img src="${images[i]}"
           class="gallery-image"
           alt="Bild ${imagesTitles[i]}"
           title="${imagesTitles[i]}"
           onclick="showDialog(${i})"/>
    </div>
  `;
}

// === DIALOG FUNKTIONEN ===
const wrapper = document.querySelector(".wrapper");

function showDialog(img) {
  i = img;
  let dialogImage = document.getElementById("show_image_dialog");
  let dialogImageTitle = document.getElementById("dialog-img-title");

  dialogImage.src = images[i];
  dialogImage.alt = images[i];
  dialogImageTitle.innerText = imagesTitles[i];

  let counterRef = document.getElementById("img-counter");
  counterRef.textContent = i + 1 + " / " + images.length;

  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

dialog.addEventListener(
  "click",
  (e) => !wrapper.contains(e.target) && dialog.close()
);

// === COUNTER FUNKTION ===

let counterRef = document.getElementById("img-counter");
counterRef.textContent = i + 1 + " / " + images.length;

// === NAVIGATION FUNKTIONEN ===

function previousImage() {
  i--;
  if (i < 0) {
    i = images.length - 1;
  }
  showDialog(i);
}

function nextImage() {
  i++;
  if (i >= images.length) {
    i = 0;
  }
  showDialog(i);
}
