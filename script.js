// Night Mode 

const toggle = document.querySelector(".switch input");
const logo = document.getElementById("logo")
const select = document.getElementById("select")

toggle.addEventListener("change", function() {
  if (this.checked) {
    document.body.style.backgroundColor = "#212121";
    document.body.style.color = "white";
    logo.style.color = "white"
    select.style.color = "white"
    select.style.backgroundColor = "#212121"
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    logo.style.color = "black"
    select.style.color = "black"
    select.style.backgroundColor = "transparent"
  }
});

// Search Function 

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const word = document.querySelector(".word")
const wordSection = document.querySelector(".word-section")
const phonetic = document.querySelector(".pronunciation")
const definitionContainer = document.querySelector('.generated-definitions')
const meaningBody = document.querySelector('.meaning-body')
const playBtn = document.querySelector(".play-btn")
let pronunciationAudio
const audio = document.getElementById("audio-pronunciation")

searchInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
  
  searchButton.addEventListener("click", () => {
    // fetch the value of the search input
    const searchValue = searchInput.value;
    console.log(searchValue)
    searchInput.value = ""
    // do something with the search value (e.g. send it to the server to get results)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data[0])
    pronunciationAudio = data[0].phonetics.find(phonetic => phonetic.audio).audio;
    const meaning = data[0].meanings.map(meaning => {
      const definition = meaning.definitions.map(definition => {
        wordSection.innerHTML = `<section class="word-section">
        <div class="word-section-left">
            <h1 class="word">${data[0].word}</h1>
            <p class="pronunciation">${data[0].phonetics[1].text}</p>
        </div>
        <div class="word-section-right">
            <audio id="audio-pronunciation" src="${pronunciationAudio}"></audio>
            <button class="play-btn"><i class="fa-solid fa-play"></i></button>
        </div>
    </section>`
        return `⁠<li>${definition.definition}</li>`;
      }).join("");
      return `
        <article class="definition">
          <div class="definition-header">
            <p class="part-of-speech">${meaning.partOfSpeech}</p> 
            <hr id="hr"> 
          </div>
          <section>
            <h1 class="meaning-header">Meaning</h1>
              <div class="meaning-body">
                <ul>
                  ${definition}
                </ul>
              </div>
            </section>
          </article>
        `;
    }).join("");
    definitionContainer.innerHTML = "";
    definitionContainer.insertAdjacentHTML("beforeend", meaning);
  }).catch(error => {
    wordSection.innerHTML = ""
    console.error(error);
    definitionContainer.innerHTML = `<div class="error-msg"><h1>Oops... I can't find "${searchValue}" in this dictionary!!</h1><p id="error-img"><i class="fa-solid fa-file-circle-exclamation"></i></p></div>`
  });
  });

  // Font Selector 

  const fontDropDown = document.getElementById("select");
  const body = document.querySelector("body")

  fontDropDown.addEventListener("change", function(event){
    body.style.fontFamily = event.target.value;
  })

  // Resolve Caching Issues 

  let timestamp = new Date().getTime();