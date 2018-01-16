
//ideally, this will be something a developer can run from their local workstation that will:
//parse cmd line args for -> if angular job, where to clone seed to, what to rename to, GHE repo name
//then will clone seed to desired path,
//then will set remote to new GHE repo, 
//checkout new V1-0 branch immediately.
//then will change things on the seed project to have 1-0 and other options devs can pass

const os = require('os');
const Path = require('path');
const expandTilde = require('expand-tilde');
const colors = require('colors');
const fs = require('fs');
const axios = require('axios');


const args = require('minimist')(process.argv.slice(2), {
	boolean: ['angular', 'help'],
	string: ['clone-path'],
	alias: {
		a: 'angular',
		c: 'clone-path',
		h: 'help'
	},
	default: {}
});


if (args.help) {
				console.log();
				console.log("Usage: hg-git [OPTIONS] {NEW REPO TO BE CLONE}");
}

console.log(args);
