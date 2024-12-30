/***********************************************************
  1) Artwork Data
     Keep all your images & descriptions together here.
***********************************************************/
const artworks = [
    {
      id: "artwork1",
      title: "Floral Still Life",
      images: [
        "images/artwork1_main.jpg", 
        "images/artwork1_alt1.jpg"
        // Add more if you like
      ],
      description: "A composition exploring color, texture, and form. Lorem ipsum..."
    },
    {
      id: "artwork2",
      title: "Ceramic Vessels",
      images: [
        "images/artwork2_main.jpg", 
        "images/artwork2_alt1.jpg"
      ],
      description: "Minimalist arrangement emphasizing organic shapes. Lorem ipsum..."
    },
    // Add more objects as you wish
  ];
  
  /***********************************************************
    2) DOMContentLoaded
       - On gallery page: generate gallery
       - On detail page: parse URL param, render detail
  ***********************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    // If we are on the gallery page, generate the gallery
    if (document.getElementById("galleryContainer")) {
      createGallery();
    }
  
    // If on detail page, render detail
    if (document.getElementById("detailContainer")) {
      renderDetail();
    }
  });
  
  /**
   * createGallery()
   * Generates clickable artwork images on the Gallery page
   */
  function createGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    galleryContainer.innerHTML = ""; // Clear existing
  
    artworks.forEach((art) => {
      // Create a gallery item
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("gallery-item");
  
      // Artwork thumbnail (use the first image in array as the main/preview)
      const img = document.createElement("img");
      img.src = art.images[0];
      img.alt = art.title;
  
      // Clicking on the image should go to detail page, passing the art ID
      img.addEventListener("click", () => {
        window.location.href = `detail.html?artId=${art.id}`;
      });
  
      // Artwork title
      const title = document.createElement("h3");
      title.textContent = art.title;
  
      // Insert elements
      itemDiv.appendChild(img);
      itemDiv.appendChild(title);
  
      // Append to gallery
      galleryContainer.appendChild(itemDiv);
    });
  }
  
  /**
   * renderDetail()
   * Looks at the URL (e.g. detail.html?artId=artwork2), extracts "artId",
   * finds the matching artwork in our array, and displays it.
   */
  function renderDetail() {
    // 1) Parse the query string, e.g. "?artId=artwork2"
    const params = new URLSearchParams(window.location.search);
    const artId = params.get("artId");
  
    // 2) Find the matching artwork object
    const foundArt = artworks.find((art) => art.id === artId);
  
    if (!foundArt) {
      // If nothing found, you could show an error message
      document.getElementById("detailContainer").innerHTML = "<p>Artwork not found.</p>";
      return;
    }
  
    // 3) Populate the detail page with the data
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailImagesContainer = document.getElementById("detailImages");
  
    detailTitle.textContent = foundArt.title;
    detailDescription.textContent = foundArt.description;
  
    // If multiple images exist, display all
    detailImagesContainer.innerHTML = ""; // clear previous
    foundArt.images.forEach((imgSrc) => {
      const imgEl = document.createElement("img");
      imgEl.src = imgSrc;
      imgEl.alt = foundArt.title;
      detailImagesContainer.appendChild(imgEl);
    });
  }
  