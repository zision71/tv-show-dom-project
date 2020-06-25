// You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  // makePageForEpisodes(allEpisodes);
  display(allEpisodes);
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
  el.textContent = displayOptions;
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
    sectionMain.appendChild(h5Els).textContent = `${
      episode.name
    } S${episode.season
      .toString()
      .padStart(2, 0)} E${episode.number.toString().padStart(2, 0)}`;
    sectionMain.appendChild(imgEls).src = episode.image.medium;
    sectionMain.appendChild(pEls).textContent = episode.summary;
  });
}
// ---------------------------------------------------------------------------------------------------------------
window.onload = setup;
