"use strict";
var assert = require("assert");
var request = require("request");
//var helper = require("../helper.js");
var key = "9b96ba56ce934ded56c3f21ac9bdaddc8ba4782b7753cf07576bfabcace8632eba1749ff1187239ef1f56dd74377aa1e5d0a1113de2ed18368af4b808ad245bc7da986e101caddb7b75992b14d6a866db884ea8aee5ab02786886ecf9f25e974";
var uri = "http://127.0.0.1:4000/cart/shoppingcart/595b8e2f22864e43da5604c6";
var opts = {"uri": 'http://127.0.0.1:4000/oauth/token', "headers": {"key": key, "Authorization": 'Basic NTU1MWFjYTllMTc5YzM5Yjc2MGY3YTFhOnNvYWpzIGJlYXZlcg==', "json": true}};
var opt = {"uri": uri, "qs": {"model": "mongo", "access_token": token}, "headers": {"key": key, "JSON": true}};
var token;

describe('Starting Integration tests', function () {

    before(function (done) {
        opts.form = {
            "username": "owner",
            "password": "password",
            "grant_type": "password"

        };
        request.post(opts, function (err, response) {
            token = JSON.parse(response.body).access_token;
            done();
        })
    });

    beforeEach(function (done) {
        opt.qs = {
            access_token: token
        };
        done();
    });

    describe('testing get', function () {

        it("existing id", function (done) {
            request.get(opt, function (err, response) {
                assert.equal(JSON.parse(response.body).data.user.id, "595b8e2f22864e43da5604c6");
                done();
            });
        });

        it("invalid userId", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/shoppingcart/5765432";
            request.get(opt, function (err, response) {
                assert.ifError(err);
                assert.deepEqual(JSON.parse(response.body).result, false);
                done();
            })
        });
    });

    describe('List', function () {

        it("list length", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/admin/getcarts";
            opt.qs.limit = 5;
            request.get(opt, function (err, response) {
                assert.ifError(err);
                assert.equal(JSON.parse(response.body).data.length, 5);
                done();
            })
        });


        it("list start limit", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/admin/getcarts";
            opt.qs.start = 1;
            opt.qs.limit = 1;
            request.get(opt, function (err, response) {
                assert.ifError(err);
                assert.equal(JSON.parse(response.body).data.length, 1);
                done();
            })
        });
    });

    describe("Testing set", function () {

        it("success - set", function (done) {
            opt.form = {"tenantid": "5551aca9e179c39b760f7a1a", "user": {"username": "owner"}, "created": new Date().getTime(), "modified": new Date().getTime(), "items": [{"productId": "1", "title": "laptop", "imagePath": "", "price": 500, "groupId": "1324234", "merchantId": "100001", "GTIN": "11111", "currency": "USD", "quantity": 1, "shippingPrice": 0, "shippingMethods": [{"id": 1, "methodName": "Client Pickup", "price": 0, "selected": true}, {"id": 2, "methodName": "Liban Post", "price": 5, "selected": false}, {"id": 3, "methodName": "Urgent Delivery", "price": 20, "selected": false}], "filters": {"color": "black", "weight": "2kg"}}]};
            opt.uri = "http://127.0.0.1:4000/cart/shoppingcart";
            opt.qs.userId = "595b8e2f22864e43da56032";
            request.post(opt, function (err, response) {
                assert.ifError(err);
                assert.equal(JSON.parse(response.body).result, true);
                assert.equal(JSON.parse(response.body).data, true);
                done();
            })
        });

        it("fail - missing id", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/shoppingcart";
            request.post(opt, function (err, response) {
                assert.equal(JSON.parse(response.body).result, false);
                done();
            })
        })
    });

    describe("Testing empty", function () {
        it("empty", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/shoppingcart/595b8e2f22864e43da5604tr4";
            request.delete(opt, function (err, response) {
                assert.equal(JSON.parse(response.body).result, true);
                assert.equal(JSON.parse(response.body).data, true);
                done();
            })
        });

        it("missing id", function (done) {
            opt.uri = "http://127.0.0.1:4000/cart/shoppingcart";
            request.delete(opt, function (err, response) {
                assert.equal(JSON.parse(response.body).result, false);
                assert.equal(JSON.parse(response.body).errors.codes[0], 172)

            });
            done();

        })
    })
});