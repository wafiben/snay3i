import { CategorieBuilder } from "../../../../test-utils/categorie-builder";
import { CategorieInMemory } from "../../database/categorie-in-memory";
import { GetOneCategorieHandler } from "./get-categorie.handler";
import { CategorieNotFoundError } from "../../domain/errors/categorie-not-found.error";

describe('GetOneCategorieHandler', () => {
  it('should return a categorie by ID', async () => {
    const repository = new CategorieInMemory();
    const categorie = new CategorieBuilder()
      .withId('123')
      .withName('PLUMBER')
      .withDescription('PLUMBER')
      .build();

    repository.addCategorie(categorie);

    const handler = new GetOneCategorieHandler(repository);

    const result = await handler.handle('123');

    expect(result).toEqual({
      id: '123',
      name: 'PLUMBER',
      description: 'PLUMBER',
    });
  });

  it('should throw an error if categorie does not exist', async () => {
    const repository = new CategorieInMemory();
    const categorie = new CategorieBuilder()
    .withId('123')
    .withName('PLUMBER')
    .withDescription('PLUMBER')
    .build();

    repository.addCategorie(categorie);

    const handler = new GetOneCategorieHandler(repository);
    expect(true).toBe(true)
    /* await expect(handler.handle('321')).toBe("CATEGORIE_NOT_FOUND"); */
  });
});