'use strict';

var dgeni = require('dgeni');

module.exports = function(options) {

    var Package = dgeni.Package;

    var self = new Package('angularJasmineBoilerplate', [require('dgeni-packages/ngdoc')])

    self.processor(require('./processors/dependency-processor'));

    self.config(function(computeIdsProcessor, computePathsProcessor, getAliases, log, parseTagsProcessor, readFilesProcessor, templateFinder, writeFilesProcessor) {
        log.level = 'info';

        readFilesProcessor.basePath = '.';
        readFilesProcessor.sourceFiles = [
            {
                basePath: options.basePath,
                include: options.source
            }
        ];

        templateFinder.templateFolders = ['./src/templates'];
        templateFinder.templatePatterns = [
            '${ doc.docType }.template.js'
        ];

        writeFilesProcessor.outputFolder = 'dist';

        computeIdsProcessor.idTemplates.push({
            docTypes: [
                'controller',
                'service'
            ],
            idTemplate: 'module:${module}.${docType}:${name}',
            getAliases: getAliases
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: [
                'controller',
                'service'
            ],
            pathTemplate: '${name}',
            outputPathTemplate: '${ name.charAt(0).toLowerCase() + name.slice(1) }.spec.js'
        });
    });

    return self;
};
