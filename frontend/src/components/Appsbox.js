//Top of the domain box, with the name of the domain, red/green depeding the status and the last update on the right
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Moment from 'moment';

function Appsbox({name, url, status, lastUpdate}) {
	return (
  		<Alert variant="filled" severity={ status ? 'success' : (status == null ? 'warning' : 'error')  } action={`Last Update: ` + Moment(lastUpdate).format('DD-MM-YYYY HH:mm:ss')} >
		  	<Link style={{textTransform: 'capitalize'}} href={url} target="_blank" underline="none" color="inherit">
			  {name}
			</Link>
		</Alert>
	)
}

export default Appsbox