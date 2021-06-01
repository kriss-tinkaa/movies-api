window.onload = function () {

  const url = 'https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52&query=',
        urlMoonPhase = 'http://api.farmsense.net/v1/moonphases/?d=',
        searchBtn = document.querySelector('.searchBtn'),
        searchTerm = document.querySelector('.searchTerm');

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
        const CardBlock = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('h2');
        const realese = document.createElement('p');
        const timeMoon = Date.parse(`${film.release_date}`);

        CardBlock.classList.add('card', 'col-lg-4', 'col-md-6', 'col-sm-1', 'my-3');
        title.classList.add('card-title')
        
        title.innerHTML =`${film.original_title}`;
        image.src = `https://image.tmdb.org/t/p/w300${film.poster_path}`;
        realese.innerHTML = `Release date: ${film.release_date}`;

        CardBlock.appendChild(title);
        CardBlock.appendChild(image);
        CardBlock.appendChild(realese);
        main.appendChild(CardBlock);

        getMoonPhase(timeMoon, CardBlock);


      });
      console.log(timeMoon);

    }
  };

  let getMoon = function getMoon(timeMoon, CardBlock){
      fetch(`http://api.farmsense.net/v1/moonphases/?d=${timeMoon}`)
      .then(response => {
          if (response.status != 200) {
            console.log('No problem!');
            return;
          }
          return response.json();
        })
        .then((data) =>{
          showMoon(data, CardBlock)
        })
    }

  let showMoon = function showMoon(data, CardBlock){
    data.forEach(element =>{ 
      const moonPhaseBlock = `<div class="card-phaseMoon" data-id="Phase: ${element.Phase}">`;
      CardBlock.appendChild(moonPhaseBlock);
    })
  }

