'use strict';
var soajs = require('soajs');
var Mongo = soajs.mongo;
var mongo;
var dbName = "shoppingcart";
var collName = "cart";

function checkIfMongo(soajs) {
    if (!mongo) {
        mongo = new Mongo(soajs.registry.coreDB[dbName]);
    }
}


module.exports = {

    "getEntry": function (soajs, cb) {
        checkIfMongo(soajs);
        mongo.findOne(collName, {"user.id": soajs.urac._id}, cb);

    },

    "addEntry": function (soajs, cb) {
        checkIfMongo(soajs);
        mongo.update(collName, {"user.id": soajs.inputmaskData.userId}, {
            $set: {
                "modified": new Date().getTime(),
                "items": soajs.inputmaskData.items
            },
            $setOnInsert: {
                "user.username": soajs.urac.username,
                "created": new Date().getTime(),
                "tenantid": soajs.tenant.id
            }

        }, {"multi": false, "upsert": true, "safe": false}, function (error) {
            return cb(error, true);
        });
    },

    "deleteEntry": function (soajs, cb) {
        checkIfMongo(soajs);
        var mydata = {
            "items": null
        };
        mongo.update(collName, {"userId": soajs.urac._id}, mydata, {
            "multi": false,
            "upsert": false,
            "safe": true
        }, function (error) {
            return cb(error, true);
        });

    },

    "getEntries": function (soajs, cb) {
        checkIfMongo(soajs);
        var options  = {};
        options = {
            skip: soajs.inputmaskData.start,
            limit: soajs.inputmaskData.limit
        };
        mongo.find(collName, {"tenantid": soajs.tenant.id}, options, cb);

    }
};