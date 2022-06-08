import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainScreen from './MainScreen';
import Navbar from './components/Navbar';
import FavouritesScreen from './pages/FavouritesScreen';
import BookDetailsScreen from './pages/BookDetailsScreen';
import './firebase'

function App() {
  return (
    <div className="App" style={{marginTop:'80px'}}>
      <Router>
        <header>
          <Navbar/>
        </header>
        <Routes>
          <Route path='/' element={<MainScreen/>}/>
          <Route path='/favourites' element={<FavouritesScreen/>}/>
          <Route path='/book_details' element={<BookDetailsScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
