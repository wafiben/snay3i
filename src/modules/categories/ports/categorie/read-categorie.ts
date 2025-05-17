import { CategorieEntity } from "../../domain/Categorie";

export interface CategorieReadRepository {
 getCategorieById(categorieId: string): Promise <CategorieEntity> ;
}