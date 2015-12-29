#!/usr/bin/env node

var Dgeni = require('dgeni'),
    minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
    string: [
        'base-path',
        'test-path'
    ]
});

try {
    var dgeni = new Dgeni([
        require('./src/index')({
            basePath: options['base-path'],
            testPath: options['test-path'],
            sources: options._
        })
    ]);
    return dgeni.generate();
} catch(x) {
    console.log(x.stack);
    throw x;
}
