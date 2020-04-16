/* Global Variables */
const openWeatherMapAPIKey = '7a00298a03b724a26e996218585a69a1';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

const getData = async (url='') => { 
    const response = await fetch(url, {
        method: 'GET', 
        mode: 'cors'
    });
    try {
        // Do request
        const data = await response.json();
        return data;
    }
    catch(error) {
      console.log("error", error);
    }
};

const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),       
    });
    try { 
      return await response.json();
    }
    catch(error) {
        console.log("error", error);
    }
}


// Reference: https://openweathermap.org/current#{By ZIP CODE}
const getTemperatureByZipCode = async (zipCode) => {
    const weatherData = await getData(`${baseUrl}?zip=${zipCode}&appid=${openWeatherMapAPIKey}`);
    const temp = weatherData.main.temp;
    // TODO: Add error handling
    return temp;
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add Event Listener to button[id="generate"]
document.getElementById('generate').addEventListener('click', async (e) => {
    const zipCodeInput =  document.getElementById('zip').value;
    getTemperatureByZipCode(zipCodeInput).then((temp) => {
        const feelingsInput = document.getElementById('feelings').value;
        const data = {
            'temperature': temp,
            'date': newDate,
            'userResponse': feelingsInput, 
        };
        postData('/projectData', data).then(async () => {
            const data = await getData('/projectData');
            document.getElementById('date').textContent = `Date: ${data.date}`;
            document.getElementById('temp').textContent = `Temperature: ${data.temperature}`;
            document.getElementById('content').textContent = `User Response: ${data.userResponse}`;    
        })
    });   
});