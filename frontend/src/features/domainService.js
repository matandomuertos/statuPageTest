// used in components to get all the domains
import axios from './axios';
const API_URL = "/api/domains/";

const fetchDomains = async () => {
  try {
    const response = await axios.get(API_URL);
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

const domainService = {
  fetchDomains,
}

export default domainService