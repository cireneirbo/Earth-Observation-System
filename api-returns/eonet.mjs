import fetch from "node-fetch";

function apiCall() {
    const apiResponse = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=200&source=InciWeb&status=open')
    const data = await apiResponse.json();
    console.log(data);
}

module.exports = apiCall;