// Box with domains stored in mongoDB

import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Appsbox from './Appsbox.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DomainsService from './../features/domainService'
import StatusBar from './StatusBar'

function Domains() {

  const [domains, setDomains] = useState([])

  useEffect(() => {
    retrieveDomains();
  }, []);


  function retrieveDomains(){
  	DomainsService.fetchDomains()
  		.then(rensponse => {
  			setDomains(rensponse.data);
  		})
  }

	return (
		<>
		 {domains.map((domains) => (
		 	<Grid key={domains.name} container justifyContent="center">
		 		<Box sx={{ width: '41%', '& > :not(style)': { m: 3, }, }} >
				 	<Paper elevation={24} style={{backgroundColor: "rgba(31, 41, 55)" }} >
				 		<Appsbox name={domains.name} url={domains.url} status={domains.ping} lastUpdate={domains.updatedAt} />
				 			<br></br>
				 			<StatusBar data={domains} />
							<br></br>
							<br></br>
				 	</Paper>
    			</Box>
    		</Grid>
		 ))}
		</>
	)
}

export default Domains