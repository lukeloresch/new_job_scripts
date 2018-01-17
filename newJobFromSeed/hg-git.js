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

// first  get cmd line args

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['angular', 'help'],
  string: ['clone-path'],
  alias: {
    a: 'angular',
    c: 'clone-path',
    h: 'help'
  },
  default: {}
})

// initial configs....perhaps make this into a separate file...but this needs to be synchronous

const ghTokenPath = expandTilde('~') + '/.ghepat'

const GITHUB_TOKEN = fs.readFileSync(ghTokenPath).toString()

axios.defaults.headers.common['Authorization'] = 'GITHUB_TOKEN'
// console.log(axios)

const github = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000
})

github.get('/users/lukeloresch/repos')
  .then((response) => {
//    console.log(response.toString())

    fs.writeFile('message.txt', response, (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
  })
  .catch((error) => {
    console.log(error)
  })

if (args.help) {
  console.log()
  console.log('Usage: hg-git [OPTIONS] {NEW REPO TO BE CLONE}')
}
