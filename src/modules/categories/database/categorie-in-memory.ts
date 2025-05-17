import { CategorieEntity } from "../domain/Categorie";
import { CategorieNotFoundError } from "../domain/errors/categorie-not-found.error";
import { CategorieReadRepository } from "../ports/categorie/read-categorie";

export class CategorieInMemory implements CategorieReadRepository {
    private readonly categories: CategorieEntity[] = [];

    addCategorie(categorie: CategorieEntity): void {
        this.categories.push(categorie);
    }

    async getCategorieById(categorieId: string): Promise<CategorieEntity> {
        const found = this.categories.find(cat => cat.id === categorieId);
        if (!found) {
            throw new CategorieNotFoundError();
        }
        return found;
    }
}