/* eslint-disable */
const inquirer = require('inquirer');
const fs = require('../helpers/fs');

let questions = [        
    {
        type: 'input',
        name: 'appName',
        message: 'Name of the application: ',
        default: 'Sample Application'
    },
    {
        type: 'input',
        name: 'appDesc',
        message: 'Application Description: ',
        default: 'Sample Application description'
    },
    {
        type: 'list',
        name: 'sourceManagement',
        message: 'Source Code managemen tool: ',
        choices: ['Git', 'Mercury', 'SVN'],
        default: 'Git',
        filter: function (val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'appPlatform',
        message: 'Platform of the application: ',
        default: 'NodeJs'
    },
    {
        type: 'confirm',
        name: 'isExpressUsed',
        message: 'Is express used in the app? -> Yes/No ',
        default: true,
    },
    {
        type: 'input',
        name: 'appHost',
        message: 'Application host to be used: ',
        default: '127.0.0.1',
    },
    {
        type: 'input',
        name: 'appPort',
        message: 'Application port number to be used: ',
        default: 9090,
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return !isNaN(valid) || 'Please enter a number';
        },
        filter: Number,
    }
];

if (fs.fileExists('./app-config.json')) return;

inquirer.prompt(questions).then((answers) => {
    fs.writeFileStream(`./app-config.json`, answers, { encoding: 'utf8' });
});
