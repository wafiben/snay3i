"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesV1 = void 0;
var categorieRoot = '/categorie';
exports.routesV1 = {
    version: 'v1',
    categorie: {
        root: categorieRoot,
        resourceById: "".concat(categorieRoot, "/:id"),
        createCategorie: "".concat(categorieRoot)
    }
};
