import { favouritesConstants } from "../constants/favourites.constants"


export const addToFavourite=(book)=>{
    return async dispatch=>{
        dispatch({type: favouritesConstants.ADD_TO_FAVOURITE, payload: book});
    }
}

export const removeFromFavourite=(book)=>{
    return async dispatch=>{
        dispatch({type: favouritesConstants.REMOVE_FROM_FAVOURITE, payload: book});
    }
}