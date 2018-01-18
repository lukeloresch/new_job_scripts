//got post workign to create repo, will refactor a bit to make more maintaince

// ideally, this will be something a developer can run from their local workstation that will:
// parse cmd line args for -> if angular job, where to clone seed to, what to rename to, GHE repo name
// then will clone seed to desired path,
// then will set remote to new GHE repo,
// checkout new V1-0 branch immediately.
// then will change things on the seed project to have 1-0 and other options devs can pass

// will need to defualt to a github PAT in ~/.ghepat or whatever loc they specifiy

const os = require('os')
const Path = require('path')
const expandTilde = require('expand-tilde')
const colors = require('colors')
const fs = require('fs')
const axios = require('axios')
const util = require('util')
const rp = require('request-promise')

// first  get cmd line args
let globalResponse = {}
const args = require('minimist')(process.argv.slice(2), {
  boolean: ['angular', 'help'],
  string: ['clone-path', 'repoName'],
  alias: {
    a: 'angular',
    c: 'clone-path',
    h: 'help'
  },
  default: {}
})

const ghTokenPath = expandTilde('~') + '/.ghepat'
let GITHUB_TOKEN = fs.readFileSync(ghTokenPath, 'utf-8').toString().trim()

//console.log(GITHUB_TOKEN);
// setAuthToken(GITHUB_TOKEN)
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
//axios.defaults.headers.common['AUTHORIZATION'] = "GITHUB_TOKEN"

let config = {'Authorization': 'GITHUB_TOKEN'}

// axios.defaults.headers.common['Authorization'] = GITHUB_TOKEN

// GITHUB_TOKEN

// MIGRATING TO REQUEST-PROMISE LIB INSTEAD OF AXIOS

const github = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  transformRequest: [function (data, headers) {
    headers.Authorization = "token " + GITHUB_TOKEN
    //console.log(JSON.stringify(data));
    return JSON.stringify(data);
   //return JSON.stringify(data) && JSON.stringify(headers);
  }]
  
})

let createRepoConfig = {
  name: args.repoName
}

github.post('/user/repos', createRepoConfig)
  .then(function(response) {
  console.log("RESPONSE REQUEST: " + response.request);
  })
 .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log('ERRROR: ', error.config);
  });

// console.log(globalResponse)

if (args.help) {
  console.log()
  console.log('Usage: hg-git [OPTIONS] {NEW REPO TO BE CLONE}')
}
/*
github.get('/users/lukeloresch/repos')//, { headers: config })
  .then((response) => {
    fs.writeFile('body.txt', util.inspect(response.data), 'utf-8', (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
    fs.writeFile('headers.txt', util.inspect(response.headers), 'utf-8', (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
    fs.writeFile('config.txt', util.inspect(response.config), 'utf-8', (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })

  })
  .catch((error) => {
    console.log(error)
  })
*/


