import '../styles/PlayerProfileStyles.css';
import Divider from '@mui/material/Divider';

const PlayerStats = ({ player }) => {

    let hardWinsSingles = 0;
    let clayWinsSingles = 0;
    let grassWinsSingles = 0;
    let hardLossesSingles = 0;
    let clayLossesSingles = 0;
    let grassLossesSingles = 0;
    let totalMatchesWonSingles = 0;
    let totalMatchesLossesSingles = 0;
    let hardWinsDoubles = 0;
    let clayWinsDoubles = 0;
    let grassWinsDoubles = 0;
    let hardLossesDoubles = 0;
    let clayLossesDoubles = 0;
    let grassLossesDoubles = 0;
    let totalMatchesWonDoubles = 0;
    let totalMatchesLossesDoubles = 0;

    let mapStats = player.map((item) => {
        return item.stats;
    })

    let allStats = [].concat(...mapStats);

    let singlesStats = allStats.filter(item => item.type === 'singles');
    singlesStats.forEach(item => {
        hardWinsSingles += parseInt(item.hard_won) || 0;
        clayWinsSingles += parseInt(item.clay_won) || 0;
        grassWinsSingles += parseInt(item.grass_won) || 0;
        hardLossesSingles += parseInt(item.hard_lost) || 0;
        clayLossesSingles += parseInt(item.clay_lost) || 0;
        grassLossesSingles += parseInt(item.grass_lost) || 0;
        totalMatchesWonSingles += parseInt(item.matches_won) || 0;
        totalMatchesLossesSingles += parseInt(item.matches_lost) || 0;
    });
    const totalMatchesPlayedSingles = totalMatchesWonSingles + totalMatchesLossesSingles;
    const winPercentageSingles = parseInt((totalMatchesWonSingles / totalMatchesPlayedSingles) * 100).toFixed(1);

    let doublesStats = allStats.filter(item => item.type === 'doubles')
    doublesStats.forEach(item => {
        hardWinsDoubles += parseInt(item.hard_won) || 0;
        clayWinsDoubles += parseInt(item.clay_won) || 0;
        grassWinsDoubles += parseInt(item.grass_won) || 0;
        hardLossesDoubles += parseInt(item.hard_lost) || 0;
        clayLossesDoubles += parseInt(item.clay_lost) || 0;
        grassLossesDoubles += parseInt(item.grass_lost) || 0;
        totalMatchesWonDoubles += parseInt(item.matches_won) || 0;
        totalMatchesLossesDoubles += parseInt(item.matches_lost) || 0;
    })
    const totalMatchesPlayedDoubles = totalMatchesWonDoubles + totalMatchesLossesDoubles;
    const winPercentageDoubles = parseInt((totalMatchesWonDoubles / totalMatchesPlayedDoubles) * 100).toFixed(1);

    return (
        <div className="playerStats">
            <div className="singlesStats">
                <b>Singles:</b>
                <ul className="statsSinglesWins">
                    <li>Hardcourt wins: {hardWinsSingles}</li>
                    <li>Clay wins: {clayWinsSingles}</li>
                    <li>Grass wins: {grassWinsSingles}</li>
                    <li>Total wins: {totalMatchesWonSingles}</li>
                </ul>
                <ul className="statsSinglesLosses">
                    <li>Hardcourt losses: {hardLossesSingles}</li>
                    <li>Clay losses: {clayLossesSingles}</li>
                    <li>Grass losses: {grassLossesSingles}</li>
                    <li>Total losses: {totalMatchesLossesSingles}</li>
                </ul>
                <ul className="statsSinglesTotals">
                    <li>Total matches played: {totalMatchesPlayedSingles}</li>
                    <li>Win percentage:
                        {winPercentageSingles != "NaN" ? (
                            <span> {winPercentageSingles} %</span>
                        ) : (
                            <span> 0 %</span>
                        )}
                    </li>
                </ul>
            </div>
            <Divider style={{backgroundColor: 'black'}} orientation="vertical" flexItem></Divider>
            <div className="doublesStats">
                <b>Doubles:</b>
                <ul className="statsDoublesWins">
                    <li>Hardcourt wins: {hardWinsDoubles}</li>
                    <li>Clay wins: {clayWinsDoubles}</li>
                    <li>Grass wins: {grassWinsDoubles}</li>
                    <li>Total wins: {totalMatchesWonDoubles}</li>
                </ul>
                <ul className="statsDoublesLosses">
                    <li>Hardcourt losses: {hardLossesDoubles}</li>
                    <li>Clay losses: {clayLossesDoubles}</li>
                    <li>Grass losses: {grassLossesDoubles}</li>
                    <li>Total losses: {totalMatchesLossesDoubles}</li>
                </ul>
                <ul className="statsDoublesTotals">
                    <li>Total matches played: {totalMatchesWonDoubles}</li>
                    <li>Win percentage:
                        {winPercentageDoubles != "NaN" ? (
                            <span> {winPercentageDoubles} %</span>
                        ) : (
                            <span> 0 %</span>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default PlayerStats;