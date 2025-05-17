export class CategorieNotFoundError extends Error{
    public readonly message: string;
    constructor() {
        super('CATEGORIE_NOT_FOUND');
        this.name = 'CATEGORIE_NOT_FOUND';
    }
}
