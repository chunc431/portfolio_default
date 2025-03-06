let slideIndex = 1;

function openFullscreen(elem) {
    const media = document.querySelectorAll('.main-image video, #posters-section .posters video');
    const container = document.querySelector('.fullscreen-gallery .image-container');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100%';

    let indexCounter = 1;
    media.forEach((item) => {
        let newItem = document.createElement('video');
        newItem.src = item.querySelector('source').src;
        newItem.type = item.querySelector('source').type;
        newItem.controls = true;
        newItem.style.maxWidth = '60%';
        newItem.style.maxHeight = '60%';
        container.appendChild(newItem);

        if (item === elem) {
            slideIndex = indexCounter;
        }
        indexCounter++;
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
    const slides = document.querySelectorAll(".image-container video");
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach((slide, index) => {
        slide.style.display = index + 1 === slideIndex ? 'block' : 'none';
    });
}

document.querySelector('.fullscreen-gallery').addEventListener('click', function(event) {
    if (event.target.classList.contains('close')) {
        closeFullscreen();
    } else if (event.target.classList.contains('next')) {
        plusSlides(1);
    } else if (event.target.classList.contains('prev')) {
        plusSlides(-1);
    }
});
