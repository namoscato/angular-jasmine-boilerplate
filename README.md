# AngularJS Jasmine Boilerplate Generation [![Build Status](https://travis-ci.org/namoscato/angular-jasmine-boilerplate.svg?branch=master)](https://travis-ci.org/namoscato/angular-jasmine-boilerplate)

Generates boilerplate [Jasmine](http://jasmine.github.io/) tests from [annotated](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) [AngularJS](https://angularjs.org/) components via [Dgeni](https://github.com/angular/dgeni).

    angular-jasmine-boilerplate [--save] [--base-path=path] [--test-path=path] [file ...]

## Usage

1. Install dependencies:

        npm install

2. Save relevant paths:

        angular-jasmine-boilerplate --save --base-path=/dev/project/src --test-path=/dev/project/tests

    where `base-path` is the base path to the project and `test-path` is the path to the project tests.

3. Generate Jasmine boilerplate:

        angular-jasmine-boilerplate session/session.service.js

    where the arguments are one or more paths to annotated AngularJS components, relative to `base-path`.

## Supports

* [controllers](https://docs.angularjs.org/guide/controller)
* [services](https://docs.angularjs.org/guide/providers#service-recipe)
