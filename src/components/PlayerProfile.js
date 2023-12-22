import React from "react"
import { useState } from "react";
import { APIDataContext } from "../App";
import { db } from "../services/firebaseConfig";
import { useAuth } from "../services/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import PlayerStats from "./PlayerStats";
import PlayerTilesSingles from "./PlayerTitlesSingles";
import PlayerTilesDoubles from "./PlayerTitlesDoubles";
import '../styles/PlayerProfileStyles.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Alert, AlertTitle } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const PlayerProfile = ({ player }) => {

    const [overviewButtonDisabled, setOverviewButtonDisabled] = useState(true);
    const [statsButtonDisabled, setStatsButtonDisabled] = useState(false);
    const [titlesButtonDisabled, setTitlesButtonDisabled] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#63ed85',
            }
        },
    })
    
    // adicionar aos favoritos
    const currentUser = useAuth();
    const favouritesCollectionRef = collection(db, 'favourites');
    
    const AddFavourites = async () => {
        const playerID = player.map((item) => (item.player_key));
        
        const querySnapshot = await getDocs(
            query(favouritesCollectionRef,
                where('userID', '==', currentUser.uid),
                where('playerID', 'array-contains', playerID[0])
            )
        );

        if (querySnapshot.size === 0) {
            await addDoc(favouritesCollectionRef, {
                userEmail: currentUser.email,
                userID: currentUser.uid,
                playerName: player.map((item) => (item.player_name)),
                playerID: playerID,
            })
            document.getElementById('addButton').style.display = 'none';   
            document.getElementById('alertSuccess').style.display = 'block';
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else {
            document.getElementById('addButton').style.display = 'none';
            document.getElementById('alertWarning').style.display = 'block';
            setTimeout(() => {
                window.location.reload();
            }, 2000);    
        }
        
    }
    
    // obter o ranking para mostrar no perfil
    const { rankingsMen, rankingsWomen } = React.useContext(APIDataContext);
    const allRankings = [...rankingsMen, ...rankingsWomen];

    const playersRanks = allRankings.map(item1 => {
        const playerKey = player.find(item2 => item2.player_key === item1.player_key);
        if (playerKey) {
            return {
                rank: item1.place
            }
        }
    });

    const playerRank = [];

    for (let i = 0; i < playersRanks.length; i++) {
        if (playersRanks[i] !== undefined) {
            playerRank.push(playersRanks[i]);
        }
    }

    let getRank = playerRank.map((item, index) => (
        <p style={{ marginTop: '68px' }} key={index}>{item.rank}</p>
    ));

    // obter a idade do jogador
    let mapBday = player.map((item) => {
        return item.player_bday;
    });

    const obj = { "date": JSON.stringify(mapBday) };
    const { date } = obj;
    let yearString = date.substring(8);
    let yearNumber = parseInt(yearString);
    const currentYear = new Date();
    let age = currentYear.getFullYear() - yearNumber;

    let displayOverview = player.map((item, index) => (
        <div className="playerOverview" key={index}>
            <div className="nameImg">
                <h1>{item.player_name}</h1>
                {item.player_logo != null ? (
                    <img src={item.player_logo}></img>
                ) : (
                    <img src="assets/icons/nopicture.jpg" alt="player profile"></img>
                )}
            </div>
            <div className="infoCollumns">
                <b>Rank:</b>
                <p style={{ marginTop: '0px' }}>(singles)</p>
                {getRank}
            </div>
            <div className="infoCollumns">
                <b>Country:</b>
                <p>{item.player_country}</p>
            </div>
            <div className="infoCollumns">
                <b>Age:</b>
                {age < 50 ? (
                    <p>{age}</p>
                ) : (
                    <p>Unknown</p>
                )}
            </div>
            <div className="infoCollumns">
                <b>Birthday:</b>
                {item.player_bday != "01.01.1970" && item.player_bday != null ? (
                    <p>{item.player_bday}</p>
                ) : (
                    <p>Unknown</p>
                )}
            </div>
        </div>
    ))

    const ShowOverview = () => {
        document.getElementById('overview').style.display = 'block';
        document.getElementById('stats').style.display = 'none';
        document.getElementById('titles').style.display = 'none';
        setOverviewButtonDisabled(true);
        setStatsButtonDisabled(false);
        setTitlesButtonDisabled(false);
    }

    const ShowStats = () => {
        document.getElementById('stats').style.display = 'block';
        document.getElementById('overview').style.display = 'none';
        document.getElementById('titles').style.display = 'none';
        setStatsButtonDisabled(true);
        setOverviewButtonDisabled(false);
        setTitlesButtonDisabled(false);
    }

    const ShowTitles = () => {
        document.getElementById('titles').style.display = 'block';
        document.getElementById('stats').style.display = 'none';
        document.getElementById('overview').style.display = 'none';
        setTitlesButtonDisabled(true);
        setStatsButtonDisabled(false);
        setOverviewButtonDisabled(false);
    }

    const ShowSinglesGraph = () => {
        document.getElementById('singlesGraph').style.display = 'block';
        document.getElementById('doublesGraph').style.display = 'none';
    }

    const ShowDoublesGraph = () => {
        document.getElementById('singlesGraph').style.display = 'none';
        document.getElementById('doublesGraph').style.display = 'block';
    }

    return (
        <div>
            <div style={{ marginTop: '100px' }}>
                <ThemeProvider theme={theme}>
                    <Button color="primary" id="showOverview" onClick={ShowOverview} disabled={overviewButtonDisabled}>Overview</Button>
                    <Button color="primary" onClick={ShowStats} disabled={statsButtonDisabled}>Career Stats</Button>
                    <Button color="primary" onClick={ShowTitles} disabled={titlesButtonDisabled}>Titles</Button>
                </ThemeProvider>
                <Button variant="outlined" endIcon= {<FavoriteBorderIcon></FavoriteBorderIcon>} id="addButton" onClick={AddFavourites} style={{position: 'absolute', right: '80px', top: '320px', backgroundColor: '#63ed85', color: 'white', borderColor: '#1d4050'}}>Add to favourites</Button>
                <Alert id="alertSuccess" style={{display: 'none', backgroundColor: 'white', position: 'absolute', right: '80px', top: '264px'}} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    The player was added to your favourites!
                </Alert>
                <Alert id="alertWarning" style={{display: 'none', backgroundColor: 'white', position: 'absolute', right: '80px', top: '264px'}} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    The player was already in your favourites!
                </Alert>
            </div>
            <div id="overview" className="profile">
                {displayOverview}
            </div>
            <div style={{ display: 'none' }} id="stats" className="profile">
                <PlayerStats player={player}></PlayerStats>
            </div>
            <div style={{ display: 'none' }} id="titles" className="profile">
                <div>
                    <div id='singlesGraph' style={{textAlign: 'center', marginRight: '50px', marginLeft: '50px' }}>
                        <IconButton onClick={ShowSinglesGraph} size="large" style={{position: 'relative', top: '43.5px', left: '270px', color: 'white'}}>
                            <ArrowForwardIosIcon fontSize="inherit"></ArrowForwardIosIcon>
                        </IconButton>
                        <PlayerTilesSingles player={player}></PlayerTilesSingles>  
                    </div>
                    <div id='doublesGraph' style={{ display: 'none',  textAlign: 'center', marginRight: '50px', marginLeft: '50px', color: 'white'}}>
                        <IconButton onClick={ShowDoublesGraph} size="large" style={{position: 'relative', top: '43.5px', right: '270px'}}>
                            <ArrowBackIosIcon fontSize="inherit"></ArrowBackIosIcon>
                        </IconButton>
                        <PlayerTilesDoubles player={player}></PlayerTilesDoubles>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlayerProfile