/* eslint-disable */
const { Worker, workerData, isMainThread } = require('worker_threads');
const { lookup } = require('../dns');

const createServiceWorkerThread = async (url, lookupUrl, callback) => {
    const filePath = `${__dirname}/service-worker.js`;
    console.log(filePath);
    if (isMainThread) {
        let address = await lookupAddress(lookupUrl);
        console.log('address:'+address);
        if (!address) return;
        const worker = new Worker(filePath, { workerData: {url} });
        worker.on('message', (data) => {
            callback(data);
        });    
        worker.on('error', (err) => {
            throw err;
        });
        worker.on('exit', (code) => {
            if(code != 0) throw new Error(`Worker stopped with exit code ${code}`);
        });
    }
};

const lookupAddress = (lookupUrl) => {
    return new Promise((resolve, reject) => {
        lookup(lookupUrl, {}, (address, family) => {
            if (!address) reject('Failed!');
            console.log('address1:'+address);
            resolve(address);
        });
    });    
};

module.exports = {
    createServiceWorkerThread
};
