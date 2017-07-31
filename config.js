'use strict';
var properties = require("shoppingcart/schema/properties");
module.exports = {
    serviceName: "cart",
    serviceVersion: 1,
    servicePort: 6530,
    serviceGroup: "SOAJS ",
    extKeyRequired: true,
    oauth: true,
    urac: true,
    type: "service",
    prerequisites: {
        cpu: '',
        memory: ''
    },
    "errors": {
        400: "Error Executing Operations!",
        401: "Invalid user id provided",
        407: "Error Loading Model!"
    },
    "schema": {
        "commonFields": {
            "userId": {
                "source": ['params.userId', 'query.userId'],
                "required": true,
                "validation": {
                    "type": "string"
                }
            },
            "model": {
                "source": ['query.model', 'body.model'],
                "required": false,
                "default": "mongo",
                "validation": {
                    "type": "string",
                    "enum": ["memory", "mongo"]
                }
            }
        },

        "get": {
            "/shoppingcart/:userId": {
                "_apiInfo": {
                    "l": "Get userId",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["userId", "model"]
            },


            "/admin/getcarts": {
                "_apiInfo": {
                    "l": "Get all users",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["model"],
                "start": {
                    "source": ["query.start"],
                    "required": false,
                    "validation": {
                        "type": "integer",
                        "default": 0
                    }
                },

                "limit": {
                    "source": ["query.limit"],
                    "required": false,
                    "validation": {
                        "type": "integer",
                        "default": 1000
                    }
                }
            }

        },


        "post": {
            "/shoppingcart": {
                "_apiInfo": {
                    "l": "insert or update",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["userId", "model"],

                "items": {
                    "source": ['body.items'],
                    "required": false,
                    "validation": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "required": true,
                            "properties": properties
                        }
                    }
                }
            }
        },


        "delete": {
            "/shoppingcart/:userId": {
                "_apiInfo": {
                    "l": "Delete  by userId",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["userId", "model"]
            }
        }
    }
};
