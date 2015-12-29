# AngularJS Jasmine Boilerplate Generation

Generates boilerplate [Jasmine](http://jasmine.github.io/) tests from [annotated](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) [AngularJS](https://angularjs.org/) components via [Dgeni](https://github.com/angular/dgeni).

    ./generate.js [--save] [--base-path=path] [--test-path=path] [file ...]

## Usage

1. Install dependencies:

        npm install

2. Save relevant paths:

        ./generate.js --save --base-path=/dev/project/src --test-path=/dev/project/tests

    where `base-path` is the base path to the project and `test-path` is the path to the project tests.

3. Generate Jasmine boilerplate:

        ./generate.js session/session.service.js

    where the arguments are one or more paths to annotated AngularJS components, relative to `base-path`.

## Supports

* [controllers](https://docs.angularjs.org/guide/controller)
* [services](https://docs.angularjs.org/guide/providers#service-recipe)
