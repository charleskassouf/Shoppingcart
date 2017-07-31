'use strict';
var fs = require('fs');
var models = {};

module.exports = {
    "init": function (modelName, cb) {
        var modelPath;
        if (models[modelName]) {
            cartModule.model = models[modelName];
            return cb(null, cartModule);
        }

        if (modelName) {
            modelPath = __dirname + "/../model/" + modelName + ".js";
            return requireModel(modelPath, cb);
        }

       /** modelPath = __dirname + "/../model/memory.js";
        return requireModel(modelPath, cb);*/

        function requireModel(filePath, cb) {
            fs.exists(filePath, function (exists) {
                if (!exists) {
                    return cb(new Error("Requested Model Not Found!"));
                }

                cartModule.model = require(filePath);
                models[modelName] = cartModule.model;
                return cb(null, cartModule);
            });
        }
    }
};

function buildResponse(soajs, opts, cb) {
    if (opts.error) {
        soajs.log.error(opts.error);
        return cb({"code": opts.code, "msg": opts.config.errors[opts.code]});
    }
    return cb(null, opts.data);
}

var cartModule = {

    model: null,

    "getcart": function (config, soajs, cb) {

        if (soajs.inputmaskData.userId !== soajs.urac._id.toString()) {
            return cb({code: 401, msg: config.errors[401]});
        }
        cartModule.model.getEntry(soajs, function (error, data) {
            var opts = {error: error, code: 401, config: config, data: data};
            return buildResponse(soajs, opts, cb);
        });

    },

    "setcart": function (config, soajs, cb) {

        cartModule.model.addEntry(soajs, function (error, data) {
            var opts = {error: error, code: 401,config: config, data: data};
            return buildResponse(soajs, opts, cb);
        });

    },

    "emptycart": function (config, soajs, cb) {
        cartModule.model.deleteEntry(soajs, function (error, data) {
            var opts = {error: error, code: 401, config: config, data: data};
            return buildResponse(soajs, opts, cb);
        });
    },

    "getcards": function (config, soajs, cb) {
        cartModule.model.getEntries(soajs, function (error, data) {
            var opts = {error: error, code: 401, config: config, data: data};
            return buildResponse(soajs, opts, cb);
        });
    }
};