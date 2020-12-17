async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createGallery(container) {
  var _myGallery = cloudinary.galleryWidget({
    container: "#" + container.getAttribute("id"),
    cloudName: "dtgbbrxs0",
    carouselStyle: "none",
    aspectRatio: "16:9",
    mediaAssets: [
      {
        publicId: "robot5",
        mediaType: "image",
      },
    ],
    zoom: false,
    preload: ["image", "video"],
    placeholderImage: true,
    videoProps: {
      autoplay: false,
      controls: "play",
    },
    navigationButtonProps: {
      size: 30,
      shape: "round",
      iconColor: "#000",
      color: "#ffffff",
    },
  });
  await _myGallery.render();
  return _myGallery;
}

async function updateGallery(_myGallery, container) {
  var tags = container
    .getAttribute("data-tags")
    .split(";")
    .reduce((acc, curr) => {
      let [tag, mediaType = "image"] = curr.trim().split(":");
      acc.push({
        tag,
        mediaType,
      });
      return acc;
    }, []);

  await _myGallery.update({
    mediaAssets: tags,
  });
}

async function orderedShow(block) {
  let containers = block.querySelectorAll("[data-gallery='true']");

  var galleries = [];
  for (galleryContainer of containers) {
    if (!galleryContainer.getAttribute("data-loaded")) {
      try {
        galleries.push({
          gallery: await createGallery(galleryContainer),
          container: galleryContainer,
        });
      } catch (e) {}
    }
  }
  for (gallery of galleries) {
    await updateGallery(gallery.gallery, gallery.container);
    gallery.container.setAttribute("data-loaded", true);
  }
}

const itinSection = document.querySelector(".itin-section");
const loadSection = document.querySelector(".loading-section");
const blocks = document.querySelectorAll('[id^="BLOCK"]');

const observeItin = () => {
  const config = { attributes: true };
  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (
        mutation.target.classList.value === "loading-section" &&
        mutation.target.style.display === "none"
      ) {
        itinSection.style.opacity = 1;
      }
      if (!mutation.target.getAttribute("data-loaded")) {
        orderedShow(mutation.target);
        mutation.target.setAttribute("data-loaded", true);
      }
    }
  };

  const observer = new MutationObserver(callback);

  blocks.forEach((block) => observer.observe(block, config));
  observer.observe(loadSection, config);
};

const selectExperiences = () => {
  let buttons = document.querySelectorAll('[id="select-experience"]');

  itinSection.style.opacity = 0;
  itinSection.style.zIndex = -1;
  itinSection.style.transition = "all 1s ease";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      observeItin();
      itinSection.style.display = "block";
      orderedShow(blocks[0]);
    });
  });
};

selectExperiences();
