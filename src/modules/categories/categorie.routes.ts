const categorieRoot = '/categorie';
export const routesV1 = {
  version: 'v1',
  categorie: {
    root: categorieRoot,
    resourceById: `${categorieRoot}/:id`,
    createCategorie: `${categorieRoot}`
  }
};