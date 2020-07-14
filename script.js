// You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const allShows = getAllShows();
function setup() {
  // makePageForEpisodes(allEpisodes);
  displayShowsListing(allShows);
  // display(allEpisodes);
  // displayFetch();
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");

//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

const rootElem = document.getElementById("root");
// ************************************SEARCHBAR*****************************************************************

const searchBar = document.getElementById("searchBar");

const sectionMain = document.getElementsByTagName("section");

const displayNo = document.getElementById("displayNo");

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();

  let filteredResult = allEpisodes.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchString) ||
      item.summary.toLowerCase().includes(searchString)
    );
  });

  display(filteredResult);

  displayNo.innerText = `Displaying ${filteredResult.length}/${allEpisodes.length} episodes`;
});
// ****************************************************************************************************************

// ================================SELECT========================================================================

let selector = document.getElementById("selector");
console.log(selector);

for (let i = 0; i < allEpisodes.length; i++) {
  let el = document.createElement("option");
  let displayOptions = ` S${allEpisodes[i].season
    .toString()
    .padStart(2, 0)}E${allEpisodes[i].number.toString().padStart(2, 0)} - ${
    allEpisodes[i].name
  }`;
  el.innerHTML = displayOptions;
  el.value = displayOptions;
  selector.appendChild(el);
}

selector.addEventListener("change", (event) => {
  let selectString = event.target.value;

  let selectFilteredResult = allEpisodes.filter((i) => {
    return (
      ` S${i.season.toString().padStart(2, 0)}E${i.number
        .toString()
        .padStart(2, 0)} - ${i.name}` === selectString
    );
  });

  display(selectFilteredResult);
});

// ==========================================================================================================================

//--------------------------------------------DISPLAY-------------------------------------------------------------------------
function display(array) {
  rootElem.innerHTML = "";
  array.forEach((episode) => {
    const sectionMain = document.createElement("section");
    const h5Els = document.createElement("h5");
    const pEls = document.createElement("p");
    const imgEls = document.createElement("img");

    rootElem.appendChild(sectionMain);
    sectionMain.appendChild(h5Els).innerHTML = `${
      episode.name
    } S${episode.season
      .toString()
      .padStart(2, 0)} E${episode.number.toString().padStart(2, 0)}`;
    sectionMain.appendChild(imgEls).src = episode.image.medium;
    sectionMain.appendChild(pEls).innerHTML = episode.summary;
  });
}
// ---------------------------------------------------------------------------------------------------------------

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DISPLAY FETCH DATA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function displayFetch() {
  fetch("https://api.tvmaze.com/shows/82/episodes ")
    .then((response) => response.json())
    .then((data) => fetchData(data));
}

function fetchData(array) {
  rootElem.innerHTML = "";
  array.forEach((episode) => {
    const sectionMain = document.createElement("section");
    const h5Els = document.createElement("h5");
    const pEls = document.createElement("p");
    const imgEls = document.createElement("img");

    rootElem.appendChild(sectionMain);
    sectionMain.appendChild(h5Els).innerHTML = `${
      episode.name
    } S${episode.season
      .toString()
      .padStart(2, 0)} E${episode.number.toString().padStart(2, 0)}`;
    if (episode.image !== null) {
      sectionMain.appendChild(imgEls).src = episode.image.medium;
    }

    sectionMain.appendChild(pEls).innerHTML = episode.summary;
  });

  let selector = document.getElementById("selector");

  console.log(selector);

  console.log(array);
  selector.options.length = 0;
  for (let i = 0; i < array.length; i++) {
    let el = document.createElement("option");
    let displayOptions = ` S${array[i].season
      .toString()
      .padStart(2, 0)}E${array[i].number.toString().padStart(2, 0)} - ${
      array[i].name
    }`;
    el.textContent = displayOptions;
    el.value = displayOptions;
    selector.appendChild(el);
  }

  selector.addEventListener("change", (event) => {
    let selectString = event.target.value;

    let selectFilteredResult = array.filter((i) => {
      return (
        ` S${i.season.toString().padStart(2, 0)}E${i.number
          .toString()
          .padStart(2, 0)} - ${i.name}` === selectString
      );
    });

    display(selectFilteredResult);
  });
  const searchBar = document.getElementById("searchBar");

  const sectionMain = document.getElementsByTagName("section");

  const displayNo = document.getElementById("displayNo");

  searchBar.addEventListener("keyup", (e) => {
    console.log(e);
    let searchString = e.target.value.toLowerCase();

    let filteredResult = array.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.summary.toLowerCase().includes(searchString)
      );
    });

    display(filteredResult);

    displayNo.innerText = `Displaying ${filteredResult.length}/${allEpisodes.length} episodes`;
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function createButton() {
  let showel = document.getElementById("showButton");
  // showel.appendChild(buttonelement);

  showel.style.display = "inline";
  // showSearchBar.style.display = "none";
  showel.addEventListener("click", setup);
}

