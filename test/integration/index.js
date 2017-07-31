"use strict";
var helper = require("../helper.js");
var service;
var controller;

describe("Initialize & start controller and service", function () {

    before(function (done) {
        done();
    });

    it("Starting Integration tests ...", function (done) {
        service = helper.requireModule('./index.js');
        setTimeout(function () {
            require("./mongo.tests.js");
            done();
        }, 5000);
    });
});