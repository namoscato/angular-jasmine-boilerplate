#!/usr/bin/env node

var canonicalPath = require('canonical-path'),
    colors = require('colors'),
    Dgeni = require('dgeni'),
    jsonfile = require('jsonfile'),
    minimist = require('minimist');

var config = {},
    configFile,
    dgeni,
    options,
    summary;

options = minimist(process.argv.slice(2), {
    boolean: 'save',
    string: [
        'base-path',
        'test-path'
    ]
});

jsonfile.spaces = 4;

config.basePath = options['base-path'];
config.testPath = options['test-path'];

if (!config.basePath || !config.testPath) {
    configFile = jsonfile.readFileSync(
        canonicalPath.resolve(__dirname, '../config.json')
    );

    if (!config.basePath) {
        if (!configFile.basePath) {
            throw Error('Base path not specified via --base-path');
        }

        config.basePath = configFile.basePath;
    }

    if (!config.testPath) {
        if (!configFile.testPath) {
            throw Error('Test path not specified via --test-path');
        }

        config.testPath = configFile.testPath;
    }
}

console.log('base-path = ' + config.basePath);
console.log('test-path = ' + config.testPath);

if (options._.length > 0) {
    dgeni = new Dgeni([
        require('../src/index')({
            basePath: config.basePath,
            testPath: config.testPath,
            sources: options._
        })
    ]);

    dgeni.generate();
}

if (options.save) {
    console.log('Saving path configuration to "config.json":');
    console.dir(config);

    jsonfile.writeFile('config.json', config, function(err) {
        if (err !== null) {
            console.error(err);
        }
    });
}
