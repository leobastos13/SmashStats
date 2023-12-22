import React from "react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { db, useAuth } from "../services/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

const Favourites = () => {

    const APIKey = 'AIzaSyB4d9aK7WYyO8i8lZpZW-Vb8UYdngefIBA';
    //const APIKey = 'AIzaSyDTyEjibc8GctMEeuRNgy0oynKslUiySjA';
    //const APIKey = 'AIzaSyAXL9r81WJkeOm154_tduY0L0jtGi5m84E';
    const currentUser = useAuth();
    const favouritesCollectionRef = collection(db, 'favourites');
    const [favourites, setFavourites] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);

    useEffect(() => {
        const getFavourites = async () => {
            const data = await getDocs(favouritesCollectionRef);
            setFavourites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getFavourites();
    }, []);

    console.log(favourites);

    useEffect(() => {
        const fetchVideos = async (lastName) => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        maxResults: 3,
                        key: APIKey,
                        q: 'tennistv',
                        type: 'channel',
                    },
                });

                if (response.data.items.length === 0) {
                    console.error(`No channel found for ${lastName}`);
                }

                const channelId = response.data.items[0].id.channelId;

                const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        maxResults: 3,
                        key: APIKey,
                        channelId: channelId,
                        q: lastName,
                        type: 'video',
                    },
                });

                return videosResponse.data.items;
            } catch (error) {
                console.error('Error fetching videos:', error.message);
                return [];
            }
        };

        const UpdateSelectedVideos = async () => {
            const videos = [];
            for (const player of favourites) {
                if (player.userID === currentUser.uid) {
                    const name = player.playerName;
                    let mapName = name.map((item) => {
                        return {
                            playerName: item
                        }
                    })
                    const objName = { "playerName": JSON.stringify(mapName) };
                    const { playerName } = objName;
                    const jsonArray = JSON.parse(playerName);
                    const fullName = jsonArray[0].playerName;
                    const lastName = fullName.split('. ')[1];
                    const playerVideos = await fetchVideos(lastName);
                    videos.push({
                        playerName: player.playerName,
                        videos: playerVideos,
                        id: player.id
                    });
                }
            }
            setSelectedVideos(videos);
        }
        UpdateSelectedVideos();

    }, [favourites, currentUser.uid]); 

    const RemoveFavourites = async (id) => {
        console.log(id);
        const favouritesDoc = doc(db, 'favourites', id);
        try {
            await deleteDoc(favouritesDoc);
            const updatedFavourites = [...favourites];
            const index = updatedFavourites.findIndex(item => item.id === id);
            if (index !== -1) {
                updatedFavourites.splice(index, 1);
            }
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error('Error removing favourites', error);
        }
    }

    const displayFavourites = selectedVideos.map((videos, index) => (
        <div key={index} style={{ paddingBottom: '45px', paddingTop: '20px' }}>
            <div style={{ display: 'grid', justifyItems: 'flex-start', marginLeft: '25px' }} id="video">
                <h3 style={{ marginBottom: '-20px' }}>{videos.playerName}</h3>
                <Button variant="outlined" endIcon={<DeleteOutlineIcon></DeleteOutlineIcon>} style={{ gridColumn: '1/4', position: 'relative', top: '-10px', left: '1220px', backgroundColor: '#63ed85', color: 'white', borderColor: '#1d4050' }} onClick={() => RemoveFavourites(videos.id)}>Remove from favourites</Button>
                {videos.videos.map((video, indx) => (
                    <div key={indx}>
                        <iframe title="video player" src={`https://www.youtube.com/embed/${video.id.videoId}`} />
                    </div>
                ))}
            </div>
        </div>
    ))

    if (favourites.length) {
        return (
            <div>
                <NavBar></NavBar>
                <h1 className="text-center mt-2"><strong>Favourites</strong></h1>
                <hr style={{ color: '#63ed85', opacity: '3' }} />
                <p className="text-center">Check some videos about your favourite players!</p>
                {displayFavourites}
            </div>
        )
    } else {
        return (
            <div>
                <NavBar></NavBar>
                <h1 className="text-center mt-2"><strong>Favourites</strong></h1>
                <hr style={{ color: '#63ed85', opacity: '3' }} />
                <p className="text-center">Check some videos about your favourite players!</p>
                <h1 className="text-center mt-5">You still haven't a player to the favourites!</h1>
            </div>
        )
    }
}
export default Favourites