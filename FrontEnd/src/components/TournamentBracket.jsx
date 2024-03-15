import { Bracket } from 'react-tournament-bracket';

export const TournamentBracket = () => {
    // Define your final game data here or fetch it from an API
    const finalGame = {
      id: 'final',
      home: { seed: 1, score: 2, id: 'team1', name: 'Team 1' },
      visitor: { seed: 2, score: 1, id: 'team2', name: 'Team 2' },
      date: '2024-03-10T20:00:00Z', // Example date
      court: 'Main Court', // Example court
      title: 'Final Match', // Example title
      highlight: 'winner', // Highlight winner
    };
  
    return (
      <div>
        <h1>Tournament Bracket</h1>
        <Bracket game={finalGame} />
      </div>
    );
  };
  
export default TournamentBracket ; 