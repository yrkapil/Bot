/* eslint-disable*/
const fs = require('fs');


const readDir = (dirName, {encoding = 'utf8', withFileTypes = true}, callback) => {
    fs.readdir(dirName, { encoding, withFileTypes }, (err, files) => { 
        console.log("\nCurrent directory files:"); 
        if (err) throw err;         
        // files.forEach(file => { 
        // console.log(file); 
        // });     
        callback(files);
    }) 
};

// Read mode - 0o400
// Write mode - 0o600
const updateFilePersmissions = (fileName, mode = '0o400', callback) => {
    fs.chmod(dirname, { encoding, withFileTypes }, (err) => { 
        if (err) throw err;
        console.log("\nReading the file contents"); 
        callback(err);
    }) ;
};


const readFile = (filePath, {encoding = null, flag = 'r'}, callback) => {
    fs.readFile(filePath, {encoding, flag},  (err, data) => {
        if (err) throw err;
        callback(data);
    });
};

const writeFile = (filePath, data, {encoding = null, mode = '0o666', flag = 'w'}, callback) => {
    fs.writeFile(filePath, data, {encoding, mode, flag},  (err) => {
        if (err) throw err;
        console.log('written');
        callback();
    });
};

const readFileStream = (filePath, {encoding = null, flag = 'a+', start, end, highWaterMark = 16}) => {
    return new Promise((resolve, reject) => {
        const streamReader = fs.createReadStream(filePath, {encoding, flag, start, end, highWaterMark});
        const chunks = [];
        streamReader.on('data', (chunk) => {
            chunks.push(chunk);
            console.log(chunk);            
        });
        streamReader.on('end', () => {
            console.log('There will be no more data.');
            resolve(chunks.join(''));
        });
    });
};

const writeFileStream = (filePath, data, {encoding = null, flag = 'w', start, end, highWaterMark = 16}) => {
    return new Promise((resolve, reject) => {
        const streamWriter = fs.createWriteStream(filePath, {encoding, flag, start, end, highWaterMark});        
        streamWriter.on('close', (resolve) => resolve('Done!'));
        streamWriter.on('error', (reject) => reject('Failed!'));
        streamWriter.write(JSON.stringify(data));
    });
};

const fileExists = (filePath) => {
    if (fs.existsSync(filePath)) {
        return true;
    }
    return false;
}

module.exports = {
    readDir,
    updateFilePersmissions,
    readFile,
    readFileStream,
    writeFile,
    writeFileStream,
    fileExists
};
