import { bookConstants } from "../constants/book.constants"
import { favouritesConstants } from "../constants/favourites.constants";

const initalState={
    isLoading: false,
    error: null,
    books: [],
    actualPage: 1,
    isAll: false,
    bookDetails: {},
    booksSearch: [],
    actualPageSearch: 1,
    isAllSearch: false,
    isLoadingSearch: false
}

const booksReducer=(state=initalState, action)=>{
    switch(action.type){
        case bookConstants.IS_LOADING_BOOKS:{
            state={
                ...state,
                isLoading: true
            }
            break;
        }
        case bookConstants.IS_LOADING_SEARCH:{
            state={
                ...state,
                isLoadingSearch: true
            }
            break;
        }
        case bookConstants.GET_ALL_BOOKS:{
            state={
                ...state,
                isLoading: false,
                error: null,
                books: state.books.concat(action.payload),
                actualPage: state.actualPage+1,
                isAll: action.isAll
            }
            break;
        }
        case bookConstants.ON_ERROR_BOOKS:{
            state={
                ...state,
                isLoading: false,
                error: action.error
            }
            break;
        }
        case favouritesConstants.ADD_TO_FAVOURITE:{
            var books = state.books;
            var booksSearch = state.booksSearch;
            console.log(booksSearch);
            var index = books.indexOf(action.payload);
            var indexSearch = booksSearch.indexOf(action.payload);
            if(index!==-1){
                books[index].isFavourite = true;
            }
            if(indexSearch!==-1){
                booksSearch[indexSearch].isFavourite=true;
            }
            state={
                ...state,
                books: books,
                booksSearch: booksSearch
            }
            break;
        }
        case favouritesConstants.REMOVE_FROM_FAVOURITE:{
            var books = state.books;
            var booksSearch = state.booksSearch;
            var index = books.indexOf(action.payload);
            var indexSearch = booksSearch.indexOf(action.payload);
            if(index!==-1){
                books[index].isFavourite = false;
            }
            if(indexSearch!=-1){
                booksSearch[indexSearch].isFavourite=false;
            }
            state={
                ...state,
                books: books,
                booksSearch: booksSearch
            }
            break;
        }
        case bookConstants.SET_BOOK_DETAILS:{
            state={
                ...state,
                bookDetails: action.payload
            }
            break;
        }
        case bookConstants.SEARCH_BOOKS:{
            state={
                ...state,
                booksSearch: state.booksSearch.concat(action.payload),
                isAllSearch: action.isAll,
                isLoading: false,
                isLoadingSearch: false,
                error: null,
                actualPageSearch: state.actualPageSearch+1
            }
            break;
        }
        case bookConstants.CLEAR_SEARCH:{
            state={
                ...state,
                booksSearch: [],
                isAllSearch: false,
                isLoading: false,
                isLoadingSearch: false,
                error: null,
                actualPageSearch: 1,
                actualPage: 1,
                books: [],
            }
        }
    }
    return state;
}

export default booksReducer