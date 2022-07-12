var cron = require('node-cron');
const { getDomain, updateDomain } = require('../controllers/domainController');
const { updateStatus } = require('../controllers/statusController');
const axios = require('axios');
const API_URL = 'http://localhost:8000/api/domains/';
const util = require('util')
const exec = util.promisify(require('child_process').exec);

async function fetchDomains(){
  try {
    const response = await axios.get(API_URL);
    console.log('asdf')
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
async function ping(host){
  const {stdout, stderr} = await exec(`ping -c 5 ${host}`);
  console.log(stdout);
  console.log(stderr);
}

async function pingDomains(){
  const domains = await fetchDomains()
  console.log(domains.data.name)
  domains.map(domain => {
    console.log(domain.name)
    ping(domain.url)
  })
}



// cron.schedule('* * * * *', () => {
//   pingDomains();
// });


// I want to run ping from here but it's not working 
// I have to document everything and packed in some docker images