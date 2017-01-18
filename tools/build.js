#!/bin/env node

const spawn = require('child_process').spawn;
const PackageConfig = require('../package.json');
const dir = require('path').resolve(__dirname, '../');

function build() {
    return new Promise(function(resolve, reject) {
        const build = spawn('node_modules/.bin/cross-env', ['NODE_ENV=production', 'node_modules/.bin/webpack', '-p', '--progress'], {
            cwd: dir
        });

        build.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        build.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        build.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code === 0)
                resolve();
            else {
                reject();
            }
        });
    });
}

function package() {
    return new Promise(function(resolve, reject) {
        const tar = spawn('tar', ['-C', 'build', '-cvzf', 'lightdm-webkit2-material2-'+PackageConfig.version+'.tar.gz', '.'], {
            cwd: dir
        });
        tar.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        tar.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        tar.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

build().then(package).then(function() {
    console.log('Build Complete!');
});
