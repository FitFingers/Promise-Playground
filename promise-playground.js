const REQ = new XMLHttpRequest();
let movieList = [];


// NORMAL XHR METHOD WITHOUT PROMISES
// function getMovieList() {
//   REQ.onload = () => {
//     movieList = JSON.parse(REQ.response).map(m => [m["title"], m["release_date"]]);
//     console.log(movieList); // This takes a second, but logs a list of all movies and dates.
//   }

//   REQ.open("GET", "https://ghibliapi.herokuapp.com/films", true);
//   REQ.send();

//   console.log(movieList); // This is executed before the function getMovieList can update the movieList variable as it is asynchronous. To fix this, I will have to either continue the function inside the REQ.onload block or use promises.
// }


// USING FETCH AND PROMISES TO ACCESS API JSON DATA
// function getMovieList() {
//   fetch("https://ghibliapi.herokuapp.com/films")
//     .then((response) => response.json())
//     .then((myJson) => movieList = myJson.map(m => [m["title"],m["release_date"]]));

//   console.log(movieList);
// This version is easily readable, however the log of movieList is a blank array as it is not updated by the time it is called. Subsequent button clicks do show that is is being updated, just a little too late; that's where async/await come in.
// }


// USING ASYNC/AWAIT WHEN UPDATING VARIABLES
async function getMovieList() {
  await fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((json) => movieList = json);

  renderMovieList(movieList);
  // As we can see from simply adding these two words, the code doesn't move past the fetch line until it has completed its task there. this is different to synchronising the functions as it doesn't block concurrent functions from and thus won't freeze the browser.
}






function renderMovieList(list) {
  list.map(m => createMovie(m["title"], m["description"]));
}

function createMovie(title, desc) {
  const NEW_MOVIE = document.createElement("li");
  const NEW_TITLE = document.createElement("h2");
  const MOVIE_TITLE = document.createTextNode(title);
  const MOVIE_TEXT = document.createTextNode(desc);
  NEW_MOVIE.classList.add("movie-thumbnail");
  NEW_MOVIE.appendChild(NEW_TITLE);
  NEW_TITLE.appendChild(MOVIE_TITLE);
  NEW_MOVIE.appendChild(MOVIE_TEXT);
  renderMovie(NEW_MOVIE);
}

function renderMovie(movie) {
  document.getElementById("movie-collection-display").appendChild(movie);
}

function searchMovies() {
  [...document.getElementsByClassName("movie-thumbnail")].map(m => m.style.display = "none");
  const QUERY = document.getElementById("search-bar").value;
  let tempList = movieList.slice(0);
  document.getElementById("search-bar").value = "";
  // tempList = Object.values(tempList[0]).map(p => p.includes("orphan"));
  tempList = tempList.filter(m => (Object.values(m).map(v => v.includes(QUERY))).indexOf(true) != -1);
  // tempList = tempList.filter(m => Object.values(m));
  renderMovieList(tempList);
}

// function renderText(input) {
//   target === true ?
//     document.getElementById("rendered-text").innerHTML = input :
//     document.getElementById("second-text").innerHTML = input;
//   target = !target;
// }

// document.getElementById("input-submit").addEventListener("click", submitText);
document.getElementById("load-movies").addEventListener("click", getMovieList);
// document.getElementById("search-submit").addEventListener("click", searchMovies);
