
import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToFavourite, removeFromFavourite } from '../store/actions/favourites.actions';

export default function BookDetailsScreen(props) {

    const books = useSelector(state=>state.books);
    const dispatch = useDispatch();

    var book;

    return (
        <div style={{paddingTop: '20px'}}>
            <p><h2>Tytuł:{'\t'+books.bookDetails.title}</h2></p>
            {books.bookDetails.description!=null?<p><h5>Opis:{'\t'+books.bookDetails.description}</h5></p>:null}    
            <Button onClick={()=>{
                if(books.bookDetails.isFavourite){
                    dispatch(removeFromFavourite(books.bookDetails))
                }
                else{
                    dispatch(addToFavourite(books.bookDetails))
                }
                
            }}>
                {books.bookDetails.isFavourite?'Usuń z ulubionych':'Dodaj do ulubionych'}
            </Button>
            <p style={{marginBottom: '50px'}}>
                <span style={{display: 'block', float:'left', paddingLeft: '25px'}}>Licencja: {books.bookDetails.license}</span>
                <span style={{display: 'block', float:'right',  paddingRight: '25px'}}>Pobrań: {books.bookDetails.downloads}</span>
            </p>
            <p>Język: {books.bookDetails.languages.map((language, index)=>{
                return(
                    <span>
                        {language}{index!=books.bookDetails.languages.length-1?', ':''}
                    </span>
                )
            })}</p>
            <p style={{paddingLeft: '20px', paddingRight: '20px'}}>Postacie: {books.bookDetails.subjects.map((subject, index)=>{
                return(
                    <span>
                        {subject}{index!=books.bookDetails.subjects.length-1?', ':''}
                    </span>
                )
            })}</p>
            <p>Kategorie: {books.bookDetails.bookshelves.map((bookshelf, index)=>{
                return(
                    <span>
                        {bookshelf}{index!=books.bookDetails.bookshelves.length-1?', ':''}
                    </span>
                )
            })}</p>
            <p>Osoby: {books.bookDetails.agents.map((agent, index)=>{
                return(
                    <span>
                        {'\n'+agent.type+':\t'}{agent.person}{index!=books.bookDetails.agents.length-1?', ':''}
                    </span>
                )
            })}</p>
            <p>Wersje: {books.bookDetails.resources.map((resource, index)=>{
                return(
                    <p>
                        <span>Typ: {resource.type+'\t'}</span>
                        <a href={resource.uri}>{resource.uri}</a>
                    </p>
                )
            })}</p>
        </div>
    )
}
