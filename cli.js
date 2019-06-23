#!/usr/bin/env node

const fs = require('fs');
const glob = promisify(require('glob'));
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const transform = require('./transformer');

const args = require('minimist')(process.argv.slice(2))
runTransformer(args);

function runTransformer(args) {
    if (!args.source) {
        console.error('Please provide path for the files you want to transform');
        process.exit(1);
    }
    glob(args.source)
        .then(files => {
            const reads = files.map(f => readFile(f));
            return Promise
                .all(reads)
                .then(files => files.map(f => f.toString()))
                .then(filesContent => {
                    filesContent.forEach((content, index) => {
                        const outputCode = transform(content)
                        return writeFile(files[index] + '.temp', outputCode)
                    })
                })
        })
        .catch(reason => {
            console.error(reason);
            process.exit(1);
        })
}


function promisify(func) {
    return function promisifiedFunction(...args) {
        return new Promise((resolve, reject) => {
            return func(...args, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            })
        })
        
    }
}