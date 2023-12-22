import { useEffect, useState } from "react"
import { db } from "../services/firebaseConfig"
import NavBar from "../components/NavBar"
import TennisFacts from '../components/TennisFacts.json'
import "../styles/FactsStyles.css"
import { doc, getDoc, setDoc } from "firebase/firestore"


const Facts = () => {

    const factsCollectionRef = doc(db, 'facts', 'tkA9R4CgjmNHmq7oA93k');
    const getRandomIndex = () => Math.floor(Math.random() * facts.length);

    const [facts, setFacts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setFacts(TennisFacts.Facts);

        const factUpdateRef = factsCollectionRef;
        getDoc(factUpdateRef).then((docSnapshot) => {
            const currentDate = new Date().toLocaleDateString();

            if (docSnapshot.exists()) {
                const lastUpdateDate = docSnapshot.data().lastUpdateDate;

                if (lastUpdateDate !== currentDate) {
                    const newIndex = getRandomIndex();
                    setCurrentIndex(newIndex);
                    setDoc(factUpdateRef, { 
                        lastUpdateDate: currentDate, 
                        currentIndex: newIndex });
                } else {
                    const data = docSnapshot.data();
                    
                    if (data) {
                        setCurrentIndex(data.currentIndex);
                    }
                }
            } else {
                const newIndex = getRandomIndex();
                setCurrentIndex(newIndex);
                setDoc(factUpdateRef, { lastUpdateDate: currentDate, currentIndex: newIndex });
            }
        });
      },[factsCollectionRef]); 

      let display = "";
    //console.log(facts.length);
    if (currentIndex !== 0) {
          display = facts.length > currentIndex && (
        <div className="DisplayFacts">
            <div className="leftSide">
                <img src={facts[currentIndex].image} alt={`Fact ${currentIndex + 1}`} style={{maxWidth: '640px', maxHeight: '447px'}}></img>
            </div>
            <div className="rightSide">
                <p>{facts[currentIndex].fact}</p>
            </div>
        </div>
    )
    }
  
    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-center mt-2"><strong> Daily Tennis Facts</strong></h1>
            <hr style={{color: '#63ed85', opacity: '3'}} />
            <p className="mb-3 text-center">Here are some facts about tennis you may find interesting. Every day a different fact is shown! </p>
            {display}
        </div>
        
        
    )
}
export default Facts