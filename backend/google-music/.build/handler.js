"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypescriptHandler_1 = require("./handlers/TypescriptHandler");
const typescript = (event, context, callback) => (new TypescriptHandler_1.TypescriptHandler).handle(event, context, callback);
exports.typescript = typescript;
