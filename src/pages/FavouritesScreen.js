
import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setBookDetails } from '../store/actions/books.actions';
import { removeFromFavourite } from '../store/actions/favourites.actions';

export default function FavouritesScreen() {

    const dispatch = useDispatch();

    const favourites = useSelector(state=>state.favourites);

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {favourites&&favourites.books.length!=0?favourites.books.map((product)=>{
                    return(
                        <div style={{width: '22%', background: '#96aaab', margin: '15px', borderRadius: '25px'}}>
                            <div style={{padding: '10px', justifyContent: 'center', textAlign: 'center', display: 'flex',
                                flexDirection: 'column', height: '100%'}}>
                                <h2 style={{flexWrap: 'wrap', wordWrap: 'break-word'}}>{product.title}</h2>
                                <Link to='/book_details' style={{textDecoration: 'none'}}>
                                    <Button onClick={()=>{
                                        dispatch(setBookDetails(product))
                                    }}>
                                        Szczegóły
                                    </Button>
                                </Link>
                                <p><Button onClick={()=>{
                                    dispatch(removeFromFavourite(product))
                                }}>Usuń z ulubionych</Button></p>                           
                            </div>
                        </div>
                    );
                
            }):<div>
                <h1>Nie masz jeszcze zadnej ulubionej ksiązki</h1>
            </div>}</div>
        </div>
    )
}
