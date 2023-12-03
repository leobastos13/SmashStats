import { useEffect, useState} from "react";
import AppRoutes from "./routes/Routes";
import React from "react";
export const APIDataContext = React.createContext([]);

function App() {

  const APIKey = "e6cf8066690f186248736c0fb2d1123e910c48052f0b8b828a2d5ce85e4a2147";

  //const [players, setPlayers] = useState([]);
  const [rankingsMen, setRankingsMen] = useState([]);
  const [rankingsWomen, setRankingsWomen] = useState([]);

  useEffect(() => {
    //getPlayers();
    getRankingsMen();
    getRankingsWomen();
    //console.log(players);
  }, []);

  console.log(rankingsMen);
  console.log(rankingsWomen);

 /* const getPlayers = async () => {
    try {
      const response = await fetch(`https://api.api-tennis.com/tennis/?method=get_players&player_key=137&APIkey=${APIKey}`);

      if (!response.ok) {
        throw new Error("A API não está ativa através do estado HTTP 200");
      }
      const players = await response.json();
      setPlayers([...players.result]);
      return players.result;

    } catch (error) {
        throw new Error(`Erro na requisição: ${error.message}`);
    }
  }*/

  const getRankingsMen = async () => {
    try {
      const response = await fetch(`https://api.api-tennis.com/tennis/?method=get_standings&event_type=ATP&APIkey=${APIKey}`);

      if (!response.ok) {
        throw new Error("A API não está ativa através do estado HTTP 200");
      }
      const rankingsMen = await response.json();
      setRankingsMen([...rankingsMen.result]);
      return rankingsMen.result;

    } catch (error) {
        throw new Error(`Erro na requisição: ${error.message}`);
    }
  }

  const getRankingsWomen = async () => {
    try {
      const response = await fetch(`https://api.api-tennis.com/tennis/?method=get_standings&event_type=WTA&APIkey=${APIKey}`);

      if (!response.ok) {
        throw new Error("A API não está ativa através do estado HTTP 200");
      }
      const rankingsWomen = await response.json();
      setRankingsWomen([...rankingsWomen.result]);
      return rankingsWomen.result;

    } catch (error) {
        throw new Error(`Erro na requisição: ${error.message}`);
    }
  }

  return (
      <APIDataContext.Provider
        value={{rankingsMen, rankingsWomen}}>
          <AppRoutes></AppRoutes>   
      </APIDataContext.Provider>
        
      
      
  );
}

export default App;
