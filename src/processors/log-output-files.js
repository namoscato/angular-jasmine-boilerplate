'use strict';

var canonicalPath = require('canonical-path');

/**
 * @dgProcessor dependencies
 * @description Logs the set of output files that will be processed
 */
module.exports = function logOutputFilesProcessor(writeFilesProcessor) {

    return {
        $process: process,
        $runAfter: ['writing-files']
    };

    function process(docs) {
        var pathsHash = {};

        console.log('\nWriting boilerplate files...');

        docs.forEach(function(doc) {
            if (typeof pathsHash[doc.outputPath] !== 'undefined') {
                return;
            }

            console.log(canonicalPath.relative(writeFilesProcessor.outputFolder, doc.outputPath).green);
            pathsHash[doc.outputPath] = true;
        });
    }
};
