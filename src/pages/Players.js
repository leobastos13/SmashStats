import React, { useState } from "react"
import NavBar from "../components/NavBar"
import { APIDataContext } from "../App"
import SearchBar from "../components/SearchBar"
import PlayerProfile from "../components/PlayerProfile"

const Players = () => {

    const { rankingsMen, rankingsWomen, APIKey } = React.useContext(APIDataContext);

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    
    const namesMen = rankingsMen.map(item => item.player);
    const namesWomen = rankingsWomen.map(item => item.player);
    const allNames = [...namesMen, ...namesWomen];
    
    const keysMen = rankingsMen.map(item => item.player_key);
    const keysWomen = rankingsWomen.map(item => item.player_key);
    const allKeys = [...keysMen, ...keysWomen];

    const players = [];

    for (let i = 0; i < allKeys.length; i++) {
        const player = {
            player_key: allKeys[i],
            player: allNames[i]
        };
        players.push(player);
    }

    //console.log(players);

    const getPlayer = async (playerKey) => {
        try {
            const response = await fetch(`https://api.api-tennis.com/tennis/?method=get_players&player_key=${playerKey}&APIkey=${APIKey}`);
      
            if (!response.ok) {
              throw new Error("A API não está ativa através do estado HTTP 200");
            }
            const selectedPlayer = await response.json();
            setSelectedPlayer([...selectedPlayer.result]);
            //console.log(selectedPlayer.result);
            return selectedPlayer.result;
      
          } catch (error) {
              throw new Error(`Erro na requisição: ${error.message}`);
          }
    }
    
    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-center mt-2"><strong>Players</strong></h1>
            <hr style={{color: '#63ed85', opacity: '3'}} />
            <p className="text-center">Search to check the profile of a specific tennis player!</p>
            <SearchBar
                playersNames={allNames}
                players={players}
                getPlayer={getPlayer}
            ></SearchBar>
            {selectedPlayer && <PlayerProfile player={selectedPlayer}></PlayerProfile>}
        </div>
        
        
    )
}
export default Players