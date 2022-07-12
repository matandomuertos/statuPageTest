import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Moment from 'moment';
import StatusService from './../features/statusService';

function Bar({data}) {

	const [status, setStatus] = useState([])

	useEffect(() => {
		retrieveStatus()
	}, []);


    function retrieveStatus(){
    	StatusService.fetchStatus(data._id)
    		.then(rensponse => {
	  			setStatus(rensponse.data)
	  		})
    }

	return (
		<>
		 {status.map(state => (
		 	state.history.slice(-60).map(stateInfo => (
		 		<div key={stateInfo.date} className='bars'>
			 		<Popup trigger={
		 		    	<div className='rectangle' style={stateInfo.isUp ? { backgroundColor: 'green' } : { backgroundColor: 'red' } } />
		 		    } on="hover" position="bottom center">
		 		    	<div className='popup'>
		 		    		<Box sx={{ border: 1, p: 1, bgcolor: 'rgba(31, 41, 55)' }}>
		 		    			<Typography variant="body2" gutterBottom>
		 		    				{Moment(stateInfo.date).format('DD-MM-YYYY HH:mm:ss')}
		 		    			</Typography>
		 		    			{ stateInfo.isUp ? <Alert severity="success">No downtime recorded</Alert> : <Alert severity="error">Degraded performance</Alert>}
		 		    		</Box>
		 		    	</div>
		 		    </Popup>
		 		</div>
		 	))
		 ))}
		</>
	)
}

export default Bar