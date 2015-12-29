#!/usr/bin/env node

var Dgeni = require('dgeni'),
    jsonfile = require('jsonfile'),
    minimist = require('minimist');

var config = {},
    configFile,
    dgeni,
    options;

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
    configFile = jsonfile.readFileSync('config.json');

    if (!config.basePath) {
        if (!configFile.basePath) {
            throw Error('Base path not specified via --base-path');
        }

        console.log('Using "base-path = ' + configFile.basePath + '"');

        config.basePath = configFile.basePath;
    }

    if (!config.testPath) {
        if (!configFile.testPath) {
            throw Error('Test path not specified via --test-path');
        }

        console.log('Using "test-path = ' + configFile.testPath + '"');

        config.testPath = configFile.testPath;
    }
}

if (options._.length > 0) {
    dgeni = new Dgeni([
        require('./src/index')({
            basePath: config.basePath,
            testPath: config.testPath,
            sources: options._
        })
    ]);

    console.log('Generating boilerplate for ' + options._.length + ' components...');

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
