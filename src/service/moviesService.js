import config from './config';

// servicio para optener todas las peliculas o series
function getMovies() {
    const requestOptions = {
        method: 'GET',
    }
    return fetch(`http://www.omdbapi.com/?s=inception&apikey=${config.apiKey}&`, requestOptions)
    .then(response => response.json())
    .then(data =>  {
       return data
    });
}
// Servicio para hacer la busqueda de series y peliculas
function getMovie(search, type ) {
    const requestOptions = {
        method: 'GET',
    }
    return fetch(`http://www.omdbapi.com/?s=${search}&type=${type}&apikey=${config.apiKey}&`, requestOptions)
    .then(response => response.json())
    .then(data => {
        return data
    });
}
// ervicio para optener la info de una pelicula o serie
function descriptionMovie(id) {
    const requestOptions = {
        method: 'GET',
    }
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${config.apiKey}&`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data
        });
}
// envio del email
function sentEmail(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    return fetch('http://127.0.0.1:5000/api/form', requestOptions)
    .then(response => response.json())
    .then(res => {
        return res
    });
}
const movieService = {
    getMovies,
    getMovie,
    descriptionMovie,
    sentEmail,
};

export default movieService;