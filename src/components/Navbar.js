import '../styles/Navbar.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <ul className={'nav-menu'}>
                    <div className='nav-item'><Link to='/' className='nav-link'>Strona główna</Link></div>
                    <div className='nav-item'><Link to='/favourites' className='nav-link'>Ulubione</Link></div>
                    <div className='nav-item'>
                        <Link to='/favourites' className='nav-link'>
                            <FavoriteIcon style={{alignSelf: 'center'}}/>
                        </Link>
                    </div>
                </ul>
            </div>
        </nav>
    )
}
