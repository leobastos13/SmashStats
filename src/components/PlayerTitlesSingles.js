import '../styles/PlayerProfileStyles.css';
import PlayerTilesDoubles from "./PlayerTitlesDoubles";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const PlayerTilesSingles = ({ player }) => {

    let mapTitles = player.map((item) => {
        return item.tournaments;
    })

    let allTitles = [].concat(...mapTitles);

    let singlesTitles = allTitles.filter((item) => item.type === 'singles');
    let singlesTitlesSeason = singlesTitles.reduce((result, item) => {
        let season = item.season;
        result[season] = (result[season] || 0) + 1;
        return result;
    }, {});

    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    const labels = Object.keys(singlesTitlesSeason);

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Titles',
                data: Object.values(singlesTitlesSeason),
                backgroundColor: '#63ed85',
            },
        ],
    }

    return (
        <div>
            {singlesTitles.length !== 0 ? (
                <div>
                    <b style={{ fontSize: '20px' }}>Singles Titles by Season:</b>
                    <Bar className='graphSize' options={options} data={data}></Bar>
                </div>
            ) : (
                <div style={{marginTop: '50px'}}>
                    <b style={{fontSize: '20px'}}>This player does not have any singles title!</b>
                </div>
            )}
            <div>
                <PlayerTilesDoubles player={player}></PlayerTilesDoubles>
            </div>
        </div>




    )
}
export default PlayerTilesSingles