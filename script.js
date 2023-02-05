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
    fetch()
  });