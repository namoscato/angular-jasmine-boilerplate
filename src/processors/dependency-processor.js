'use strict';

var _ = require('lodash'),
    canonicalPath = require('canonical-path');

/**
 * @dgProcessor dependencyProcessor
 * @description Compiles a list of relevant dependency meta data
 */
module.exports = function dependencyProcessor() {

    return {
        $process: process,
        $runBefore: ['rendering-docs']
    };

    function process(docs) {
        var modules = {},
            navigationItem;

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

            dependencies.variableDefinitions = '    var ' + _.map(dependencies.spies, 'variable').join(",\n        ") + ';';

            doc.dependencies = dependencies;
        });
    }
};
