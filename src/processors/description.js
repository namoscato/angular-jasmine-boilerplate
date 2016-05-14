'use strict';

var nlp = require("nlp_compromise");

/**
 * @dgProcessor descriptionProcessor
 * @description Appends the truncated description summary
 */
module.exports = function descriptionProcessor() {

    return {
        $runAfter: ['tags-extracted'],
        $runBefore: ['rendering-docs'],
        $process: function(docs) {
            var i;
            var parts;
            var summary;
            var spaceIndex;

            docs.forEach(function(doc) {
                if (typeof doc.methods === 'undefined') {
                    return;
                }

                doc.methods.forEach(function(method) {
                    parts = method.description.split('\n');

                    summary = parts[0].charAt(0).toLowerCase() + parts[0].slice(1); // Lowercase first letter

                    summary = summary.replace(/'/g, "\\'"); // Escape single quotes

                    spaceIndex = summary.indexOf(' '); // Assume first word is present tense verb

                    method.descriptionSummary = nlp.verb(summary.substring(0, spaceIndex)).conjugate().gerund + summary.substring(spaceIndex);

                    if (parts.length > 1) {
                        method.descriptionSummary += '...';
                    }
                });
            });
        }
    };

};
