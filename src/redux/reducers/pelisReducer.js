import { types } from '../types/types'
const initialState = {
    requestData: false,
    requestDataDescription: false,
    requestSent: false,
    data: {},
    dataDescription: {},
    dataSent: {},
    error: {},
    errorDescription: {},
    errorSent: {},
    searchLabel: 'Inception',
    favorites: [],
    existsFavorites: false,
}

export const pelisReducer = (state = initialState, action) => {
    switch (action.type) {
        // Casos cuando se optiene la lista de peliculas o series
        case types.GET_MOVIES_REQUEST:
            return {
                ...state,
                requestData: true,
                searchLabel: action.search,
            }
        case types.GET_MOVIES_SUCCESS:
            return {
                ...state,
                requestData: false,
                data: action.payload.Search,
                error: {},
            }
        case types.GET_MOVIES_FAILURE:
            return {
                ...state,
                requestData: false,
                data: {},
                error: action.payload,
            }
        // Casos cuando se optiene una pelicula o serie especifica
        case types.GET_MOVIE_REQUEST:
            return {
                ...state,
                requestDataDescription: true,
            }
        case types.GET_MOVIE_SUCCESS:
            return {
                ...state,
                requestDataDescription: false,
                dataDescription: action.payload,
                error: {},
            }
        case types.GET_MOVIE_FAILURE:
            return {
                ...state,
                requestDataDescription: false,
                dataDescription: {},
                errorDescription: action.payload,
            }
        // Reseteo de las variables dato caso ya no se necesite
        case types.RESET_MOVIE:
            return {
                ...state,
                requestDataDescription: false,
                dataDescription: {},
                errorDescription: {},
                existsFavorites: false
            }
        // Casos para el envio de email respecto ala pelicula o serie
        case types.SENT_EMAIL_REQUEST:
            return {
                ...state,
                requestSent: true,
            }
        case types.SENT_EMAIL_SUCCESS:
            return {
                ...state,
                requestSent: false,
                dataSent: action.payload,
                errorSent: {}
            }
        case types.SENT_EMAIL_FAILURE:
            return {
                ...state,
                requestSent: false,
                dataSent: {},
                errorSent: action.payload
            }
        // resete de envio del email
        case types.RESET_SENT:
            return {
                ...state,
                requestSent: false,
                dataSent: {},
                errorSent: {},
            }
        case types.ADD_FAVORITES:
            return {
                ...state,
                favorites: action.payload,
            }
        case types.OPEN_FAVORITES_EXISTS:
            return {
                ...state,
                existsFavorites: true,
            }
        default:
            return state
    }
}