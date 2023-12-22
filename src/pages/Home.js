import { Link } from "react-router-dom";
import "../styles/HomeStyles.css"
import NavBar from "../components/NavBar";


const Home = () => {
    
    return (
        <div style={{paddingBottom: '50px'}}>
            <NavBar></NavBar>
            <h1 className="text-center mt-2"><strong>Home</strong></h1>
            <hr style={{ color: '#63ed85', opacity: '3' }} />
            <div className="text-center">
                <h3>Welcome to SmashStats!</h3>
                <p>This is the site for you if you're a tennis fan and are seeking to catch up to the paradigm of the professional tennis nowadays.</p>
                <p>Discover the best of the best in the tennis world and be updated with fastest information about your favourite players. </p>
            </div>
            <div className="Home">
                <div className="LeftSide">
                    <img className="Img" src="assets/icons/alcaraz.jpg"></img>
                    <caption style={{position: 'absolute', top: '310px', left: '155px'}}>Spanish superstar, Carlos Alcaraz</caption>
                </div>
                <div className="RightSide">
                    <p>You can search for the a specific player to get see his or her profile. In this profile you can check information like some data about the player, the stats and the tiles won.</p>
                </div>
                <button className="Button border-0 rounded-3">
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/players'>Players</Link>
                </button>
            </div>
            <div className="Home2">
                <div className="LeftSide">
                    <p style={{marginLeft: '65px'}} className="text-center">Here you can check the rankings of any player ranked in the ATP or WTA.</p>
                </div>
                <button className="Button border-0 rounded-3">
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/rankings'>Rankings</Link>
                </button>
                <div className="RightSide">
                    <img className="Img" src="assets/icons/swiatek.jpg"></img>
                    <caption style={{position: 'absolute', top: '910px', right: '177px'}}>World nº 1 in the WTA circuit, Iga Swiatek</caption>
                </div>
            </div>
            <div className="Home3">
                <div className="LeftSide">
                    <img className="Img" src="assets/icons/federer.jpg"></img>
                    <caption style={{position: 'absolute', top: '1345px', left: '105px'}}>20x times Grand Slam champion, Roger Federer</caption>
                </div>
                <div className="RightSide">
                    <p className="text-center">Every day you can read a random tennis fact about the sport, players, famous tournaments, and iconic moments in tennis history</p>
                </div>
                <button style={{width: '100px'}} className="Button border-0 rounded-3">
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/facts'>Daily Facts</Link>
                </button>
            </div>
            <div className="Home4">
                <div className="LeftSide">
                <p className="text-center">After searching for a player you can add them to your favourites and you will get more content about that ones that you add</p>
                </div>
                <button className="Button border-0 rounded-3">
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/favourites'>Favourites</Link>
                </button>
                <div className="RightSide">
                    <img className="Img" src="assets/icons/sousa.jpg"></img>
                    <caption style={{position: 'absolute', top: '1725px', right: '175px'}}>Best portuguese player of all time, João Sousa</caption>
                </div>
            </div>
        </div>

    )
}
export default Home;