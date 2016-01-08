'use strict';

var _ = require('lodash');

/**
 * @dgProcessor dependencies
 * @description Compiles a list of relevant dependency meta data
 */
module.exports = function dependencyProcessor(log) {

    return {
        $process: process,
        $runAfter: ['tags-extracted'],
        $runBefore: ['rendering-docs']
    };

    function process(docs) {
        docs.forEach(function(doc) {
            var dependencies = {
                spies: []
            };

            _.sortBy(doc.requires, function(require) {
                return require;
            }).forEach(function(dependency) {
                var variable = dependency;

                if (dependency.charAt(0) === '$') {
                    variable = dependency.substr(1);
                }

                dependencies.spies.push({
                    dependency: dependency,
                    variable: variable + 'Spy'
                });
            });

            log.debug('Compiled ' + dependencies.spies.length + ' dependencies');

            dependencies.variableDefinitions = '    var ' + _.map(dependencies.spies, 'variable').join(",\n        ") + ';';

            doc.dependencies = dependencies;
        });
    }
};
