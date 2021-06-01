window.onload = function () {

  const url = 'https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52&query=',
        urlMoonPhase = 'http://api.farmsense.net/v1/moonphases/?d=',
        searchBtn = document.querySelector('.searchBtn'),
        searchTerm = document.querySelector('.searchTerm'),
        filmCard = document.querySelector('.filmCard');

  let   searchURL = '',
        mainContent = '',
        main = document.querySelector('#films'),
        timeMoon;


  searchBtn.onclick = function (e) {
    e.preventDefault();
    let value = searchTerm.value;
    searchURL = url + value + '&page=1';
    getMovies(searchURL);
  }


  let getMovies = function getMovies(url){
      fetch(url)
        .then(response => {
          if(response.status != 200){
              console.log('No problem!');
              return;
            }
            return response.json();
        })
        .then((films) => {
          showMovies(films)
        })
    }

let showMovies = function showMovies(films){
    films.results.forEach(film => {
      mainContent+=`
      <div class="col-lg-4 col-md-6 col-sm-1 film-heroku my-3">
        <div class="card">
        <div class="card-header text-light">
          <div class="card-title">
            <h2>${film.original_title}</h2>
            <h4>Release date: ${film.release_date}</h4>
          </div>
        </div>
        <div class="card-body" data-id="${film.id}">
          <img src="https://image.tmdb.org/t/p/w300${film.poster_path}">
          <div class="card-moonPhase">1</div>
          </div>
        </div>
      </div>`;
      timeMoon = Date.parse(`${film.release_date}`);
      getMoon(timeMoon, filmCard);
    });
    main.innerHTML = mainContent;
  }
};

  function getMoon(timeMoon){
    fetch(`http://api.farmsense.net/v1/moonphases/?d=${timeMoon}`)
    .then(response => {
        if (response.status != 200) {
          console.log('No problem!');
          return;
        }
        return response.json();
      })
      .then((data) =>{
        showMoon(data)
        console.log(`http://api.farmsense.net/v1/moonphases/?d=${timeMoon}`)
       })
  }

  function showMoon(data){
    data.forEach(element =>{

      const moonPhase = document.querySelector('.card-moonPhase');
      moonPhase.innerHTML = 'Phase Moon: ' + `${element.Phase}`;
    })
  }

