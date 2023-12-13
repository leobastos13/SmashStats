import React from "react"
import { useState } from "react";
import "../styles/SearchBarStyles.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ players, getPlayer }) => {

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    
    const HandleFilter = (event) => {
        const search = event.target.value;
        setSearchUser(search);
        const newFilter = players.filter((item) => {
            return item.player.toLowerCase().includes(search.toLowerCase());
        });

        if (search === "") {
            setFilteredResults([]);
        } else {
            setFilteredResults(newFilter);
        }
    }

    const DeleteSearch = () => {
        setFilteredResults([]);
        setSearchUser("");
    }

    const HandlePlayerSelect = (playerKey) => {
        getPlayer(playerKey); 
        document.getElementById('displayResults').style.display = 'none';
    }

    let displayResults = filteredResults.length !== 0 && (
        <div id="displayResults" className="DisplayResults">
            {filteredResults.slice(0, 15).map((item, index) => {
                return (
                    <a key={index} className="result" onClick={() => HandlePlayerSelect(item.player_key)}>
                        <p>{item.player}</p>
                    </a>
                )
            })}
        </div>
    );

    return (
        <div>
            <div style={{marginLeft: '38px'}} id="search" className="search">
                <div className="searchInput">
                    <input onChange={HandleFilter} value={searchUser} type="text" placeholder= "Search for a player..."></input>
                    <div className="icons">
                        {filteredResults.length === 0 ? (
                            <SearchIcon></SearchIcon>   
                        ) : (
                            <CloseIcon id="deleteButton" onClick={DeleteSearch}></CloseIcon>
                            
                        )}
                    </div>
                </div>
                {displayResults}
            </div>
        </div>    
    )

}
export default SearchBar