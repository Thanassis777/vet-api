"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVirtualId = void 0;
var removeVirtualId = function (doc, ret) {
    delete ret.id; // Exclude the 'id' field from toJSON
};
exports.removeVirtualId = removeVirtualId;
