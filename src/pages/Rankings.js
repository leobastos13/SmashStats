import NavBar from "../components/NavBar"
import React from 'react';
import {useState} from 'react'
import Button from '@mui/material/Button';
import Men200Rankings from "../components/Men200Rankings";
import Men400Rankings from "../components/Men400Rankings";
import Men600Rankings from "../components/Men600Rankings";
import Men800Rankings from "../components/Men800Rankings";
import Men1000Rankings from "../components/Men1000Rankings";
import Men1200Rankings from "../components/Men1200Rankings";
import Men1400Rankings from "../components/Men1400Rankings";
import Men1600Rankings from "../components/Men1600Rankings";
import Men1800Rankings from "../components/Men1800Rankings";
import Men2000Rankings from "../components/Men2000Rankings";
import Women200Rankings from "../components/Women200Ranking";
import Women400Rankings from "../components/Women400Rankings";
import Women600Rankings from "../components/Women600Rankings";
import Women800Rankings from "../components/Women800Rankings";
import Women1000Rankings from "../components/Women1000Rankings";
import Women1200Rankings from "../components/Women1200Rankings";
import Women1400Rankings from "../components/Women1400Rankings";

const Rankings = () => {

    const [currentTableMen, setCurrentTableMen] = useState(0);
    const [currentTableWomen, setCurrentTableWomen] = useState(0);

    const HandleMenRankings = (event) => {
        event.preventDefault();

        if (document.getElementById('MenRanking').className === 'd-none') {
            document.getElementById('MenRanking').className = 'd-block';
            document.getElementById('WomenRanking').className= 'd-none';
        }
    }

    const HandleMenNext = () => {
        const nextTableMen = currentTableMen + 1;
        if (nextTableMen < 10) {
            setCurrentTableMen(nextTableMen);
        }
    }

    const HandleMenPrevious = () => {
        const previousTableMen = currentTableMen - 1;
        if (previousTableMen >= 0) {
            setCurrentTableMen(previousTableMen);
        }
    }

    const HandleWomenRankings = (event) => {
        event.preventDefault();
        
        if (document.getElementById('WomenRanking').className === 'd-none') {
            document.getElementById('WomenRanking').className = 'd-block';
            document.getElementById('MenRanking').className = 'd-none';
        }
    }

    const HandleWomenNext = () => {
        const nextTableWomen = currentTableWomen + 1;
        if (nextTableWomen < 7) {
            setCurrentTableWomen(nextTableWomen);
        }
    }

    const HandleWomenPrevious = () => {
        const previousTableWomen = currentTableWomen - 1;
        if (previousTableWomen >= 0) {
            setCurrentTableWomen(previousTableWomen);
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-center mt-2"><strong>Rankings</strong></h1>
            <hr />
            <p className="mb-3 text-center">
                <b>Note: </b>
                As the ATP/WTA do not stand or support acts of war and aggression towards other countries, the russian and belarusian players are stripped of their country designation, having their nationality called "World".
            </p>
            <div className="text-center">
                <button onClick={HandleMenRankings}> Men's Singles Rankings</button>
                <button onClick={HandleWomenRankings}>Women's Singles Rankings</button>
            </div>
            <div id="MenRanking" className="d-block">
                <div>
                    {currentTableMen === 0 && <Men200Rankings></Men200Rankings>}
                </div> 
                <div>
                    {currentTableMen === 1 && <Men400Rankings></Men400Rankings>}
                </div>
                <div>
                    {currentTableMen === 2 && <Men600Rankings></Men600Rankings>}
                </div>
                <div>
                    {currentTableMen === 3 && <Men800Rankings></Men800Rankings>}
                </div>
                <div>
                    {currentTableMen === 4 && <Men1000Rankings></Men1000Rankings>}
                </div>
                <div>
                    {currentTableMen === 5 && <Men1200Rankings></Men1200Rankings>}
                </div>
                <div>
                    {currentTableMen === 6 && <Men1400Rankings></Men1400Rankings>}
                </div>
                <div>
                    {currentTableMen === 7 && <Men1600Rankings></Men1600Rankings>}
                </div>
                <div>
                    {currentTableMen === 8 && <Men1800Rankings></Men1800Rankings>}
                </div>
                <div>
                    {currentTableMen === 9 && <Men2000Rankings></Men2000Rankings>}
                </div>
                <Button id="MenNext" onClick={HandleMenNext} style={{position: 'absolute', bottom: '5px', right: '358px'}} className={currentTableMen === 9 ? 'd-none' : ''}>Next</Button>
                <Button id="MenPrevious" onClick={HandleMenPrevious} style={{position: 'absolute', bottom: '5px', left: '360px'}} className={currentTableMen === 0 ? 'd-none' : ''}>Previous</Button>
            </div>
            <div id="WomenRanking" className="d-none">
                <div>
                    {currentTableWomen === 0 && <Women200Rankings></Women200Rankings>}
                </div>
                <div>
                    {currentTableWomen === 1 && <Women400Rankings></Women400Rankings>}
                </div>
                <div>
                    {currentTableWomen === 2 && <Women600Rankings></Women600Rankings>}
                </div>
                <div>
                    {currentTableWomen === 3 && <Women800Rankings></Women800Rankings>}
                </div>
                <div>
                    {currentTableWomen === 4 && <Women1000Rankings></Women1000Rankings>}
                </div>
                <div>
                    {currentTableWomen === 5 && <Women1200Rankings></Women1200Rankings>}
                </div>
                <div>
                    {currentTableWomen === 6 && <Women1400Rankings></Women1400Rankings>}
                </div>
                <Button id="WomenNext" onClick={HandleWomenNext} style={{position: 'absolute', bottom: '5px', right: '358px'}} className={currentTableWomen === 6 ? 'd-none' : ''}>Next</Button>
                <Button id="WomenPrevious" onClick={HandleWomenPrevious} style={{position: 'absolute', bottom: '5px', left: '360px'}} className={currentTableWomen === 0 ? 'd-none' : ''}>Previous</Button>
            </div>

        </div>
    )
}
export default Rankings