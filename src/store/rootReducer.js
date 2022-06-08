import { combineReducers } from "redux";
import booksReducer from "./reducers/books.reducer";
import favouritesReducer from "./reducers/favourites.reducer";


const rootReducer = combineReducers({
    books: booksReducer,
    favourites: favouritesReducer
});

export default rootReducer;