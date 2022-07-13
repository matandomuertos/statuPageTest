//Cronjob task that run while backend is running (only needs to be imported in server.js)
var cron = require('node-cron'); //import node-cron
const axios = require('axios'); //import axios (to do http requests)
const DomainController = require('./../controllers/domainController');
const Status = require('../models/statusModel')
const API_URL = 'http://localhost:8000/api/domains/'; //set where the request of axios will be done... it should be in .env

//Fetch all domains from the API
async function fetchDomains(){
  try {
    const response = await axios.get(API_URL); //get everything from API_URL
    return response.data; //return only the data part (the answer from the API, not all the other useless information)
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

//Run get to the host and wait up to 10s for the answer, returns if it was ok or not
async function checkHost(url){
    try {
        const response = await axios.get(url, {timeout: 10000}); //the same as 'curl --connect-timeout 10000 $URL', it should be in .env the timeout value
        return true
    } catch(err){
        console.log(`${url} error: ${err.message}`)
        return false
    }
}

//Update the status in status and domain collections, almost the same as updateStatus in cotrollers/statusController.js
async function updateStatus(id, status){

    const updatedStatus = await Status.findOneAndUpdate({ domainId: id }, { $push: 
      { history: { isUp: status, date: new Date() }}
    }, { upsert: true, new: true })

    const updatedDomain = await DomainController.updateDomainLastStatus(id, status)

    if(!updatedDomain){
      console.error('Domain not updated')
    } 

}

//Main function
async function checkDomains(){
  console.log('Checking domains') //print checking domains
  const domains = await fetchDomains() //get all the domains
  domains.map(async (domain) => { //map response (basically a foreach of all the values)
      const isUp = await checkHost(domain.url); //check if the domain is accesible
      updateStatus(domain._id, isUp); //updates the DB with the current status
  })
}



cron.schedule('* * * * *', checkDomains); //exec checkDomains every minute