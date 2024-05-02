import React from "react";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Tournament from "./Tounament";


const Tournaments = () => {

  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        
          // If search input is empty, fetch all tournaments
         const response = await axios.get('http://localhost:8000/tournament/all');
        
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
  
    fetchTournaments();
  }, []);
  
  return (<div>
    <Header />
    <section className="relative py-20">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-20 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4 text-black-2">Tournaments</h2>
            <p className="text-xl text-gray-600">
            
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */} 
            
            {tournaments.map((tournament, index) => (
            <div key={index}
            onClick={() => setSelectedTournament(tournament)}  className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
               <img 
                    src={`http://localhost:8000/${tournament.logo}`} 
                    alt={tournament.name} 
                    className="w-20 h-20 p-1 -mt-1 mb-2 rounded-full "
                    
                  />
             
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-black dark:text-white">
              {tournament.name}
              </h4>
              <p className="text-gray-600 text-center">
              {tournament.type}              </p>
              
              <p className={`text-center ${
                  tournament.status === 'Coming Soon' ? 'text-orange-600' :
                  tournament.status === 'Started' ? 'text-green-600' :
                  tournament.status === 'Ended' ? 'text-red-600' : ''
                }`}>
                  {tournament.status}
                </p>
            </div>
               ))}
          
          </div>
        </div>
      </div>
      
    </section>
    {/* Render the Tournament component if a tournament is selected */}
    {selectedTournament && <Tournament tournamentId={selectedTournament._id} />}
    <Footer />
    </div>
  );
};

export default Tournaments;