// ========================================SHOW SELECTOR============================================
let showSelector = document.getElementById("fectchselector");
let nameArray = allShows.sort((a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
});

for (let i = 0; i < nameArray.length; i++) {
  let fetchel = document.createElement("option");

  let fetchdisplayOptions = `${nameArray[i].name}`;

  fetchel.innerHTML = fetchdisplayOptions;
  fetchel.value = `${nameArray[i].id}`;
  showSelector.appendChild(fetchel);
}

showSelector.addEventListener("change", (event) => {
  let fetchselectString = event.target.value;
  console.log(fetchselectString);
  function displayshowandepisode() {
    fetch(`https://api.tvmaze.com/shows/${fetchselectString}/episodes `)
      .then((response) => response.json())
      .then((data) => fetchData(data));
  }
  displayshowandepisode();
  createButton();
});

// *************************************Level 500 Show Listing**************************************************************

function displayShowsListing(array) {
  searchBar.style.display = "none";
  selector.style.display = "none";
  let showel = document.getElementById("showButton");
  showel.style.display = "none";
  rootElem.innerHTML = "";
  array.forEach((episode) => {
    const sectionMain = document.createElement("section");
    const h5Els = document.createElement("h5");
    h5Els.addEventListener("click", () => {
      let fetchselectString = episode.id;

      console.log(fetchselectString);
      function displayshowandepisode() {
        fetch(`https://api.tvmaze.com/shows/${fetchselectString}/episodes `)
          .then((response) => response.json())
          .then((data) => fetchData(data));
      }
      displayshowandepisode();

      showSelector.style.display = "none";
      showSearchBar.style.display = "none";

      createButton();

      // buttonEl.style.display = "block";
      searchBar.style.display = "inline";
      selector.style.display = "inline";
      // let showel = document.getElementById("showButton");
      // showel.appendChild(buttonelement);
      // showel.style.display = "inline";
      // showel.addEventListener("click", setup);
    });
    showSelector.style.display = "block";
    showSearchBar.style.display = "inline";

    h5Els.setAttribute("class", "showHeading");

    const pEls = document.createElement("p");
    const imgEls = document.createElement("img");
    const h4Els = document.createElement("h4");

    rootElem.appendChild(sectionMain);
    sectionMain.appendChild(h5Els).innerHTML = `${episode.name} `;
    if (episode.image !== null) {
      sectionMain.appendChild(imgEls).src = episode.image.medium;
    }

    sectionMain.appendChild(pEls).innerHTML = episode.summary;
    sectionMain.appendChild(
      h4Els
    ).innerHTML = `Rated : ${episode.rating.average}<br>
    Genres: ${episode.genres} <br> Status: ${episode.status}<br> Runtime: ${episode.runtime}`;
  });
}

// ***************************************************************************************************************************
// ==================================================Level 500 step 5=========================================================
let showSearchBar = document.getElementById("showSearchBar");

showSearchBar.addEventListener("keyup", (e) => {
  let showSearchstring = e.target.value.toLowerCase();

  let showfilteredResult = allShows.filter((item) => {
    return (
      item.name.toLowerCase().includes(showSearchstring) ||
      item.summary.toLowerCase().includes(showSearchstring) ||
      item.genres.map((i) => i.toLowerCase()).includes(showSearchstring)
    );
  });
  displayShowsListing(showfilteredResult);
  showsSearchno.innerText = `Displaying ${showfilteredResult.length}/${allShows.length} Shows`;
});

window.onload = setup;
