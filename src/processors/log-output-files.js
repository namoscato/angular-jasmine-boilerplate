'use strict';

var canonicalPath = require('canonical-path'),
    colors = require('colors/safe');

/**
 * @dgProcessor dependencies
 * @description Logs the set of output files that will be processed
 */
module.exports = function logOutputFilesProcessor(writeFilesProcessor) {

    return {
        $runAfter: ['writing-files'],
        $process: function(docs) {
            var pathsHash = {};

            console.log('\nWriting boilerplate files...');

            docs.forEach(function(doc) {
                if (typeof pathsHash[doc.outputPath] !== 'undefined') {
                    return;
                }

                console.log(
                    colors.green(
                        canonicalPath.relative(writeFilesProcessor.outputFolder, doc.outputPath)
                    )
                );

                pathsHash[doc.outputPath] = true;
            });
        }
    };

};
