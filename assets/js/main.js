let searchText = '';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52&query=';
const urlMoonPhase = 'http://api.farmsense.net/v1/moonphases/?d=';
const urlImg = 'https://image.tmdb.org/t/p/w300';
const form = document.getElementsByClassName('form')[0];
const searchBtn = document.getElementsByClassName('searchBtn')[0];
const searchTerm = document.getElementsByClassName('searchTerm')[0]
const filmCard = document.getElementsByClassName('filmCard')[0];
let mainContent = '',
    main = document.querySelector('#films');


  form.addEventListener('submit', function(e){
    e.preventDefault();
    searchText = searchTerm.value;
    Movies(searchText);
    console.log(searchText);
    
  });

    function Movies(searchText){
      fetch(url + searchText + '&page=1')
      .then(response => {
        if(response.status != 200){
            console.log('No problem!');
            return;
          }
          return response.json();
      })
      .then(films =>{
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
              <div class="card-text"></div>
             </div>
            </div>
          </div>`;
          });
          console.log(films);
          main.innerHTML = mainContent;
      })
    }

    //Movies('car');
//
// function getMovies(searchText){
//   fetch(url + searchText + '&page=1')
//     .then(function (response) {
//       console.log(url + searchText + '&page=1')
//       console.log(response)
//       if(response.status != 200){
//         console.log('No problem!');
//         return;
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       console.log('data', data)
//       //SetMovies(data)
//     })
//     .catch(function (error) {
//       console.log('error', error)
//     })
// }

// function SetMovies(data){
//   const card = document.getElementsByClassName('card');
//   const cardImg = document.getElementsByClassName('card__img');
//   const cardName = document.getElementsByClassName('card__name');
//   const cardTime = document.getElementsByClassName('card__time');
//   data.forEach(films => {

//   })
// }




