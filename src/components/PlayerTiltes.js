import GraphSingles from "./PlayerTitlesSingles";
import GraphDoubles from "./PlayerTitlesDoubles";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PlayerTitles = ({ player }) => {

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
            <div id='singlesGraph' style={{ textAlign: 'center', marginRight: '50px', marginLeft: '50px' }}>
                <IconButton onClick={ShowSinglesGraph} size="large" style={{ position: 'relative', top: '43.5px', left: '270px' }}>
                    <ArrowForwardIosIcon fontSize="inherit"></ArrowForwardIosIcon>
                </IconButton>
                <GraphSingles player={player}></GraphSingles>
            </div>
            <div id='doublesGraph' style={{ display: 'none', textAlign: 'center', marginRight: '50px', marginLeft: '50px' }}>
                <IconButton onClick={ShowDoublesGraph} size="large" style={{ position: 'relative', top: '43.5px', right: '270px' }}>
                    <ArrowBackIosIcon fontSize="inherit"></ArrowBackIosIcon>
                </IconButton>
                <GraphDoubles player={player}></GraphDoubles>
            </div>
        </div>
    )
}
export default PlayerTitles