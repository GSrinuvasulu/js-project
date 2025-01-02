const breedSelector = document.getElementById("breedSelector");
const photoGallery = document.querySelector(".photo-gallery");
const imageCount = document.getElementById("imageCount");

// Fetch dog breeds list when the page loads
async function loadDogBreeds() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();

        if (data.status === "success") {
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelector.appendChild(option);
            }
        }
    } catch (error) {
        alert("Failed to load dog breeds. Please try again.");
    }
}

// Generate dog photos for selected breed and number of images
async function generateRandomDogPhotos(event) {
    event.preventDefault();
    const selectedBreed = breedSelector.value;
    const count = parseInt(imageCount.value);
    if (!selectedBreed) {
        alert("Please select a breed.");
        return;
    }

    try {
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`));
        }

        const responses = await Promise.all(promises);
        const imagesData = await Promise.all(responses.map(res => res.json()));

        photoGallery.innerHTML = ''; // Clear previous images
        imagesData.forEach(data => {
            if (data.status === "success") {
                const photoCard = document.createElement("div");
                photoCard.classList.add("photo-card");
                photoCard.innerHTML = `
                    <img src="${data.message}" alt="Dog Photo">
                    <a href="${data.message}" class="download-button" download="dog_photo.jpg">
                        <img src="download symbol.png" alt="Download Icon">
                    </a>
                `;
                photoGallery.appendChild(photoCard);
            } else {
                alert("Failed to fetch dog photos. Please try again.");
            }
        });
    } catch (error) {
        alert("Failed to fetch dog photos. Please try again.");
    }
}

// Load breeds and add event listener for form submission
loadDogBreeds();
document.querySelector(".photo-generator-form").addEventListener("submit", generateRandomDogPhotos);