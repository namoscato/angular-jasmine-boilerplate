var rewire = require('rewire'),
    logOutputFilesProcessor = rewire('../../src/processors/log-output-files');

describe('logOutputFilesProcessor', function() {
    var target;

    var canonicalPathSpy,
        colorsSpy,
        consoleSpy;

    beforeEach(function() {
        canonicalPathSpy = jasmine.createSpyObj('canonical-path', ['relative']);
        canonicalPathSpy.relative.and.returnValue('PATH');

        consoleSpy = jasmine.createSpyObj('console', ['log']);

        colorsSpy = jasmine.createSpyObj('colors/safe', ['green']);
        colorsSpy.green.and.returnValue('GREEN');

        logOutputFilesProcessor.__set__({
            canonicalPath: canonicalPathSpy,
            colors: colorsSpy,
            console: consoleSpy
        });

        target = logOutputFilesProcessor({
            outputFolder: '/first/second'
        });
    });

    describe('When writing no boilerplate files', function() {
        beforeEach(function() {
            target.$process([]);
        });

        it('should not output any files', function() {
            expect(consoleSpy.log.calls.allArgs()).toEqual([
                [
                    '\nWriting boilerplate files...'
                ]
            ]);
        });
    });

    describe('When writing one boilerplate file', function() {
        beforeEach(function() {
            target.$process([
                {
                    outputPath: '/first/second/third'
                }
            ]);
        });

        it('should get relative path', function() {
            expect(canonicalPathSpy.relative).toHaveBeenCalledWith(
                '/first/second',
                '/first/second/third'
            );
        });

        it('should color text green', function() {
            expect(colorsSpy.green).toHaveBeenCalledWith('PATH');
        });

        it('should output text', function() {
            expect(consoleSpy.log.calls.argsFor(1)).toEqual(['GREEN']);
        });
    });

    describe('When writing multiple boilerplate files', function() {
        beforeEach(function() {
            target.$process([
                {
                    outputPath: '/first/second/third'
                },
                {
                    outputPath: '/first/second/fourth'
                },
                {
                    outputPath: '/first/second/fifth'
                },
                {
                    outputPath: '/first/second/fifth'
                }
            ]);
        });

        it('should get relative paths', function() {
            expect(canonicalPathSpy.relative.calls.allArgs()).toEqual([
                [
                    '/first/second',
                    '/first/second/third'
                ],
                [
                    '/first/second',
                    '/first/second/fourth'
                ],
                [
                    '/first/second',
                    '/first/second/fifth'
                ]
            ]);
        });

        it('should color text green', function() {
            expect(colorsSpy.green.calls.count()).toEqual(3);
        });

        it('should output text', function() {
            expect(consoleSpy.log.calls.count()).toEqual(4);
        });
    });
});
