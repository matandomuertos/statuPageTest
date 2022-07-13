//used in components to get the status based in the domainID
import axios from 'axios'

const API_URL = '/api/status/'

const fetchStatus = async (id) => {
  try {
    const response = await axios.request({
      url: API_URL, 
      method: 'get',
      params: {
        domainId: id,
      },
    })
    return response;

  } catch (err) {
    if (err.response) {
      // Not in the 200 response range 
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
}

const statusService = {
  fetchStatus,
}

export default statusService