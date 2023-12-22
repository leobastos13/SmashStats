import { useEffect, useState} from "react";
import AppRoutes from "./routes/Routes";
import React from "react";
export const APIDataContext = React.createContext();

function App() {

  const APIKey = "5e3ff46648e7c783acc9b3b1e4e84d5a2c6aae7668ce981f0bddc811752144ed";

  const [rankingsMen, setRankingsMen] = useState([]);
  const [rankingsWomen, setRankingsWomen] = useState([]);

  useEffect(() => {
    getRankingsMen();
    getRankingsWomen(); 
  }, []);
  console.log(rankingsMen);
  console.log(rankingsWomen);

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
        value={{APIKey, rankingsMen, rankingsWomen}}>
          <AppRoutes></AppRoutes>   
      </APIDataContext.Provider>
    
  );
}

export default App;
