import React from 'react'
import Header from './Header';
import Footer from './Footer';

function Layout ({children}){
    return(
        <>
        <Header/>
        <div className='main-container'>
        {children}
        </div>
        <Footer/>
        </>
    )
}

export default Layout;

