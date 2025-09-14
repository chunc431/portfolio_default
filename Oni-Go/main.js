let slideIndex = 1;

function openFullscreen(elem) {
  const images = document.querySelectorAll('.main-image img, .additional-images img');
  const container = document.querySelector('.fullscreen-gallery .image-container');
  container.innerHTML = '';

  images.forEach((img, index) => {
    const newImg = img.cloneNode();
    if (img === elem) slideIndex = index + 1;
    container.appendChild(newImg);
  });

  document.getElementById("fullscreen-gallery").style.display = "block";
  showSlides(slideIndex);
}

function closeFullscreen() {
  document.getElementById("fullscreen-gallery").style.display = "none";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".image-container img");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => slide.className = '');
  slides[slideIndex-1].className = 'show';
}
