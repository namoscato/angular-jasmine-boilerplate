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
                        var isInternalService = dependency.charAt(0) === '$';

                        // Set variable
                        var variable = dependency;

                        if (isInternalService) {
                            variable = dependency.substr(1);
                        }

                        // Set methods
                        var escape = (isInternalService ? '\\' : '');
                        var regEx = new RegExp('(' + escape + dependency + ')[.][A-Za-z0-9_]+[(]', 'g');
                        var calls = doc.fileInfo.content.match(regEx);
                        var methods = "''";

                        if (calls !== null) {
                            methods = '';

                            calls = _.sortedUniq(calls.sort());

                            calls.forEach(function(call) {
                                var index = call.indexOf('.')+1;

                                methods += "'" + call.substr(index, call.length-index-1) + "', ";
                            });

                            methods = methods.substr(0, methods.length-2);
                        }

                        dependencies.spies.push({
                            dependency: dependency,
                            methods: methods,
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
