'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var BLModule = require("./lib/index");

var service = new soajs.server.service(config);

/**
 * initials the model
 *
 * @param req
 * @param res
 * @param cb callback
 */
function initBLModel(req, res, cb) {
    var modelName = "mongo";
    if (process.env.SOAJS_TEST && req.soajs.inputmaskData.model) {
        modelName = req.soajs.inputmaskData.model;
    }
    BLModule.init(modelName, function (error, BL) {
        if (error) {
            req.soajs.log.error(error);
            return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));

        }
        else {
            return cb(BL);
        }
    });
}

service.init(function () {

     //Get By userId
    service.get("/shoppingcart/:userId", function (req, res) {

        return initBLModel(req, res, function (BL) {
            BL.getcart(config, req.soajs, function (error, response) {
                return res.json(req.soajs.buildResponse(error, response));
            });
        });
    });

    //SetCart
    service.post("/shoppingcart", function (req, res) {

        return initBLModel(req, res, function (BL) {
            BL.setcart(config, req.soajs, function (error, response) {
                return res.json(req.soajs.buildResponse(error, response));
            });
        });

    });

     //getall
    service.get("/admin/getcarts", function (req, res) {
        return initBLModel(req, res, function (BL) {
            BL.getcards(config, req.soajs, function (error, response) {
                return res.json(req.soajs.buildResponse(error, response));
            });
        });

    });

     //Delete
    service.delete("/shoppingcart/:userId", function (req, res) {

        return initBLModel(req, res, function (BL) {
            BL.emptycart(config, req.soajs, function (error, response) {
                return res.json(req.soajs.buildResponse(error, response));
            });
        });
    });

    service.start()

});
