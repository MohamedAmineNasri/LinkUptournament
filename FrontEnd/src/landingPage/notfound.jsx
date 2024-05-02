import React from 'react'
// import ThemeProvider from "../../theme";
import Header from '../components/landingpage/Header';
import Footer from '../components/landingpage/Footer';
import NotFoundView from './NotFoundView';
export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/*  Site header */}

            <Header />

            {/*  Page content */}
            <main className="flex-grow">

                {/* <ThemeProvider> */}
                    <NotFoundView />
                {/* </ThemeProvider> */}
            </main>

            {/*  Site footer */}
            <Footer />

        </div>




        )
}
