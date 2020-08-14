/* eslint-disable */
const { workerData, parentPort } = require('worker_threads');
const fetch = require('node-fetch');

fetch(workerData.url)
    .then(response => response.json())
    .then(data => parentPort.postMessage({ data, status : 'Done' }));