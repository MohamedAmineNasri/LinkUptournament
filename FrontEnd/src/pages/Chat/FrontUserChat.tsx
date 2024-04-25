import React, { useState } from "react";

import Header from "../../components/landingpage/Header";
import Hero from "../../components/landingpage/Hero";
import FeaturesBlocks from "../../components/landingpage/FeaturesBlocks";
import Features from "../../components/landingpage/Features";
import Testimonials from "../../components/landingpage/Testimonials";
import Newsletter from "../../components/landingpage/Newsletter";
import Footer from "../../components/landingpage/Footer";
import Challenges from "./challengeFrontUser";
import { Link } from "react-router-dom";
const FrontUserChat = () => {
    const [activeTab, setActiveTab] = useState('Ongoing');
    

    return (
        <>
        <main className="grow">
            <div
            className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
            >
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                <Header />
                {/* <div>
                    {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4"></h1> <Challenges status="Ongoing"  /></div>}
                            {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                            {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                </div> */}
                <main className="flex-grow container mx-auto space-y-12">
                    <div className="pt-36">
                        <div className="px-4 md:px-8">
                            <h1 className="text-3xl font-bold text-left mb-6 mb-1.5 text-2xl font-semibold text-black dark:text-white">Browse ChatRooms :</h1>
                        </div>
                    </div>
                    {/*search */}
                    <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                        <div className="relative shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-center justify-center p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true"
                                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input type="text" id="simple-search"
                                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                                placeholder="Search" required="" />
                                        </div>
                                    </form>
                                </div>
                                {/* Button to create challenge */}
                                {/* {isLoggedIn() && userRole === "company" && ( */}
                                    <div className="flex items-center mb-4">
                                        {/* <Link to="/challenges/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Challenge
                                        </Link> */}
                                    </div>
                                {/* )} */}

                            
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex space-x-4 mb-4">
                            {/* <button
                                className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => handleTabClick('Ongoing')}
                            >
                                Ongoing
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => handleTabClick('Completed')}
                            >
                                Completed
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => handleTabClick('Upcoming')}
                            >
                                Upcoming
                            </button> */}
                        </div>

                        <div>
                    {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4">Ongoing Challenges</h1> <Challenges status="Ongoing" /></div>}
                            {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                            {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                        </div>
                    </div>

        

                    <div className="mx-auto max-w-screen-2xl py-12 px-4 md:px-8">
                        
                        {/* Render other content here */}
                    </div>

                </main> 
            </div>
            </div>
        </main>
        <Footer/>
        </>
        );
    };

export default FrontUserChat;