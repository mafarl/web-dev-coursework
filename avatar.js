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

/*document.querySelector('form').addEventListener('submit', function(e){
    // Get the selected option value
    var selectedOptionSkin = document.getElementByClassName("skin-select").value;
    var selectedOptionEyes = document.getElementByClassName("eyes-select").value;
    var selectedOptionMouth = document.getElementByClassName("mouth-select").value;

    // Store the selected option value in a hidden input field
    var hiddenInputSkin = document.createElement("input");
    hiddenInputSkin.type = "hidden";
    hiddenInputSkin.name = "selectedOptionSkin";
    hiddenInputSkin.value = selectedOptionSkin;
    document.body.appendChild(hiddenInputSkin);

    var hiddenInputEyes = document.createElement("input");
    hiddenInputEyes.type = "hidden";
    hiddenInputEyes.name = "selectedOptionEyes";
    hiddenInputEyes.value = selectedOptionEyes;
    document.body.appendChild(hiddenInputEyes);

    var hiddenInputMouth = document.createElement("input");
    hiddenInputMouth.type = "hidden";
    hiddenInputMouth.name = "selectedOptionMouth";
    hiddenInputMouth.value = selectedOptionMouth;
    document.body.appendChild(hiddenInputMouth);
}); */
