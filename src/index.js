//IMPORTS

import "./styles.css";

//_________________
//KEY 🤫
const GIPHY_API_KEY = "i2wULYQ80lHDkPvEOgNOTRKk0UaAmGJ2";

//_________________

//APP START

const refreshBtn = document.querySelector("#refresh-btn");

(async function initialLoad() {
  console.log("hi");
  let url1 = await getNewGifType("cat");
  refreshBtn.setAttribute("data-url", url1);
  console.log("hi3");
})();

async function getNewGifType(searchWord) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchWord}&limit=1`;
  await getNewGif(url);
  return url;
}

async function getNewGif(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(reponse, "hi");
      return;
    }
    const result = await response.json();
    console.log(result);
    if (!result.data[0].images.original) {
      console.error("No original man...");
    }
    showGif(result.data[0].images.original.url);
  } catch (error) {
    console.error(error);
    alert("Something happened boss...");
  }
}

function showGif(url) {
  const image = document.querySelector("img");
  image.setAttribute("src", url);
}

/* EVENT LISTENERS */

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-word");

searchBtn.addEventListener("click", async () => {
  const searchWord = searchInput.value;
  if (searchWord.length === 0) {
    alert("Enter a key word... anyone.");
    return;
  }
  const url = await getNewGifType(searchWord);

  searchInput.value = "";

  refreshBtn.setAttribute("data-url", `${url}`);
});

refreshBtn.addEventListener("click", async () => {
  const url = refreshBtn.dataset.url;
  await getNewGif(url);
});
