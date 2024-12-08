const imageFolder = "img"; // Change this to your folder path
const aboutText = "accelerate towards destruction";

document.addEventListener("DOMContentLoaded", () => {
    const themeSlider = document.getElementById("themeSlider");
    const aboutLink = document.getElementById("aboutLink");
    const imageTable = document.getElementById("imageTable").getElementsByTagName('tbody')[0];
    
    let page = 1;
    const imagesPerPage = 10;

    // Theme toggle
    const toggleTheme = () => {
        document.body.classList.toggle("dark", themeSlider.checked);
        document.body.classList.toggle("light", !themeSlider.checked);
    };
    themeSlider.addEventListener("change", toggleTheme);
    toggleTheme(); // Set initial theme

    // Load images dynamically
    const loadImages = async () => {
        try {
            const response = await fetch(`${imageFolder}/list.json?page=${page}`);
            if (!response.ok) throw new Error("Error fetching image list");
            const images = await response.json();
            
            images.forEach(imgSrc => {
                const row = imageTable.insertRow();
                const cell = row.insertCell();
                const img = document.createElement("img");
                img.src = `${imageFolder}/${imgSrc}`;
                cell.appendChild(img);
            });

            page++;
        } catch (error) {
            console.error("Error loading images:", error);
        }
    };

    // Infinite scroll
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.addEventListener("scroll", () => {
        if (galleryContainer.scrollTop + galleryContainer.clientHeight >= galleryContainer.scrollHeight) {
            loadImages();
        }
    });

    // Load initial images
    loadImages();

    // ABOUT link
    aboutLink.addEventListener("click", () => {
        alert(aboutText);
    });
});
