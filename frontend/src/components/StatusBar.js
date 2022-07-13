//Little bar with that shows the state of the domain at specific hour and if you put the mouse on it shows details

//For some visual elements I used MUI
import { useState, useEffect } from "react";
import Popup from 'reactjs-popup'; //This is for the popups, the ones in MUI didn't work as expected
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Moment from 'moment'; //to format the date
import StatusService from './../features/statusService';

function Bar({data}) {

	const [status, setStatus] = useState([]) //set a const and a function to change the values

	useEffect(() => { //exec the function after render
		retrieveStatus() //function to exec
	}, []); //'[]' makes the function to be executed only once


	//get the status based in the domainID
    function retrieveStatus(){
    	StatusService.fetchStatus(data._id)
    		.then(rensponse => {
	  			setStatus(rensponse.data) //stores the data in the variable status
	  		})
    }

	return ( //visual part
		<>
		 {status.map(state => ( //map the valies
		 	state.history.slice(-60).map(stateInfo => ( //map the history part of the value and only takes the last 60 values
		 		<div key={stateInfo.date} className='bars'>
			 		<Popup trigger={ //set the popup
		 		    	<div className='rectangle' style={stateInfo.isUp ? { backgroundColor: 'green' } : { backgroundColor: 'red' } } /> // creates a div which is a square (check CSS -> rectangle) and asign color
		 		    } on="hover" position="bottom center">
		 		    	<div className='popup'>
		 		    		<Box sx={{ border: 1, p: 1, bgcolor: 'rgba(31, 41, 55)' }}>
		 		    			<Typography variant="body2" gutterBottom>
		 		    				{Moment(stateInfo.date).format('DD-MM-YYYY HH:mm:ss') /*print the hour in the popup*/}
		 		    			</Typography>
		 		    			{ stateInfo.isUp ? <Alert severity="success">No downtime recorded</Alert> : <Alert severity="error">Degraded performance</Alert> /* shows an alert in the popup with the state */}
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