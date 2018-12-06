'use strict';
/*** USE SCIRPT TO FETCH NPM ARTIFACTORY ACCESS TOKEN ***/
let RegClient = require('npm-registry-client');

let client = new RegClient();
let uri = 'https://npm.artifactory.homedepot.com/artifactory/api/npm/npm/';

let username = '';
let password = '';
let email = '';

var params = {
  auth: {
    username,
    password,
    email
  }
};

client.adduser(uri, params, (error, data, raw, res) => {
  if(error) {
    console.error(error);
    return;
  }
  console.log(`Login succeeded`);
  console.log(`data: ${JSON.stringify(data,null,2)}`);
  console.log(`NPM access token: ${data.token}`);
  console.log(data);
});

console.log('### NPM Login Completetd ###');

