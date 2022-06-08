import { bookConstants } from "../constants/book.constants"

export const getAllBooks = (actualPage, favouritesBooks)=>{
    return async dispatch=>{
        dispatch({type: bookConstants.IS_LOADING_BOOKS});

        const res = await fetch(`https://gnikdroy.pythonanywhere.com/api/book/?page=${actualPage}`);
        const books = await res.json();

        const isAll = Math.floor(books.count/10)==actualPage;

        books.results.forEach((book)=>{
            book.isFavourite=true;
            if(favouritesBooks.indexOf(book)==-1){
                book.isFavourite = false;
            }
            
        });

        dispatch({type: bookConstants.GET_ALL_BOOKS, payload: books.results, isAll});
    }
}

export const openLoading=()=>{
    return async dispatch=>{
        dispatch({type: bookConstants.IS_LOADING_BOOKS});   
    }
}

export const setBookDetails=(book)=>{
    return async dispatch=>{
        dispatch({type: bookConstants.SET_BOOK_DETAILS, payload: book})
    }
}

export const searchBooks=(text, actualPage, favouritesBooks)=>{
    return async dispatch=>{
        dispatch({type: bookConstants.IS_LOADING_SEARCH});

        const res = await fetch(`https://gnikdroy.pythonanywhere.com/api/book/?page=${actualPage}&search=${text}`);
        var books = await res.json();

        const isAll = Math.floor(books.count/10)==actualPage;


        books.results.forEach((book)=>{
            book.isFavourite=true;
        });

        dispatch({type: bookConstants.SEARCH_BOOKS, payload: books.results, isAll});
    }
}

export const clearSearch=()=>{
    return async dispatch=>{
        dispatch({type: bookConstants.CLEAR_SEARCH});
    }
}