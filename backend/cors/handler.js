'use strict';

const corsProxyHandler = new (require('./handlers/corsProxyHandler'));

module.exports.corsProxy = (event, context, callback) => corsProxyHandler.handler(event, context, callback);