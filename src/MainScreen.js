

import { Backdrop, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { clearSearch, getAllBooks, openLoading, searchBooks, setBookDetails } from './store/actions/books.actions';
import { addToFavourite, removeFromFavourite } from './store/actions/favourites.actions';
import { Link } from 'react-router-dom';


function MainScreen(props){

    const dispatch = useDispatch();

    const books = useSelector(state=>state.books);
    const favourites = useSelector(state=>state.favourites);

    const [isFetching, setIsFetching] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [filtr, setFiltr] = useState('');


    function handleScroll() {
        if (
          (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight)
          &&(books.booksSearch.length==0?!books.isAll:!books.isAllSearch)
        ){
            setIsFetching(true);
        }
      }
    
      function getMorePosts() {
        setTimeout(() => {
            if(books.booksSearch.length==0){
                dispatch(getAllBooks(books.actualPage, favourites.books));
            }
            else{
                dispatch(searchBooks(filtr, books.actualPageSearch, favourites.books))
            }
            setIsFetching(false);
        }, 5000);
        dispatch(openLoading())
      }
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    useEffect(() => {
        if (!isFetching) return;
        getMorePosts();
      }, [isFetching]);

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={()=>{
                setOpenAlert(false);
            }}>
            Zamknij
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={()=>{
                setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return(
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '20px'}}>

            <div>
                <p>
                    <TextField id="outlined-basic" label="Fraza" variant="outlined" onChange={(e)=>{
                        setFiltr(e.target.value)
                    }} value={filtr}/>
                    <Button onClick={()=>{
                        dispatch(searchBooks(filtr, books.actualPageSearch, favourites.books));
                    }}>
                        Szukaj
                    </Button>
                </p>
                <p><Button onClick={()=>{
                    setFiltr('');
                    dispatch(clearSearch());
                    setIsFetching(true);
                }}>
                    Wszystko
                </Button></p>
                <p><Button onClick={()=>{
                    setOpenAlert(true);
                }}>
                    Filtruj
                </Button></p>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {books&&(books.booksSearch.length==0?books.books:books.booksSearch).map((product)=>{
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
                                    if(product.isFavourite){
                                        dispatch(removeFromFavourite(product));
                                    }
                                    else{
                                        dispatch(addToFavourite(product))
                                    }
                                }}>{!product.isFavourite?'Dodaj do ulubionych':'Usuń z ulubionych'}</Button></p>                           
                            </div>
                        </div>
                    );
                
            })}
            
            </div>
            <p>{books.isLoading?<CircularProgress color="inherit" style={{padding: '50px'}}/>:null}</p>

            <Dialog
                open={openAlert}
                onClose={()=>{
                    setOpenAlert(false);
                }}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle>Filtruj ksiązki</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Button>Język</Button>
                    <Button>Typ</Button>

                </DialogContent>

            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={books.isLoadingSearch}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default MainScreen;

