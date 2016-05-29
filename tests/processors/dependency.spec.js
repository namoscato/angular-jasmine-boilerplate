var rewire = require('rewire');
var dependencyProcessor = rewire('../../src/processors/dependency');

describe('dependencyProcessor', function() {
    var docs;
    var target;

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
                        variables: []
                    }
                }
            ]);
        });
    });

    describe('When processing dependencies', function() {
        describe('in general', function() {
            beforeEach(function() {
                docs = [
                    {
                        fileInfo: {
                            content: 'content'
                        },
                        requires: [
                            'dep'
                        ]
                    },
                    {
                        fileInfo: {
                            content: 'content'
                        },
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
                            name: 'dep',
                            methods: "''",
                            methodSpies: [],
                            variable: 'depSpy'
                        }
                    ],
                    variables: [
                        [
                            'depSpy'
                        ]
                    ]
                });

                expect(docs[1].dependencies).toEqual({
                    spies: [
                        {
                            name: '$dep',
                            methods: "''",
                            methodSpies: [],
                            variable: 'depSpy'
                        },
                        {
                            name: 'aDep',
                            methods: "''",
                            methodSpies: [],
                            variable: 'aDepSpy'
                        },
                        {
                            name: 'bDep',
                            methods: "''",
                            methodSpies: [],
                            variable: 'bDepSpy'
                        }
                    ],
                    variables: [
                        [
                            'depSpy',
                            'aDepSpy',
                            'bDepSpy',
                        ]
                    ]
                });
            });
        });

        describe('with method calls', function() {
            beforeEach(function() {
                docs = [
                    {
                        fileInfo: {
                            content: '$dep.(); $depinvalidMethodCall(); $dep.property; $dep.$method1(); ' + 
                                     'aDep  .  method2(); aDep.method3(arg); aDep .  method3(); aDep.method3  (); ' + 
                                     'bdep.noMatchOnLowercaseD(); bDep.\nZ   (); bDep.A(); bDep.A(); ' +
                                     'cDep.method2().catch() cDep.method1().then(function() {}) cDep.method1().then() cDep.method1.catch cDep . method1 () .  finally() cDep.method2.then'
                        },
                        requires: [
                            'bDep',
                            '$dep',
                            'aDep',
                            'cDep',
                        ]
                    }
                ];

                target.$process(docs);
            });

            it('should output a deduped, sorted method string', function() {
                expect(docs[0].dependencies).toEqual({
                    spies: [
                        {
                            name: '$dep',
                            methods: "'$method1'",
                            methodSpies: [],
                            variable: 'depSpy'
                        },
                        {
                            name: 'aDep',
                            methods: "'method2', 'method3'",
                            methodSpies: [],
                            variable: 'aDepSpy'
                        },
                        {
                            name: 'bDep',
                            methods: "'A', 'Z'",
                            methodSpies: [],
                            variable: 'bDepSpy'
                        },
                        {
                            name: 'cDep',
                            methods: "'method1', 'method2'",
                            methodSpies: [
                                {
                                    name: 'cDepMethod1',
                                    methods: "'finally', 'then'",
                                    methodSpies: [],
                                    variable: 'cDepMethod1Spy',
                                    methodName: 'method1'
                                },
                                {
                                    name: 'cDepMethod2',
                                    methods: "'catch'",
                                    methodSpies: [],
                                    variable: 'cDepMethod2Spy',
                                    methodName: 'method2'
                                }
                            ],
                            variable: 'cDepSpy'
                        }
                    ],
                    variables: [
                        [
                            'depSpy',
                            'aDepSpy',
                            'bDepSpy',
                            'cDepSpy',
                        ],
                        [
                            'cDepMethod1Spy',
                            'cDepMethod2Spy'
                        ]
                    ]
                });
            });
        });
    });
});
