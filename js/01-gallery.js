import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);
// Change code below this line
const gallery = document.querySelector(".gallery");
const galleryItem = galleryItems
  .map(({ preview, original, description }, index) => {
    //
    return `
  <div class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</div>
`;
  })
  .join("");
gallery.insertAdjacentHTML("beforeend", galleryItem);
// const items = []; второй вариант тоже рабочий

// galleryItems.forEach((element) => {
//   const galleryItem = document.createElement("div");
//   galleryItem.className = "gallery__item";
//   const galleryLink = document.createElement("a");
//   galleryLink.className = "gallery__link";
//   galleryLink.href = element.original;
//   const galleryImage = document.createElement("img");
//   galleryImage.className = "gallery__image";
//   galleryImage.src = element.preview;
//   galleryImage.setAttribute("data-source", element.original);
//   galleryImage.alt = element.description;

//   galleryItem.append(galleryLink);
//   galleryLink.append(galleryImage);
//   items.push(galleryItem);
// });

// gallery.append(...items);

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const selectedImage = e.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `<img src="${selectedImage}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscape);
      },
      onclose: (instance) => {
        window.removeEventListener("keydown", onEscape);
      },
    }
  );

  instance.show();

  function onEscape(e) {
    if (e.key === "Escape") {
      instance.close();
      return;
    }
  }
});
