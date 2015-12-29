'use strict';

var canonicalPath = require('canonical-path'),
    dgeni = require('dgeni');

module.exports = function(options) {

    var Package = dgeni.Package;

    var self = new Package('angularJasmineBoilerplate', [require('dgeni-packages/ngdoc')])

    self.processor(require('./processors/dependency-processor'));
    self.processor(require('./processors/description-processor'));

    self.config(function(computeIdsProcessor, computePathsProcessor, getAliases, log, readFilesProcessor, templateFinder, writeFilesProcessor) {
        readFilesProcessor.basePath = options.basePath;
        readFilesProcessor.sourceFiles = options.sources;

        templateFinder.templateFolders = ['./src/templates'];
        templateFinder.templatePatterns = [
            '${ doc.docType }.template.js'
        ];

        writeFilesProcessor.outputFolder = options.testPath;

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
            getOutputPath: function(doc) {
                var baseName = doc.fileInfo.baseName,
                    relativePath = doc.fileInfo.relativePath.slice(0, -baseName.length - 3);

                return canonicalPath.resolve(
                    options.testPath,
                    relativePath,
                    baseName.charAt(0).toLowerCase() + baseName.slice(1) + '.spec.js'
                );
            }
        });
    });

    return self;
};
