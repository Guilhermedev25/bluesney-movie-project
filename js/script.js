const API_URL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fa75a49a0388b7208e905f710994540&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=7fa75a49a0388b7208e905f710994540&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const nav = document.querySelector('nav.nav');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && nav.classList.contains('open')) {
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}



getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}
function showMovies(movies){
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
             <img src="${IMG_PATH + poster_path}" alt="${title}" class="movie-info">
             <div class="movie-info">
            <h3>${title}</h3>
             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        `
        main.appendChild(movieEl);
    });
}
function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    } else if(vote >= 5){
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {         
        window.location.reload();
    }
});
