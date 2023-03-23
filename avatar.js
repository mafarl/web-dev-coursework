const skinImages = ['emoji-assets/skin/red.png', 'emoji-assets/skin/yellow.png', 'emoji-assets/skin/green.png'];
const eyesImages = ['emoji-assets/eyes/closed.png', 'emoji-assets/eyes/laughing.png', 'emoji-assets/eyes/long.png', 'emoji-assets/eyes/normal.png', 'emoji-assets/eyes/rolling.png', 'emoji-assets/eyes/winking.png'];
const mouthImages = ['emoji-assets/mouth/open.png', 'emoji-assets/mouth/sad.png', 'emoji-assets/mouth/smiling.png', 'emoji-assets/mouth/straight.png', 'emoji-assets/mouth/surprise.png', 'emoji-assets/mouth/teeth.png'];

// Option selected
const skinSelect = document.querySelector('.skin-select');
const mouthSelect = document.querySelector('.mouth-select');
const eyesSelect = document.querySelector('.eyes-select');
// Image showing
const skinImg = document.querySelector('.skin');
const eyesImg = document.querySelector('.eyes');
const mouthImg = document.querySelector('.mouth');


// Load images and populate dropdown menus
function loadImages(images, select) {
    images.forEach(image => {
        const option = document.createElement('option');
        option.value = image;
        option.text = image.split('/')[2].split('.')[0];
        select.add(option);
    });
}

loadImages(skinImages, skinSelect);
loadImages(eyesImages, eyesSelect);
loadImages(mouthImages, mouthSelect);

// Replace image with selected image from dropdown menu
function replaceImage(select, img) {
    select.addEventListener('change', () => {
        const selectedImage = select.value;
        img.src = selectedImage;
    });
}

replaceImage(skinSelect, skinImg);
replaceImage(eyesSelect, eyesImg);
replaceImage(mouthSelect, mouthImg);

select.addEventListener("change", function() {
    var selectedOption = skinSelect.options[select.selectedIndex].value;
	sessionStorage.setItem("selectedOption", selectedOption);
});
