import { Injectable } from "@nestjs/common";
import { CategorieReadRepository } from "../../ports/categorie/read-categorie";
import { CategorieResponseDTO } from "./get-categorie.response";

@Injectable()
export class GetOneCategorieHandler {
    constructor(private readonly categorieReadRepository: CategorieReadRepository) { }
    async handle(id: string): Promise<CategorieResponseDTO> {
        const categorie = await this.categorieReadRepository.getCategorieById(id);
        return new CategorieResponseDTO(
            categorie.id,
            categorie.name,
            categorie.description,
        );
    }
}