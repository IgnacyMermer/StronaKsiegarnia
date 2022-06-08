import { favouritesConstants } from "../constants/favourites.constants"

const initialState={
    isLoading: false,
    error: null,
    books: [],
}

const favouritesReducer = (state=initialState, action)=>{
    switch(action.type){
        case favouritesConstants.IS_LOADING_FAVOURITES:{
            state={
                ...state,
                isLoading: true
            }
            break;
        }
        case favouritesConstants.ADD_TO_FAVOURITE:{
            const temp = (action.payload.isFavourite = true)
            if(state.books.indexOf(temp)==-1){
                state={
                    ...state,
                    isLoading: true,
                    error: null,
                    books: [...state.books, action.payload]
                }
            }
            
            break;
        }
        case favouritesConstants.ON_ERROR_FAVOURITES:{
            state={
                isLoading: false,
                error: action.error
            }
            break;
        }
        case favouritesConstants.REMOVE_FROM_FAVOURITE:{
            var books = state.books.filter(book=>{
                return book!=action.payload
            })
            state={
                books: books
            }
            break;
        }
    }
    return state;
}

export default favouritesReducer;