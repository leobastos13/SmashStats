import '../styles/PlayerProfileStyles.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const PlayerTilesDoubles = ({ player }) => {

    let mapTitles = player.map((item) => {
        return item.tournaments;
    })

    let allTitles = [].concat(...mapTitles);

    let doublesTitles = allTitles.filter((item) => item.type === 'doubles');
    let doublesTitlesSeason = doublesTitles.reduce((result, item) => {
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



    const labels = Object.keys(doublesTitlesSeason);

    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Titles',
                data: Object.values(doublesTitlesSeason),
                backgroundColor: '#63ed85',
            },
        ],
    }



    return (
        <div>
            {doublesTitles.length !== 0 ? (
                <div>
                    <b style={{ fontSize: '20px' }}>Doubles Titles by Season:</b>
                    <Bar className='graphSize' options={options} data={data}></Bar>
                </div>
            ) : (
                <div style={{marginTop: '50px'}}>
                    <b style={{fontSize: '20px'}}>This player does not have any doubles title!</b>
                </div>
                
            )}
        </div>
    )
}
export default PlayerTilesDoubles