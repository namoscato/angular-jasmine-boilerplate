'use strict';

var Dgeni = require('dgeni'),
    gulp = require('gulp'),
    gulpHelp = require('gulp-help')(gulp),
    minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
    string: [
        'base-path',
        'test-path',
        'source'
    ],
    default: {}
});

gulp.task('default', 'Generates a boilerplate Jasmine test for the specified file', function() {
    var dgeni;

    try {
        dgeni = new Dgeni([
            require('./src/index')({
                basePath: options['base-path'],
                testPath: options['test-path'],
                source: options.source
            })
        ]);
        return dgeni.generate();
    } catch(x) {
        console.log(x.stack);
        throw x;
    }
});
