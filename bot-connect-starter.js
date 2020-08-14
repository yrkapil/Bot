/* eslint-disable */
const http = require('http');
const express = require('express');

const add = require('./bot/index');
const dns = require('./bot/helpers/dns');
const fs = require('./bot/helpers/fs');
const { appConfig } = require('./bot/config/config-prompt');

const { appSettings, openWeather } = require('./bot/config/constants');
const worker = require('./bot/helpers/workers/worker');
let tableWrapper = '';


//console.log(config);
// const add1 = add('1', 3);
// const add2 = add(1, 3);
// const add3 = add('1', '3');
// console.log('Hello World! Connecting bot Online...');
// console.log(`add1: ${add1}`);
// console.log(`add2: ${add2}`);
// console.log(`add3: ${add3}`);


const app = express();

let myHtml = `    
    <!doctype html>
    <head>
        <script type="text/javascript">
            function getAppSettings() {
                window.location.href = "http://localhost:9090/getAppSettings";
            }
        </script>
    </head>
    <html lang="en">
        <body>
            <div class='wrapper'>
                <button onclick="getAppSettings()">Fetch Application Settings</button>
                ${tableWrapper}
            </div>
        </body>
    </html>
`;

dns.lookup(openWeather.LOOKUP_URL, {}, (address, family) => {
    console.log(`address: ${address} - family: ${family}`);
});

dns.resolver(openWeather.RESOLVER_URL, 'TXT', (records) => {
    console.log(`records: ${records}`);
});

fs.readFile('./city.list.json', { encoding: 'utf8' }, (data) => {
    data = JSON.parse(data);
    selectedCity = data[data.findIndex(item => item.name === openWeather.CITY)];
    console.log(selectedCity);
    worker.createServiceWorkerThread(`${openWeather.URL}?id=${selectedCity.id}&APPID=${openWeather.API_KEY}`, openWeather.LOOKUP_URL, (data) => {
        //console.log(JSON.stringify(data));
    });
});

// const server = http.createServer();
// server.on('request', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(myHtml);
// }).listen(appSettings.PORT);

app.get('/', (req, res) => {    
    res.send(myHtml);
});

app.get('/getAppSettings', (req, res) => {
    fs.readFile('./app-config.json', { encoding: 'utf8' }, (data) => {
        data = JSON.parse(data);
        tableWrapper = '<table>';
        Object.keys(data).forEach(columnName => {
            tableWrapper += `<tr><td>${columnName}</td><td>${data[columnName]}</td></tr>`;
        });
        tableWrapper += '</table>';
        myHtml = `    
            <!doctype html>
            <head>
                <script type="text/javascript">
                    function getAppSettings() {
                        window.location.href = "http://localhost:9090/getAppSettings";
                    }
                </script>
            </head>
            <html lang="en">
                <body>
                    <div class='wrapper'>
                        <button onclick="getAppSettings()">Fetch Application Settings</button>
                        ${tableWrapper}
                    </div>
                </body>
            </html>
        `;
        res.send(myHtml);
    });
});

app.listen(appSettings.EXPRESS_PORT, () => {
    console.log(`Example app listening at http://localhost:${appSettings.EXPRESS_PORT}`);
});



