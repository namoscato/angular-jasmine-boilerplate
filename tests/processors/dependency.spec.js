var rewire = require('rewire'),
    dependencyProcessor = rewire('../../src/processors/dependency');

describe('dependencyProcessor', function() {
    var docs,
        target;

    var logSpy;

    beforeEach(function() {
        logSpy = jasmine.createSpyObj('log', ['debug']);

        target = dependencyProcessor(logSpy);
    });

    describe('When processing no dependencies', function() {
        beforeEach(function() {
            docs = [
                {}
            ];

            target.$process(docs);
        });

        it('should not output any spies', function() {
            expect(docs).toEqual([
                {
                    dependencies: {
                        spies: [],
                        variableDefinitions: ''
                    }
                }
            ]);
        });
    });

    describe('When processing dependencies', function() {
        beforeEach(function() {
            docs = [
                {
                    requires: [
                        'dep'
                    ]
                },
                {
                    requires: [
                        'bDep',
                        '$dep',
                        'aDep'
                    ]
                }
            ];

            target.$process(docs);
        });

        it('should output relevant spies', function() {
            expect(docs[0].dependencies).toEqual({
                spies: [
                    {
                        dependency: 'dep',
                        variable: 'depSpy'
                    }
                ],
                variableDefinitions: "\n    var depSpy;\n"
            });

            expect(docs[1].dependencies).toEqual({
                spies: [
                    {
                        dependency: '$dep',
                        variable: 'depSpy'
                    },
                    {
                        dependency: 'aDep',
                        variable: 'aDepSpy'
                    },
                    {
                        dependency: 'bDep',
                        variable: 'bDepSpy'
                    }
                ],
                variableDefinitions: "\n    var depSpy,\n        aDepSpy,\n        bDepSpy;\n"
            });
        });
    });
});
