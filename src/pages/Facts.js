import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import TennisFacts from '../components/TennisFacts.json'
import "../styles/FactsStyles.css"

const Facts = () => {

    const [facts, setFacts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getRandomIndex = () => Math.floor(Math.random() * facts.length);

    useEffect(() => {
        console.log("Entrando no useEffect");
        setFacts(TennisFacts.Facts);
        const lastUpdateDate = localStorage.getItem('lastUpdateDate');
        const currentDate = new Date().toLocaleDateString();

        console.log("lastUpdateDate:", lastUpdateDate);
        console.log("currentDate:", currentDate);

        if (lastUpdateDate !== currentDate) {
            console.log("Atualizando fato...");
            const newIndex = getRandomIndex();
            setCurrentIndex(newIndex);
            localStorage.setItem("lastUpdateDate", currentDate);
            localStorage.setItem("currentIndex", newIndex);
        } else {
            console.log("Recuperando fato existente...");
            const storedIndex = localStorage.getItem("currentIndex")

            if (storedIndex !== null) {
                setCurrentIndex(parseInt(storedIndex, 10));
            }
        }
    }, []);

    console.log(facts.length);
    
    let display = facts.length > currentIndex && (
        <div className="DisplayFacts">
            <div className="leftSide">
                <img src={facts[currentIndex].image} alt={`Fact ${currentIndex + 1}`} style={{maxWidth: '640px', maxHeight: '447px'}}></img>
            </div>
            <div className="rightSide">
                <p>{facts[currentIndex].fact}</p>
            </div>
        </div>
    )

    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-center mt-4"><strong>Tennis Facts</strong></h1>
            <hr />
            <p className="text-center text-decoration-underline">Here are some facts about tennis you may find interesting!</p>
            {display}
        </div>
        
        
    )
}
export default Facts