import { types } from '../types/types';
import movieService from '../../service/moviesService'
import { store } from '../store';
// optener las primeras peliculas o series
export const getMovies = () => (dispatch) => {
    dispatch({
        type: types.GET_MOVIES_REQUEST,
    });

    movieService.getMovies().then(
        (response) => {
            dispatch({
                type: types.GET_MOVIES_SUCCESS,
                payload: response,
            })
        },
        (error) => {
            dispatch({
                type: types.GET_MOVIES_FAILURE,
                payload: error,
            })
        }
    )
}
// Obtener peliculas o serie buscadas
export const getMovie = (search, type) =>  (dispatch) => {
    dispatch({
        type: types.GET_MOVIES_REQUEST,
        search
    });

    movieService.getMovie(search, type).then(
        (response) => {
            dispatch({
                type: types.GET_MOVIES_SUCCESS,
                payload: response,
            })
        },
        (error) => {
            dispatch({
                type: types.GET_MOVIES_FAILURE,
                payload: error,
            })
        }
    )
}
// Traer pelicula o serie especifica
export const getMovieDescription = (id) => (dispatch) => {
    dispatch({
        type: types.GET_MOVIE_REQUEST
    })

    movieService.descriptionMovie(id).then(
        (response) => {
            dispatch({
                type: types.GET_MOVIE_SUCCESS,
                payload: response,
            })
        },
        (error) => {
            dispatch({
                type: types.GET_MOVIE_FAILURE,
                payload: error
            })
        }
    )
}

// resetear los valores cuando una se busca una pelicula o serie especifica
export const resetMovie = () => (dispatch) => {
    dispatch({
        type: types.RESET_MOVIE
    })
}
// Enviar email 
export const sendEmail = (data) => (dispatch) => {
    dispatch({
        type: types.SENT_EMAIL_REQUEST
    })

    movieService.sentEmail(data).then(
        (response) => {
            dispatch({
                type: types.SENT_EMAIL_SUCCESS,
                payload: response,
            })
        },
        (error) => {
            dispatch({
                type: types.SENT_EMAIL_FAILURE,
                payload: error
            })
        }
    )
}
// resetear el envio de los emails
export const resetSent = () => (dispatch) => {
    dispatch({
        type: types.RESET_SENT
    })
}

// agregar a favoritos 
export const addFavorites = (item) => (dispatch) => {
    const { favorites } = store.getState().pelis
    const found = favorites.find(e => e.imdbID === item.imdbID);
    if (found === undefined) {
        const cpFavorites = [...favorites]
        dispatch({
            type: types.ADD_FAVORITES,
            payload: [item, ...cpFavorites]
        })
    } else {
        dispatch({
            type: types.OPEN_FAVORITES_EXISTS,
        })
    }  
}

export const removeFavorites = (item) => (dispatch) => {
    const { favorites } = store.getState().pelis

    const newFavorites = favorites.filter(e => e.imdbID !== item.imdbID)

    dispatch ({
        type: types.ADD_FAVORITES,
        payload: newFavorites
    })
}
