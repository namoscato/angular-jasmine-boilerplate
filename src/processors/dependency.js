'use strict';

var _ = require('lodash');

/**
 * @dgProcessor dependencies
 * @description Compiles a list of relevant dependency meta data
 */
module.exports = function dependencyProcessor(log) {

    return {
        $runAfter: ['tags-extracted'],
        $runBefore: ['rendering-docs'],
        $process: function(docs) {
            docs.forEach(function(doc) {
                var dependencies = {
                    spies: [],
                    variableDefinitions: ''
                };

                if (typeof doc.requires !== 'undefined') {
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

                    dependencies.variableDefinitions = "\n    var " + _.map(dependencies.spies, 'variable').join(",\n        ") + ";\n";
                }

                log.debug('Compiled ' + dependencies.spies.length + ' dependencies');

                doc.dependencies = dependencies;
            });
        }
    };

};
