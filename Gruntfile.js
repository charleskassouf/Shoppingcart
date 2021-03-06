'use strict';


var fs = require('fs');
var path = require('path');

var lib = {
    findRoot: function () {
        var cwd = process.cwd();
        var rootPath = cwd;
        var newRootPath = null;
        while (!fs.existsSync(path.join(process.cwd(), "node_modules/grunt"))) {
            process.chdir("..");
            newRootPath = process.cwd();
            if (newRootPath === rootPath) {
                return;
            }
            rootPath = newRootPath;
        }
        process.chdir(cwd);
        return rootPath;
    },
    loadTasks: function (grunt, rootPath, tasks) {
        tasks.forEach(function (name) {
            if (name === 'grunt-cli') return;
            var cwd = process.cwd();
            process.chdir(rootPath);
            grunt.loadNpmTasks(name);
            process.chdir(cwd);
        });
    }
};

module.exports = function (grunt) {
    var pluginsRootPath = lib.findRoot();
    lib.loadTasks(grunt, pluginsRootPath, ['grunt-contrib-jshint', 'grunt-jsdoc', 'grunt-contrib-clean', 'grunt-mocha-test', 'grunt-env'
        , 'grunt-istanbul', 'grunt-coveralls']);
    grunt.initConfig({
        jshint: {
            options: {
                "bitwise": true,
                "eqeqeq": true,
                "forin": true,
                "newcap": true,
                "noarg": true,
                "undef": true,
                "unused": false,
                "eqnull": true,
                "laxcomma": true,
                "loopfunc": true,
                "sub": true,
                "supernew": true,
                "validthis": true,
                "node": true,
                "maxerr": 100,
                "indent": 2,
                "globals": {
                    "describe": false,
                    "it": false,
                    "before": false,
                    "beforeEach": false,
                    "after": false,
                    "afterEach": false
                },
                ignores: ['test/coverage/**/*.js']
            },
            files: {
                src: ['**/*.js']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        jsdoc: {
            dist: {
                src: ['index.js', 'config.js', 'lib/*.js', 'model/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        env: {
            coverage: {
                SOAJS_TEST: true,
                SOAJS_ENV: "dashboard",
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/'
            },
            shoppingcart: {
                SOAJS_TEST: true,
                SOAJS_ENV: "dashboard",
                SOAJS_PROFILE:"/opt/soajs/node_modules/shoppingcart/profile.js"
            }
        },

        clean: {
            doc: {
                src: ['doc/']
            },
            coverage: {
                src: ['test/coverage/']
            }
        },

        instrument: {
            files: ['config.js', 'index.js', 'lib/*.js', 'model/*.js', 'schema/*.js'],
            options: {
                lazy: false,
                basePath: 'test/coverage/instrument/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'test/coverage/reports'
            }
        },

        makeReport: {
            src: 'test/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        },

        mochaTest: {
             unit: {
                 options: {
                     reporter: 'spec',
                     timeout: 90000
                 },
                src: ['test/unit/*.js']
             },
            integration: {
                options: {
                    reporter: 'spec',
                    timeout: 90000
                },
                src: ['test/integration/index.js']
            }
        },

        coveralls: {
            options: {
                src: 'test/coverage/reports/lcov.info',
                force: false
            },
            your_target: {
                src: 'test/coverage/reports/lcov.info'
            }
        }
    });

    process.env.SHOW_LOGS = grunt.option('showLogs');
    grunt.registerTask("default", ['jshint']);
    grunt.registerTask("doc", ['jsdoc']);
    grunt.registerTask("integration", ['env:coverage', 'mochaTest:integration']);
    grunt.registerTask("data", ['env:artifact', 'mochaTest:integration']);
    grunt.registerTask("test", ['clean', 'env:coverage', 'instrument', 'mochaTest:integration']);
    grunt.registerTask("coverage", ['clean', 'env:coverage', 'instrument', 'mochaTest:integration','storeCoverage','makeReport']);

};

