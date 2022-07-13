var cron = require('node-cron');
const axios = require('axios');
const DomainController = require('./../controllers/domainController');
const Status = require('../models/statusModel')
const API_URL = 'http://localhost:8000/api/domains/';

async function fetchDomains(){
  try {
    const response = await axios.get(API_URL);
    return response.data;
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

async function checkHost(url){
    try {
        const response = await axios.get(url, {timeout: 10000});
        return true
    } catch(err){
        console.log(`${url} error: ${err.message}`)
        return false
    }
}

async function updateStatus(id, status){

    const updatedStatus = await Status.findOneAndUpdate({ domainId: id }, { $push: 
      { history: { isUp: status, date: new Date() }}
    }, { upsert: true, new: true })

    const updatedDomain = await DomainController.updateDomainLastStatus(id, status)

    if(!updatedDomain){
      console.error('Domain not updated')
    } 

}

async function checkDomains(){
  console.log('Checking domains')
  const domains = await fetchDomains()
  domains.map(async (domain) => {
    const dom = await DomainController.getDomainById(domain._id);
    if(!dom){
      console.error('Domain not found')
      exit(1);
    } else {
      const isUp = await checkHost(dom.url)
      updateStatus(dom._id, isUp)
    }
  })
}



cron.schedule('* * * * *', checkDomains);