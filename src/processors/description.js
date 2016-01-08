'use strict';

/**
 * @dgProcessor description
 * @description Appends the truncated description summary
 */
module.exports = function descriptionProcessor() {

    return {
        $process: process,
        $runAfter: ['tags-extracted'],
        $runBefore: ['rendering-docs']
    };

    function process(docs) {
        var parts;

        docs.forEach(function(doc) {
            doc.methods.forEach(function(method) {
                parts = method.description.split('\n');

                method.descriptionSummary = parts[0].charAt(0).toLowerCase() + parts[0].slice(1);

                if (parts.length > 1) {
                    method.descriptionSummary += '...';
                }
            });
        });
    }
};
